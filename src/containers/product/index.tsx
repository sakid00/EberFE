import { Box, Pagination, Stack, Typography } from '@mui/material';
import ReqProductModal from '@/components/ReqProductModal/index';
import { CustomizationHeader, ProductFilter, ProductTable } from './components';
import { styles } from './style';
import { ProductContainerProps } from './types';
import { useRouter } from 'next/navigation';
import ReqProductSent from '@/components/ReqProductSent/index';
import { useDeviceType } from '@/hooks';

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
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const { type } = useDeviceType();
  const router = useRouter();
  const handleCustomProductClick = () => {
    router.push('/product/submit');
  };
  return (
    <>
      <Box sx={styles.mainContainer(type)}>
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

        <ProductTable cellTitles={cellTitles} rows={rows} />
      </Box>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box sx={styles.paginationContainer(type)}>
          {/* Pagination Info - Hide on mobile, show on tablet and desktop */}
          {type !== 'mobile' && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={styles.paginationInfo(type)}
            >
              Showing{' '}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{' '}
              products
            </Typography>
          )}

          {/* Mobile pagination info - compact version */}
          {type === 'mobile' && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={styles.paginationInfoMobile}
            >
              {currentPage} of {totalPages}
            </Typography>
          )}

          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={onPageChange}
              color="primary"
              size={type === 'mobile' ? 'small' : 'large'}
              showFirstButton={type !== 'mobile'}
              showLastButton={type !== 'mobile'}
              siblingCount={type === 'mobile' ? 1 : 2}
              boundaryCount={type === 'mobile' ? 1 : 2}
              sx={styles.pagination(type)}
            />
          </Stack>
        </Box>
      )}

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
