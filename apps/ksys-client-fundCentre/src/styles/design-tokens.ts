/**
 * Design tokens — Fund Centre
 * Source of truth for runtime styling is `src/index.css` (`:root` CSS variables).
 * Use this file for TypeScript references (charts, etc.). Customize per client.
 */

/** Mirrors `--header-bg`, `--primary`, etc. in index.css */
export const colors = {
	brand: {
		navy: '#0E294B',
		blue: '#1A6DBC',
		white: '#FFFFFF',
	},
	text: {
		primary: '#333333',
		body: '#333333',
		onHeader: '#FFFFFF',
		muted: '#737373',
	},
	surface: {
		/** Matches `index.css` `--background` (app shell, materials hero under image). */
		page: '#FFFFFF',
		/** Matches `--table-header-bg` (column header row only). */
		tableHeader: '#F0F0F0',
		/** Matches `--border-row`. */
		rowBorder: '#EEF0F0',
		tabBorder: '#e0e0e0',
	},
	tab: {
		activeBg: '#1A6DBC',
		activeText: '#FFFFFF',
		inactiveText: '#333333',
		activeUnderline: '#1A6DBC',
	},
	semantic: {
		success: '#10b981',
		warning: '#f59e0b',
		error: '#ef4444',
	},
} as const;

export const spacing = {
	xs: '4px',
	sm: '8px',
	md: '16px',
	lg: '24px',
	xl: '32px',
	'2xl': '48px',
	'3xl': '64px',
} as const;

export const typography = {
	fontFamily: {
		sans: "'Roboto', system-ui, Arial, Helvetica, sans-serif",
		condensed: "'Roboto Condensed', 'Roboto', system-ui, Arial, Helvetica, sans-serif",
	},
	fontSize: {
		xs: '0.75rem',
		sm: '0.875rem',
		base: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
	},
	fontWeight: {
		normal: 400,
		medium: 500,
		/** Primary fund/share class name in tables; mirrors `index.css` `--table-name-font-weight`. */
		semibold: 600,
		bold: 700,
	},
	lineHeight: {
		tight: 1.25,
		normal: 1.5,
		relaxed: 1.75,
	},
} as const;

export const breakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
} as const;

export const borderRadius = {
	none: '0',
	sm: '0.125rem',
	md: '0.375rem',
	lg: '0.5rem',
	xl: '0.75rem',
	full: '9999px',
} as const;

export const shadows = {
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
	xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
} as const;

export const zIndex = {
	base: 0,
	dropdown: 1000,
	sticky: 1020,
	fixed: 1030,
	modal: 1040,
	popover: 1050,
	tooltip: 1060,
} as const;

/** Fund Center main uses full width of the host; optional cap for one-off layouts */
export const layout = {
	contentMaxPx: 1200,
} as const;
