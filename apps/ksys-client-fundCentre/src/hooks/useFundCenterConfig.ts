/**
 * useFundCenterConfig Hook
 * Parses embed data attributes and builds Fund Center configuration
 */

import { useState, useEffect, useCallback } from 'react';

import type { FundCenterEmbedConfig } from '@/types/fund-center.types';
import { parseEmbedConfig } from '@/utils/config-mapper';

/** When `data-fundlist` is missing/empty, use build-time default so searchEntity gets `fundList`. */
function applyDefaultFundlist(config: FundCenterEmbedConfig): FundCenterEmbedConfig {
	const def = (import.meta.env.VITE_EMBED_DEFAULT_FUNDLIST || '').trim();
	if (!def) return config;
	if (!config.fundlist?.trim()) {
		return { ...config, fundlist: def };
	}
	return config;
}

/** When `data-subadvised-landing-url` is missing/empty, optional build-time default for dev/preview. */
function applyDefaultSubadvisedLandingUrl(config: FundCenterEmbedConfig): FundCenterEmbedConfig {
	const def = (import.meta.env.VITE_SUBADVISED_LANDING_URL || '').trim();
	if (!def) return config;
	if (!config.subadvisedLandingUrl?.trim()) {
		return { ...config, subadvisedLandingUrl: def };
	}
	return config;
}

function applyEmbedDefaults(config: FundCenterEmbedConfig): FundCenterEmbedConfig {
	return applyDefaultSubadvisedLandingUrl(applyDefaultFundlist(config));
}

/**
 * Hook return type
 */
export interface UseFundCenterConfigReturn {
	config: FundCenterEmbedConfig | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
}

/**
 * Parse embed data attributes from DOM element
 * Looks for element with id="fundCenter" or data attribute
 */
export function useFundCenterConfig(
	elementId: string = 'fundCenter',
): UseFundCenterConfigReturn {
	const [config, setConfig] = useState<FundCenterEmbedConfig | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const loadConfig = useCallback(() => {
		try {
			setIsLoading(true);
			setError(null);

			// Try preferred ids: caller default, then fundCentre (Studio containerId)
			let element =
				document.getElementById(elementId) ||
				document.getElementById('fundCentre') ||
				document.getElementById('fundCenter');

			// If not found, try to find by data attribute
			if (!element) {
				element = document.querySelector(`[data-ksys-app-template-id]`) as HTMLElement;
			}

			// If still not found, try to find any element with fund center attributes
			if (!element) {
				element = document.querySelector(`[data-api-url*="fund"]`) as HTMLElement;
			}

			const parsedConfig = parseEmbedConfig(element);

			if (!parsedConfig) {
				// If no embed element found, use defaults from environment or reasonable defaults
				setConfig(
					applyEmbedDefaults({
						culture: 'en-US',
						country: 'us',
						audience: 'institutional',
						apiUrl: import.meta.env.VITE_KURTOSYS_API_URL || 'https://api-us.fundpress.io',
						fundlist: '',
						baseUrl: '',
						configurationKey: 'default',
						ksysAppTemplateId: '',
						initialized: true,
						subadvisedLandingUrl: '',
					}),
				);
				return;
			}

			setConfig(applyEmbedDefaults(parsedConfig));
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Failed to parse embed config');
			setError(error);
			setConfig(null);
		} finally {
			setIsLoading(false);
		}
	}, [elementId]);

	useEffect(() => {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', loadConfig);
			return () => {
				document.removeEventListener('DOMContentLoaded', loadConfig);
			};
		}

		loadConfig();
	}, [loadConfig]);

	return {
		config,
		isLoading,
		error,
		refetch: loadConfig,
	};
}

