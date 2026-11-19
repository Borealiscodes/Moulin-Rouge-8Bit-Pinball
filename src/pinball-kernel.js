/**
 * src/pinball-kernel.js — Zero-Float Q16.16 Cabaret Pinball Physics, Flippers, Bumpers & Act Progression (Ledger 1)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { toQ16, fromQ16, qAdd, qSub, qMul, sha256Hex } from "./core.js";
import { CABARET_ACTS, TABLE_BUMPERS } from "./cabaret-acts-data.js";

export const TABLE_W = 460;
export const TABLE_H = 560;
export const PLAYFIELD_RIGHT = 408; // x = 408..444 is the right-side plunger launch lane

export const LEFT_FLIPPER = { pivotX: 138, pivotY: 486, length: 68 };
export const RIGHT_FLIPPER = { pivotX: 282, pivotY: 486, length: 68 };

export function createPinballState() {
  return {
    tick: 0,
    actIndex: 0,
    actDef: CABARET_ACTS.at(0),
    score: 0,
    ballsRemaining: 3,
    comboMultiplier: 1,
    ball: {
      xQ16: toQ16(426),
      yQ16: toQ16(495),
      vxQ16: 0,
      vyQ16: 0,
      radius: 10,
      inPlungerLane: true,
    },
    leftFlipperActive: false,
    rightFlipperActive: false,
    leftFlipperTicks: 0,
    rightFlipperTicks: 0,
    bumpers: TABLE_BUMPERS.map((b) => ({ ...b, hitFlashTicks: 0 })),
    confetti: [],
    lastEvent: "Pull Plunger (Space / Launch) to fire the silver ball into Montmartre!",
    sfxQueue: [], // ["PLUNGER", "FLIPPER", "BUMPER", "ACT_UP", "DRAIN"]
  };
}

export function setFlipperState(state, side, active) {
  if (side === "LEFT") {
    const justPressed = active && !state.leftFlipperActive;
    return {
      ...state,
      leftFlipperActive: active,
      leftFlipperTicks: justPressed ? 10 : state.leftFlipperTicks,
      sfxQueue: justPressed ? [...state.sfxQueue, "FLIPPER"] : state.sfxQueue,
    };
  }
  const justPressed = active && !state.rightFlipperActive;
  return {
    ...state,
    rightFlipperActive: active,
    rightFlipperTicks: justPressed ? 10 : state.rightFlipperTicks,
    sfxQueue: justPressed ? [...state.sfxQueue, "FLIPPER"] : state.sfxQueue,
  };
}

export function launchPlungerBall(state) {
  if (!state.ball.inPlungerLane) return state;
  return {
    ...state,
    ball: {
      ...state.ball,
      vxQ16: toQ16(-65),
      vyQ16: toQ16(-790),
      inPlungerLane: false,
    },
    lastEvent: "Plunger fired! Ball enters the Moulin Rouge upper arch!",
    sfxQueue: [...state.sfxQueue, "PLUNGER"],
  };
}

function checkAndAdvanceAct(state) {
  let idx = state.actIndex;
  let actDef = state.actDef;
  let advanced = false;

  while (idx < CABARET_ACTS.length - 1 && state.score >= CABARET_ACTS.at(idx).targetScore) {
    idx++;
    actDef = CABARET_ACTS.at(idx);
    advanced = true;
  }

  if (!advanced) return state;

  // Spawn celebratory confetti burst on Act transition
  const burst = Array.from({ length: 24 }, (_, i) => ({
    x: 60 + ((i * 37) % 300),
    y: 70 + ((i * 29) % 180),
    vy: 1.2 + (i % 4) * 0.4,
    color: i % 2 === 0 ? "#fde047" : "#f43f5e",
    life: 140,
  }));

  return {
    ...state,
    actIndex: idx,
    actDef,
    confetti: [...state.confetti, ...burst],
    lastEvent: "CURTAIN RISES: " + actDef.title + "!",
    sfxQueue: [...state.sfxQueue, "ACT_UP"],
  };
}

export function stepPinballFrame(state) {
  const tick = state.tick + 1;
  let sfxQueue = [];

  // Decay bumper flashes & flipper impulse windows
  let nextBumpers = state.bumpers.map((b) => ({
    ...b,
    hitFlashTicks: Math.max(0, b.hitFlashTicks - 1),
  }));
  const leftFlipperTicks = Math.max(0, state.leftFlipperTicks - 1);
  const rightFlipperTicks = Math.max(0, state.rightFlipperTicks - 1);

  const nextConfetti = state.confetti
    .map((c) => ({ ...c, y: c.y + c.vy, life: c.life - 1 }))
    .filter((c) => c.life > 0);

  if (state.ball.inPlungerLane) {
    return {
      ...state,
      tick,
      bumpers: nextBumpers,
      leftFlipperTicks,
      rightFlipperTicks,
      confetti: nextConfetti,
      sfxQueue,
    };
  }

  const dtQ16 = toQ16(1.0 / 60.0);
  const gravQ16 = toQ16(430.0); // Table slope gravity
  const airDampQ16 = toQ16(0.996);

  let vx = qMul(state.ball.vxQ16, airDampQ16);
  let vy = qMul(qAdd(state.ball.vyQ16, qMul(gravQ16, dtQ16)), airDampQ16);

  let x = qAdd(state.ball.xQ16, qMul(vx, dtQ16));
  let y = qAdd(state.ball.yQ16, qMul(vy, dtQ16));

  let fx = fromQ16(x);
  let fy = fromQ16(y);
  let fvx = fromQ16(vx);
  let fvy = fromQ16(vy);
  const r = state.ball.radius;

  // 1. Top Curved Arch & Side Walls
  if (fy < 42 + r) {
    fy = 42 + r;
    fvy = Math.abs(fvy) * 0.78;
    // Guide ball from top-right launch arch smoothly into main playfield
    if (fx > 350) fvx -= 140;
  }
  if (fx < 26 + r) {
    fx = 26 + r;
    fvx = Math.abs(fvx) * 0.82;
  }
  // Once ball exits plunger lane (y < 140 or x < PLAYFIELD_RIGHT - r), seal plunger gate
  if (fx > PLAYFIELD_RIGHT - r && fy > 130) {
    fx = PLAYFIELD_RIGHT - r;
    fvx = -Math.abs(fvx) * 0.82;
  } else if (fx > TABLE_W - 22 - r) {
    fx = TABLE_W - 22 - r;
    fvx = -Math.abs(fvx) * 0.82;
  }

  // 2. Sloped Lower Gutter Rails directing ball toward Flippers
  if (fy > 410 && fy < 495) {
    if (fx < 118) {
      fx = 118;
      fvx = Math.abs(fvx) * 0.65 + 75;
    } else if (fx > 302 && fx <= PLAYFIELD_RIGHT) {
      fx = 302;
      fvx = -Math.abs(fvx) * 0.65 - 75;
    }
  }

  // 3. Circular Cabaret Bumper Collisions & Scoring
  let score = state.score;
  let lastEvent = state.lastEvent;

  nextBumpers = nextBumpers.map((b) => {
    const dx = fx - b.x;
    const dy = fy - b.y;
    const dist = Math.hypot(dx, dy);
    const minDist = b.r + r;

    if (dist < minDist && dist > 0.001) {
      const nx = dx / dist;
      const ny = dy / dist;
      fx = b.x + nx * (minDist + 1);
      fy = b.y + ny * (minDist + 1);

      const bounceSpeed = Math.max(360, Math.hypot(fvx, fvy) * 1.12);
      fvx = nx * bounceSpeed;
      fvy = ny * bounceSpeed;

      const pts = b.basePoints * state.actDef.scoreMultiplier;
      score += pts;
      lastEvent = b.label + " BUMPER! +" + pts + " pts!";
      sfxQueue.push("BUMPER");
      return { ...b, hitFlashTicks: 12 };
    }
    return b;
  });

  // 4. Left & Right Flipper Collisions & Upward Kick Impulses
  const checkFlipper = (pivotX, pivotY, dir, isUp, justKicked) => {
    // Flipper segment from pivotX to pivotX + dir * 68
    const tipX = pivotX + dir * 68;
    const tipY = isUp ? pivotY - 26 : pivotY + 18;
    const segX = tipX - pivotX;
    const segY = tipY - pivotY;
    const segLenSq = segX * segX + segY * segY;

    const t = Math.max(0, Math.min(1, ((fx - pivotX) * segX + (fy - pivotY) * segY) / segLenSq));
    const closestX = pivotX + t * segX;
    const closestY = pivotY + t * segY;
    const dist = Math.hypot(fx - closestX, fy - closestY);

    if (dist < r + 7) {
      fy = closestY - (r + 8);
      if (isUp || justKicked) {
        fvy = -660 - t * 140;
        fvx = dir * (160 + t * 210);
        lastEvent = (dir > 0 ? "Left" : "Right") + " Flipper power shot!";
      } else {
        fvy = -Math.abs(fvy) * 0.55;
        fvx += dir * 85;
      }
    }
  };

  checkFlipper(LEFT_FLIPPER.pivotX, LEFT_FLIPPER.pivotY, 1, state.leftFlipperActive, leftFlipperTicks > 0);
  checkFlipper(RIGHT_FLIPPER.pivotX, RIGHT_FLIPPER.pivotY, -1, state.rightFlipperActive, rightFlipperTicks > 0);

  // 5. Center Drain Check (returns ball cleanly to Plunger Lane)
  if (fy > TABLE_H + 18) {
    const nextBalls = state.ballsRemaining > 1 ? state.ballsRemaining - 1 : 3;
    const resetMsg =
      state.ballsRemaining > 1
        ? "Ball drained! " + nextBalls + " balls left — Pull Plunger!"
        : "Encore! Fresh 3-ball set loaded — Pull Plunger!";
    sfxQueue.push("DRAIN");

    return {
      ...state,
      tick,
      score,
      ballsRemaining: nextBalls,
      ball: {
        xQ16: toQ16(426),
        yQ16: toQ16(495),
        vxQ16: 0,
        vyQ16: 0,
        radius: 10,
        inPlungerLane: true,
      },
      bumpers: nextBumpers,
      leftFlipperTicks,
      rightFlipperTicks,
      confetti: nextConfetti,
      lastEvent: resetMsg,
      sfxQueue,
    };
  }

  const stepped = {
    ...state,
    tick,
    score,
    ball: {
      ...state.ball,
      xQ16: toQ16(fx),
      yQ16: toQ16(fy),
      vxQ16: toQ16(fvx),
      vyQ16: toQ16(fvy),
    },
    bumpers: nextBumpers,
    leftFlipperTicks,
    rightFlipperTicks,
    confetti: nextConfetti,
    lastEvent,
    sfxQueue,
  };

  return checkAndAdvanceAct(stepped);
}

export function buildPlaybillReceipt(state) {
  const payload = {
    schema: "ndh.moulin.rouge.8bit.pinball.v1",
    actReached: state.actIndex + 1,
    actTitle: state.actDef.slug,
    score: state.score,
    trackActive: state.actDef.trackName,
  };
  return {
    ...payload,
    sha256: sha256Hex(JSON.stringify(payload)),
  };
}
