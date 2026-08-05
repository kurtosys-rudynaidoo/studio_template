/// <reference types="vite/client" />

declare module '@bp/shared-styles';

interface ImportMetaEnv {
	readonly VITE_SHARED_CSS_URL: string;
	readonly VITE_EMBED_BASE_URL: string;
	readonly VITE_KURTOSYS_API_URL: string;
	readonly VITE_KURTOSYS_API_TOKEN: string;
	readonly VITE_FUND_API_URL: string;
	readonly VITE_SAVED_SEARCH_TOKEN: string;
	readonly VITE_CONTAINER_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
