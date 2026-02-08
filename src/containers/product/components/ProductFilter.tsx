import { Box, Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { styles } from '../style';
import { ProductFilterProps } from '../types';
import FilterSelect from './FilterSelect';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks/useTranslation';

const ProductFilter: React.FC<ProductFilterProps> = ({
  segmentOptions,
  grpSbuOptions,
  sbuNameOptions,
  grpNameOptions,
  isSeeAllProduct,
  setIsSeeAllProduct,
  filterBySegment,
  setFilterBySegment,
  filterByGrpSbu,
  setFilterByGrpSbu,
  filterBySbuName,
  setFilterBySbuName,
  filterByGrpName,
  setFilterByGrpName,
  searchQuery,
  setSearchQuery,
  handleChangeSegment,
  handleChangeGrpSbu,
  handleChangeSbuName,
  handleChangeGrpName,
}) => {
  const { t } = useTranslation();
  const handleSeeAllToggle = () => {
    setIsSeeAllProduct(!isSeeAllProduct);
    setFilterBySegment([]);
    setFilterByGrpSbu([]);
    setFilterBySbuName([]);
    setFilterByGrpName([]);
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
          id="segment"
          value={filterBySegment}
          onChange={handleChangeSegment}
          options={segmentOptions}
          placeholder={t('product.filter_segment')}
          hasSelection={filterBySegment.length > 0}
        />

        <FilterSelect
          id="grp-sbu"
          value={filterByGrpSbu}
          onChange={handleChangeGrpSbu}
          options={grpSbuOptions}
          placeholder={t('product.filter_group_sbu')}
          hasSelection={filterByGrpSbu.length > 0}
        />

        <FilterSelect
          id="sbu-name"
          value={filterBySbuName}
          onChange={handleChangeSbuName}
          options={sbuNameOptions}
          placeholder={t('product.filter_sbu_name')}
          hasSelection={filterBySbuName.length > 0}
        />

        <FilterSelect
          id="grp-name"
          value={filterByGrpName}
          onChange={handleChangeGrpName}
          options={grpNameOptions}
          placeholder={t('product.filter_group_name')}
          hasSelection={filterByGrpName.length > 0}
        />
      </Box>

      <TextField
        id="search-product"
        placeholder={t('product.search_product')}
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
