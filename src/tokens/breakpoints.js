/**
 * Canonical breakpoint scale — keep in sync with breakpoints.css @custom-media.
 * Used by Tailwind (frontend) and documented in tokens.css.
 */

/** @type {const} */
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Semantic breakpoints for layout patterns (marketing grids, forms, etc.).
 * Prefer standard xs–2xl when possible; use these only when the UI needs them.
 */
export const breakpointSemantics = {
  /** Hero / two-column marketing or create flows → single column */
  heroStack: 900,
  /** Three-column feature grids → single column */
  stepsStack: 800,
  /** Narrow modal forms (category segments, form grids) */
  formNarrow: 520,
}

/** @param {number} px min-width value */
export function minWidth(px) {
  return `${px}px`
}

/** @param {number} px min-width value — use for max-width media (value - 1) */
export function maxWidth(px) {
  return `${px - 1}px`
}

/** Tailwind `theme.screens` map */
export const tailwindScreens = {
  xs: minWidth(breakpoints.xs),
  sm: minWidth(breakpoints.sm),
  md: minWidth(breakpoints.md),
  lg: minWidth(breakpoints.lg),
  xl: minWidth(breakpoints.xl),
  '2xl': minWidth(breakpoints['2xl']),
}
