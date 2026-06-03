# Voyager Brand & Design Spec

> Voice: a high-end travel notebook. Calm, confident, generous with whitespace.
> The AI is implied, never bragged about.

---

## Content fundamentals

Voyager's voice is **warm, second-person, and travel-aspirational without being florid**. It talks to a single traveller, never a crowd.

- **Pronouns** — direct "you / your". The product rarely says "we"; it just does the thing.
- **Casing** — Title Case for screen titles ("Daily Plan", "Add New Day"). Sentence case for descriptions, button labels longer than two words, and modal copy.
- **Eyebrow labels** — ALL CAPS, wide-tracked, used as status pills above hero titles: `EASY ADVENTURE PLANNING`, `ACTIVE ADVENTURE`, `UPCOMING TRIP`, `PAST MEMORY`, `PLANNING`.
- **Verbs** — short and active. Buttons read as commands: `Share Trip`, `Optimize`, `Maps`, `Change Cover`, `Add New Day`, `View Details`.
- **Status copy** — evocative, not literal:
  - Finished trip → **Memory** (not "Completed")
  - In-progress → **Active** (not "Ongoing")
  - Future → **Upcoming** (not "Scheduled")
  - Unscheduled → **Planning** (not "Draft")
- **Empty / hint copy** — quiet and concrete: "No dates", "No duration", "Untitled place", "Notes". Never apologetic, never marketing.
- **Microcopy density** — extremely low. Cards use pills, icons, one h3 + one snippet line. No paragraphs of explanation.
- **Emoji** — only inside category pickers (🏛️ Attraction, 🍽️ Restaurant, 🏨 Hotel, ✈️ Airport, 🚗 Transport). Never in body copy, headings, button labels, or marketing strings. The brand relies on Font Awesome icons everywhere else.

---

## Visual foundations

### The defining motif: dark glass over an aurora gradient

Every Voyager surface sits on top of a single full-viewport gradient:

```css
background: radial-gradient(circle at top right, #243b55, #141e30);
```

Cards, navbars, modals, and pills are **frosted glass** floating on top: white at 7–14% alpha, blurred 20px, hairline 1px white border at 20% alpha, large soft drop shadow. Light mode inverts the alphas onto a pale blue gradient but keeps the same structure.

**One solid color region per screen** (the app gradient). Everything else is glass or translucent overlay.

### Brand colors (use only via glass tokens)

| Token | Value | Use |
|---|---|---|
| `--brand-sky` | `#9bcbff` | Primary links, active nav, focus rings |
| `--brand-mint` | `#55ddb0` | Active/success accent, "Public" indicator |
| `--brand-coral` | `#ff7e5f` | Memory/past status, danger accent |
| `--brand-amber` | `#f59e0b` | Warning accent |
| `--color-interactive*` | indigo `#4f46e5` | Drag indicators, primary CTA fill |

Colors appear as **chip backgrounds at 12–22% alpha** or as icon-only color hits — never at full saturation on surfaces.

### Typography

- Single family: **Inter Variable** (`var(--font-sans)`), weights 400 / 500 / 600 / 700.
- Body: 14–16 px. Never pure white; use `var(--fg-1)` … `var(--fg-3)` on dark glass.
- Headings: up to `var(--text-3xl)` (30 px) on section titles.
- Eyebrow labels: 11 px, weight 700, letter-spacing ~0.18em, ALL CAPS.
- Tracking-tight (`-0.01em`) on h1; default elsewhere. No serif anywhere.

### Spacing & layout

- 4 px grid (Tailwind defaults). Card paddings are 16 / 20 / 24 px.
- Card content **inset 20–24 px from the rounded edge** so the glass border breathes.
- Place cards stack with 12–16 px vertical gaps inside an agenda.
- Mobile bottom-nav reserves `4.5rem + safe-area-inset-bottom`.

### Corners & elevation

- Cards: `--radius-xl` (16 px) → hero: `--radius-2xl` (24 px) → pills: `--radius-full` → small chips/buttons: `--radius-md` (10–12 px).
- **Shadow rest**: `var(--glass-shadow)` = `0 8px 32px rgba(0,0,0,0.20)`.
- **Shadow hover**: `var(--glass-shadow-hover)` = `0 16px 48px rgba(0,0,0,0.30)` + `translate-y(-4px)`.
- Borders: always 1 px, `var(--glass-border)` or `var(--glass-border-soft)` — never colored, never thick.

### Backgrounds & imagery

- Cover photos at 75% brightness (`filter: brightness(0.82)`) so glass cards sit on top with readable text.
- No illustrations, patterns, or hand-drawn elements. Photography or solid gradient fallbacks only.
- Status badges on cover images: `backdrop-filter: blur()` + solid color at 70% alpha — glass over photo, not flat.

### Animation

- Everything: `var(--transition-base)` = **200–300 ms ease**.
- Hover lifts: `translate-y(-4px)` + shadow growth + 105% image zoom inside cards.
- No bounces, springs, or large animation gestures. Travel-app calm.

### Hover / press / disabled

- **Hover** — lighten glass ~3% alpha, deepen shadow, accent text shifts to `var(--brand-sky)`.
- **Selected** — stronger fill + inner ring. No shrink/scale on press.
- **Disabled** — opacity 0.38, cursor not-allowed.

### Blur usage

`backdrop-filter: blur(var(--glass-blur))` on any element that visibly floats over the app gradient or imagery: navbar, modals, popovers, place-card surface, status badges. Don't blur tiny chips (< 24 px high) — perf cost for no visual gain.

### Layout fixtures

- Top navbar: `position: fixed; top: 12px; left: 16px; right: 16px` — never touches screen edges.
- Mobile bottom nav: same floating, hairline glass treatment.

---

## Iconography

**Font Awesome** (`fas` solid by default) for all UI icons.

- `text-xs` (12 px) inside chips · `text-sm` (14 px) on toolbar icons · `text-base` (16 px) on full-bleed actions.
- Icons inherit `currentColor`. Colored exceptions (use sparingly, via glass tokens or Tailwind):
  - Phone → green; Star → amber; Map link → sky; External link → rose.
- Custom SVGs only when FA has no equivalent. Use `stroke="currentColor"`, `stroke-width="1.5"`.
- **Category icons are emoji** — category picker only. Emoji never in body copy or controls.
- `·` (middle dot) as divider between meta items.
