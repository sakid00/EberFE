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

interface AccessProductRequest {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
}

interface AccessProductResponse {
  data: {
    id: number;
    encodedData?: string;
    message?: string;
  };
}

interface RequestProductRequest {
  email: string;
  product_code: string;
}

interface RequestProductResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Helper function to decode token and extract email
const decodeTokenAndGetEmail = (): string | null => {
  try {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return null;
    }

    // Decode base64 token
    const decodedData = atob(token);
    const userData = JSON.parse(decodedData);

    return userData.email || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

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
        const apiResponse = response.data as {
          data?: {
            data?: ProductResponseData[];
            filter_feature?: {
              types?: string[];
              applications?: string[];
            };
          };
        };
        const productData: ProductResponseData[] =
          apiResponse?.data?.data || [];

        console.log('Product Data:', productData); // Debug log

        // Extract filter data from response
        const filterData = apiResponse?.data?.filter_feature;
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

  const accessProduct = useCallback(
    async (request: AccessProductRequest): Promise<AccessProductResponse> => {
      try {
        const response = await api.execute('/form-submissions/instant-access', {
          method: 'POST',
          body: request,
        });

        // Extract token from response - handle different possible response structures
        const responseData = response?.data as AccessProductResponse;
        const token = responseData?.data?.encodedData;

        if (!token) {
          throw new Error('No token received from API');
        }

        return {
          data: {
            id: responseData?.data?.id,
            encodedData: token,
            message: responseData.data.message,
          },
        };
      } catch (error) {
        console.error('Error requesting product access:', error);
      }
      return {
        data: {
          id: 0,
          encodedData: '',
          message: '',
        },
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const requestProduct = useCallback(
    async (productCode: string): Promise<RequestProductResponse> => {
      try {
        // Get email from localStorage by decoding the token
        const email = decodeTokenAndGetEmail();

        if (!email) {
          return {
            success: false,
            error: 'No email found. Please complete the access form first.',
          };
        }

        const request: RequestProductRequest = {
          email,
          product_code: productCode,
        };

        const response = await api.execute(
          '/form-submissions/send-product-email',
          {
            method: 'POST',
            body: request,
          }
        );

        const responseData = response.data as { message?: string };
        return {
          success: true,
          message: responseData?.message || 'Product request sent successfully',
        };
      } catch (error) {
        console.error('Error requesting product:', error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : 'Failed to request product',
        };
      }
    },
    [api]
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
    accessProduct,
    requestProduct,

    // Global state
    products: state.products,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useProduct;
