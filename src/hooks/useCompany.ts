import { useApi } from './useApi';
import { useCompanyContext, CompanyData } from '../contexts/DataProvider';
import { useCallback } from 'react';
import { useNavigationCache } from './useNavigationCache';

interface CompanyResponseData {
  address_en: string;
  address_id: string;
  coordinate: string;
  description_en: string;
  description_id: string;
  location: string;
  main_image: string;
  name: string;
  id: number;
  data: CompanyDetailResponseData;
}

interface CompanyDetailResponseData {
  title_1_en: string;
  title_1_id: string;
  title_2_en: string;
  title_2_id: string;
  title_3_en: string;
  title_3_id: string;
  description_1_en: string;
  description_1_id: string;
  description_2_en: string;
  description_2_id: string;
  description_3_en: string;
  description_3_id: string;
  box_1: { data: infobox1ResponseData[] };
  box_2: { data: infobox2ResponseData[] };
  images_1: ImagesResponseData[];
  images_2: ImagesResponseData[];
  images_3: ImagesResponseData[];
  p: ProductApplicationResponseData;
}

interface infobox1ResponseData {
  data_en: string;
  data_id: string;
  name_en: string;
  name_id: string;
}

interface infobox2ResponseData {
  data: string;
  name: string;
}

interface ImagesResponseData {
  title: string;
  url: string;
}

interface ProductApplicationResponseData {
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
}

interface CompanyRequest {
  page: number;
  pageSize: number;
}

const useCompany = () => {
  const { state, actions } = useCompanyContext();
  const cache = useNavigationCache<CompanyData[]>('companies');
  const api = useApi({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getCompany = useCallback(
    async (request: CompanyRequest) => {
      try {
        const cacheKey = `${request.page}_${request.pageSize}`;
        
        // Check cache first
        const cachedData = cache.get(cacheKey);
        if (cachedData && cachedData.length > 0) {
          console.log('Using cached company data');
          actions.fetchCompaniesSuccess(cachedData);
          return cachedData;
        }

        // If global state has data, use it and cache it
        if (state.companies.length > 0 && !state.isLoading) {
          console.log('Using existing company data from state');
          cache.set(cacheKey, state.companies);
          return state.companies;
        }

        actions.fetchCompaniesStart();

        const queryParams = new URLSearchParams({
          page: request.page.toString(),
          pageSize: request.pageSize.toString(),
        });

        const response = await api.execute(
          `/admin-company-profile?${queryParams.toString()}`,
          {
            method: 'GET',
          }
        );

        console.log('API Response:', response); // Debug log

        // Handle different possible API response structures
        const apiResponse = response.data as {
          data?: { data?: CompanyResponseData[] };
        };
        const companyData: CompanyResponseData[] =
          apiResponse?.data?.data || [];

        // Transform API response to match our global state format
        const transformedData: CompanyData[] = companyData?.map((company) => ({
          id: company.id,
          name: company.name,
          address_en: company.address_en,
          address_id: company.address_id,
          coordinate: company.coordinate,
          description_en: company.description_en,
          description_id: company.description_id,
          location: company.location,
          main_image: company.main_image,
          data: company.data,
        }));

        actions.fetchCompaniesSuccess(transformedData);
        // Cache the data
        cache.set(cacheKey, transformedData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch companies';
        actions.fetchCompaniesError(errorMessage);
        throw error;
      }
    },
    [actions, api, cache, state.companies, state.isLoading]
  );

  // Additional helper functions
  const clearError = useCallback(() => {
    actions.clearError();
  }, [actions]);

  const resetCompanyState = useCallback(() => {
    actions.resetState();
  }, [actions]);

  return {
    // API methods
    getCompany,
    clearError,
    resetCompanyState,

    // Global state
    companies: state.companies,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
  };
};

export default useCompany;
