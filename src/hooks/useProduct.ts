import { useApi } from './useApi';
import { useProductContext, ProductData } from '@/contexts/DataProvider';
import { useCallback } from 'react';

interface ProductResponseData {
  id: number;
  code: string;
  application_en: string;
  application_id: string;
  performanceFeature_en: string;
  performanceFeature_id: string;
  type: string;
}

interface ProductRequest {
  page: number;
  pageSize: number;
  type?: string;
  application?: string;
}

const useProduct = () => {
  const { state, actions } = useProductContext();
  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getProduct = useCallback(
    async (request: ProductRequest) => {
      try {
        actions.fetchProductsStart();

        const queryParams = new URLSearchParams({
          page: request.page.toString(),
          pageSize: request.pageSize.toString(),
        });

        // Add optional query parameters with proper encoding
        if (request.type) {
          queryParams.set('type', request.type);
        }
        if (request.application) {
          queryParams.set('application', request.application);
        }

        const finalUrl = `/products?${queryParams.toString()}`;
        console.log('Products API URL:', finalUrl); // Debug log

        const response = await api.execute(finalUrl, {
          method: 'GET',
        });

        console.log('Products API Response:', response); // Debug log

        // Handle different possible API response structures
        const productData: ProductResponseData[] = response.data?.data?.data;

        console.log('Product Data:', productData); // Debug log

        // Extract filter data from response
        const filterData = response.data?.data?.filter_feature;
        console.log('Filter Data:', filterData); // Debug log

        if (filterData) {
          const filters = {
            types: filterData.types || [],
            applications: filterData.applications || [],
          };
          actions.fetchFiltersSuccess(filters);
        }

        // Transform API response to match our global state format
        const transformedData: ProductData[] = productData?.map((product) => ({
          id: product.id,
          code: product.code,
          application_en: product.application_en,
          application_id: product.application_id,
          performanceFeature_en: product.performanceFeature_en,
          performanceFeature_id: product.performanceFeature_id,
          type: product.type,
        }));

        actions.fetchProductsSuccess(transformedData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch products';
        actions.fetchProductsError(errorMessage);
        throw error;
      }
    },
    [actions, api]
  );

  // Additional helper functions
  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const resetProductState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  return {
    // API methods
    getProduct,
    clearError,
    resetProductState,

    // Global state
    products: state.products,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useProduct;
