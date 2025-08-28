import { Box } from '@mui/material';
import ReqProductModal from '@/components/ReqProductModal';
import { CustomizationHeader, ProductFilter, ProductTable } from './components';
import { styles } from './style';
import { ProductContainerProps } from './types';
import { useRouter } from 'next/navigation';

const ProductContainer: React.FC<ProductContainerProps> = ({
  productTypes,
  cellTitles,
  rows,
  isSeeAllProduct,
  setIsSeeAllProduct,
  filterByType,
  setFilterByType,
  filterByApplication,
  openModal,
  setOpenModal,
  handleChangeFilterByType,
  handleChangeApplication,
}) => {
  const router = useRouter();
  const handleCustomProductClick = () => {
    router.push('/product/submit');
  };
  return (
    <>
      <Box sx={styles.mainContainer}>
        <CustomizationHeader onCustomProductClick={handleCustomProductClick} />

        <ProductFilter
          productTypes={productTypes}
          isSeeAllProduct={isSeeAllProduct}
          setIsSeeAllProduct={setIsSeeAllProduct}
          filterByType={filterByType}
          setFilterByType={setFilterByType}
          filterByApplication={filterByApplication}
          handleChangeFilterByType={handleChangeFilterByType}
          handleChangeApplication={handleChangeApplication}
        />

        <ProductTable cellTitles={cellTitles} rows={rows} />
      </Box>

      <ReqProductModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ProductContainer;
