import { useApi } from './useApi';
import { useState, useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';

// Product interface
export interface TopProduct {
  id: number;
  code: string;
  application_en: string | null;
  application_id: string | null;
  type: string;
  status: boolean;
  segment?: string;
}

// Top product item with rank
export interface TopProductItem {
  id: number;
  rank: number;
  product: TopProduct;
}

// Company interface
export interface TopProductCompany {
  id: number;
  name: string;
  location: string;
  status: boolean;
}

// Company with top products
export interface CompanyTopProducts {
  company: TopProductCompany;
  topProducts: TopProductItem[];
}

// API response interface
interface TopProductsApiResponse {
  status: string;
  data: CompanyTopProducts[];
}

const useTopProducts = () => {
  const [data, setData] = useState<CompanyTopProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getTopProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.execute('/company-top-products', {
        method: 'GET',
      });

      const apiResponse = response.data as TopProductsApiResponse;

      if (apiResponse?.status === 'success' && apiResponse?.data) {
        setData(apiResponse.data);
        return apiResponse.data;
      }

      // Handle unexpected response structure
      const responseData = apiResponse?.data || [];
      setData(responseData);
      return responseData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch top products';
      Sentry.captureException(err, {
        tags: {
          hook: 'useTopProducts',
          operation: 'getTopProducts',
        },
        extra: {
          errorMessage,
        },
      });
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetState = useCallback(() => {
    setData([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    // API methods
    getTopProducts,
    clearError,
    resetState,

    // State
    data,
    isLoading,
    error,
  };
};

export default useTopProducts;
