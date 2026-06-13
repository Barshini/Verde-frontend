import React, { Component, type ReactNode } from 'react';
import { Link } from 'wouter';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production, send to your logging service here (e.g. Sentry)
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center bg-[#1B3A2D]">
          <div className="w-16 h-16 border border-[rgba(201,168,76,0.4)] flex items-center justify-center mb-8" aria-hidden="true">
            <span className="font-serif text-[28px] text-[#C9A84C] italic">!</span>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#C9A84C] mb-4">Something went wrong</p>
          <h2 className="font-serif text-[32px] text-[#F5F0E8] mb-4 font-light">An unexpected error occurred</h2>
          <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-10 max-w-md">
            We apologise for the inconvenience. Please try refreshing the page or return to the homepage.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { this.setState({ hasError: false, error: undefined }); window.location.reload(); }}
              className="font-sans text-[11px] tracking-[0.2em] uppercase border border-[#C9A84C] text-[#C9A84C] px-8 py-3 hover:bg-[#C9A84C] hover:text-[#0F2318] transition-colors"
            >
              Refresh Page
            </button>
            <Link href="/" className="font-sans text-[11px] tracking-[0.2em] uppercase border border-[rgba(245,240,232,0.3)] text-[rgba(245,240,232,0.7)] px-8 py-3 hover:border-[#F5F0E8] hover:text-[#F5F0E8] transition-colors">
              Return Home
            </Link>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <details className="mt-8 text-left max-w-xl w-full">
              <summary className="font-sans text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.3)] cursor-pointer hover:text-[rgba(245,240,232,0.6)]">
                Developer details
              </summary>
              <pre className="mt-3 p-4 bg-[#0F2318] border border-[rgba(201,168,76,0.2)] font-mono text-[11px] text-red-400 overflow-auto">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
