'use client';
import ProductContainer from '../../containers/product';
import { Button, SelectChangeEvent, Box, Typography } from '@mui/material';
import emailIcon from '../../../public/icon/email-no-bg.svg';
import Image from 'next/image';
import {
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from 'react';
import useProduct from '../../hooks/useProduct';
import { useTranslation } from '../../hooks';
import { useDeviceType } from '../../hooks/useDeviceType';
import { TableSkeleton } from '@/components/Skeleton';
import { useSearchParams } from 'next/navigation';
import ReqProductSent from '@/components/ReqProductSent/index';
import ReqProductModal from '@/components/ReqProductModal/index';

const cellTitles = [
  'product.product_table.product_code',
  'product.product_table.application',
  'product.product_table.performance_feature',
  'product.product_table.type_of_product',
  'product.product_table.get_more_detail',
];

export interface IrowData {
  productCode: string;
  application: string;
  perfFeature: string;
  typeOfProd: string;
  getMoreDetail: ReactNode;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const ProductsPageContent = () => {
  const { language, t } = useTranslation();
  const { type } = useDeviceType();
  const { getProduct, products, filters, isLoading, error } = useProduct();
  const searchParams = useSearchParams();
  const [isSeeAllProduct, setIsSeeAllProduct] = useState<boolean>(true);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filterByApplication, setFilterByApplication] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openReqModal, setOpenReqModal] = useState<boolean>(false);
  const [openSentModal, setOpenSentModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Dynamic filter data from API
  const productTypes = filters.types.length > 0 ? filters.types : [];

  const productApplications =
    filters.applications.length > 0 ? filters.applications : [];

  // Fetch products from API with filters
  const fetchProducts = useCallback(() => {
    console.log('Fetching products from API...');
    const requestParams: {
      page: number;
      pageSize: number;
      type?: string;
      application?: string;
    } = {
      page: 1,
      pageSize: 100, // Get a large number to show all products
    };

    // Add filters if they are selected
    if (filterByType.length > 0) {
      requestParams.type = filterByType.join(','); // Join multiple types
    }
    if (filterByApplication.length > 0) {
      requestParams.application = filterByApplication.join(','); // Join multiple applications
    }

    getProduct(requestParams).catch((error) => {
      console.error('Failed to fetch products:', error);
    });
  }, [getProduct, filterByType, filterByApplication]);

  // Fetch products when filters change or on component mount
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByApplication, filterByType]);

  // Check access parameter from URL
  useEffect(() => {
    const accessParam = searchParams.get('access');

    if (accessParam) {
      // User has access parameter, save it to localStorage and allow access
      localStorage.setItem('productAccessToken', accessParam);
      setHasAccess(true);
    } else {
      // No access parameter, check if user has access token in localStorage
      const savedAccessToken = localStorage.getItem('productAccessToken');
      if (savedAccessToken) {
        // User has saved access token, allow access to product page
        setHasAccess(true);
      } else {
        // No access token, check if user has already submitted form
        const hasSubmittedForm = localStorage.getItem(
          'hasSubmittedProductForm'
        );
        if (hasSubmittedForm) {
          // User has already submitted form, show ReqProductSent modal
          setFormSubmitted(true);
          setOpenSentModal(true);
        } else {
          // First time user, show ReqProductModal
          setOpenReqModal(true);
        }
      }
    }
  }, [searchParams]);

  const createData = ({
    productCode,
    application,
    perfFeature,
    typeOfProd,
    getMoreDetail,
  }: IrowData) => {
    return { productCode, application, perfFeature, typeOfProd, getMoreDetail };
  };

  const handleTokenReceived = () => {
    // Token has been received, can be used for future enhancements
    console.log('User token received successfully');
    setFormSubmitted(true);
  };

  const handleRequestClick = useCallback(() => {
    // Show ReqProductSent modal when user clicks request product button
    setOpenSentModal(true);
  }, [setOpenSentModal]);

  // Transform API data to table rows with search filtering and pagination
  const { paginatedRows, totalPages, totalItems } = useMemo(() => {
    if (products?.length > 0) {
      let filteredProducts = products;

      // Apply search filter if search query exists
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filteredProducts = products.filter((product) => {
          const application =
            language === 'en' ? product.application_en : product.application_id;
          const perfFeature =
            language === 'en'
              ? product.performanceFeature_en
              : product.performanceFeature_id;

          return (
            (product.code?.toLowerCase() || '').includes(query) ||
            (application?.toLowerCase() || '').includes(query) ||
            (perfFeature?.toLowerCase() || '').includes(query) ||
            (product.type?.toLowerCase() || '').includes(query)
          );
        });
      }

      // Calculate pagination
      const totalItems = filteredProducts.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      const paginatedRows = paginatedProducts.map((product) =>
        createData({
          productCode: product.code,
          application:
            language === 'en' ? product.application_en : product.application_id,
          perfFeature:
            language === 'en'
              ? product.performanceFeature_en
              : product.performanceFeature_id,
          typeOfProd: product.type,
          getMoreDetail: (
            <Button
              variant="text"
              sx={{
                color: '#784791',
                fontSize: '1em',
                fontWeight: 400,
                textTransform: 'none',
              }}
              onClick={handleRequestClick}
              startIcon={
                <Image src={emailIcon} width={16} height={16} alt="email" />
              }
            >
              {t('product.request_product')}
            </Button>
          ),
        })
      );

      return { paginatedRows, totalPages, totalItems };
    }
    // Fallback static data
    const fallbackRows = [
      createData({
        productCode: 'Sample Product',
        application: 'Sample Application',
        perfFeature: 'Sample Feature',
        typeOfProd: 'Sample Type',
        getMoreDetail: (
          <Button
            variant="text"
            sx={{
              color: '#784791',
              fontSize: '1em',
              fontWeight: 400,
              textTransform: 'none',
            }}
            onClick={handleRequestClick}
            startIcon={
              <Image src={emailIcon} width={16} height={16} alt="email" />
            }
          >
            {t('product.request_product')}
          </Button>
        ),
      }),
    ];
    return { paginatedRows: fallbackRows, totalPages: 1, totalItems: 1 };
  }, [
    products,
    language,
    searchQuery,
    handleRequestClick,
    currentPage,
    itemsPerPage,
    t,
  ]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterByType, filterByApplication, searchQuery]);

  const handleChangeFilterByType = (
    event: SelectChangeEvent<typeof filterByType>
  ) => {
    setIsSeeAllProduct(false);
    const newFilterByType =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterByType(newFilterByType);
  };

  const handleChangeApplication = (
    event: SelectChangeEvent<typeof filterByApplication>
  ) => {
    setIsSeeAllProduct(false);
    const newFilterByApplication =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterByApplication(newFilterByApplication);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Loading state with skeleton
  if (isLoading && products?.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
          {t('product.title')}
        </Typography>
        <TableSkeleton rows={10} columns={5} type={type} showHeader={true} />
      </Box>
    );
  }

  if (error && products?.length === 0) {
    console.warn('Product API error:', error);
  }

  // If user doesn't have access, show appropriate modal
  if (!hasAccess) {
    if (formSubmitted) {
      // Show ReqProductSent modal after form submission
      return (
        <ReqProductSent
          openModal={openSentModal}
          setOpenModal={setOpenSentModal}
        />
      );
    } else {
      // Show ReqProductModal for first time users
      return (
        <ReqProductModal
          openModal={openReqModal}
          setOpenModal={setOpenReqModal}
          onSuccessfulSubmission={handleTokenReceived}
          onShowSentModal={() => setOpenSentModal(true)}
        />
      );
    }
  }

  return (
    <>
      <ProductContainer
        productTypes={productTypes}
        productApplications={productApplications}
        cellTitles={cellTitles}
        rows={paginatedRows}
        isSeeAllProduct={isSeeAllProduct}
        setIsSeeAllProduct={setIsSeeAllProduct}
        filterByType={filterByType}
        setFilterByType={setFilterByType}
        filterByApplication={filterByApplication}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleChangeFilterByType={handleChangeFilterByType}
        handleChangeApplication={handleChangeApplication}
        openReqModal={openReqModal}
        setOpenReqModal={setOpenReqModal}
        openSentModal={openSentModal}
        setOpenSentModal={setOpenSentModal}
        onTokenReceived={handleTokenReceived}
        onShowSentModal={() => setOpenSentModal(true)}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <ReqProductSent
        hasAccess={hasAccess}
        openModal={openSentModal}
        setOpenModal={setOpenSentModal}
      />
    </>
  );
};

// Main component with Suspense boundary
const ProductsPage = () => {
  const { type } = useDeviceType();

  return (
    <Suspense
      fallback={
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
            Loading...
          </Typography>
          <TableSkeleton rows={10} columns={5} type={type} showHeader={true} />
        </Box>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;
