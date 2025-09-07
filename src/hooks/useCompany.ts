import { useApi } from './useApi';
import { useCompanyContext, CompanyData } from '@/contexts/DataProvider';
import { useCallback } from 'react';

interface CompanyResponseData {
  address: string;
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
  const api = useApi({
    baseURL:
      'https://return-participant-listings-icon.trycloudflare.com/api/v1',
    defaultHeaders: {},
    timeout: 10000,
    retries: 3,
  });

  const getCompany = useCallback(
    async (request: CompanyRequest) => {
      try {
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
        const companyData: CompanyResponseData[] = response.data?.data?.data;

        // Transform API response to match our global state format
        const transformedData: CompanyData[] = companyData?.map((company) => ({
          id: company.id,
          name: company.name,
          address: company.address,
          coordinate: company.coordinate,
          description_en: company.description_en,
          description_id: company.description_id,
          location: company.location,
          main_image: company.main_image,
          data: company.data,
        }));

        actions.fetchCompaniesSuccess(transformedData);
        return transformedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch companies';
        actions.fetchCompaniesError(errorMessage);
        throw error;
      }
    },
    [actions, api]
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
