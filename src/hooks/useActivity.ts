import { useApi } from './useApi';
import { useActivityContext, ActivityData } from '../contexts/DataProvider';
import { useCallback } from 'react';

interface ActivityResponseData {
  id: number;
  author: string;
  title_en: string;
  title_id: string;
  body_en: string;
  body_id: string;
  group: string;
  image: string;
  pdf: string;
  updatedAt: string;
}

interface ActivityRequest {
  page: number;
  pageSize: number;
  group?: string;
}

const useActivity = () => {
  const { state, actions } = useActivityContext();
  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getActivities = useCallback(
    async (request: ActivityRequest) => {
      try {
        actions.fetchActivitiesStart();

        const queryParams = new URLSearchParams({
          page: request.page.toString(),
          pageSize: request.pageSize.toString(),
        });

        // Add optional query parameters with proper encoding
        if (request.group) {
          queryParams.set('group', request.group);
        }

        const finalUrl = `/articles?${queryParams.toString()}`;
        console.log('Activities API URL:', finalUrl); // Debug log

        const response = await api.execute(finalUrl, {
          method: 'GET',
        });

        console.log('Activities API Response:', response); // Debug log

        // Handle different possible API response structures
        const apiResponse = response.data as {
          data?: {
            data?: ActivityResponseData[];
          };
        };
        const activityData: ActivityResponseData[] =
          apiResponse?.data?.data || [];

        console.log('Activity Data:', activityData); // Debug log

        // Transform API response to match our global state format
        const transformedData: ActivityData[] = activityData?.map(
          (activity) => ({
            id: activity.id,
            author: activity.author,
            title_en: activity.title_en,
            title_id: activity.title_id,
            body_en: activity.body_en,
            body_id: activity.body_id,
            group: activity.group,
            image: activity.image,
            pdf: activity.pdf,
            updatedAt: activity.updatedAt,
          })
        );

        actions.fetchActivitiesSuccess(transformedData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch activities';
        actions.fetchActivitiesError(errorMessage);
        throw error;
      }
    },
    [actions, api]
  );

  // Additional helper functions
  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const resetActivityState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  return {
    // API methods
    getActivities,
    clearError,
    resetActivityState,

    // Global state
    activities: state.activities,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useActivity;
