import { useApi, ApiConfig } from './useApi';
import { useActivityContext, ActivityData } from '../contexts/DataProvider';
import { useCallback } from 'react';
import * as Sentry from '@sentry/nextjs';

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
  createdAt: string;
}

interface ActivityRequest {
  page: number;
  pageSize: number;
  group?: string;
}

const activityApiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  defaultHeaders: {},
  timeout: 10000,
  retries: 3,
};

const useActivity = () => {
  const { state, actions } = useActivityContext();
  const { execute } = useApi(activityApiConfig);

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
          if (request.group === 'EBER Magazine') {
            queryParams.set('group', 'Eber Magazine');
          } else if (request.group === 'EBER Calendar') {
            queryParams.set('group', 'Calendar');
          } else {
            queryParams.set('group', request.group);
          }
        }

        const finalUrl = `/articles?${queryParams.toString()}`;

        const response = await execute(finalUrl, {
          method: 'GET',
        });

        // Handle different possible API response structures
        const apiResponse = response.data as {
          data?: {
            data?: ActivityResponseData[];
            pagination?: {
              currentPage: number;
              totalPages: number;
              totalItems: number;
              itemsPerPage: number;
            };
          };
        };
        const activityData: ActivityResponseData[] =
          apiResponse?.data?.data || [];
        const paginationData = apiResponse?.data?.pagination || {
          currentPage: request.page,
          totalPages: 1,
          totalItems: activityData.length,
          itemsPerPage: request.pageSize,
        };

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
            createdAt: activity.createdAt,
          })
        );

        actions.fetchActivitiesSuccess(transformedData, paginationData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch activities';
        Sentry.captureException(error, {
          tags: {
            hook: 'useActivity',
            operation: 'getActivities',
          },
          extra: {
            request,
            errorMessage,
          },
        });
        actions.fetchActivitiesError(errorMessage);
        throw error;
      }
    },
    [actions, execute]
  );

  const getActivityById = useCallback(
    async (id: number, forceRefresh = false): Promise<ActivityData | null> => {
      try {
        // Check if activity already exists in state (skip if forcing refresh)
        if (!forceRefresh) {
          const existingActivity = state.activities.find(
            (activity) => activity.id === id
          );
          if (existingActivity) {
            return existingActivity;
          }
        }

        actions.fetchActivitiesStart();

        const finalUrl = `/articles/${id}`;

        const response = await execute(finalUrl, {
          method: 'GET',
        });

        // Handle different possible API response structures
        let activityData: ActivityResponseData | undefined;

        if (response.data) {
          const responseData = response.data as Record<string, unknown>;

          // Helper function to validate if object has ActivityResponseData structure
          const isActivityData = (
            obj: unknown
          ): obj is ActivityResponseData => {
            return (
              obj !== null &&
              obj !== undefined &&
              typeof obj === 'object' &&
              'id' in obj &&
              'title_en' in obj &&
              'title_id' in obj &&
              typeof (obj as ActivityResponseData).id === 'number' &&
              typeof (obj as ActivityResponseData).title_en === 'string' &&
              typeof (obj as ActivityResponseData).title_id === 'string'
            );
          };

          // Try different possible response structures
          if (responseData.data && typeof responseData.data === 'object') {
            // Check if it's nested like { data: { data: ActivityResponseData } }
            const nestedData = responseData.data as Record<string, unknown>;
            if (nestedData.data && isActivityData(nestedData.data)) {
              activityData = nestedData.data as unknown as ActivityResponseData;
            } else if (isActivityData(responseData.data)) {
              // Structure: { data: ActivityResponseData }
              activityData =
                responseData.data as unknown as ActivityResponseData;
            }
          } else if (isActivityData(responseData)) {
            // Structure: ActivityResponseData (direct activity data at root)
            activityData = responseData as unknown as ActivityResponseData;
          }

          // Additional fallback - try to find any object with activity-like properties
          if (!activityData) {
            const checkAllProperties = (
              obj: unknown
            ): obj is Partial<ActivityResponseData> => {
              if (!obj || typeof obj !== 'object') return false;
              // Look for any object that has at least id and title properties
              return (
                ('id' in obj && 'title_en' in obj) ||
                ('id' in obj && 'title_id' in obj)
              );
            };

            // Check direct properties
            if (checkAllProperties(responseData)) {
              activityData = responseData as unknown as ActivityResponseData;
            } else {
              // Check nested properties
              for (const [, value] of Object.entries(responseData)) {
                if (checkAllProperties(value)) {
                  activityData = value as unknown as ActivityResponseData;
                  break;
                }
              }
            }
          }
        }

        if (
          !activityData ||
          (typeof activityData === 'object' &&
            Object.keys(activityData).length === 0)
        ) {
          // Check if activity already exists in our state as fallback
          const stateActivity = state.activities.find(
            (activity) => activity.id === id
          );
          if (stateActivity) {
            return stateActivity;
          }

          throw new Error(`Activity with ID ${id} not found or is empty`);
        }

        // Validate that we have essential activity properties
        if (!activityData.id) {
          // Check if activity exists in state as fallback
          const stateActivity = state.activities.find(
            (activity) => activity.id === id
          );
          if (stateActivity) {
            return stateActivity;
          }

          throw new Error(`Activity with ID ${id} has invalid data structure`);
        }

        // Transform API response to match our global state format
        const transformedData: ActivityData = {
          id: activityData.id,
          author: activityData.author,
          title_en: activityData.title_en,
          title_id: activityData.title_id,
          body_en: activityData.body_en,
          body_id: activityData.body_id,
          group: activityData.group,
          image: activityData.image,
          pdf: activityData.pdf,
          updatedAt: activityData.updatedAt,
          createdAt: activityData.createdAt,
        };

        // Add the single activity to the existing activities array
        const updatedActivities = [...state.activities];
        const existingIndex = updatedActivities.findIndex(
          (activity) => activity.id === id
        );
        if (existingIndex >= 0) {
          updatedActivities[existingIndex] = transformedData;
        } else {
          updatedActivities.push(transformedData);
        }

        actions.fetchActivitiesSuccess(
          updatedActivities,
          state.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalItems: updatedActivities.length,
            itemsPerPage: 20,
          }
        );

        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch activity';
        Sentry.captureException(error, {
          tags: {
            hook: 'useActivity',
            operation: 'getActivityById',
          },
          extra: {
            activityId: id,
            errorMessage,
          },
        });
        actions.fetchActivitiesError(errorMessage);
        throw error;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actions, execute]
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
    getActivityById,
    clearError,
    resetActivityState,

    // Global state
    activities: state.activities,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    pagination: state.pagination,
  };
};

export default useActivity;
