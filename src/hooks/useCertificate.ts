import { useApi } from './useApi';
import {
  useCertificateContext,
  CertificateData,
} from '../contexts/DataProvider';
import { useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';

// ===== API REQUEST TYPES =====
interface CertificateRequest {
  page: number;
  pageSize: number;
}

// ===== API RESPONSE TYPES =====
interface CertificateResponseMeta {
  page: number;
  total: number;
  pageSize: number;
}

interface CertificateResponsePayload {
  data: CertificateData[];
  meta: CertificateResponseMeta;
}

interface CertificateApiResponse {
  status: string;
  data: CertificateResponsePayload;
}

const useCertificate = () => {
  const { state, actions } = useCertificateContext();
  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getCertificates = useCallback(
    async (request: CertificateRequest) => {
      try {
        actions.fetchCertificatesStart();

        const queryParams = new URLSearchParams({
          page: request.page.toString(),
          pageSize: request.pageSize.toString(),
        });

        const finalUrl = `/certificates?${queryParams.toString()}`;

        const response = await api.execute(finalUrl, {
          method: 'GET',
        });

        const apiResponse = response.data as CertificateApiResponse;
        const certificates = apiResponse.data.data;
        const meta = apiResponse.data.meta;

        const paginationData = {
          currentPage: meta.page,
          totalPages: Math.ceil(meta.total / meta.pageSize),
          totalItems: meta.total,
          itemsPerPage: meta.pageSize,
        };

        actions.fetchCertificatesSuccess(certificates, paginationData);
        return certificates;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to fetch certificates';
        Sentry.captureException(error, {
          tags: {
            hook: 'useCertificate',
            operation: 'getCertificates',
          },
          extra: {
            request,
            errorMessage,
          },
        });
        actions.fetchCertificatesError(errorMessage);
        throw error;
      }
    },
    [actions, api]
  );

  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const resetCertificateState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  return {
    // API methods
    getCertificates,
    clearError,
    resetCertificateState,

    // Global state
    certificates: state.certificates,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    pagination: state.pagination,
  };
};

export default useCertificate;
