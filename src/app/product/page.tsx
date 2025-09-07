'use client';
import ProductContainer from '@/containers/product';
import {
  Button,
  SelectChangeEvent,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import emailIcon from '@public/icon/email-no-bg.svg';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useMemo, useCallback } from 'react';
import useProduct from '@/hooks/useProduct';
import { useTranslation } from '@/hooks';

const cellTitles = [
  'Product Code',
  'Application',
  'Performance Feature',
  'Type of Product',
  'Get More Detail',
];

export interface IrowData {
  productCode: string;
  application: string;
  perfFeature: string;
  typeOfProd: string;
  getMoreDetail: ReactNode;
}

const ProductsPage = () => {
  const { language } = useTranslation();
  const { getProduct, products, filters, isLoading, error } = useProduct();
  const [isSeeAllProduct, setIsSeeAllProduct] = useState<boolean>(true);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filterByApplication, setFilterByApplication] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openReqModal, setOpenReqModal] = useState<boolean>(false);
  const [openSentModal, setOpenSentModal] = useState<boolean>(false);

  // Dynamic filter data from API
  const productTypes =
    filters.types.length > 0
      ? filters.types
      : [
          'Solvent-Base',
          'Water-Base',
          'Plasticizers',
          'n-BAC',
          'n-Butanol',
          'Acetic Acid',
        ];

  const productApplications =
    filters.applications.length > 0
      ? filters.applications
      : ['Industrial', 'Chemical', 'Manufacturing', 'Processing'];

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

  // Check if user has valid token and show modal on first visit
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const hasVisitedProduct = localStorage.getItem('hasVisitedProduct');

    if (!userToken && !hasVisitedProduct) {
      // First time visitor - show the registration modal
      setOpenReqModal(true);
    }
  }, []);

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
  };

  const handleRequestClick = () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // User has token, show success modal
      setOpenSentModal(true);
    } else {
      // User doesn't have token, show registration modal
      setOpenReqModal(true);
    }
  };

  // Transform API data to table rows with search filtering
  const rows = useMemo(() => {
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
            product.code.toLowerCase().includes(query) ||
            application.toLowerCase().includes(query) ||
            perfFeature.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query)
          );
        });
      }

      return filteredProducts.map((product) =>
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
              Request
            </Button>
          ),
        })
      );
    }
    // Fallback static data
    return [
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
            Request
          </Button>
        ),
      }),
    ];
  }, [products, language, searchQuery]);

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

  // Loading state
  if (isLoading && products?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading products...
        </Typography>
      </Box>
    );
  }

  if (error && products?.length === 0) {
    console.warn('Product API error:', error);
  }

  return (
    <ProductContainer
      productTypes={productTypes}
      productApplications={productApplications}
      cellTitles={cellTitles}
      rows={rows}
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
    />
  );
};
export default ProductsPage;
