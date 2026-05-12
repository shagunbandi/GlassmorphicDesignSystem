---
name: glass-ui
description: >-
  Use when implementing or extending the @glass/ui Vue 3 glassmorphic design system (GlassmorphicDesign):
  components, tokens, Vite library build, or Voyager-branded UIs that consume this package. For full brand
  voice, motion, and icon rules, combine with voyager-handoff/design-system/project README.
user-invocable: true
---

## First actions

1. Read **`README.md`** in this directory (install, exports, dev scripts, contributor conventions).
2. For **brand, content, and visual law** (gradients, glass, typography, status labels, Font Awesome vs emoji), read **`voyager-handoff/design-system/project/README.md`** in the parent Voyager repo (path from this folder: `../voyager-handoff/design-system/project/README.md`).
3. Open **`src/tokens/tokens.css`** for the canonical CSS variable names used across components.
4. Before adding a component, inspect an existing one in the same category under **`src/components/`** and mirror its structure and styling approach.

## Hard rules (align with Voyager handoff)

- **Inter only** for type; no display serifs.
- **One** full-screen gradient background; floating UI uses glass tokens (`--glass-*`, `--glass-blur`, `--glass-shadow*`).
- **Font Awesome** for UI icons; **emoji only** in category-picker style contexts, not in generic body or buttons.
- **Accent colors** — use existing tokens: brand sky, mint, coral, interactive indigo, semantic success/warning/danger — do not invent new brand hues.
- **Status vocabulary** — Planning, Upcoming, Active, Memory — not Draft / Scheduled / Completed.

## Code tasks — checklist

- **New primitive or layout piece**: implement SFC under `src/components/<category>/`, use token variables, export from `src/index.js`, register in `src/plugin.js` as `Gd*`.
- **Changing tokens**: edit `src/tokens/tokens.css` only; grep components for any hardcoded values that should move to variables.
- **Consuming app work**: ensure `import '@glass/ui/style.css'`, Inter, and Font Awesome are loaded; keep `vue` / optional peers satisfied.

## When the user gives no other context

Ask briefly: target surface (marketing vs plan vs settings), dark vs light default, and whether they need **library changes** here or **app integration** only — then read the relevant files above before editing.
