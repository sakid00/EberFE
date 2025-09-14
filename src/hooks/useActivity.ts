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

        console.log('Activity Data:', activityData); // Debug log
        console.log('Pagination Data:', paginationData); // Debug log

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

        actions.fetchActivitiesSuccess(transformedData, paginationData);
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

  const getActivityById = useCallback(
    async (id: number): Promise<ActivityData | null> => {
      try {
        // Check if activity already exists in state
        const existingActivity = state.activities.find(activity => activity.id === id);
        if (existingActivity) {
          console.log('Activity found in state:', existingActivity);
          return existingActivity;
        }

        actions.fetchActivitiesStart();
        
        const finalUrl = `/articles/${id}`;
        console.log('Activity Detail API URL:', finalUrl);

        const response = await api.execute(finalUrl, {
          method: 'GET',
        });

        console.log('Activity Detail API Response:', response);
        console.log('Response structure analysis:');
        console.log('- response.data:', response.data);
        console.log('- typeof response.data:', typeof response.data);
        console.log('- response.data keys:', response.data ? Object.keys(response.data) : 'N/A');

        // Handle different possible API response structures
        let activityData: ActivityResponseData | undefined;
        
        if (response.data) {
          const responseData = response.data as Record<string, unknown>;
          
          // Helper function to validate if object has ActivityResponseData structure
          const isActivityData = (obj: unknown): obj is ActivityResponseData => {
            return obj !== null &&
                   obj !== undefined &&
                   typeof obj === 'object' && 
                   'id' in obj &&
                   'title_en' in obj &&
                   'title_id' in obj &&
                   typeof (obj as ActivityResponseData).id === 'number' &&
                   typeof (obj as ActivityResponseData).title_en === 'string' &&
                   typeof (obj as ActivityResponseData).title_id === 'string';
          };
          
          // Try different possible response structures
          if (responseData.data && typeof responseData.data === 'object') {
            // Check if it's nested like { data: { data: ActivityResponseData } }
            const nestedData = responseData.data as Record<string, unknown>;
            if (nestedData.data && isActivityData(nestedData.data)) {
              activityData = nestedData.data as unknown as ActivityResponseData;
              console.log('Using double-nested data structure');
            } else if (isActivityData(responseData.data)) {
              // Structure: { data: ActivityResponseData }
              activityData = responseData.data as unknown as ActivityResponseData;
              console.log('Using single-nested data structure');
            }
          } else if (isActivityData(responseData)) {
            // Structure: ActivityResponseData (direct activity data at root)
            activityData = responseData as unknown as ActivityResponseData;
            console.log('Using direct data structure');
          }
          
          // Additional fallback - try to find any object with activity-like properties
          if (!activityData) {
            console.log('Trying fallback parsing...');
            const checkAllProperties = (obj: unknown): obj is Partial<ActivityResponseData> => {
              if (!obj || typeof obj !== 'object') return false;
              // Look for any object that has at least id and title properties
              return ('id' in obj && 'title_en' in obj) || ('id' in obj && 'title_id' in obj);
            };
            
            // Check direct properties
            if (checkAllProperties(responseData)) {
              activityData = responseData as unknown as ActivityResponseData;
              console.log('Using fallback direct parsing');
            } else {
              // Check nested properties
              for (const [key, value] of Object.entries(responseData)) {
                if (checkAllProperties(value)) {
                  activityData = value as unknown as ActivityResponseData;
                  console.log(`Using fallback nested parsing from key: ${key}`);
                  break;
                }
              }
            }
          }
        }

        console.log('Parsed activityData:', activityData);
        
        if (!activityData || (typeof activityData === 'object' && Object.keys(activityData).length === 0)) {
          console.error('Activity data is empty or null:', activityData);
          console.error('Full response:', JSON.stringify(response, null, 2));
          
          // Check if activity already exists in our state as fallback
          const stateActivity = state.activities.find(activity => activity.id === id);
          if (stateActivity) {
            console.log('Found activity in state as fallback:', stateActivity);
            return stateActivity;
          }
          
          throw new Error(`Activity with ID ${id} not found or is empty`);
        }
        
        // Validate that we have essential activity properties
        if (!activityData.id) {
          console.error('Activity data missing ID field:', activityData);
          
          // Check if activity exists in state as fallback
          const stateActivity = state.activities.find(activity => activity.id === id);
          if (stateActivity) {
            console.log('Found activity in state as fallback (missing ID):', stateActivity);
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
        };

        // Add the single activity to the existing activities array
        const updatedActivities = [...state.activities];
        const existingIndex = updatedActivities.findIndex(activity => activity.id === id);
        if (existingIndex >= 0) {
          updatedActivities[existingIndex] = transformedData;
        } else {
          updatedActivities.push(transformedData);
        }

        actions.fetchActivitiesSuccess(updatedActivities, state.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: updatedActivities.length,
          itemsPerPage: 20,
        });
        
        return transformedData;
      } catch (error) {
        console.error(`Error fetching activity ${id}:`, error);
        
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch activity';
        actions.fetchActivitiesError(errorMessage);
        throw error;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
