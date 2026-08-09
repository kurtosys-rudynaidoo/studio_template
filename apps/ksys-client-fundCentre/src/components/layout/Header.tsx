/**
 * Header Component
 * App header with title – dark blue bar, white text (Investments Center design)
 */

export interface HeaderProps {
	title?: string;
}

function Header({ title = 'Investments Center' }: HeaderProps) {
	return (
		<header
			className="border-b"
			style={{
				backgroundColor: 'var(--header-bg)',
				color: 'var(--header-text)',
			}}>
			<div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-full">
				<h1
					className="text-xl sm:text-2xl font-bold"
					style={{
						fontFamily: 'var(--font-sans)',
						color: 'var(--header-text)',
					}}>
					{title}
				</h1>
			</div>
		</header>
	);
}

export default Header;

