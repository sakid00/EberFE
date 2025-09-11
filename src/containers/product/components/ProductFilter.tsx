import { Box, Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styles } from '../style';
import { ProductFilterProps } from '../types';
import FilterSelect from './FilterSelect';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks/useTranslation';

const ProductFilter: React.FC<ProductFilterProps> = ({
  productTypes,
  productApplications,
  isSeeAllProduct,
  setIsSeeAllProduct,
  filterByType,
  setFilterByType,
  filterByApplication,
  searchQuery,
  setSearchQuery,
  handleChangeFilterByType,
  handleChangeApplication,
}) => {
  const { t } = useTranslation();
  const handleSeeAllToggle = () => {
    setIsSeeAllProduct(!isSeeAllProduct);
    setFilterByType([]);
    setSearchQuery('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim()) {
      setIsSeeAllProduct(false);
    }
  };
  const { type } = useDeviceType();

  return (
    <Box sx={styles.filterContainer(type)}>
      <Box sx={styles.filterButtonContainer(type)}>
        <Button
          size="small"
          variant="outlined"
          sx={styles.getFilterButtonStyle(isSeeAllProduct, type)}
          onClick={handleSeeAllToggle}
        >
          {t('product.see_all_product')}
        </Button>

        <FilterSelect
          id="type-of-product"
          value={filterByType}
          onChange={handleChangeFilterByType}
          options={productTypes}
          placeholder={t('product.type_of_product')}
          hasSelection={filterByType.length > 0}
        />

        <FilterSelect
          id="application"
          value={filterByApplication}
          onChange={handleChangeApplication}
          options={productApplications}
          placeholder={t('product.application')}
          hasSelection={filterByApplication.length > 0}
          isApplication={true}
        />
      </Box>

      <TextField
        id="search-product"
        placeholder={t('product.search_by_application_product_code_or_feature')}
        value={searchQuery}
        onChange={handleSearchChange}
        sx={styles.searchField(type)}
        slotProps={{
          input: {
            startAdornment: <Search sx={styles.searchIcon} />,
            sx: styles.searchInput,
          },
        }}
      />
    </Box>
  );
};

export default ProductFilter;
