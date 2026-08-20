import { useEffect } from 'react';

import { APP_SECTIONS, hasValidGuid } from '@/config/apps.config';
import { loadScript, getLoadStatus } from '@/services/app-loader.service';
import { installDecorativeTrackingImageGuard } from '@/utils/decorative-tracking-images';

import type { AppInputs } from '@/types/app-manager.types';

interface AppShellProps {
	inputs: AppInputs;
}

/**
 * Loads child widget scripts that have Studio GUIDs configured.
 * Host page owns mount nodes (#overview, #performance, …) and usually the tab chrome.
 */
function AppShell({ inputs }: AppShellProps) {
	useEffect(() => {
		void inputs;

		const stopA11yGuard = installDecorativeTrackingImageGuard();

		const allApps = APP_SECTIONS.flatMap((s) => s.apps).filter((app) =>
			hasValidGuid(app.id),
		);

		allApps.forEach((app) => {
			if (getLoadStatus(app.id) !== 'idle') return;
			loadScript(app.id, app.scriptUrl).catch((err: Error) => {
				console.error(`[AppManager] ${err.message}`);
			});
		});

		return () => {
			stopA11yGuard();
		};
	}, [inputs]);

	return null;
}

export default AppShell;
