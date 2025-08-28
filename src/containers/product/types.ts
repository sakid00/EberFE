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
  cellTitles: string[];
  rows: IRowData[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterByType: string[];
  setFilterByType: (value: string[]) => void;
  filterByApplication: string[];
  handleChangeFilterByType: (event: SelectChangeEvent<string[]>) => void;
  handleChangeApplication: (event: SelectChangeEvent<string[]>) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export interface CustomizationHeaderProps {
  onCustomProductClick?: () => void;
}

export interface ProductFilterProps {
  productTypes: string[];
  isSeeAllProduct: boolean;
  setIsSeeAllProduct: (value: boolean) => void;
  filterByType: string[];
  setFilterByType: (value: string[]) => void;
  filterByApplication: string[];
  handleChangeFilterByType: (event: SelectChangeEvent<string[]>) => void;
  handleChangeApplication: (event: SelectChangeEvent<string[]>) => void;
}

export interface ProductTableProps {
  cellTitles: string[];
  rows: IRowData[];
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
