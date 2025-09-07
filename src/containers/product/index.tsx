import { Box } from '@mui/material';
import ReqProductModal from '@/components/ReqProductModal';
import { CustomizationHeader, ProductFilter, ProductTable } from './components';
import { styles } from './style';
import { ProductContainerProps } from './types';
import { useRouter } from 'next/navigation';
import ReqProductSent from '@/components/ReqProductSent';

const ProductContainer: React.FC<ProductContainerProps> = ({
  productApplications,
  productTypes,
  cellTitles,
  rows,
  isSeeAllProduct,
  setIsSeeAllProduct,
  filterByType,
  setFilterByType,
  filterByApplication,
  searchQuery,
  setSearchQuery,
  openReqModal,
  setOpenReqModal,
  openSentModal,
  setOpenSentModal,
  handleChangeFilterByType,
  handleChangeApplication,
  onTokenReceived,
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
          productApplications={productApplications}
          isSeeAllProduct={isSeeAllProduct}
          setIsSeeAllProduct={setIsSeeAllProduct}
          filterByType={filterByType}
          setFilterByType={setFilterByType}
          filterByApplication={filterByApplication}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleChangeFilterByType={handleChangeFilterByType}
          handleChangeApplication={handleChangeApplication}
        />

        <ProductTable
          cellTitles={cellTitles}
          rows={rows}
          onRequestProductClick={() => setOpenSentModal(true)}
        />
      </Box>

      <ReqProductModal
        openModal={openReqModal}
        setOpenModal={setOpenReqModal}
        onSuccessfulSubmission={onTokenReceived}
      />
      <ReqProductSent
        openModal={openSentModal}
        setOpenModal={setOpenSentModal}
      />
    </>
  );
};

export default ProductContainer;
