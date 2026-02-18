import { SelectChangeEvent } from '@mui/material';

export interface IRowData {
  coid: string;
  productCode: string;
  group: string;
  segment: string;
  groupSbu: string;
  sbuName: string;
  groupName: string;
  getMoreDetail: React.ReactNode;
}
export interface ProductContainerProps {
  segmentOptions: string[];
  grpSbuOptions: string[];
  sbuNameOptions: string[];
  grpNameOptions: string[];
  cellTitles: string[];
  rows: IRowData[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterBySegment: string[];
  setFilterBySegment: (value: string[]) => void;
  filterByGrpSbu: string[];
  setFilterByGrpSbu: (value: string[]) => void;
  filterBySbuName: string[];
  setFilterBySbuName: (value: string[]) => void;
  filterByGrpName: string[];
  setFilterByGrpName: (value: string[]) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleChangeSegment: (event: SelectChangeEvent<string[]>) => void;
  handleChangeGrpSbu: (event: SelectChangeEvent<string[]>) => void;
  handleChangeSbuName: (event: SelectChangeEvent<string[]>) => void;
  handleChangeGrpName: (event: SelectChangeEvent<string[]>) => void;
  // Pagination props
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  // Loading state
  isLoading?: boolean;
}

export interface CustomizationHeaderProps {
  onCustomProductClick?: () => void;
}

export interface ProductFilterProps {
  segmentOptions: string[];
  grpSbuOptions: string[];
  sbuNameOptions: string[];
  grpNameOptions: string[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterBySegment: string[];
  setFilterBySegment: (value: string[]) => void;
  filterByGrpSbu: string[];
  setFilterByGrpSbu: (value: string[]) => void;
  filterBySbuName: string[];
  setFilterBySbuName: (value: string[]) => void;
  filterByGrpName: string[];
  setFilterByGrpName: (value: string[]) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleChangeSegment: (event: SelectChangeEvent<string[]>) => void;
  handleChangeGrpSbu: (event: SelectChangeEvent<string[]>) => void;
  handleChangeSbuName: (event: SelectChangeEvent<string[]>) => void;
  handleChangeGrpName: (event: SelectChangeEvent<string[]>) => void;
}

export interface ProductTableProps {
  cellTitles: string[];
  rows: IRowData[];
  onRequestProductClick?: () => void;
  isLoading?: boolean;
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
