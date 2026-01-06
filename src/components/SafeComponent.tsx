import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class SafeComponent extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error in SafeComponent:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full h-64 bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-gray-200">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Component Temporarily Unavailable</h3>
                    <p className="text-sm text-gray-500 max-w-xs">
                        We're having trouble loading this part of the page. Please try refreshing.
                    </p>
                    {process.env.NODE_ENV === 'development' && (
                        <pre className="mt-4 p-2 bg-red-50 text-red-600 text-xs rounded text-left overflow-auto max-w-full">
                            {this.state.error?.message}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
