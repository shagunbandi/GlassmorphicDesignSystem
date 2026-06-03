---
name: glass-ui
description: >-
  Use when implementing or extending the @glass/ui Vue 3 glassmorphic design system
  (GlassmorphicDesign): components, tokens, Vite library build, or apps that consume
  this package. Enforces token-only colors and sizes in every component.
user-invocable: true
---

## First actions

1. Read **`README.md`** in this directory (install, exports, dev scripts, contributor conventions).
2. Open **`src/tokens/tokens.css`** — single source of truth for colors, type scale, spacing, radii, motion, and glass surfaces.
3. Skim companion token sheets if the task touches them:
   - **`src/tokens/breakpoints.css`** — responsive `@media` custom properties
   - **`src/tokens/layout.css`** — page shell, stacks, search bar layout
4. Before adding or editing a component, inspect an existing one in the same category under **`src/components/`** and mirror its structure.

---

## Hard rules — NEVER break these

### No `:deep()` in components

Every component owns its own styles. Never use `:deep()` to reach into a child component's elements.
- If a parent needs to influence a child's look, the **child** must expose a prop, CSS custom property, or variant class for that purpose — the style rule belongs in the child's `<style scoped>` block.
- The **only** permitted use of `:deep()` is when wrapping a third-party library whose DOM structure you cannot control (e.g. Quill editor internals).

### Tokens only — no hardcoded values

Every color, blur, spacing, radius, font-size, and transition in component `<style>` blocks must reference a CSS variable from `tokens.css`. No raw `#hex`, `rgba()`, `px` literals, or `rem` fractions in SFCs.

| Need | Token |
|------|-------|
| Text | `--fg-1` … `--fg-5` |
| Glass surfaces | `--glass-thin`, `--glass-soft`, `--glass-default`, `--glass-strong` |
| Glass borders | `--glass-border`, `--glass-border-soft`, `--glass-border-hairline` |
| Glass blur | `--glass-blur`, `--glass-blur-sm` (8px), `--glass-blur-md` (12px), `--glass-blur-lg` (18px) |
| Shadows | `--glass-shadow`, `--glass-shadow-hover` |
| Brand accents | `--brand-sky`, `--brand-mint`, `--brand-coral` |
| Interactive / CTA | `--color-interactive*` |
| Semantic states | `--color-success*`, `--color-warning*`, `--color-danger*` |
| Checkbox / fill | `--color-interactive-fill`, `--color-interactive-fill-border` |
| Badges / chips | `--badge-{hue}-bg/fg/solid-*` |
| Spacing (padding, margin, gap) | `--space-1` (4px) … `--space-12` (48px) |
| Font sizes | `--text-eyebrow`, `--text-2xs`, `--text-xs` … `--text-4xl` |
| Border radius | `--radius-xs` … `--radius-3xl`, `--radius-full` |
| Motion | `--transition-fast`, `--transition-base`, `--transition-slow`, `--ease-out-soft` |
| Focus | `--focus-ring-color`, `--focus-ring-shadow` |
| Overlays | `--loading-bg`, `--popover-bg`, `--modal-shadow` |

If a value repeats across components and no token exists, **add it to `tokens.css` first** (both dark and light blocks), then use the variable everywhere.

### No app-specific references

This is a **generic, reusable** library. Zero mentions of any product name, brand, domain, or application inside components or tokens.
- No domain-specific tokens (e.g. `--cat-trip`, no `place-card`, no `agenda-*`). Domain tokens belong in the consuming app.
- No hardcoded product strings in templates. Any copy must be a prop or slot default.

### No standalone CSS files for components

Component styles live **inside the `.vue` file** only.
- Use `<style scoped>` by default.
- Use bare `<style>` (global) only when a Teleport target or `:root.mode` override genuinely requires it — and only with well-namespaced BEM class names (`gd-*`).
- The only CSS files permitted under `src/tokens/` are: `tokens.css`, `breakpoints.css`, `layout.css`. Never create new per-component `.css` files there.

### Typography & icons

- **Inter only** (`var(--font-sans)`). No display serifs.
- **Font Awesome** (`fa-solid fa-*`) for all UI icons. Emoji only in category-picker contexts, never in generic controls.
- One full-screen gradient background (`--color-app-bg`). Floating layers use glass tokens.

### Accent colors — existing palette only

Use existing tokens: sky, mint, coral, interactive indigo, semantic success/warning/danger. Do not introduce new brand hex values; extend `tokens.css` instead.

---

## Component `size` prop convention

Interactive and layout components expose a **`size`** prop mapped to token-backed CSS via BEM modifiers or `data-size`. Never map size to magic pixel values in the template.

**Controls** (Button, Input, Badge, form fields): `2xs | xs | sm | md | lg | xl | icon | icon-sm`
**Containers** (Modal, Card, Popover): `sm | md | lg | xl | 2xl | 3xl`
**Navigation** (TabBar): `xs | sm | md | lg`
**Layout** (PageShell): `default | narrow | full`

Reference implementations: **`Button.vue`**, **`Modal.vue`**, **`TabBar.vue`**.

---

## Code tasks — checklist

### New component

- [ ] SFC under `src/components/<category>/`; root class `gd-<name>` with BEM modifiers
- [ ] `size` prop with validator + token-mapped CSS (if component has dimensional variants)
- [ ] All colors via `var(--…)`; all spacing/type/radii via tokens
- [ ] No `:deep()` except for third-party wrappers
- [ ] Focus, disabled, and `aria-*` states consistent with `Button` / `Modal`
- [ ] Export from `src/index.js`; register in `src/plugin.js` as `GdPascalCase`

### Edit existing component

- [ ] No new hardcoded colors or pixel literals introduced
- [ ] Any changed dimensions use `--space-*`, `--text-*`, or `--radius-*`

### Change tokens

- [ ] Edit **`src/tokens/tokens.css`** only (both `:root` dark and `:root.light` blocks)
- [ ] Grep `src/components/` for hardcoded values that should now reference the new variable

### Quick audit

```bash
# Hardcoded colors — should return zero hits in components
rg '#[0-9a-fA-F]{3,8}|rgba?\(' src/components/ --glob '*.vue'

# Raw px literals — each hit should be investigated
rg '\b\d+px\b' src/components/ --glob '*.vue'

# :deep() usage — each hit needs justification
rg ':deep\(' src/components/ --glob '*.vue'
```

### Consuming app

- [ ] `import '@glass/ui/style.css'` in app entry
- [ ] Inter loaded (`@fontsource-variable/inter` or CDN — see `tokens.css` header)
- [ ] Font Awesome available for icon slots
- [ ] `vue` / optional peers satisfied per `README.md`

---

## When the user gives no other context

Ask briefly:
1. **Library change** (new/edit component or token) vs **app integration** only?
2. **Dark vs light** default for the target screen?
3. Which **component category** (`primitives`, `form`, `overlay`, `layout`, `navigation`, `display`, `feedback`, `typography`)?

Then read the files above before editing.
