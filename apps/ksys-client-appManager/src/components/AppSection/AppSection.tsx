import { useEffect, useRef, useState, useCallback } from 'react';

import { loadScript, createLazyObserver, getLoadStatus } from '@/services/app-loader.service';
import { resolveContainerId, hasValidGuid } from '@/config/apps.config';

import type { AppInputs, ManagedApp, Section } from '@/types/app-manager.types';

interface AppSectionProps {
	section: Section;
	inputs: AppInputs;
}

function AppContainer({ app, inputs }: { app: ManagedApp; inputs: AppInputs }) {
	const containerId = resolveContainerId(app.containerId, inputs);

	return <div id={containerId} className="min-h-[50px]" />;
}

function AppSection({ section, inputs }: AppSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const [loaded, setLoaded] = useState(!section.lazy);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const loadSectionApps = useCallback(() => {
		const loadableApps = section.apps.filter((app) => hasValidGuid(app.id));

		const promises = loadableApps.map((app) => {
			if (getLoadStatus(app.id) !== 'idle') return Promise.resolve();
			return loadScript(app.id, app.scriptUrl).catch((err) => {
				console.error(`[AppManager] ${err.message}`);
			});
		});

		Promise.all(promises).then(() => setLoaded(true));
	}, [section.apps]);

	useEffect(() => {
		if (!section.lazy) {
			loadSectionApps();
			return;
		}

		const el = sectionRef.current;
		if (!el) return;

		observerRef.current = createLazyObserver((entry) => {
			observerRef.current?.unobserve(entry.target);
			loadSectionApps();
		});

		observerRef.current.observe(el);

		return () => {
			observerRef.current?.disconnect();
		};
	}, [section.lazy, loadSectionApps]);

	return (
		<section
			ref={sectionRef}
			id={`section-${section.id}`}
			className="scroll-mt-[120px]"
			data-section-id={section.id}
			data-loaded={loaded}>
			{section.apps.map((app) => (
				<AppContainer key={app.id} app={app} inputs={inputs} />
			))}
		</section>
	);
}

export default AppSection;
