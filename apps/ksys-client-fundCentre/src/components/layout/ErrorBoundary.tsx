/**
 * ErrorBoundary Component
 * Catches React rendering errors and displays fallback UI
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';

import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ errorInfo });

		// Log error for debugging
		console.error('Error caught by boundary:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div
					className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
					role="alert"
					aria-live="assertive"
					aria-atomic="true">
					<h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
					<p className="text-muted-foreground mb-6">
						We apologize for the inconvenience. Please try refreshing the page.
					</p>
					<Button onClick={this.handleReset}>Try Again</Button>
					{process.env.NODE_ENV === 'development' && this.state.error && (
						<details className="mt-8 text-left max-w-2xl">
							<summary className="cursor-pointer text-sm font-medium mb-2">
								Error Details
							</summary>
							<pre className="text-xs bg-muted p-4 rounded overflow-auto">
								{this.state.error.toString()}
								{this.state.errorInfo?.componentStack}
							</pre>
						</details>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

