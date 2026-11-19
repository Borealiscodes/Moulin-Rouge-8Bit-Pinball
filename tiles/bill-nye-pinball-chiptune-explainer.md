# 🟧 Bill Nye Tile: Moulin Rouge 8-Bit Pinball (Why Square Waves Buzz & Why Flipper Gaps Matter!)

**Altitude:** `A7` (Public-Facing Clarity Layer • Zero Jargon • Non-Activating)  
**Companion Runtime:** `Moulin-Rouge-8Bit-Pinball v1.0.0` (`Q16.16` • `3/3` Tests Passing)  
**Companion Case Study:** [`docs/cabaret-pinball-and-chiptune-guide.md`](../docs/cabaret-pinball-and-chiptune-guide.md)  
**Maintainer:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` · County Dublin, Ireland)  

---

## ⭐ Bill Nye Says…

> “Kids!  
> 
> Ever wonder why classic 8-bit video game music sounds so **buzzy, bright, and intense** compared to a smooth wooden flute?!  
> 
> A flute makes a smooth **sine wave**—just one pure musical frequency! An 8-bit sound chip makes a **square wave** that snaps sharply from `+1` to `-1` hundreds of times per second. That sharp corner packs dozens of high-pitched **odd harmonics** into every single note—and when you play high notes without a filter, it's pure 1988 chiptune camp! Plus, check out the geometry of those flippers: when two flippers leave only an `8-pixel` gap for a `20-pixel` silver ball, **gravity meets an unstoppable velvet trampoline!**”

---

## 🎪 Part 1: Three Cool Physics & Audio Secrets in This Campy Tribute

1. **The `8 px` vs. `20 px` Flipper Geometry Lesson:**  
   In real pinball machines, the gap between the tips of the Left and Right flippers has to be slightly *wider* than the ball (`> 20 px`) so the ball can drain if you mistime your flip. Here, the tips stop at `x = 206` and `x = 214`—leaving an `8 px` gap for a `20 px` ball! That happy prototyping accident makes every ball a heroic survival rally.
2. **4-Channel 8-Bit Sound Chip Emulation (`chiptune-8bit-audio.js`):**  
   * **Pulse 1 & Pulse 2 (`square` waves):** Carry the *Can-Can* gallop, *Elephant Serenade*, and *Tango* melodies using bright odd harmonics.
   * **Triangle (`triangle` wave):** Smooth triangular ramps with much softer overtones—perfect for punchy 8-bit octave basslines.
   * **Noise (`AudioBuffer` white noise):** Filtered bursts of random static that mimic 8-bit snare drums and hi-hats!
3. **Why Real Consoles Added Low-Pass Filters:**  
   On real 1980s game consoles, a tiny resistor-capacitor circuit on the TV audio output rolled off frequencies above `4,000 Hz`. Leaving that filter out in WebAudio shows you what raw mathematical square waves actually sound like!

---

## 🧭 Provenance & Non-Activation Footer

* **Status:** Verified Educational Case-Study Tile (`v1.0.0` Campy 8-Bit Cabaret Pinball Tribute • `3/3` Tests Passing)  
* **Non-Activation Clause:** Descriptive educational tile only; strictly non-activating.  
* **Signed-off-by:** `Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
