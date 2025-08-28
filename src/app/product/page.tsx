'use client';
import ProductContainer from '@/containers/product';
import { Button, SelectChangeEvent } from '@mui/material';
import emailIcon from '@public/icon/email-no-bg.svg';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

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
  const [openModal, setOpenModal] = useState<boolean>(false);

  const createData = ({
    productCode,
    application,
    perfFeature,
    typeOfProd,
    getMoreDetail,
  }: IrowData) => {
    return { productCode, application, perfFeature, typeOfProd, getMoreDetail };
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
          onClick={() => setOpenModal(true)}
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
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
  );
};
export default ProductsPage;
