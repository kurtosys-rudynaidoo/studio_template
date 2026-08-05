import { VisuallyHidden, FOCUS_RING } from '@/components/a11y/a11y';

import type { WidgetProps } from '@/types/widget.types';

/**
 * Feature root for this embed. Replace with your client UI.
 * Accessibility defaults (WCAG 2.1/2.2-oriented):
 * - semantic landmarks / headings
 * - visible focus styles
 * - text contrast via CSS variables
 * - screen-reader status for loading/empty states
 */
function Widget({ clientCode, culture = 'en-US', productType }: WidgetProps) {
	return (
		<section
			aria-labelledby="studio-widget-heading"
			className="w-full py-6 text-[var(--studio-color-text)]"
			data-widget-root="1"
		>
			<header className="mb-4">
				<h2
					id="studio-widget-heading"
					className="m-0 text-2xl font-bold tracking-tight"
				>
					Studio Widget
				</h2>
				<p className="mt-1 text-sm text-[var(--studio-color-text-muted)]">
					Replace <code className="font-mono">src/components/Widget/Widget.tsx</code> with
					your component. Keep landmarks, labels, and keyboard access.
				</p>
			</header>

			<dl className="grid gap-2 text-sm sm:grid-cols-3">
				<div>
					<dt className="font-semibold text-[var(--studio-color-text-muted)]">Client code</dt>
					<dd className="m-0 font-mono">{clientCode || '—'}</dd>
				</div>
				<div>
					<dt className="font-semibold text-[var(--studio-color-text-muted)]">Culture</dt>
					<dd className="m-0 font-mono">{culture}</dd>
				</div>
				<div>
					<dt className="font-semibold text-[var(--studio-color-text-muted)]">Product type</dt>
					<dd className="m-0 font-mono">{productType || '—'}</dd>
				</div>
			</dl>

			<p className="mt-6">
				<a
					className={`inline-flex items-center gap-2 font-semibold text-[var(--studio-color-focus)] underline underline-offset-2 ${FOCUS_RING}`}
					href="#studio-widget-heading"
				>
					Back to heading
					<VisuallyHidden>(same page)</VisuallyHidden>
				</a>
			</p>
		</section>
	);
}

export default Widget;
