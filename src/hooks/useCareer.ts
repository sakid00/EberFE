import { useApi } from './useApi';
import { useCareerContext, CareerData } from '../contexts/DataProvider';
import { useCallback } from 'react';

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

        console.log('API Response:', response); // Debug log

        // Handle different possible API response structures
        const apiResponse = response.data as {
          data?: { data?: CareerResponseData[] };
        };
        const careerData: CareerResponseData[] = apiResponse?.data?.data || [];

        console.log('Career Data:', careerData); // Debug log

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

  return {
    // API methods
    getCareer,
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
