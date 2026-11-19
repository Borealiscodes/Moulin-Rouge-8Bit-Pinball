# 🎪 Case Study in Campy AI-Assisted Creative Coding: *Moulin Rouge!* as a 4-Act 8-Bit Pinball Machine

**Companion Case Study for:** `Moulin-Rouge-8Bit-Pinball v1.0.0`  
**Author:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland)  
**Date:** November 19, 2026  
**Scope:** AI-Assisted Game Prototyping • Pinball Collision Geometry Edge Cases • Raw WebAudio Square-Wave Acoustics • APA References  

---

## Authorial & AI-Collaboration Positionality

This repository is preserved intentionally—unpatched and unabashedly campy—as a documented artifact of human–AI creative coding. Conceived immediately after building a zero-dependency *Elite Dangerous*–style space simulator (`UEUE-Outer-Rim-Elite`), this project tested what happens when an LLM is prompted to reimagine the bohemian melodrama of 1899 Montmartre (*Moulin Rouge!*) as a four-act, living-canvas 8-bit pinball machine in a single deterministic `Q16.16` pass. Both the code and prose were generated with AI assistance and verified via deterministic unit tests (`node --test`: 3/3 passing).

---

## 1. Anatomy of an AI Prototyping Artifact: Three Lessons from the Table

Rather than sanding away its quirks, `Moulin-Rouge-8Bit-Pinball` serves as an instructive case study in three classic failure-and-delight modes of rapid procedural game synthesis:

### 1.1 The "Immortal Flipper" Geometry Paradox (`8 px` Gap vs. `20 px` Ball)
In `src/pinball-kernel.js`, the Left and Right flippers are parameterized in `Q16.16` table coordinates (`460 × 560 px`) as:
* **Left Flipper:** Pivot at $x_L = 138\text{ px}$, length $L = 68\text{ px} \implies x_{\text{tip},L} = 138 + 68 = 206\text{ px}$.
* **Right Flipper:** Pivot at $x_R = 282\text{ px}$, length $L = 68\text{ px} \implies x_{\text{tip},R} = 282 - 68 = 214\text{ px}$.

This leaves an inter-flipper gap of $\Delta x_{\text{gap}} = 214 - 206 = 8\text{ px}$. However, the silver pinball has radius $r = 10\text{ px}$ (diameter $D = 20\text{ px}$). Because $D > \Delta x_{\text{gap}}$, the ball's capsule-collision tests against both flippers overlap whenever the ball approaches center drain—effectively turning the flippers into a continuous golden trampoline! In commercial pinball design (e.g., Williams/Bally tables), $\Delta x_{\text{gap}}$ is deliberately sized to $1.15\,D$–$1.35\,D$ so player timing determines survival.

### 1.2 The Psychoacoustics of Unfiltered WebAudio `square` Oscillators
To emulate a 4-channel NES/GameBoy sound chip (`Pulse 1`, `Pulse 2`, `Triangle`, `Noise`) without external audio samples, `src/chiptune-8bit-audio.js` routes WebAudio `OscillatorNode` instances with `type = "square"` directly into `GainNode` $\to$ `AudioDestinationNode` with **no low-pass filter (`BiquadFilterNode`)**.

By Fourier series expansion, an ideal mathematical square wave of fundamental frequency $f_0$ contains every odd harmonic with amplitude $1/k$:

$$x_{\text{square}}(t) = \frac{4}{\pi} \sum_{k=1,3,5,\dots}^{\infty} \frac{1}{k} \sin(2\pi k f_0 t)$$

When `Pulse 1` plays upper-octave cabaret fanfares ($f_0 \in [587\text{ Hz}, 1175\text{ Hz}]$), odd harmonics ($3f_0, 5f_0, 7f_0$) land directly inside the human auditory canal's peak resonance band ($2\text{ kHz}$–$5\text{ kHz}$). Authentic 8-bit hardware softened this via analog RC output filters on the console motherboard; omitting that filter produces the unmistakable, piercing, "migraine-inducing" chiptune campiness preserved here!

### 1.3 Theatrical Camp as Ludic Progression (`Act I → Act IV`)
By binding narrative act transitions (`1,500 → 4,000 → 7,500 → 10,000 pts`) simultaneously to playfield velvet color shifts, spotlight sweep geometry, confetti emitters, and four distinct 8-bit cabaret tracks (*Montmartre Can-Can Gallop*, *Elephant Serenade*, *Tango de Montmartre*, and *Spectacular Finale Overture*), the prototype demonstrates how tightly coupled `Ledger 1` state triggers can turn minimal geometric primitives into high-camp theatrical storytelling.

---

## 2. References (APA 7th Edition)

* Collins, K. (2008). *Game sound: An introduction to the history, theory, and practice of video game music and sound design*. MIT Press.
* Luhrmann, B. (Director). (2001). *Moulin Rouge!* [Film]. 20th Century Fox.
* Offenbach, J. (1858). *Orphée aux enfers* [Operetta, Act II "Galop infernal"]. Théâtre des Bouffes-Parisiens.
* Roads, C. (1996). *The computer music tutorial*. MIT Press.
* Smith, J. O., III. (2011). *Spectral audio signal processing*. W3K Publishing. https://stanford.edu
