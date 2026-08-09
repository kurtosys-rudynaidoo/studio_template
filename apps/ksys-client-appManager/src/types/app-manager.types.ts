export type ProductType =
	| 'mutualFunds'
	| 'institutionalStrategies'
	| 'longShortInstitutionalStrategies'
	| 'longShortMutualFunds';

export interface AppInputs {
	clientCode: string;
	culture: string;
	productType?: ProductType;
	fundList?: string;
}

export interface ManagedApp {
	id: string;
	name: string;
	containerId: string | ((inputs: AppInputs) => string);
	scriptUrl: string;
	requiredInputs: (keyof AppInputs)[];
}

export interface Section {
	id: string;
	label: string;
	apps: ManagedApp[];
	showInNav: boolean;
	lazy: boolean;
}

export type ScriptLoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface CacheEntry<T = unknown> {
	data: T;
	timestamp: number;
}

export interface DisclaimerQueueItem {
	key: string;
	body: string;
	context: typeof globalThis;
	args: [RequestInfo | URL, RequestInit?];
	resolve: (response: Response) => void;
	reject: (error: Error) => void;
}
