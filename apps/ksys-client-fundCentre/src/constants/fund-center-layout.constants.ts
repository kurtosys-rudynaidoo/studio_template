/**
 * When the Fund Center module panel (embed content area) is narrower than this,
 * Overview / Performance / Materials use card layout instead of wide tables.
 * Container width — not viewport — so Elementor columns and laptop windows are handled correctly.
 */
export const FUND_CENTER_COMPACT_LAYOUT_MAX_WIDTH = 1100;

/**
 * Mutual Funds → Materials: card layout below this panel width (table at 1360px+).
 * Measured on `#fund-center-module-panel`, not the browser viewport.
 */
export const FUND_CENTER_MATERIALS_COMPACT_LAYOUT_MAX_WIDTH = 1360;
