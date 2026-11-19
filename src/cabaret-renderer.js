/**
 * src/cabaret-renderer.js — Living Parisian Cabaret Pinball Table Renderer (Ledger 2)
 * Zero-flicker velvet playfield with spinning Red Windmill blades, sweeping stage
 * spotlight cones, glowing bumpers, Left/Right flippers, and Act IV confetti.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { fromQ16 } from "./core.js";
import { LEFT_FLIPPER, RIGHT_FLIPPER, PLAYFIELD_RIGHT } from "./pinball-kernel.js";

export function renderCabaretPinball(ctx, state) {
  const { width, height } = ctx.canvas;
  const act = state.actDef;

  // 1. Steady velvet stage gradient (zero flicker)
  const felt = ctx.createLinearGradient(0, 0, 0, height);
  felt.addColorStop(0, act.feltTop);
  felt.addColorStop(1, act.feltBottom);
  ctx.fillStyle = felt;
  ctx.fillRect(0, 0, width, height);

  // 2. Sweeping Parisian Stage Spotlight Cones
  ctx.save();
  ctx.fillStyle = act.spotlightColor;
  const sweep1 = Math.sin(state.tick * 0.025) * 65;
  ctx.beginPath();
  ctx.moveTo(85, 20);
  ctx.lineTo(155 + sweep1, height - 30);
  ctx.lineTo(255 + sweep1, height - 30);
  ctx.closePath();
  ctx.fill();

  const sweep2 = Math.cos(state.tick * 0.022) * 65;
  ctx.beginPath();
  ctx.moveTo(335, 20);
  ctx.lineTo(165 + sweep2, height - 30);
  ctx.lineTo(265 + sweep2, height - 30);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 3. Gold-Leaf Cabinet Frame, Upper Arch & Plunger Launch Lane
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 34, width - 38, height - 48);

  // Plunger lane divider wall (x = 408, y = 135..546)
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(PLAYFIELD_RIGHT, 135);
  ctx.lineTo(PLAYFIELD_RIGHT, height - 14);
  ctx.stroke();

  // Upper launch guide curve
  ctx.beginPath();
  ctx.arc(368, 92, 54, -Math.PI * 0.5, 0);
  ctx.stroke();

  // 4. Spinning Red Windmill Blades behind upper Windmill Bumper (210, 145)
  ctx.save();
  ctx.translate(210, 145);
  ctx.rotate(state.tick * 0.03);
  ctx.fillStyle = "rgba(220, 38, 38, 0.45)";
  ctx.strokeStyle = "#fde047";
  ctx.lineWidth = 1.5;
  for (let blade = 0; blade < 4; blade++) {
    ctx.rotate(Math.PI * 0.5);
    ctx.fillRect(-7, -56, 14, 42);
    ctx.strokeRect(-7, -56, 14, 42);
  }
  ctx.restore();

  // 5. Four Cabaret Bumpers
  for (const b of state.bumpers) {
    const flashing = b.hitFlashTicks > 0;
    ctx.fillStyle = flashing ? "#fef08a" : b.color;
    ctx.strokeStyle = "#fde68a";
    ctx.lineWidth = flashing ? 4 : 2.5;

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r + (flashing ? 3 : 0), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = flashing ? "#7f1d1d" : "#fffbeb";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText(b.label, b.x, b.y + 3);
    ctx.textAlign = "left";
  }

  // 6. Sloped Lower Gutter Guide Rails
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(26, 395);
  ctx.lineTo(LEFT_FLIPPER.pivotX - 6, LEFT_FLIPPER.pivotY);
  ctx.moveTo(PLAYFIELD_RIGHT - 4, 395);
  ctx.lineTo(RIGHT_FLIPPER.pivotX + 6, RIGHT_FLIPPER.pivotY);
  ctx.stroke();

  // 7. Left & Right Cabaret Flippers
  const drawFlipper = (pivotX, pivotY, dir, isUp) => {
    const tipX = pivotX + dir * LEFT_FLIPPER.length;
    const tipY = isUp ? pivotY - 26 : pivotY + 18;
    ctx.strokeStyle = "#fde047";
    ctx.lineWidth = 11;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  drawFlipper(LEFT_FLIPPER.pivotX, LEFT_FLIPPER.pivotY, 1, state.leftFlipperActive);
  drawFlipper(RIGHT_FLIPPER.pivotX, RIGHT_FLIPPER.pivotY, -1, state.rightFlipperActive);

  // 8. Plunger Spring & Silver Pinball
  ctx.fillStyle = "#d97706";
  ctx.fillRect(417, 510, 18, 28);

  const bx = fromQ16(state.ball.xQ16);
  const by = fromQ16(state.ball.yQ16);
  const ballGrad = ctx.createRadialGradient(bx - 3, by - 3, 2, bx, by, state.ball.radius);
  ballGrad.addColorStop(0, "#ffffff");
  ballGrad.addColorStop(0.6, "#cbd5e1");
  ballGrad.addColorStop(1, "#475569");
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(bx, by, state.ball.radius, 0, Math.PI * 2);
  ctx.fill();

  // 9. Act Transition Golden & Crimson Confetti
  for (const c of state.confetti) {
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, 5, 5);
  }
}
