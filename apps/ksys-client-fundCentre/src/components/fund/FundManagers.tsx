/**
 * FundManagers Component
 * Displays fund managers with images and bio links
 */

import { useCallback, useEffect, useState } from 'react';

import type { FundManager } from '@/types/fund.types';

export interface FundManagersProps {
	managers: FundManager[];
	baseUrl?: string;
	token?: string;
}

/** Fallback when API omits `code` — picture endpoint expects Kurtosys-style slugs, not display names only. */
function slugifyNameForPictureFallback(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');
}

function pictureUrl(baseUrl: string, managerCode: string): string {
	const b = baseUrl.replace(/\/$/, '');
	return `${b}/fund/fundmanagerpicture?code=${encodeURIComponent(managerCode)}`;
}

function bioUrlFromCode(managerCode: string): string {
	const urlSlug = managerCode.replace(/_/g, '-');
	return `/our-people/${urlSlug}`;
}

function managerPictureCode(manager: FundManager): string {
	if (manager.code && manager.code.trim() !== '') {
		return manager.code.trim();
	}
	return slugifyNameForPictureFallback(manager.name || 'manager');
}

function ManagerRow({
	manager,
	baseUrl,
	token,
}: {
	manager: FundManager;
	baseUrl: string;
	token: string;
}) {
	const managerCode = managerPictureCode(manager);
	const bioHref = bioUrlFromCode(managerCode);
	const initial = (manager.name || '?').charAt(0).toUpperCase();

	const [imageFailed, setImageFailed] = useState(false);
	const [imageSrc, setImageSrc] = useState<string>();

	// Token goes in the header, never the URL (Secure Delivery 3.1); the image is shown from a blob URL.
	useEffect(() => {
		let cancelled = false;
		let objectUrl: string | undefined;
		fetch(pictureUrl(baseUrl, managerCode), { headers: { 'x-ksys-token': token } })
			.then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
			.then((blob) => {
				if (cancelled) return;
				objectUrl = URL.createObjectURL(blob);
				setImageSrc(objectUrl);
			})
			.catch(() => {
				if (!cancelled) setImageFailed(true);
			});
		return () => {
			cancelled = true;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [baseUrl, token, managerCode]);

	const onImgError = useCallback(() => {
		setImageFailed(true);
	}, []);

	return (
		<div
			className="flex gap-[12px] items-center"
			style={{
				fontFamily: 'var(--font-sans)',
				fontWeight: 400,
				width: '240px',
				color: 'var(--text-dark)',
			}}>
			<div
				className="fund-center-manager-photo shrink-0 rounded-full bg-black"
				style={{
					height: '80px',
					width: '80px',
				}}>
				{imageSrc && !imageFailed ? (
					<img
						src={imageSrc}
						alt={manager.name ? `Photo of ${manager.name}` : 'Portfolio manager'}
						className="block h-full w-full rounded-full object-cover"
						onError={onImgError}
					/>
				) : (
					<div
						className="flex h-full w-full items-center justify-center rounded-full bg-black"
						style={{
							fontSize: '12px',
							color: '#fff',
						}}
						aria-hidden>
						{initial}
					</div>
				)}
			</div>

			<div className="flex shrink-0 flex-col justify-center" style={{ width: '148.855px' }}>
				<p
					className="mb-0 font-bold"
					style={{
						fontFamily: 'var(--font-sans)',
						fontSize: '16px',
						lineHeight: '16px',
						color: 'var(--text-dark)',
						fontWeight: 600,
					}}>
					{manager.name}
				</p>
				{manager.title && (
					<p
						className="mb-0"
						style={{
							fontFamily: 'var(--font-sans)',
							fontSize: '14px',
							lineHeight: '16px',
							color: 'var(--text-dark)',
							fontWeight: 400,
							opacity: 0.9,
						}}>
						{manager.title}
					</p>
				)}
				<a
					href={bioHref}
					target="_blank"
					rel="noopener noreferrer"
					className="font-bold underline decoration-solid"
					aria-label={`Bio for ${manager.name} (opens in new tab)`}
					style={{
						fontFamily: 'var(--font-sans)',
						fontSize: '16px',
						lineHeight: '16px',
						color: 'var(--section-header)',
						textDecoration: 'underline',
						textUnderlinePosition: 'from-font',
					}}>
					Bio
				</a>
			</div>
		</div>
	);
}

function FundManagers({ managers, baseUrl, token }: FundManagersProps) {
	if (!managers || managers.length === 0) {
		return null;
	}

	const canLoadPictures = Boolean(baseUrl && token);

	return (
		<div className="mb-6">
			<h2
				className="fund-center-fund-managers-title mb-6 text-lg font-bold uppercase"
				style={{
					color: 'var(--section-header)',
					fontFamily: 'var(--font-sans)',
					fontSize: '14px',
					lineHeight: '30px',
					letterSpacing: '0.02em',
				}}>
				Portfolio Managers
			</h2>
			<div className="flex flex-wrap gap-[12px]">
				{managers.map((manager, index) => {
					const rowKey = `${manager.code || manager.name || 'manager'}-${index}`;
					if (!canLoadPictures) {
						const managerCode = managerPictureCode(manager);
						const bioHref = bioUrlFromCode(managerCode);
						const initial = (manager.name || '?').charAt(0).toUpperCase();
						return (
							<div
								key={rowKey}
								className="flex gap-[12px] items-center"
								style={{
									fontFamily: 'var(--font-sans)',
									fontWeight: 400,
									width: '240px',
									color: 'var(--text-dark)',
								}}>
								<div
									className="fund-center-manager-photo flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full bg-black"
									style={{ fontSize: '12px', color: '#fff' }}
									aria-hidden>
									{initial}
								</div>
								<div className="flex shrink-0 flex-col justify-center" style={{ width: '148.855px' }}>
									<p
										className="mb-0 font-bold"
										style={{
											fontFamily: 'var(--font-sans)',
											fontSize: '16px',
											lineHeight: '16px',
											color: 'var(--text-dark)',
											fontWeight: 600,
										}}>
										{manager.name}
									</p>
									{manager.title && (
										<p className="mb-0 text-sm opacity-90" style={{ color: 'var(--text-dark)' }}>
											{manager.title}
										</p>
									)}
									<a
										href={bioHref}
										target="_blank"
										rel="noopener noreferrer"
										className="font-bold underline"
										style={{ color: 'var(--section-header)' }}
										aria-label={`Bio for ${manager.name} (opens in new tab)`}>
										Bio
									</a>
								</div>
							</div>
						);
					}
					return <ManagerRow key={rowKey} manager={manager} baseUrl={baseUrl!} token={token!} />;
				})}
			</div>
		</div>
	);
}

export default FundManagers;
