> ### 🚨 MASSIVE DISCLAIMER: LEARNING EXERCISE, CAMPY AI TIME CAPSULE & MATHEMATICAL SPECIMEN (`v1.0.0`)
> 
> **PLEASE READ BEFORE PLAYING OR LISTENING:**
> 1. **An Educational & Mathematical Specimen, Not a Commercial Game:** This repository is preserved **intentionally unpatched** as a pedagogical learning exercise and computational specimen—documenting what happens when an LLM is prompted (immediately after building an *Elite Dangerous*–style space simulator, [`UEUE-Outer-Rim-Elite`](https://github.com)) to reimagine the bohemian melodrama of 1899 Montmartre (*Moulin Rouge!*) as a 4-Act living-canvas 8-bit pinball machine in a single `Q16.16` pass.
> 2. **Audio Warning — Raw Unfiltered Fourier Square Waves (`2 kHz–5 kHz`):** The 4-channel WebAudio synthesizer routes raw mathematical `square` oscillators directly to output **with zero low-pass filtering**. By Fourier expansion (\(x(t) = \frac{4}{\pi}\sum_{k=1,3,5\dots} \frac{1}{k}\sin(2\pi k f_0 t)\)), odd harmonics land directly in the human ear's peak resonance band—producing an authentic, piercing, *migraine-inducing 1988 bootleg cartridge* aesthetic. **Keep your device volume low before unmuting!**
> 3. **Collision Geometry Specimen — The "Immortal Flipper" Paradox (`8 px` vs. `20 px`):** On this `460 × 560 px` table, the Left Flipper tip stops at `x = 206` and the Right Flipper tip stops at `x = 214`—leaving an **`8 px` gap for a `20 px` silver ball**. Because \(D_{\text{ball}} > \Delta x_{\text{gap}}\), center drains are mathematically impossible, turning the bottom of the cabinet into a continuous velvet trampoline.
> 4. **AI-Assisted Development Disclosure:** Both the code and companion case studies were generated with AI assistance in County Dublin, Ireland, and verified deterministically (`node --test`: **3/3 passing**).

# 🎪 Moulin Rouge 8-Bit Pinball — Dramatic 4-Act Cabaret Pinball & Chiptune Specimen

**An interactive, zero-dependency living-canvas pinball specimen reimagining 1899 Montmartre through deterministic `Q16.16` arcade physics and a raw 4-channel NES-style 8-bit WebAudio synthesizer—complete with a 4-Act theatrical narrative arc, spinning Red Windmill blades, sweeping stage spotlights, and four original 8-bit cabaret tracks.**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: Mathematical & Audio Specimen](https://shields.io)](#-quickstart--verification)
[![Audio: Raw 4-Channel 8-Bit Square Waves](https://shields.io)](#-4-channel-8-bit-chiptune-specimen-ledger-2)
[![Tests: 3/3 Passing](https://shields.io)](#-quickstart--verification)

---

## 📖 Companion Case Study & Explainer Tile

* **Technical & Acoustic Case Study (APA 7th Ed.):** [`docs/cabaret-pinball-and-chiptune-guide.md`](docs/cabaret-pinball-and-chiptune-guide.md) — Formalizes the *"Immortal Flipper" Geometry Paradox* (`8 px` gap vs. `20 px` ball) and the Fourier odd-harmonic spectrum of unfiltered WebAudio `square` waves.
* **Plain-Language Explainer Tile:** [`tiles/bill-nye-pinball-chiptune-explainer.md`](tiles/bill-nye-pinball-chiptune-explainer.md) — Altitude `A7` plain-language breakdown of why square waves buzz and why flipper gaps matter.

---

## 🎭 The 4-Act Cabaret Narrative & Living Pinball Table

| Act & Theatrical Scene | Living Canvas Table Feature | Score Threshold | 8-Bit Chiptune Track (`Ledger 2`) |
| :--- | :--- | :--- | :--- |
| **Act I: Welcome to the Moulin Rouge**<br>*(Montmartre Opening Night)* | **Spinning Red Windmill & Chandelier Bumpers:** Gold-trimmed crimson windmill blades rotate above the upper playfield. | **`1,500 pts`** | **Track 1 — *Montmartre Can-Can Gallop* (`148 BPM`):** Staccato `Pulse 1` gallop inspired by Offenbach's *Galop Infernal*. |
| **Act II: The Elephant Boudoir**<br>*(Secret Rooftop Rendezvous)* | **The Velvet Elephant Dome & Starlight Orbit:** Sapphire moonlight beams sweep across the upper boudoir bumper. | **`4,000 pts`** | **Track 2 — *Elephant Serenade* (`96 BPM`):** Singing `Pulse 1` ballad lead over arpeggiated `Pulse 2` harp chords. |
| **Act III: Crimson Cabaret Tango**<br>*(The Jealous Patron's Ultimatum)* | **Backstage Rivalry Spotlights:** Crimson and violet spotlight cones cross the stage at **`2×` point multiplier**. | **`7,500 pts`** | **Track 3 — *Tango de Montmartre* (`124 BPM`):** Minor-key habanera `Triangle` bassline (`D – A – B♭ – A`) with sharp `Pulse 2` tango stabs. |
| **Act IV: The Show Must Go On**<br>*(Spectacular Curtain Call)* | **Grand Finale Jackpot Cascade:** Golden confetti falls across the velvet stage as **`2×` Spectacular points** rack up toward a `SHA-256` Playbill Receipt. | **`10,000+ pts`** | **Track 4 — *Spectacular Finale Overture* (`156 BPM`):** Triumphant 4-channel chiptune fanfare uniting the *Can-Can* gallop with full counterpoint! |

---

## 📁 Repository Structure

```text
Moulin-Rouge-8Bit-Pinball/
├── index.html                                    # Velvet cabaret pinball cabinet, Act I-IV playbill HUD & touch flippers
├── style.css                                     # Moulin Rouge crimson, gold-leaf & Parisian twilight styling
├── package.json                                  # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                                       # MIT License
├── README.md                                     # Disclaimers, specimen case-study overview, 4-Act arc & quickstart
├── docs/
│   └── cabaret-pinball-and-chiptune-guide.md     # Case study on flipper geometry & unfiltered square-wave acoustics
├── tiles/
│   └── bill-nye-pinball-chiptune-explainer.md    # Altitude A7 plain-language explainer of chiptune waves & pinball math
├── src/
│   ├── core.js                                   # Zero-float Q16.16 fixed-point math & synchronous SHA-256 Playbill receipt
│   ├── cabaret-acts-data.js                      # 4 Narrative Acts, bumper layouts, score thresholds & track metadata
│   ├── pinball-kernel.js                         # Q16.16 gravity, flipper angular impulses, bumper collisions & Act logic
│   ├── chiptune-8bit-audio.js                    # Raw 4-Channel 8-Bit WebAudio synth (2x Pulse, Triangle, Noise + 4 Tracks)
│   ├── cabaret-renderer.js                       # Living canvas pinball table (spinning Red Windmill, Elephant, spotlights)
│   └── pinball-app.js                            # 60 Hz physics loop, Left/Right flipper touch & keyboard controls
└── test/
    └── pinball-kernel.test.mjs                   # Built-in `node --test` suite verifying gravity, flippers & Act progression
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic Q16.16 pinball gravity, bumper & Act progression tests (3/3 passing)
node --test test/pinball-kernel.test.mjs

# 2. Launch locally over IPv4 in browser
python3 -m http.server 8085 --bind 127.0.0.1
```

Open **`http://127.0.0.1:8085`**, turn your volume down before tapping **`Sound: Muted`** to unleash the **raw 4-Channel 8-Bit Chiptune Synthesizer**, fire the plunger (`🚀 PLUNGER` or `Spacebar`), flip with `A` / `D` or the on-screen buttons, and audition all **4 original 8-bit cabaret tracks**.

---

## 🤝 Provenance & License

* **Architectural Lineage:** Built with AI assistance in County Dublin, Ireland, on the deterministic `Q16.16` substrate and strict `Ledger 1` / `Ledger 2` separation from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`.
