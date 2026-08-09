/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SHARED_CSS_URL: string;
	readonly VITE_EMBED_BASE_URL: string;
	readonly VITE_KURTOSYS_API_URL: string;
	readonly VITE_KURTOSYS_API_TOKEN: string;
	readonly VITE_FUNDPRESS_API_URL: string;
	readonly VITE_SAVED_SEARCH_TOKEN: string;
	readonly VITE_CONTAINER_ID: string;
	readonly VITE_HOST_MODE: string;
	readonly VITE_GUID_PAGE_HEADER: string;
	readonly VITE_GUID_OVERVIEW: string;
	readonly VITE_GUID_PERFORMANCE: string;
	readonly VITE_GUID_PORTFOLIO_BREAKDOWN: string;
	readonly VITE_GUID_LITERATURE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
