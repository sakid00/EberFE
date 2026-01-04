import { useApi } from './useApi';
import { useCareerContext, CareerData } from '../contexts/DataProvider';
import { useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';

type CareerType = 'fulltime' | 'parttime' | 'internship' | 'contract';

interface CareerResponseData {
  id: number;
  position: string;
  location: string;
  type: CareerType;
  description_en: string;
  description_id: string;
}

interface CareerRequest {
  page: number;
  pageSize: number;
}

interface uploadCVFileResponseData {
  data: {
    downloadUrl: string;
    extension: string;
    filename: string;
    mimetype: string;
    originalname: string;
    size: number;
    uploadedAt: string;
    url: string;
  };
}

const useCareer = () => {
  const { state, actions } = useCareerContext();
  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getCareer = useCallback(
    async (request: CareerRequest) => {
      try {
        actions.fetchCareersStart();

        const queryParams = new URLSearchParams({
          page: request.page.toString(),
          pageSize: request.pageSize.toString(),
        });

        const response = await api.execute(
          `/careers?${queryParams.toString()}`,
          {
            method: 'GET',
          }
        );

        // Handle different possible API response structures
        const apiResponse = response.data as {
          data?: { data?: CareerResponseData[] };
        };
        const careerData: CareerResponseData[] = apiResponse?.data?.data || [];

        // Transform API response to match our global state format
        const transformedData: CareerData[] = careerData?.map((career) => ({
          id: career.id,
          position: career.position,
          location: career.location,
          type: career.type,
          description_en: career.description_en,
          description_id: career.description_id,
        }));

        actions.fetchCareersSuccess(transformedData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch careers';
        Sentry.captureException(error, {
          tags: {
            hook: 'useCareer',
            operation: 'getCareer',
          },
          extra: {
            request,
            errorMessage,
          },
        });
        actions.fetchCareersError(errorMessage);
        throw error;
      }
    },
    [actions, api]
  );

  // Additional helper functions
  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const resetCareerState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  const uploadCVFile = useCallback(
    async (file: File): Promise<string> => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.execute('/upload/file', {
          method: 'POST',
          body: formData,
          // Remove headers completely to let browser set proper Content-Type with boundary
        });

        // Extract the file URL from the response
        const responseData = response?.data as uploadCVFileResponseData;

        // Try multiple possible response structures
        const fileUrl = responseData?.data?.downloadUrl;

        if (!fileUrl) {
          Sentry.captureMessage('No file URL found in response', {
            level: 'error',
            extra: { responseData },
          });
          throw new Error('File upload response does not contain a valid URL');
        }

        return fileUrl;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to upload CV file';
        Sentry.captureException(error, {
          tags: {
            hook: 'useCareer',
            operation: 'uploadCVFile',
          },
          extra: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            errorMessage,
          },
        });
        throw new Error(errorMessage);
      }
    },
    [api]
  );

  return {
    // API methods
    getCareer,
    uploadCVFile,
    clearError,
    resetCareerState,

    // Global state
    careers: state.careers,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useCareer;
