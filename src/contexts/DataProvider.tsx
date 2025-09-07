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

const initialNextApiState: NextApiState = {
  data: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const initialState: GlobalState = {
  career: initialCareerState,
  product: initialProductState,
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
