# GlassmorphicDesign (`@glass/ui`)

Vue 3 component library that implements the **Voyager-aligned glassmorphic** UI: dark-first surfaces, shared design tokens, and primitives used to build trip-planning style apps.

This package is **production-oriented** (Vite library build, SFCs). For HTML/JSX prototypes, asset specimens, and the full written design spec (voice, motion, icon rules), see the handoff bundle:

**[voyager-handoff/design-system/project/](../voyager-handoff/design-system/project/)** — read `README.md` there for content fundamentals, visual foundations, iconography, and substitutions. This repo’s `src/tokens/tokens.css` is derived from that bundle’s `colors_and_type.css`.

---

## What you get

| Area | Location |
|------|----------|
| Design tokens (CSS variables, dark/light) | `src/tokens/tokens.css` (bundled as `@glass/ui/style.css`) |
| Vue components | `src/components/**` — grouped by `primitives`, `layout`, `navigation`, `overlay`, `feedback`, `form`, `display` |
| Public API | `src/index.js` — named exports + `GlassUI` plugin |
| Local previews | `preview/` — static or Vite pages for visual QA (not published in `npm pack`) |

---

## Install and use in an app

**Peer dependencies** (your app must provide them): `vue` ^3.3, optional `vue-router` ^4, `@vueup/vue-quill` ^1.2 if you use `RichTextEditor`.

1. **Styles and fonts** — In your app entry, import the built stylesheet (after build) or depend on the package export:

   ```js
   import '@glass/ui/style.css'
   ```

   Load **Inter** as noted in the header of `tokens.css` (`@fontsource-variable/inter` or Google Fonts).

2. **Icons** — Components expect **Font Awesome** solid (and occasional regular) classes in markup (e.g. `fa-solid fa-*`). Align with the handoff: [voyager-handoff/design-system/project/README.md](../voyager-handoff/design-system/project/README.md) (Iconography section).

3. **Register components**

   - **Named imports** (tree-shaking friendly):

     ```js
     import { Button, Card, GlassUI } from '@glass/ui'
     ```

   - **Global plugin** — registers `Gd*` components (`GdButton`, `GdCard`, …):

     ```js
     import { GlassUI } from '@glass/ui'
     app.use(GlassUI)
     ```

---

## Develop in this repo

```bash
npm install
npm run build    # writes dist/ (ES + CJS + style.css)
npm run dev      # vite build --watch during library work
```

Library entry: `src/index.js`. Vite config: `vite.config.js` — `vue`, `vue-router`, and `@vueup/vue-quill` are **external**; do not bundle them into `dist/`.

---

## Conventions for contributors and agents

1. **Tokens first** — Prefer `var(--…)` from `tokens.css` for colors, glass, radii, type, and shadows. Do not introduce one-off hex values for brand accents; use the existing palette (sky, mint, coral, interactive indigo, semantic states).

2. **Match existing SFCs** — New components should follow the same patterns as neighbors in the same folder: `<script setup>`, scoped styles with a short `gd-` BEM-style prefix where applicable, props with validators for finite string unions.

3. **Accessibility** — Preserve focus rings, `aria-*`, and disabled states consistent with `Button`, `Modal`, and other primitives.

4. **Exports** — Add the component to `src/index.js` and `src/plugin.js` with a `GdPascalCase` global name that matches the file purpose.

5. **Product copy and brand voice** — When building screens (not the library internals), follow the handoff README: status vocabulary (Planning / Upcoming / Active / Memory), eyebrow casing, emoji only in category pickers, one gradient background per screen, glass for floating layers.

---

## Relationship to Voyager / PlanMyTrip

The visual DNA matches the **Plan / Agenda / Place** surfaces described in the handoff. Domain-specific composites (e.g. `PlaceCard`, `PlanHeader`) may live in the main Voyager app while this package holds **reusable** glass UI pieces. When in doubt about pixels or copy, treat the handoff `README.md` and `preview/` HTML as reference, not as code to paste verbatim into Vue.
