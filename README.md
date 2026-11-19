> ### 🏗️ UNDER CONSTRUCTION — MOULIN ROUGE–INSPIRED 4-ACT LIVING CANVAS PINBALL & 8-BIT CHIPTUNE STUDIO (PRE-ALPHA)
> **Status:** Active Architectural Scaffolding & 4-Channel 8-Bit WebAudio Prototyping • Zero-Float `Q16.16` • Zero Dependencies  
> 
> **Project Scope:** A dramatic, *Moulin Rouge!*–inspired 4-Act living-canvas pinball adventure combining deterministic `Q16.16` flipper and bumper physics (`Ledger 1`), a responsive Parisian Montmartre cabaret table with spinning Red Windmill blades and sweeping spotlights, and an original **4-channel 8-bit chiptune WebAudio engine** (`Ledger 2`) featuring four distinct cabaret compositions (*Can-Can Gallop*, *Elephant Serenade*, *Tango de Montmartre*, and *Spectacular Finale Overture*).

# 🎪 Moulin Rouge 8-Bit Pinball — Dramatic 4-Act Cabaret Pinball & Chiptune Remix Studio

**An interactive, zero-dependency living-canvas pinball game reimagining the bohemian drama of 1899 Montmartre through `Q16.16` arcade physics and a custom 4-channel NES-style 8-bit chiptune synthesizer—complete with a 4-Act theatrical narrative arc, responsive Left/Right flippers, spinning Red Windmill bumpers, and four original 8-bit cabaret tracks.**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: Pre-Alpha Scaffolding](https://shields.io)](#-build-roadmap-v01--v10)
[![Audio: 4-Channel 8-Bit Chiptune](https://shields.io)](#-4-channel-8-bit-chiptune-soundtrack-ledger-2)
[![Math: Q16.16 Pinball Physics](https://shields.io)](#-the-4-act-cabaret-narrative--living-pinball-table)

---

## 🎭 The 4-Act Cabaret Narrative & Living Pinball Table

Each Act advances the bohemian love-and-rivalry story on the Playbill HUD, transforms the lighting and targets on the living velvet pinball table, and switches the 8-bit synthesizer into a new musical movement:

| Act & Theatrical Scene | Living Canvas Table Feature | Gameplay Objective & Scoring | 8-Bit Chiptune Track (`Ledger 2`) |
| :--- | :--- | :--- | :--- |
| **Act I: Welcome to the Moulin Rouge**<br>*(Montmartre Opening Night)* | **The Spinning Red Windmill & Chandelier Bumpers:** Gold-trimmed crimson windmill blades rotate above the upper playfield. | Launch the silver ball (`Plunger`) and strike the windmill bumpers to reach **`1,500 pts`** and raise the stage curtain. | **Track 1 — *Montmartre Can-Can Gallop* (`148 BPM`):** High-energy staccato `Pulse 1` gallop inspired by Offenbach's *Galop Infernal*. |
| **Act II: The Elephant Boudoir**<br>*(Secret Rooftop Rendezvous)* | **The Velvet Elephant Dome & Starlight Orbit:** Sapphire moonlight beams sweep across the upper-left boudoir bumper. | Bank shots off the Elephant Dome and rooftop orbit bumpers to reach **`4,000 pts`**. | **Track 2 — *Elephant Serenade* (`96 BPM`):** Singing `Pulse 1` romantic ballad lead over arpeggiated `Pulse 2` harp chords. |
| **Act III: Crimson Cabaret Tango**<br>*(The Jealous Patron's Ultimatum)* | **Backstage Rivalry Spotlights:** High-voltage crimson and violet spotlight cones cross the table as bumper rebounds accelerate. | Rally past the patron's gauntlet to reach **`7,500 pts`**. | **Track 3 — *Tango de Montmartre* (`124 BPM`):** Dramatic minor-key habanera `Triangle` bassline (`D – A – B♭ – A`) with sharp syncopated `Pulse 2` tango stabs. |
| **Act IV: The Show Must Go On**<br>*(Spectacular Curtain Call)* | **Grand Finale Jackpot Cascade:** All bumpers award **`2×` Spectacular points** as golden confetti and warm spotlight arcs fill the stage. | Complete the curtain call (`10,000+ pts`) and generate a deterministic **`SHA-256` Playbill Receipt**. | **Track 4 — *Spectacular Finale Overture* (`156 BPM`):** Triumphant 4-channel chiptune fanfare uniting the *Can-Can* gallop with full counterpoint! |

---

## 🎹 4-Channel 8-Bit Chiptune Architecture (`Ledger 2`)

Rather than playing static audio loops or single-note drones, `chiptune-8bit-audio.js` emulates a classic **4-channel 8-bit console sound chip** in pure WebAudio API:
1. **`Pulse 1` (Lead Melody Channel):** Crisp square/pulse wave (`25%` / `50%` duty cycle timbre) carrying the main cabaret melodies and fanfares.
2. **`Pulse 2` (Harmony & Counter-Melody Channel):** Plays syncopated tango chords, arpeggiated harp figures, and fifth-harmony echoes.
3. **`Triangle` (Bass Channel):** Deep, punchy octave-jumping basslines driving the *Can-Can* gallop and *Tango* habanera rhythm.
4. **`Noise` (Percussion Channel):** Filtered white-noise bursts sculpted into crisp 8-bit hi-hats and snare hits.

*(Mute-by-default on page load; includes a manual **Track Switcher** so players can audition any of the four 8-bit remixes on demand.)*

---

## 📁 Repository Scaffolding

```text
Moulin-Rouge-8Bit-Pinball/
├── index.html                                    # Velvet cabaret pinball cabinet, Act I-IV playbill HUD & touch flippers
├── style.css                                     # Moulin Rouge crimson, gold-leaf & Parisian twilight styling
├── package.json                                  # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                                       # MIT License
├── README.md                                     # 4-Act narrative arc, 8-bit chiptune architecture & scaffolding
├── docs/
│   └── cabaret-pinball-and-chiptune-guide.md     # Guide to 4-channel 8-bit WebAudio synthesis & Q16.16 pinball physics
├── tiles/
│   └── bill-nye-pinball-chiptune-explainer.md    # Altitude A7 plain-language explainer of chiptune waves & pinball math
├── src/
│   ├── core.js                                   # Zero-float Q16.16 fixed-point math & synchronous SHA-256 Playbill receipt
│   ├── cabaret-acts-data.js                      # 4 Narrative Acts, bumper layouts, score thresholds & track metadata
│   ├── pinball-kernel.js                         # Q16.16 gravity, flipper angular impulses, bumper collisions & Act logic
│   ├── chiptune-8bit-audio.js                    # 4-Channel 8-Bit WebAudio synth (2x Pulse, Triangle, Noise + 4 Tracks)
│   ├── cabaret-renderer.js                       # Living canvas pinball table (spinning Red Windmill, Elephant, spotlights)
│   └── pinball-app.js                            # 60 Hz physics loop, Left/Right flipper touch & keyboard controls
└── test/
    └── pinball-kernel.test.mjs                   # Built-in `node --test` suite verifying gravity, flippers & Act progression
```

---

## 🛠️ Build Roadmap (`v0.1` → `v1.0`)

* **`v0.1` (`Q16.16` Pinball Physics & Flipper Kernel):** Implement gravity, sloped table rails, Left/Right flipper impulses, circular bumper rebounds, and ball drain/launch (`Ledger 1`).
* **`v0.2` (4-Channel 8-Bit Chiptune Synthesizer):** Build the multi-channel WebAudio tracker with 4 distinct cabaret tracks (*Can-Can Gallop*, *Elephant Serenade*, *Tango de Montmartre*, *Spectacular Finale*) (`Ledger 2`).
* **`v0.3` (Living Canvas Cabaret Table & 4-Act Progression):** Render the spinning Red Windmill, Elephant Dome, sweeping spotlights, and Act I–IV story transitions (`Ledger 2`).
* **`v1.0` (Playbill Receipts, Docs & Full Verification):** Add `SHA-256` Playbill receipts, chiptune/physics guides, and `node --test` verification.

---

## 🤝 Provenance & License

* **Architectural Lineage:** Built with AI assistance in County Dublin, Ireland, on the deterministic `Q16.16` substrate and strict `Ledger 1` / `Ledger 2` separation from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`.
