/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_EMBED_BASE_URL: string;
	readonly VITE_KURTOSYS_API_URL: string;
	readonly VITE_KURTOSYS_API_TOKEN: string;
	/** Default `data-fundlist` when embed omits it; becomes `fundList` on searchEntity */
	readonly VITE_EMBED_DEFAULT_FUNDLIST: string;
	/** Fallback Subadvised DXM URL when `data-subadvised-landing-url` is empty */
	readonly VITE_SUBADVISED_LANDING_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
