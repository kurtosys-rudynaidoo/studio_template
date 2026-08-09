import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FundCenter from '@/components/FundCenter/FundCenter';
import ErrorBoundary from '@/components/layout/ErrorBoundary';

// Create a client for React Query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary>
				<div className="relative flex min-h-dvh w-full flex-col bg-background">
					<a
						href="#main-content"
						className="absolute left-[-10000px] top-4 z-[100] whitespace-nowrap rounded bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] no-underline focus:left-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]">
						Skip to main content
					</a>
					<div className="flex min-h-0 w-full flex-1 flex-col bg-background">
						<FundCenter />
					</div>
				</div>
			</ErrorBoundary>
		</QueryClientProvider>
	);
}

export default App;
