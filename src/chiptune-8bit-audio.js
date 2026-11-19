/**
 * src/chiptune-8bit-audio.js — 4-Channel 8-Bit NES-Style Chiptune WebAudio Engine (Ledger 2)
 * Emulates 4 classic 8-bit sound channels:
 *   1. Pulse 1 (Square Lead Melody)
 *   2. Pulse 2 (Square Harmonic Stab / Counter-Melody)
 *   3. Triangle (Punchy Octave & Habanera Bass)
 *   4. Noise (Filtered 8-Bit Percussion Snare / Hi-Hat)
 *
 * Includes 4 original Parisian Cabaret 8-Bit Remixes (one per Act + manual track switcher):
 *   Track 0: Montmartre Can-Can Gallop (148 BPM)
 *   Track 1: Elephant Serenade (96 BPM)
 *   Track 2: Tango de Montmartre (124 BPM)
 *   Track 3: Spectacular Finale Overture (156 BPM)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

const NOTE_HZ = {
  REST: 0,
  D2: 73.42, G2: 98.00, A2: 110.00, Bb2: 116.54, C3: 130.81,
  D3: 146.83, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.00,
};

const CHIPTUNE_TRACKS = [
  {
    name: "Track 1: Montmartre Can-Can Gallop (148 BPM)",
    stepMs: 101, // 16th notes at 148 BPM
    lead: [
      "D4", "D4", "E4", "G4", "Fs4", "E4", "A4", "A4",
      "A4", "B4", "Fs4", "G4", "E4", "E4", "E4", "G4",
      "Fs4", "E4", "D4", "D5", "Cs5", "B4", "A4", "G4",
      "Fs4", "E4", "D4", "E4", "Fs4", "G4", "A4", "D5",
    ],
    harmony: [
      "Fs3", "REST", "G3", "B3", "A3", "G3", "D4", "REST",
      "D4", "D4", "A3", "B3", "G3", "REST", "G3", "B3",
      "A3", "G3", "Fs3", "Fs4", "E4", "D4", "Cs4", "B3",
      "A3", "G3", "Fs3", "G3", "A3", "B3", "Cs4", "Fs4",
    ],
    bass: [
      "D2", "D3", "D2", "D3", "A2", "A3", "A2", "A3",
      "D2", "D3", "D2", "D3", "G2", "G3", "A2", "A3",
      "D2", "D3", "D2", "D3", "G2", "G3", "E3", "A3",
      "D2", "D3", "A2", "A3", "D2", "A2", "D3", "REST",
    ],
  },
  {
    name: "Track 2: Elephant Serenade (96 BPM)",
    stepMs: 156,
    lead: [
      "A4", "REST", "Fs4", "G4", "A4", "D5", "Cs5", "B4",
      "A4", "REST", "G4", "Fs4", "E4", "REST", "REST", "REST",
      "G4", "REST", "E4", "Fs4", "G4", "B4", "A4", "G4",
      "Fs4", "REST", "E4", "D4", "Fs4", "REST", "D4", "REST",
    ],
    harmony: [
      "D4", "Fs4", "A4", "Fs4", "D4", "Fs4", "A4", "Fs4",
      "E4", "G4", "B4", "G4", "E4", "G4", "B4", "G4",
      "C4", "E4", "G4", "E4", "C4", "E4", "G4", "E4",
      "D4", "Fs4", "A4", "Fs4", "D4", "Fs4", "A4", "REST",
    ],
    bass: [
      "D2", "REST", "A2", "REST", "D3", "REST", "A2", "REST",
      "E2", "REST", "B2", "REST", "E3", "REST", "B2", "REST",
      "C3", "REST", "G3", "REST", "C3", "REST", "G2", "REST",
      "D2", "REST", "A2", "REST", "D3", "REST", "D2", "REST",
    ],
  },
  {
    name: "Track 3: Tango de Montmartre (124 BPM)",
    stepMs: 121,
    lead: [
      "A4", "REST", "D5", "F5", "E5", "D5", "Cs5", "D5",
      "Bb4", "REST", "G4", "Bb4", "A4", "REST", "REST", "REST",
      "G4", "REST", "Bb4", "D5", "Cs5", "Bb4", "A4", "G4",
      "F4", "E4", "F4", "G4", "A4", "REST", "D4", "REST",
    ],
    harmony: [
      "REST", "F4", "A4", "REST", "REST", "F4", "A4", "REST",
      "REST", "D4", "G4", "REST", "REST", "E4", "A4", "REST",
      "REST", "D4", "G4", "REST", "REST", "E4", "A4", "REST",
      "REST", "D4", "F4", "REST", "Cs4", "E4", "D4", "REST",
    ],
    bass: [
      "D2", "REST", "REST", "A2", "D3", "REST", "A2", "REST",
      "G2", "REST", "REST", "D3", "A2", "REST", "E3", "REST",
      "Bb2", "REST", "REST", "F3", "A2", "REST", "E3", "REST",
      "D2", "REST", "A2", "REST", "A2", "E3", "D3", "REST",
    ],
  },
  {
    name: "Track 4: Spectacular Finale Overture (156 BPM)",
    stepMs: 96,
    lead: [
      "D5", "A4", "Fs4", "A4", "D5", "E5", "Fs5", "G5",
      "A5", "Fs5", "D5", "A4", "B4", "Cs5", "D5", "E5",
      "Fs5", "D5", "B4", "G4", "E5", "Cs5", "A4", "Fs4",
      "G4", "B4", "A4", "Cs5", "D5", "Fs5", "A5", "D5",
    ],
    harmony: [
      "Fs4", "D4", "A3", "D4", "Fs4", "G4", "A4", "B4",
      "Cs5", "A4", "Fs4", "D4", "G4", "E4", "Fs4", "G4",
      "A4", "Fs4", "D4", "B3", "G4", "E4", "Cs4", "A3",
      "B3", "D4", "Cs4", "E4", "Fs4", "A4", "Cs5", "Fs4",
    ],
    bass: [
      "D2", "D3", "D2", "D3", "D2", "D3", "Fs3", "G3",
      "A2", "A3", "A2", "A3", "G2", "G3", "A2", "A3",
      "B2", "B3", "B2", "B3", "A2", "A3", "A2", "A3",
      "G2", "G3", "A2", "A3", "D2", "A2", "D3", "D2",
    ],
  },
];

export function createChiptune8BitAudio() {
  let muted = true;
  let ctx = null;
  let timer = null;
  let trackIndex = 0;
  let step = 0;
  let noiseBuffer = null;

  const ensureCtx = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) {
        ctx = new Ctor();
        const len = ctx.sampleRate * 0.15;
        noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      }
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playChannelTone = (freq, waveType, peak, durSec) => {
    const ac = ensureCtx();
    if (!ac || muted || !freq || freq <= 0) return;

    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(peak, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + durSec + 0.02);
  };

  const playNoiseHit = (isSnare) => {
    const ac = ensureCtx();
    if (!ac || muted || !noiseBuffer) return;

    const now = ac.currentTime;
    const src = ac.createBufferSource();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();

    src.buffer = noiseBuffer;
    filter.type = isSnare ? "bandpass" : "highpass";
    filter.frequency.setValueAtTime(isSnare ? 1400 : 5200, now);

    const dur = isSnare ? 0.11 : 0.04;
    gain.gain.setValueAtTime(isSnare ? 0.035 : 0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    src.start(now);
    src.stop(now + dur + 0.01);
  };

  const restartSequencer = () => {
    if (timer && typeof window !== "undefined") {
      window.clearInterval(timer);
      timer = null;
    }
    if (muted || typeof window === "undefined") return;

    const track = CHIPTUNE_TRACKS.at(trackIndex);
    const tickStep = () => {
      if (muted) return;
      const t = CHIPTUNE_TRACKS.at(trackIndex);
      const i = step % t.lead.length;
      const stepDur = t.stepMs / 1000;

      // Channel 1: Pulse 1 (Square Lead)
      playChannelTone(NOTE_HZ[t.lead.at(i)], "square", 0.036, stepDur * 0.92);
      // Channel 2: Pulse 2 (Square Harmony)
      playChannelTone(NOTE_HZ[t.harmony.at(i)], "square", 0.022, stepDur * 0.85);
      // Channel 3: Triangle (Bass)
      playChannelTone(NOTE_HZ[t.bass.at(i)], "triangle", 0.055, stepDur * 1.1);
      // Channel 4: Noise (8-Bit Percussion)
      if (i % 4 === 2) playNoiseHit(true);
      else if (i % 2 === 0) playNoiseHit(false);

      step++;
    };

    tickStep();
    timer = window.setInterval(tickStep, track.stepMs);
  };

  return {
    isMuted: () => muted,
    getTrackName: () => CHIPTUNE_TRACKS.at(trackIndex).name,
    setTrack: (idx) => {
      const next = ((idx | 0) + CHIPTUNE_TRACKS.length) % CHIPTUNE_TRACKS.length;
      if (next !== trackIndex) {
        trackIndex = next;
        step = 0;
        if (!muted) restartSequencer();
      }
      return CHIPTUNE_TRACKS.at(trackIndex).name;
    },
    nextTrack: () => {
      trackIndex = (trackIndex + 1) % CHIPTUNE_TRACKS.length;
      step = 0;
      if (!muted) restartSequencer();
      return CHIPTUNE_TRACKS.at(trackIndex).name;
    },
    toggleMute: () => {
      muted = !muted;
      if (!muted) {
        ensureCtx();
        restartSequencer();
      } else if (timer && typeof window !== "undefined") {
        window.clearInterval(timer);
        timer = null;
      }
      return muted;
    },
    playSfx: (kind) => {
      if (muted) return;
      if (kind === "BUMPER") {
        playChannelTone(880, "square", 0.05, 0.09);
        setTimeout(() => playChannelTone(1174.66, "square", 0.04, 0.11), 45);
      } else if (kind === "FLIPPER") {
        playChannelTone(220, "triangle", 0.05, 0.06);
      } else if (kind === "PLUNGER") {
        playChannelTone(329.63, "square", 0.045, 0.14);
      } else if (kind === "ACT_UP") {
        [587.33, 739.99, 880.0, 1174.66].forEach((f, idx) => {
          setTimeout(() => playChannelTone(f, "square", 0.045, 0.22), idx * 75);
        });
      }
    },
  };
}
