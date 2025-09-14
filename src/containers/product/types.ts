import { SelectChangeEvent } from '@mui/material';

export interface IRowData {
  productCode: string;
  application: string;
  perfFeature: string;
  typeOfProd: string;
  getMoreDetail: React.ReactNode;
}
export interface ProductContainerProps {
  productTypes: string[];
  productApplications: string[];
  cellTitles: string[];
  rows: IRowData[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterByType: string[];
  setFilterByType: (value: string[]) => void;
  filterByApplication: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleChangeFilterByType: (event: SelectChangeEvent<string[]>) => void;
  handleChangeApplication: (event: SelectChangeEvent<string[]>) => void;
  openReqModal: boolean;
  setOpenReqModal: (value: boolean) => void;
  openSentModal: boolean;
  setOpenSentModal: (value: boolean) => void;
  onTokenReceived?: () => void;
  onShowSentModal?: () => void;
  // Pagination props
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export interface CustomizationHeaderProps {
  onCustomProductClick?: () => void;
}

export interface ProductFilterProps {
  productTypes: string[];
  productApplications: string[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterByType: string[];
  setFilterByType: (value: string[]) => void;
  filterByApplication: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleChangeFilterByType: (event: SelectChangeEvent<string[]>) => void;
  handleChangeApplication: (event: SelectChangeEvent<string[]>) => void;
}

export interface ProductTableProps {
  cellTitles: string[];
  rows: IRowData[];
  onRequestProductClick?: () => void;
}

export interface FilterSelectProps {
  id: string;
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  options: string[];
  placeholder: string;
  hasSelection: boolean;
  isApplication?: boolean;
}
