# 09 — Art direction update: soft 3D "nursery" look, 5–10 min episodes

Reference feel: Cocomelon-style stylised 3D (round heads, big friendly eyes, clean bright colour, simple sets),
**without** its fast cuts, flashing and sensory overload. Original characters only; never copy another show's
characters, logos or distinctive designs (copyright/trademark + YouTube reuse/"inauthentic" risk).

## Look
Rounded low-poly-smooth characters, soft clay/felt materials, warm key light + gentle fill, soft shadows,
pastel-to-mid saturation (no neon), shallow depth of field, tidy simple sets (hut, banyan tree, river, kitchen).

## Pipeline (Blender, open source)
1. Model each character once (Blender, GPL; github.com/blender/blender), rig with Rigify, add face shape keys
   (blink, 6–8 mouth shapes) → lip-sync from Rhubarb timings.
2. Build a reusable **set kit** (6–8 sets) and **animation library** (walk, sit, eat, wave, nod, share, hug, breathe).
3. Per episode: assemble ~35–50 shots (≈6 cuts/min × 5–10 min), long holds, slow camera drift.
4. Render EEVEE (real-time engine) at 1080p/24fps; composite audio, captions, end card with ffmpeg/Remotion.
5. Optional: [ahujasid/mcp-for-blender](https://github.com/ahujasid/mcp-for-blender) (MIT, 36k★) lets Claude drive Blender
   to assemble scenes from scripts. Verified to exist; not tested by me.

## Length
5–10 min per episode: Seedlings 5, Sprouts 6–7, Saplings 8–9, Young Trees 9–10. Longer than Cocomelon-style 3-min
songs, so structure as 3 calm chapters with a silent pause between each.

## Honest constraints
- 3D is the most expensive option. Upfront: ~3–5 weeks to build 2–3 characters + sets. Per episode after that:
  roughly 1–2 days of assembly/render until the library is rich. **Daily uploads are not realistic at first**;
  plan 2–3/week at launch, daily only after the library + 10-episode buffer exist.
- Rendering needs a GPU machine (this cloud container has none, and no Blender installed). Use your PC,
  a rented cloud GPU, or Blender's CPU render for light scenes.
- A cheaper bridge: render each character pose set once and animate as 2.5D in Remotion (see doc 04). Look is
  close, cost far lower.
