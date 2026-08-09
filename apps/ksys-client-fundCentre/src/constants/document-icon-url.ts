/** Bundled asset URL — survives cross-origin embed (WordPress) unlike page-relative paths. */
import documentIconUrl from '@/assets/icons/pdf-icon.png';

/** PNG is 46×60 — use for `<img width>` / `<img height>` to avoid distortion. */
export function documentIconDisplaySize(widthPx: number): { width: number; height: number } {
	return { width: widthPx, height: Math.round((widthPx * 60) / 46) };
}

export { documentIconUrl };
