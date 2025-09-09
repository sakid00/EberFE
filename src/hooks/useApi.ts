'use client';

import { useState, useCallback, useRef } from 'react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: number | null;
}

export interface ApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ApiConfig extends ApiOptions {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
}

export interface UseApiReturn<T = unknown> {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: number | null;
  execute: (url: string, options?: ApiOptions) => Promise<ApiResponse<T>>;
  reset: () => void;
  setData: (data: T) => void;
}

const defaultConfig: ApiConfig = {
  baseURL: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  retries: 0,
  retryDelay: 1000,
};

export function useApi<T = unknown>(config: ApiConfig = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setStatus(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const execute = useCallback(
    async (url: string, options: ApiOptions = {}): Promise<ApiResponse<T>> => {
      // Reset previous state
      reset();

      const mergedConfig = { ...defaultConfig, ...config };
      const finalOptions = { ...mergedConfig, ...options };
      const fullUrl = finalOptions.baseURL
        ? `${finalOptions.baseURL}${url}`
        : url;

      setLoading(true);
      setError(null);

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      // Set timeout
      if (finalOptions.timeout) {
        timeoutRef.current = setTimeout(() => {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
        }, finalOptions.timeout);
      }

      try {
        const response = await fetch(fullUrl, {
          method: finalOptions.method,
          headers: {
            ...finalOptions.defaultHeaders,
            ...finalOptions.headers,
          },
          body:
            finalOptions.method !== 'GET' && finalOptions.method !== 'HEAD'
              ? JSON.stringify(options.body)
              : undefined,
          signal: abortControllerRef.current.signal,
        });

        setStatus(response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);

        return {
          data: responseData,
          error: null,
          loading: false,
          status: response.status,
        };
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error && err.name === 'AbortError'
            ? 'Request was aborted'
            : err instanceof Error
              ? err.message
              : 'An error occurred';

        setError(errorMessage);
        setLoading(false);

        return {
          data: null,
          error: errorMessage,
          loading: false,
          status: status,
        };
      } finally {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setLoading(false);
      }
    },
    [config, reset, status]
  );

  return {
    data,
    error,
    loading,
    status,
    execute,
    reset,
    setData,
  };
}
