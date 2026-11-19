/**
 * test/pinball-kernel.test.mjs — Verification of Q16.16 Pinball Gravity, Bumper Scoring & 4-Act Progression
 * Run: node --test test/pinball-kernel.test.mjs
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import test from "node:test";
import assert from "node:assert/strict";

import { toQ16, fromQ16 } from "../src/core.js";
import {
  createPinballState,
  launchPlungerBall,
  stepPinballFrame,
  buildPlaybillReceipt,
} from "../src/pinball-kernel.js";

test("1. Plunger Launch Fires Ball Upward Under Q16.16 Gravity", () => {
  let s = createPinballState();
  assert.equal(s.ball.inPlungerLane, true);

  s = launchPlungerBall(s);
  assert.equal(s.ball.inPlungerLane, false);
  const startY = fromQ16(s.ball.yQ16);

  s = stepPinballFrame(s);
  assert.ok(fromQ16(s.ball.yQ16) < startY);
});

test("2. Windmill Bumper Collision Awards Points & Advances Act I -> Act II", () => {
  let s = createPinballState();
  s.score = 1400; // 100 pts shy of Act II threshold (1500)
  s.ball.inPlungerLane = false;
  // Place ball overlapping Windmill bumper at (210, 145)
  s.ball.xQ16 = toQ16(210);
  s.ball.yQ16 = toQ16(175);
  s.ball.vyQ16 = toQ16(-120);

  s = stepPinballFrame(s);
  assert.equal(s.score, 1650);
  assert.equal(s.actIndex, 1);
  assert.equal(s.actDef.slug, "elephant-boudoir");
});

test("3. Playbill Receipt Generates Deterministic 64-Char SHA-256 Digest", () => {
  const s = createPinballState();
  const receipt = buildPlaybillReceipt(s);
  assert.equal(receipt.sha256.length, 64);
  assert.equal(receipt.actReached, 1);
});
