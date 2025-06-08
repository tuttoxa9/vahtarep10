"use client";

import type React from 'react';
import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 border border-red-200 rounded-lg bg-red-50">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Что-то пошло не так
            </h2>
            <p className="text-red-600 mb-4">
              Произошла ошибка при загрузке этого компонента.
            </p>
            <Button
              onClick={() => this.setState({ hasError: false })}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              Попробовать снова
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 text-sm text-red-500">
              <summary className="cursor-pointer">Детали ошибки (режим разработки)</summary>
              <pre className="mt-2 whitespace-pre-wrap">
                {this.state.error.message}
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
