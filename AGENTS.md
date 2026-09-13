## Learned User Preferences

- Apply the web-interface-guidelines skill when building or reviewing web UI, and better-animation for motion.
- When implementing portfolio UI from Figma, also use the user's design skills so layout, type, and motion stay coherent with those guidelines.
- Prefer a fixed progress bar at the very top of the viewport: one continuous line that fills as the user scrolls the page.
- When applying later Figma UI updates, leave the progress bar and existing animations unchanged unless asked.
- Do not add extra bounding boxes or white frames/mattes behind slide images or text.
- Opening/load motion should reuse the existing zoom-out/camera easing; intro card content fades in from lower opacity on load.
- Prefer snappy Motion spring transitions site-wide (motion.dev snap: stiffness 1218, damping 70).
- Page navigation: outgoing opacity drops in ~100ms; return-home collapses only the top bar into the chevron then flips up (~340ms); About content fades up and in on open.
- On scroll, non-first middle cards zoom to ~1.2x with a brief random ±1% tilt that clears when scrolled off; do not zoom the first card.
- Homepage cards and page canvas use cream `#faf9f7` with accent orange `#fc671e` and no drop shadow; keep paper texture under content so orange lettering isn’t muted; contact card has no paper or grain.
- Linked text uses a left-to-right animated underline sized proportionally to the text, using the site’s existing motion principles.
- Keep the background grid visible when the camera zooms out—it should expand/fill rather than scale away with the cards.

## Learned Workspace Facts

- The cell-form mosaic editor lives at `/Users/nicocampanell/Documents/cell-form/index.html`, outside this Portfolio folder; the interactive embed can be saved here as `cell-form.html`.
- For portfolio use, bake editor slider presets with Download embed (one-file HTML, mouse follow), not GLB.
- Ponytail, Agent Reach, and web-interface-guidelines are installed in user-level Cursor config (`~/.cursor`), not in this repo.
- For X, Reddit, and Instagram, OpenCLI is the Chrome-backed backend; Agent Reach routes to it rather than replacing it.
- When coding always use the skill ponytail to create cleaner code
- Always use load the headroom skill before giving an output for a message
- Portfolio UI source of truth is the Figma file `https://www.figma.com/design/SxkKQcl2zPsA8XGO87J1Jv/Portfolio`.
- The portfolio is a Next.js 16 app and uses Lenis for smooth scrolling on all vertical pages.
