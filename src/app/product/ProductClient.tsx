'use client';
import ProductContainer from '../../containers/product';
import { Button, SelectChangeEvent, Box, Typography } from '@mui/material';
import emailIcon from '../../../public/icon/email-no-bg.svg';
import Image from 'next/image';
import {
  ReactNode,
  useState,
  useEffect,
  useRef,
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
import * as Sentry from '@sentry/nextjs';

const cellTitles = [
  'product.product_table.product_code',
  'product.product_table.group',
  'product.product_table.segment',
  'product.product_table.group_sbu',
  'product.product_table.sbu_name',
  'product.product_table.group_name',
  'product.product_table.get_more_detail',
];

export interface IrowData {
  productCode: string;
  group: string;
  segment: string;
  groupSbu: string;
  sbuName: string;
  groupName: string;
  getMoreDetail: ReactNode;
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
const ProductsPageContent = () => {
  const { t } = useTranslation();
  const { type } = useDeviceType();
  const {
    getProduct,
    products,
    filters,
    pagination,
    isLoading,
    error,
    requestProduct,
  } = useProduct();
  const searchParams = useSearchParams();
  const [isSeeAllProduct, setIsSeeAllProduct] = useState<boolean>(true);
  const [filterBySegment, setFilterBySegment] = useState<string[]>([]);
  const [filterByGrpSbu, setFilterByGrpSbu] = useState<string[]>([]);
  const [filterBySbuName, setFilterBySbuName] = useState<string[]>([]);
  const [filterByGrpName, setFilterByGrpName] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openReqModal, setOpenReqModal] = useState<boolean>(false);
  const [openSentModal, setOpenSentModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [isRequestingProduct, setIsRequestingProduct] =
    useState<boolean>(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 400);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Dynamic filter data from API
  const segmentOptions = filters.segments.length > 0 ? filters.segments : [];
  const grpSbuOptions = filters.grpSbus.length > 0 ? filters.grpSbus : [];
  const sbuNameOptions = filters.sbuNames.length > 0 ? filters.sbuNames : [];
  const grpNameOptions = filters.grpNames.length > 0 ? filters.grpNames : [];

  const fetchProducts = useCallback(
    (page: number = currentPage) => {
      const requestParams: {
        page: number;
        pageSize: number;
        segment?: string;
        grpSbu?: string;
        sbuName?: string;
        grpName?: string;
        search?: string;
      } = {
        page,
        pageSize: itemsPerPage,
      };

      if (filterBySegment.length > 0) {
        requestParams.segment = filterBySegment.join(',');
      }
      if (filterByGrpSbu.length > 0) {
        requestParams.grpSbu = filterByGrpSbu.join(',');
      }
      if (filterBySbuName.length > 0) {
        requestParams.sbuName = filterBySbuName.join(',');
      }
      if (filterByGrpName.length > 0) {
        requestParams.grpName = filterByGrpName.join(',');
      }
      if (debouncedSearch) {
        requestParams.search = debouncedSearch;
      }

      getProduct(requestParams).catch((error) => {
        Sentry.captureException(error, {
          tags: { component: 'ProductClient', operation: 'fetchProducts' },
          extra: { requestParams },
        });
      });
    },
    [getProduct, filterBySegment, filterByGrpSbu, filterBySbuName, filterByGrpName, debouncedSearch, currentPage, itemsPerPage]
  );

  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBySegment, filterByGrpSbu, filterBySbuName, filterByGrpName, debouncedSearch, currentPage]);

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
          setOpenSentModal(true);
          // Retrieve the submitted email from localStorage
          const storedEmail = localStorage.getItem('submittedEmail');
          if (storedEmail) {
            setSubmittedEmail(storedEmail);
          }
        } else {
          // First time user, show ReqProductModal
          setOpenReqModal(true);
        }
      }
    }
  }, [searchParams]);

  const createData = ({
    productCode,
    group,
    segment,
    groupSbu,
    sbuName,
    groupName,
    getMoreDetail,
  }: IrowData) => {
    return { productCode, group, segment, groupSbu, sbuName, groupName, getMoreDetail };
  };

  const handleTokenReceived = () => {
    // Retrieve the submitted email from localStorage
    const storedEmail = localStorage.getItem('submittedEmail');
    if (storedEmail) {
      setSubmittedEmail(storedEmail);
    }
  };

  const handleRequestClick = useCallback(
    async (productCode: string) => {
      const storedEmail = localStorage.getItem('submittedEmail');
      setIsRequestingProduct(true);
      try {
        await requestProduct({
          email: storedEmail ?? '',
          productCode: productCode,
          onSuccess: () => {
            setOpenSentModal(true);
          },
        });
      } catch (error) {
        Sentry.captureException(error, {
          tags: { component: 'ProductClient', operation: 'requestProduct' },
          extra: { productCode },
        });
      } finally {
        setIsRequestingProduct(false);
      }
    },
    [requestProduct]
  );

  const { displayedRows, filteredTotalPages, filteredTotalItems } =
    useMemo(() => {
      if (products?.length > 0) {
        const rows = products.map((product) =>
          createData({
            productCode: product.code,
            group: product.it_mfg ?? '-',
            segment: product.segment ?? '-',
            groupSbu: product.grp_sbu ?? '-',
            sbuName: product.sbu_name ?? '-',
            groupName: product.grp_name ?? '-',
            getMoreDetail: (
              <Button
                variant="text"
                sx={{
                  color: '#784791',
                  fontSize: '1em',
                  fontWeight: 400,
                  textTransform: 'none',
                }}
                onClick={() => handleRequestClick(product.code)}
                disabled={isRequestingProduct}
                startIcon={
                  <Image src={emailIcon} width={16} height={16} alt="email" />
                }
              >
                {t('product.request_product')}
              </Button>
            ),
          })
        );

        return {
          displayedRows: rows,
          filteredTotalPages: pagination?.totalPages || 1,
          filteredTotalItems: pagination?.totalItems || products.length,
        };
      }

      const fallbackRows = [
        createData({
          productCode: 'Sample Product',
          group: '-',
          segment: '-',
          groupSbu: '-',
          sbuName: '-',
          groupName: '-',
          getMoreDetail: (
            <Button
              variant="text"
              sx={{
                color: '#784791',
                fontSize: '1em',
                fontWeight: 400,
                textTransform: 'none',
              }}
              onClick={() => handleRequestClick('Sample Product')}
              disabled={isRequestingProduct}
              startIcon={
                <Image src={emailIcon} width={16} height={16} alt="email" />
              }
            >
              {t('product.request_product')}
            </Button>
          ),
        }),
      ];
      return {
        displayedRows: fallbackRows,
        filteredTotalPages: 1,
        filteredTotalItems: 1,
      };
    }, [
      products,
      handleRequestClick,
      pagination,
      t,
      isRequestingProduct,
    ]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBySegment, filterByGrpSbu, filterBySbuName, filterByGrpName, debouncedSearch]);

  const handleChangeSegment = (
    event: SelectChangeEvent<typeof filterBySegment>
  ) => {
    setIsSeeAllProduct(false);
    const val =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterBySegment(val);
  };

  const handleChangeGrpSbu = (
    event: SelectChangeEvent<typeof filterByGrpSbu>
  ) => {
    setIsSeeAllProduct(false);
    const val =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterByGrpSbu(val);
  };

  const handleChangeSbuName = (
    event: SelectChangeEvent<typeof filterBySbuName>
  ) => {
    setIsSeeAllProduct(false);
    const val =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterBySbuName(val);
  };

  const handleChangeGrpName = (
    event: SelectChangeEvent<typeof filterByGrpName>
  ) => {
    setIsSeeAllProduct(false);
    const val =
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value;
    setFilterByGrpName(val);
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
        <TableSkeleton rows={10} columns={7} type={type} showHeader={true} />
      </Box>
    );
  }

  if (error && products?.length === 0) {
    console.warn('Product API error:', error);
  }

  return (
    <>
      <ProductContainer
        segmentOptions={segmentOptions}
        grpSbuOptions={grpSbuOptions}
        sbuNameOptions={sbuNameOptions}
        grpNameOptions={grpNameOptions}
        cellTitles={cellTitles}
        rows={displayedRows}
        isSeeAllProduct={isSeeAllProduct}
        setIsSeeAllProduct={setIsSeeAllProduct}
        filterBySegment={filterBySegment}
        setFilterBySegment={setFilterBySegment}
        filterByGrpSbu={filterByGrpSbu}
        setFilterByGrpSbu={setFilterByGrpSbu}
        filterBySbuName={filterBySbuName}
        setFilterBySbuName={setFilterBySbuName}
        filterByGrpName={filterByGrpName}
        setFilterByGrpName={setFilterByGrpName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleChangeSegment={handleChangeSegment}
        handleChangeGrpSbu={handleChangeGrpSbu}
        handleChangeSbuName={handleChangeSbuName}
        handleChangeGrpName={handleChangeGrpName}
        currentPage={currentPage}
        totalPages={filteredTotalPages}
        totalItems={filteredTotalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      <ReqProductModal
        openModal={openReqModal}
        setOpenModal={setOpenReqModal}
        onSuccessfulSubmission={handleTokenReceived}
        onShowSentModal={() => setOpenSentModal(true)}
      />
      <ReqProductSent
        hasAccess={hasAccess}
        openModal={openSentModal}
        setOpenModal={setOpenSentModal}
        email={submittedEmail}
      />
    </>
  );
};

// Main component with Suspense boundary
const ProductClient = () => {
  const { type } = useDeviceType();

  return (
    <Suspense
      fallback={
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 700 }}>
            Loading...
          </Typography>
          <TableSkeleton rows={10} columns={7} type={type} showHeader={true} />
        </Box>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductClient;
