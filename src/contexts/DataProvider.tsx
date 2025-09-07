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
  application_en: string;
  application_id: string;
  performanceFeature_en: string;
  performanceFeature_id: string;
  type: string;
}

export interface ProductFilters {
  types: string[];
  applications: string[];
}

export interface ProductState {
  products: ProductData[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// ===== COMPANY API TYPES =====
export interface CompanyData {
  id: number;
  name: string;
  address: string;
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
  | { type: 'PRODUCT_FETCH_SUCCESS'; payload: ProductData[] }
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
    productFetchSuccess: (products: ProductData[]) => void;
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
    types: [],
    applications: [],
  },
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
          products: action.payload,
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
    productFetchSuccess: (products: ProductData[]) =>
      dispatch({ type: 'PRODUCT_FETCH_SUCCESS', payload: products }),
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
    isLoading: state.product.isLoading,
    error: state.product.error,
    lastUpdated: state.product.lastUpdated,
    hasProducts: state.product.products.length > 0,
    hasFilters:
      state.product.filters.types.length > 0 ||
      state.product.filters.applications.length > 0,
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
