import { Box, Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styles } from '../style';
import { ProductFilterProps } from '../types';
import FilterSelect from './FilterSelect';

const ProductFilter: React.FC<ProductFilterProps> = ({
  productTypes,
  isSeeAllProduct,
  setIsSeeAllProduct,
  filterByType,
  setFilterByType,
  filterByApplication,
  handleChangeFilterByType,
  handleChangeApplication,
}) => {
  const handleSeeAllToggle = () => {
    setIsSeeAllProduct(!isSeeAllProduct);
    setFilterByType([]);
  };

  return (
    <Box sx={styles.filterContainer}>
      <Box sx={styles.filterButtonContainer}>
        <Button
          size="small"
          variant="outlined"
          sx={styles.getFilterButtonStyle(isSeeAllProduct)}
          onClick={handleSeeAllToggle}
        >
          See All Product
        </Button>

        <FilterSelect
          id="type-of-product"
          value={filterByType}
          onChange={handleChangeFilterByType}
          options={productTypes}
          placeholder="Type of product"
          hasSelection={filterByType.length > 0}
        />

        <FilterSelect
          id="application"
          value={filterByApplication}
          onChange={handleChangeApplication}
          options={productTypes}
          placeholder="Application"
          hasSelection={filterByApplication.length > 0}
          isApplication={true}
        />
      </Box>

      <TextField
        id="search-product"
        placeholder="Search Product"
        sx={styles.searchField}
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
