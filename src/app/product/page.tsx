'use client';
import ProductContainer from '@/containers/product';
import { Button, SelectChangeEvent } from '@mui/material';
import emailIcon from '@public/icon/email-no-bg.svg';
import Image from 'next/image';
import { ReactNode, useState, useEffect } from 'react';

const productTypes = [
  'Solvent-Base',
  'Water-Base',
  'Plasticizers',
  'n-BAC',
  'n-Butanol',
  'Acetic Acid',
];

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
  const [isSeeAllProduct, setIsSeeAllProduct] = useState<boolean>(true);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filterByApplication, setFilterByApplication] = useState<string[]>([]);
  const [openReqModal, setOpenReqModal] = useState<boolean>(false);
  const [openSentModal, setOpenSentModal] = useState<boolean>(false);

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

  const rows = [
    createData({
      productCode: 'Cupcake',
      application: '305',
      perfFeature: '3.7',
      typeOfProd: '0',
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

  const handleChangeFilterByType = (
    event: SelectChangeEvent<typeof filterByType>
  ) => {
    setIsSeeAllProduct(false);
    setFilterByType(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
  };

  const handleChangeApplication = (
    event: SelectChangeEvent<typeof filterByApplication>
  ) => {
    setIsSeeAllProduct(false);
    setFilterByApplication(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value
    );
  };

  return (
    <ProductContainer
      productTypes={productTypes}
      cellTitles={cellTitles}
      rows={rows}
      isSeeAllProduct={isSeeAllProduct}
      setIsSeeAllProduct={setIsSeeAllProduct}
      filterByType={filterByType}
      setFilterByType={setFilterByType}
      filterByApplication={filterByApplication}
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
