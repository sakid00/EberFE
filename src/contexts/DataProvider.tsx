'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// ===== CAREER API TYPES =====
export interface CareerData {
  id: number;
  position: string;
  location: string;
  type: 'fulltime' | 'parttime' | 'internship' | 'contract';
  description_en: string;
  description_id: string;
}

export interface CareerState {
  careers: CareerData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// ===== PRODUCT API TYPES =====
export interface ProductData {
  id: number;
  code: string;
  application: string;
  application_en: string | null;
  application_id: string | null;
  performanceFeature_en: string | null;
  performanceFeature_id: string | null;
  type: string;
  it_mfg: string | null;
  segment: string | null;
  sbu_name: string | null;
  grp_name: string | null;
  grp_sbu: string | null;
  coid: string | null;
}

export interface ProductFilters {
  segments: string[];
  grpSbus: string[];
  sbuNames: string[];
  grpNames: string[];
}

export interface ProductPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ProductState {
  products: ProductData[];
  filters: ProductFilters;
  pagination: ProductPagination | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// ===== COMPANY API TYPES =====
export interface CompanyData {
  id: number;
  name: string;
  address_en: string;
  address_id: string;
  coordinate: string;
  description_en: string;
  description_id: string;
  location: string;
  main_image: string;
  data: CompanyDetailData;
}

export interface CompanyDetailData {
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
  box_1: { data: InfoBox1Data[] };
  box_2: { data: InfoBox2Data[] };
  images_1: ImagesData[];
  images_2: ImagesData[];
  images_3: ImagesData[];
  p: ProductApplicationResponseData;
}

export interface InfoBox1Data {
  data_en: string;
  data_id: string;
  name_en: string;
  name_id: string;
}

export interface InfoBox2Data {
  data: string;
  name: string;
}

export interface ImagesData {
  title: string;
  url: string;
}

interface ProductApplicationResponseData {
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
}

export interface CompanyState {
  companies: CompanyData[];
  companyDetail: CompanyDetailData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// ===== ACTIVITY API TYPES =====
export interface ActivityData {
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

export interface ActivityState {
  activities: ActivityData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
}

// ===== CERTIFICATE API TYPES =====
export interface CertificateData {
  id: number;
  name: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateState {
  certificates: CertificateData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
}

// ===== NEXT API TYPES (PLACEHOLDER) =====
// TODO: Replace these with your actual API response structure
export interface NextApiData {
  id: number;
  title: string;
  content: string;
  // Add more fields as needed
}

export interface NextApiState {
  data: NextApiData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// ===== COMBINED STATE =====
export interface GlobalState {
  career: CareerState;
  product: ProductState;
  company: CompanyState;
  activity: ActivityState;
  certificate: CertificateState;
  nextApi: NextApiState;
}

// ===== ACTION TYPES =====
type DataAction =
  // Career Actions
  | { type: 'CAREER_FETCH_START' }
  | { type: 'CAREER_FETCH_SUCCESS'; payload: CareerData[] }
  | { type: 'CAREER_FETCH_ERROR'; payload: string }
  | { type: 'CAREER_CLEAR_ERROR' }
  | { type: 'CAREER_RESET' }

  // Product Actions
  | { type: 'PRODUCT_FETCH_START' }
  | {
      type: 'PRODUCT_FETCH_SUCCESS';
      payload: {
        products: ProductData[];
        pagination: ProductPagination;
      };
    }
  | { type: 'PRODUCT_FETCH_ERROR'; payload: string }
  | { type: 'PRODUCT_FILTERS_SUCCESS'; payload: ProductFilters }
  | { type: 'PRODUCT_CLEAR_ERROR' }
  | { type: 'PRODUCT_RESET' }

  // Company Actions
  | { type: 'COMPANY_FETCH_START' }
  | { type: 'COMPANY_FETCH_SUCCESS'; payload: CompanyData[] }
  | { type: 'COMPANY_DETAIL_FETCH_SUCCESS'; payload: CompanyDetailData }
  | { type: 'COMPANY_FETCH_ERROR'; payload: string }
  | { type: 'COMPANY_CLEAR_ERROR' }
  | { type: 'COMPANY_RESET' }

  // Activity Actions
  | { type: 'ACTIVITY_FETCH_START' }
  | {
      type: 'ACTIVITY_FETCH_SUCCESS';
      payload: {
        activities: ActivityData[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
        };
      };
    }
  | { type: 'ACTIVITY_FETCH_ERROR'; payload: string }
  | { type: 'ACTIVITY_CLEAR_ERROR' }
  | { type: 'ACTIVITY_RESET' }

  // Certificate Actions
  | { type: 'CERTIFICATE_FETCH_START' }
  | {
      type: 'CERTIFICATE_FETCH_SUCCESS';
      payload: {
        certificates: CertificateData[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
        };
      };
    }
  | { type: 'CERTIFICATE_FETCH_ERROR'; payload: string }
  | { type: 'CERTIFICATE_CLEAR_ERROR' }
  | { type: 'CERTIFICATE_RESET' }

  // Next API Actions (PLACEHOLDER)
  | { type: 'NEXT_API_FETCH_START' }
  | { type: 'NEXT_API_FETCH_SUCCESS'; payload: NextApiData[] }
  | { type: 'NEXT_API_FETCH_ERROR'; payload: string }
  | { type: 'NEXT_API_CLEAR_ERROR' }
  | { type: 'NEXT_API_RESET' }

  // Global Actions
  | { type: 'RESET_ALL_DATA' };

// ===== CONTEXT TYPE =====
interface DataContextType {
  state: GlobalState;
  actions: {
    // Career Actions
    careerFetchStart: () => void;
    careerFetchSuccess: (careers: CareerData[]) => void;
    careerFetchError: (error: string) => void;
    careerClearError: () => void;
    careerReset: () => void;

    // Product Actions
    productFetchStart: () => void;
    productFetchSuccess: (
      products: ProductData[],
      pagination: ProductPagination
    ) => void;
    productFetchError: (error: string) => void;
    productFiltersSuccess: (filters: ProductFilters) => void;
    productClearError: () => void;
    productReset: () => void;

    // Company Actions
    companyFetchStart: () => void;
    companyFetchSuccess: (companies: CompanyData[]) => void;
    companyDetailFetchSuccess: (companyDetail: CompanyDetailData) => void;
    companyFetchError: (error: string) => void;
    companyClearError: () => void;
    companyReset: () => void;

    // Activity Actions
    activityFetchStart: () => void;
    activityFetchSuccess: (
      activities: ActivityData[],
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      }
    ) => void;
    activityFetchError: (error: string) => void;
    activityClearError: () => void;
    activityReset: () => void;

    // Certificate Actions
    certificateFetchStart: () => void;
    certificateFetchSuccess: (
      certificates: CertificateData[],
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      }
    ) => void;
    certificateFetchError: (error: string) => void;
    certificateClearError: () => void;
    certificateReset: () => void;

    // Next API Actions (PLACEHOLDER)
    nextApiFetchStart: () => void;
    nextApiFetchSuccess: (data: NextApiData[]) => void;
    nextApiFetchError: (error: string) => void;
    nextApiClearError: () => void;
    nextApiReset: () => void;

    // Global Actions
    resetAllData: () => void;
  };
}

// ===== INITIAL STATE =====
const initialCareerState: CareerState = {
  careers: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const initialProductState: ProductState = {
  products: [],
  filters: {
    segments: [],
    grpSbus: [],
    sbuNames: [],
    grpNames: [],
  },
  pagination: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const initialCompanyState: CompanyState = {
  companies: [],
  companyDetail: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const initialActivityState: ActivityState = {
  activities: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  pagination: null,
};

const initialCertificateState: CertificateState = {
  certificates: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
  pagination: null,
};

const initialNextApiState: NextApiState = {
  data: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const initialState: GlobalState = {
  career: initialCareerState,
  product: initialProductState,
  company: initialCompanyState,
  activity: initialActivityState,
  certificate: initialCertificateState,
  nextApi: initialNextApiState,
};

// ===== REDUCER =====
function dataReducer(state: GlobalState, action: DataAction): GlobalState {
  switch (action.type) {
    // ===== CAREER ACTIONS =====
    case 'CAREER_FETCH_START':
      return {
        ...state,
        career: {
          ...state.career,
          isLoading: true,
          error: null,
        },
      };

    case 'CAREER_FETCH_SUCCESS':
      return {
        ...state,
        career: {
          ...state.career,
          careers: action.payload,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'CAREER_FETCH_ERROR':
      return {
        ...state,
        career: {
          ...state.career,
          isLoading: false,
          error: action.payload,
          careers: [],
        },
      };

    case 'CAREER_CLEAR_ERROR':
      return {
        ...state,
        career: {
          ...state.career,
          error: null,
        },
      };

    case 'CAREER_RESET':
      return {
        ...state,
        career: initialCareerState,
      };

    // ===== PRODUCT ACTIONS =====
    case 'PRODUCT_FETCH_START':
      return {
        ...state,
        product: {
          ...state.product,
          isLoading: true,
          error: null,
        },
      };

    case 'PRODUCT_FETCH_SUCCESS':
      return {
        ...state,
        product: {
          ...state.product,
          products: action.payload.products,
          pagination: action.payload.pagination,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'PRODUCT_FETCH_ERROR':
      return {
        ...state,
        product: {
          ...state.product,
          isLoading: false,
          error: action.payload,
          products: [],
          pagination: null,
        },
      };

    case 'PRODUCT_FILTERS_SUCCESS':
      return {
        ...state,
        product: {
          ...state.product,
          filters: action.payload,
        },
      };

    case 'PRODUCT_CLEAR_ERROR':
      return {
        ...state,
        product: {
          ...state.product,
          error: null,
        },
      };

    case 'PRODUCT_RESET':
      return {
        ...state,
        product: initialProductState,
      };

    // ===== COMPANY ACTIONS =====
    case 'COMPANY_FETCH_START':
      return {
        ...state,
        company: {
          ...state.company,
          isLoading: true,
          error: null,
        },
      };

    case 'COMPANY_FETCH_SUCCESS':
      return {
        ...state,
        company: {
          ...state.company,
          companies: action.payload,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'COMPANY_DETAIL_FETCH_SUCCESS':
      return {
        ...state,
        company: {
          ...state.company,
          companyDetail: action.payload,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'COMPANY_FETCH_ERROR':
      return {
        ...state,
        company: {
          ...state.company,
          isLoading: false,
          error: action.payload,
          companies: [],
          companyDetail: null,
        },
      };

    case 'COMPANY_CLEAR_ERROR':
      return {
        ...state,
        company: {
          ...state.company,
          error: null,
        },
      };

    case 'COMPANY_RESET':
      return {
        ...state,
        company: initialCompanyState,
      };

    // ===== ACTIVITY ACTIONS =====
    case 'ACTIVITY_FETCH_START':
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: true,
          error: null,
        },
      };

    case 'ACTIVITY_FETCH_SUCCESS':
      return {
        ...state,
        activity: {
          ...state.activity,
          activities: action.payload.activities,
          pagination: action.payload.pagination,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'ACTIVITY_FETCH_ERROR':
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: false,
          error: action.payload,
          activities: [],
        },
      };

    case 'ACTIVITY_CLEAR_ERROR':
      return {
        ...state,
        activity: {
          ...state.activity,
          error: null,
        },
      };

    case 'ACTIVITY_RESET':
      return {
        ...state,
        activity: initialActivityState,
      };

    // ===== CERTIFICATE ACTIONS =====
    case 'CERTIFICATE_FETCH_START':
      return {
        ...state,
        certificate: {
          ...state.certificate,
          isLoading: true,
          error: null,
        },
      };

    case 'CERTIFICATE_FETCH_SUCCESS':
      return {
        ...state,
        certificate: {
          ...state.certificate,
          certificates: action.payload.certificates,
          pagination: action.payload.pagination,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'CERTIFICATE_FETCH_ERROR':
      return {
        ...state,
        certificate: {
          ...state.certificate,
          isLoading: false,
          error: action.payload,
          certificates: [],
        },
      };

    case 'CERTIFICATE_CLEAR_ERROR':
      return {
        ...state,
        certificate: {
          ...state.certificate,
          error: null,
        },
      };

    case 'CERTIFICATE_RESET':
      return {
        ...state,
        certificate: initialCertificateState,
      };

    // ===== NEXT API ACTIONS (PLACEHOLDER) =====
    case 'NEXT_API_FETCH_START':
      return {
        ...state,
        nextApi: {
          ...state.nextApi,
          isLoading: true,
          error: null,
        },
      };

    case 'NEXT_API_FETCH_SUCCESS':
      return {
        ...state,
        nextApi: {
          ...state.nextApi,
          data: action.payload,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        },
      };

    case 'NEXT_API_FETCH_ERROR':
      return {
        ...state,
        nextApi: {
          ...state.nextApi,
          isLoading: false,
          error: action.payload,
          data: [],
        },
      };

    case 'NEXT_API_CLEAR_ERROR':
      return {
        ...state,
        nextApi: {
          ...state.nextApi,
          error: null,
        },
      };

    case 'NEXT_API_RESET':
      return {
        ...state,
        nextApi: initialNextApiState,
      };

    // ===== GLOBAL ACTIONS =====
    case 'RESET_ALL_DATA':
      return initialState;

    default:
      return state;
  }
}

// ===== CONTEXT =====
const DataContext = createContext<DataContextType | undefined>(undefined);

// ===== PROVIDER COMPONENT =====
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const actions = {
    // Career Actions
    careerFetchStart: () => dispatch({ type: 'CAREER_FETCH_START' }),
    careerFetchSuccess: (careers: CareerData[]) =>
      dispatch({ type: 'CAREER_FETCH_SUCCESS', payload: careers }),
    careerFetchError: (error: string) =>
      dispatch({ type: 'CAREER_FETCH_ERROR', payload: error }),
    careerClearError: () => dispatch({ type: 'CAREER_CLEAR_ERROR' }),
    careerReset: () => dispatch({ type: 'CAREER_RESET' }),

    // Product Actions
    productFetchStart: () => dispatch({ type: 'PRODUCT_FETCH_START' }),
    productFetchSuccess: (
      products: ProductData[],
      pagination: ProductPagination
    ) =>
      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        payload: { products, pagination },
      }),
    productFetchError: (error: string) =>
      dispatch({ type: 'PRODUCT_FETCH_ERROR', payload: error }),
    productFiltersSuccess: (filters: ProductFilters) =>
      dispatch({ type: 'PRODUCT_FILTERS_SUCCESS', payload: filters }),
    productClearError: () => dispatch({ type: 'PRODUCT_CLEAR_ERROR' }),
    productReset: () => dispatch({ type: 'PRODUCT_RESET' }),

    // Company Actions
    companyFetchStart: () => dispatch({ type: 'COMPANY_FETCH_START' }),
    companyFetchSuccess: (companies: CompanyData[]) =>
      dispatch({ type: 'COMPANY_FETCH_SUCCESS', payload: companies }),
    companyDetailFetchSuccess: (companyDetail: CompanyDetailData) =>
      dispatch({
        type: 'COMPANY_DETAIL_FETCH_SUCCESS',
        payload: companyDetail,
      }),
    companyFetchError: (error: string) =>
      dispatch({ type: 'COMPANY_FETCH_ERROR', payload: error }),
    companyClearError: () => dispatch({ type: 'COMPANY_CLEAR_ERROR' }),
    companyReset: () => dispatch({ type: 'COMPANY_RESET' }),

    // Activity Actions
    activityFetchStart: () => dispatch({ type: 'ACTIVITY_FETCH_START' }),
    activityFetchSuccess: (
      activities: ActivityData[],
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      }
    ) =>
      dispatch({
        type: 'ACTIVITY_FETCH_SUCCESS',
        payload: { activities, pagination },
      }),
    activityFetchError: (error: string) =>
      dispatch({ type: 'ACTIVITY_FETCH_ERROR', payload: error }),
    activityClearError: () => dispatch({ type: 'ACTIVITY_CLEAR_ERROR' }),
    activityReset: () => dispatch({ type: 'ACTIVITY_RESET' }),

    // Certificate Actions
    certificateFetchStart: () => dispatch({ type: 'CERTIFICATE_FETCH_START' }),
    certificateFetchSuccess: (
      certificates: CertificateData[],
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      }
    ) =>
      dispatch({
        type: 'CERTIFICATE_FETCH_SUCCESS',
        payload: { certificates, pagination },
      }),
    certificateFetchError: (error: string) =>
      dispatch({ type: 'CERTIFICATE_FETCH_ERROR', payload: error }),
    certificateClearError: () => dispatch({ type: 'CERTIFICATE_CLEAR_ERROR' }),
    certificateReset: () => dispatch({ type: 'CERTIFICATE_RESET' }),

    // Next API Actions (PLACEHOLDER)
    nextApiFetchStart: () => dispatch({ type: 'NEXT_API_FETCH_START' }),
    nextApiFetchSuccess: (data: NextApiData[]) =>
      dispatch({ type: 'NEXT_API_FETCH_SUCCESS', payload: data }),
    nextApiFetchError: (error: string) =>
      dispatch({ type: 'NEXT_API_FETCH_ERROR', payload: error }),
    nextApiClearError: () => dispatch({ type: 'NEXT_API_CLEAR_ERROR' }),
    nextApiReset: () => dispatch({ type: 'NEXT_API_RESET' }),

    // Global Actions
    resetAllData: () => dispatch({ type: 'RESET_ALL_DATA' }),
  };

  const contextValue: DataContextType = {
    state,
    actions,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// ===== CUSTOM HOOKS =====

// Main hook to access the data context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

// Specialized hook for career data (backward compatibility)
export const useCareerContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.career,
    actions: {
      fetchCareersStart: actions.careerFetchStart,
      fetchCareersSuccess: actions.careerFetchSuccess,
      fetchCareersError: actions.careerFetchError,
      clearError: actions.careerClearError,
      resetState: actions.careerReset,
    },
  };
};

// Specialized hook for product data
export const useProductContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.product,
    actions: {
      fetchProductsStart: actions.productFetchStart,
      fetchProductsSuccess: actions.productFetchSuccess,
      fetchProductsError: actions.productFetchError,
      fetchFiltersSuccess: actions.productFiltersSuccess,
      clearError: actions.productClearError,
      resetState: actions.productReset,
    },
  };
};

// Specialized hook for company data
export const useCompanyContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.company,
    actions: {
      fetchCompaniesStart: actions.companyFetchStart,
      fetchCompaniesSuccess: actions.companyFetchSuccess,
      fetchCompanyDetailSuccess: actions.companyDetailFetchSuccess,
      fetchCompaniesError: actions.companyFetchError,
      clearError: actions.companyClearError,
      resetState: actions.companyReset,
    },
  };
};

// Specialized hook for activity data
export const useActivityContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.activity,
    actions: {
      fetchActivitiesStart: actions.activityFetchStart,
      fetchActivitiesSuccess: actions.activityFetchSuccess,
      fetchActivitiesError: actions.activityFetchError,
      clearError: actions.activityClearError,
      resetState: actions.activityReset,
    },
  };
};

// Specialized hook for certificate data
export const useCertificateContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.certificate,
    actions: {
      fetchCertificatesStart: actions.certificateFetchStart,
      fetchCertificatesSuccess: actions.certificateFetchSuccess,
      fetchCertificatesError: actions.certificateFetchError,
      clearError: actions.certificateClearError,
      resetState: actions.certificateReset,
    },
  };
};

// Specialized hook for next API data (PLACEHOLDER)
export const useNextApiContext = () => {
  const { state, actions } = useDataContext();

  return {
    state: state.nextApi,
    actions: {
      fetchStart: actions.nextApiFetchStart,
      fetchSuccess: actions.nextApiFetchSuccess,
      fetchError: actions.nextApiFetchError,
      clearError: actions.nextApiClearError,
      resetState: actions.nextApiReset,
    },
  };
};

// Read-only hooks for components that only need to consume data
export const useCareerState = () => {
  const { state } = useDataContext();
  return {
    careers: state.career.careers,
    isLoading: state.career.isLoading,
    error: state.career.error,
    lastUpdated: state.career.lastUpdated,
    hasCareers: state.career.careers.length > 0,
  };
};

export const useProductState = () => {
  const { state } = useDataContext();
  return {
    products: state.product.products,
    filters: state.product.filters,
    pagination: state.product.pagination,
    isLoading: state.product.isLoading,
    error: state.product.error,
    lastUpdated: state.product.lastUpdated,
    hasProducts: state.product.products.length > 0,
    hasFilters:
      state.product.filters.segments.length > 0 ||
      state.product.filters.grpSbus.length > 0 ||
      state.product.filters.sbuNames.length > 0 ||
      state.product.filters.grpNames.length > 0,
  };
};

export const useActivityState = () => {
  const { state } = useDataContext();
  return {
    activities: state.activity.activities,
    isLoading: state.activity.isLoading,
    error: state.activity.error,
    lastUpdated: state.activity.lastUpdated,
    hasActivities: state.activity.activities.length > 0,
  };
};

export const useCertificateState = () => {
  const { state } = useDataContext();
  return {
    certificates: state.certificate.certificates,
    isLoading: state.certificate.isLoading,
    error: state.certificate.error,
    lastUpdated: state.certificate.lastUpdated,
    pagination: state.certificate.pagination,
    hasCertificates: state.certificate.certificates.length > 0,
  };
};

export const useNextApiState = () => {
  const { state } = useDataContext();
  return {
    data: state.nextApi.data,
    isLoading: state.nextApi.isLoading,
    error: state.nextApi.error,
    lastUpdated: state.nextApi.lastUpdated,
    hasData: state.nextApi.data.length > 0,
  };
};

// Export context for testing purposes
export { DataContext };
