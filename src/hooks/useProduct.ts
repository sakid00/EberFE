import { useApi } from './useApi';
import {
  useProductContext,
  ProductData,
  ProductPagination,
} from '../contexts/DataProvider';
import { useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';

interface ProductResponseData {
  application: string;
  application_en: string | null;
  application_id: string | null;
  code: string;
  createdAt: string;
  id: number;
  performanceFeature: string | null;
  performanceFeature_en: string | null;
  performanceFeature_id: string | null;
  status: boolean;
  type: string;
  updatedAt: string;
  it_mfg: string | null;
  segment: string | null;
  sbu_name: string | null;
  grp_name: string | null;
  grp_sbu: string | null;
  coid: string | null;
}

interface ProductFilterData {
  types?: string[];
  applications?: string[];
  segments?: string[];
  grpSbus?: string[];
  sbuNames?: string[];
  grpNames?: string[];
}

interface ProductPaginationData {
  page: number;
  pageSize: number;
  total: number;
}

interface ProductRequest {
  page: number;
  pageSize: number;
  segment?: string;
  grpSbu?: string;
  sbuName?: string;
  grpName?: string;
}

interface FormDataRequest {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
}

interface IFormData {
  formData: FormDataRequest;
  onSuccess: () => void;
}

interface IRequestProduct {
  email: string;
  productCode: string;
  onSuccess: () => void;
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
        if (request.segment) {
          queryParams.set('segment', request.segment);
        }
        if (request.grpSbu) {
          queryParams.set('grp_sbu', request.grpSbu);
        }
        if (request.sbuName) {
          queryParams.set('sbu_name', request.sbuName);
        }
        if (request.grpName) {
          queryParams.set('grp_name', request.grpName);
        }

        const finalUrl = `/products?${queryParams.toString()}`;

        const response = await api.execute(finalUrl, {
          method: 'GET',
        });

        // Handle different possible API response structures
        const rawResponse = response.data as any;

        let productData: ProductResponseData[] = [];
        let filterData: ProductFilterData | undefined;
        let paginationData: ProductPaginationData | undefined;

        if (rawResponse?.data?.data && Array.isArray(rawResponse.data.data)) {
          productData = rawResponse.data.data;
          filterData = rawResponse.data.filter_feature;
          paginationData = rawResponse.data.meta || rawResponse.data.pagination;
        } else if (rawResponse?.data && Array.isArray(rawResponse.data)) {
          productData = rawResponse.data;
          filterData = rawResponse.filter_feature;
          paginationData = rawResponse.meta || rawResponse.pagination;
        } else if (Array.isArray(rawResponse)) {
          productData = rawResponse;
        }

        // Extract filter data from response
        if (filterData) {
          const filters = {
            segments: filterData.segments || [],
            grpSbus: filterData.grpSbus || [],
            sbuNames: filterData.sbuNames || [],
            grpNames: filterData.grpNames || [],
          };
          actions.fetchFiltersSuccess(filters);
        }

        const extractedPage = paginationData?.page ?? 0;

        const extractedPageSize = paginationData?.pageSize ?? 0;

        const extractedTotal = paginationData?.total ?? 0;

        const extractedTotalPages =
          extractedTotal > 0
            ? Math.ceil(extractedTotal / extractedPageSize)
            : 1;

        const pagination: ProductPagination = {
          currentPage: extractedPage,
          totalPages: extractedTotalPages,
          totalItems: extractedTotal,
          itemsPerPage: extractedPageSize,
        };

        // Transform API response to match our global state format
        const transformedData: ProductData[] = productData?.map((product) => ({
          id: product.id,
          code: product.code,
          application: product.application,
          application_en: product.application_en,
          application_id: product.application_id,
          performanceFeature_en: product.performanceFeature_en,
          performanceFeature_id: product.performanceFeature_id,
          type: product.type,
          it_mfg: product.it_mfg,
          segment: product.segment,
          sbu_name: product.sbu_name,
          grp_name: product.grp_name,
          grp_sbu: product.grp_sbu,
        }));

        actions.fetchProductsSuccess(transformedData, pagination);
        return { products: transformedData, pagination };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch products';
        Sentry.captureException(error, {
          tags: {
            hook: 'useProduct',
            operation: 'getProduct',
          },
          extra: {
            request,
            errorMessage,
          },
        });
        actions.fetchProductsError(errorMessage);
        throw error;
      }
    },
    [actions, api]
  );

  const applyInstantAccess = useCallback(
    async (props: IFormData) => {
      try {
        const response = await api.execute('/form-submissions/instant-access', {
          method: 'POST',
          body: {
            fullName: props.formData.fullName,
            email: props.formData.email,
            phone: props.formData.phone,
            company: props.formData.company,
            city: props.formData.city,
          },
        });

        if (response.status === 201) {
          props.onSuccess();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to apply instant access';
        Sentry.captureException(error, {
          tags: {
            hook: 'useProduct',
            operation: 'applyInstantAccess',
          },
          extra: {
            email: props.formData.email,
            errorMessage,
          },
        });
        actions.fetchProductsError(errorMessage);
        throw error;
      }
    },
    [api, actions]
  );

  const requestProduct = useCallback(
    async (props: IRequestProduct) => {
      try {
        const response = await api.execute(
          '/form-submissions/send-product-email',
          {
            method: 'POST',
            body: {
              email: props.email,
              product_code: props.productCode,
            },
          }
        );

        if (response.status === 201) {
          props.onSuccess();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to request product';
        Sentry.captureException(error, {
          tags: {
            hook: 'useProduct',
            operation: 'requestProduct',
          },
          extra: {
            email: props.email,
            productCode: props.productCode,
            errorMessage,
          },
        });
        actions.fetchProductsError(errorMessage);
        throw error;
      }
    },
    [api, actions]
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
    applyInstantAccess,
    requestProduct,
    // Global state
    products: state.products,
    filters: state.filters,
    pagination: state.pagination,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useProduct;
