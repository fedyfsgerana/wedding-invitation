"use client";

import React from "react";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message || "Terjadi kesalahan." };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>
                    <p className="font-serif text-lg text-foreground mb-1">Konten tidak dapat dimuat</p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Terjadi gangguan sementara. Silakan muat ulang halaman.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:bg-muted transition-all"
                    >
                        Muat Ulang
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}