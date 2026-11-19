/**
 * src/pinball-app.js — Moulin Rouge 8-Bit Pinball Controller, Flipper Input & Track Switcher
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import {
  createPinballState,
  setFlipperState,
  launchPlungerBall,
  stepPinballFrame,
  buildPlaybillReceipt,
} from "./pinball-kernel.js";
import { createChiptune8BitAudio } from "./chiptune-8bit-audio.js";
import { renderCabaretPinball } from "./cabaret-renderer.js";

const FIXED_DT_MS = 1000 / 60;

function initCabaretPinball() {
  const canvas = document.getElementById("pinball-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const audio = createChiptune8BitAudio();

  const hudScore = document.getElementById("hud-score");
  const actTitleEl = document.getElementById("act-title");
  const actSubtitleEl = document.getElementById("act-subtitle");
  const actStoryEl = document.getElementById("act-story");
  const eventBannerEl = document.getElementById("event-banner");
  const trackLabelEl = document.getElementById("track-label");

  const audioBtn = document.getElementById("btn-audio");
  const trackBtn = document.getElementById("btn-track");
  const leftFlipperBtn = document.getElementById("btn-left-flipper");
  const rightFlipperBtn = document.getElementById("btn-right-flipper");
  const plungerBtn = document.getElementById("btn-plunger");
  const receiptBox = document.getElementById("receipt-output");

  let state = createPinballState();
  let lastActIdx = 0;

  const syncPlaybill = () => {
    if (hudScore) {
      hudScore.textContent =
        "Score: " + state.score + " / " + state.actDef.targetScore + " | Balls: " + state.ballsRemaining;
    }
    if (actTitleEl) actTitleEl.textContent = state.actDef.title;
    if (actSubtitleEl) actSubtitleEl.textContent = state.actDef.subtitle;
    if (actStoryEl) actStoryEl.textContent = state.actDef.story;
    if (eventBannerEl) eventBannerEl.textContent = state.lastEvent;

    // Automatically advance 8-bit chiptune track when entering a new Act
    if (state.actIndex !== lastActIdx) {
      lastActIdx = state.actIndex;
      const name = audio.setTrack(state.actDef.trackIndex);
      if (trackLabelEl) trackLabelEl.textContent = name;
    }
  };

  syncPlaybill();

  // Touch & Pointer Flipper Controls
  const bindHoldButton = (el, side) => {
    if (!el) return;
    const down = (ev) => {
      ev.preventDefault();
      state = setFlipperState(state, side, true);
    };
    const up = (ev) => {
      ev.preventDefault();
      state = setFlipperState(state, side, false);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointerleave", up);
    el.addEventListener("pointercancel", up);
  };

  bindHoldButton(leftFlipperBtn, "LEFT");
  bindHoldButton(rightFlipperBtn, "RIGHT");

  plungerBtn?.addEventListener("click", () => {
    state = launchPlungerBall(state);
    syncPlaybill();
  });

  // Keyboard Controls (A / ArrowLeft = Left Flipper, D / ArrowRight = Right Flipper, Space = Plunger)
  window.addEventListener("keydown", (ev) => {
    const k = ev.key.toLowerCase();
    if (k === "a" || k === "arrowleft" || k === "z") {
      state = setFlipperState(state, "LEFT", true);
    } else if (k === "d" || k === "arrowright" || k === "/") {
      state = setFlipperState(state, "RIGHT", true);
    } else if (k === " " || k === "enter") {
      ev.preventDefault();
      state = launchPlungerBall(state);
    }
  });

  window.addEventListener("keyup", (ev) => {
    const k = ev.key.toLowerCase();
    if (k === "a" || k === "arrowleft" || k === "z") {
      state = setFlipperState(state, "LEFT", false);
    } else if (k === "d" || k === "arrowright" || k === "/") {
      state = setFlipperState(state, "RIGHT", false);
    }
  });

  audioBtn?.addEventListener("click", () => {
    const muted = audio.toggleMute();
    audioBtn.textContent = muted ? "Sound: Muted" : "🎵 8-Bit Chiptune: ON";
    if (trackLabelEl) trackLabelEl.textContent = audio.getTrackName();
  });

  trackBtn?.addEventListener("click", () => {
    const nextName = audio.nextTrack();
    if (trackLabelEl) trackLabelEl.textContent = nextName;
  });

  document.getElementById("btn-receipt")?.addEventListener("click", () => {
    if (receiptBox) receiptBox.value = JSON.stringify(buildPlaybillReceipt(state), null, 2);
  });

  let lastTime = performance.now();
  let accumulator = 0;

  function loop(now) {
    accumulator += Math.min(100, now - lastTime);
    lastTime = now;

    while (accumulator >= FIXED_DT_MS) {
      state = stepPinballFrame(state);
      for (const sfx of state.sfxQueue) {
        audio.playSfx(sfx);
      }
      accumulator -= FIXED_DT_MS;
    }

    syncPlaybill();
    if (ctx) renderCabaretPinball(ctx, state);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

window.addEventListener("DOMContentLoaded", initCabaretPinball);
