'use client';
import DualColorText from '@/components/dualColorText';
import { Close, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import customIcon from '@public/icon/customize.svg';
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

interface IrowData {
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
        <Button variant="text" onClick={() => setOpenModal(true)}>
          Request
        </Button>
      ),
    }),
  ];

  const handleChange = (event: SelectChangeEvent<typeof filterByType>) => {
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
    <>
      <Box className="mx-[2vw]">
        <Box className="flex backdrop-blur-sm bg-white/30 rounded-2xl p-3 justify-between items-center max-h-[10vh]">
          <Box className="flex justify-center items-center">
            <Box
              className="justify-center items-center rounded-full p-4 h-[80%] flex mr-5"
              style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
            >
              <Image src={customIcon} width={20} height={20} alt="" />
            </Box>
            <DualColorText
              text1="Make it Yours"
              text1Variant="h6"
              text2="Customize Your Product"
              text2Variant="h6"
              inline={false}
            />
          </Box>
          <Button
            size="small"
            sx={{
              color: 'white',
              background:
                'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
              paddingX: 1,
              borderRadius: 4,
            }}
          >
            Custom Product
          </Button>
        </Box>

        <Box className="flex bg-white rounded-2xl p-4 px-5 mt-4 justify-between items-center">
          <Box className="flex flex-row w-[70%]">
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: isSeeAllProduct ? '#784791' : '#4B5563',
                backgroundColor: isSeeAllProduct ? '#D6CBE3' : '#F3F5F7',
                borderColor: isSeeAllProduct ? '#784791' : '#4B5563',
                borderWidth: 1,
                borderRadius: 5,
                marginRight: '0.5vw',
                width: '25%',
              }}
              onClick={() => {
                setIsSeeAllProduct(!isSeeAllProduct);
                setFilterByType([]);
              }}
            >
              See All Product
            </Button>

            <Select
              value={filterByType}
              sx={{
                color: filterByType.length > 0 ? '#784791' : '#4B5563',
                backgroundColor:
                  filterByType.length > 0 ? '#D6CBE3' : '#F3F5F7',
                borderColor: filterByType.length > 0 ? '#784791' : '#4B5563',
                borderWidth: 1,
                padding: 2,
                borderRadius: 5,
                width: '40%',
                marginRight: '0.5vw',
              }}
              input={
                <Input
                  disableUnderline
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography>Type of product</Typography>
                    </InputAdornment>
                  }
                />
              }
              multiple
              onChange={handleChange}
              renderValue={(selected) => (
                <Box className="flex items-center">
                  <Box className="rounded-full flex items-center justify-center bg-[#C1B0D3] w-fit px-3 py-1">
                    {selected.length}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: '#784791' }}
                  >
                    Selected
                  </Typography>
                </Box>
              )}
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filterByType.includes(type)} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>

            <Select
              value={filterByApplication}
              sx={{
                color: filterByApplication.length > 0 ? '#784791' : '#4B5563',
                backgroundColor:
                  filterByApplication.length > 0 ? '#D6CBE3' : '#F3F5F7',
                borderColor:
                  filterByApplication.length > 0 ? '#784791' : '#4B5563',
                borderWidth: 1,
                paddingY: 0,
                paddingX: 2,
                borderRadius: 5,
                width: '40%',
                marginRight: '0.5vw',
              }}
              input={
                <Input
                  disableUnderline
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography>Application</Typography>
                    </InputAdornment>
                  }
                />
              }
              multiple
              onChange={handleChangeApplication}
              renderValue={(selected) => (
                <Box className="flex items-center">
                  <Box className="rounded-full flex items-center justify-center bg-[#C1B0D3] w-fit px-3 py-1">
                    {selected.length}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ marginLeft: 1, color: '#784791' }}
                  >
                    Selected
                  </Typography>
                </Box>
              )}
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filterByApplication.includes(type)} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </Box>
          <TextField
            placeholder="Search Product"
            slotProps={{
              input: {
                startAdornment: <Search className="mr-4" />,
                className: 'bg-[#F3F5F7]',
              },
            }}
          />
        </Box>

        <TableContainer className="mt-4" component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className="bg-[#F9FAFB] border-0">
                {cellTitles.map((val, index) => (
                  <TableCell align="center" key={index}>
                    <Typography className="p-8 text-[#784791]">
                      {val}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.productCode}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" align="center" scope="row">
                    {row.productCode}
                  </TableCell>
                  <TableCell align="center">{row.application}</TableCell>
                  <TableCell align="center">{row.perfFeature}</TableCell>
                  <TableCell align="center">{row.typeOfProd}</TableCell>
                  <TableCell align="center">{row.getMoreDetail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="bg-white absolute w-[40%] top-[20%] left-[30%] p-5 rounded-xl">
          <Box className="flex justify-between">
            <Typography color="black">Get more detail</Typography>
            <Close />
          </Box>
          <DualColorText
            text1={'Curios about\u00a0'}
            text2="the details?"
            inline
            text1Variant="h4"
            text2Variant="h4"
          />
          <Typography variant="caption" color="black" sx={{ marginTop: 1 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            veniam ut eligendi minima eius itaque consequuntur, ipsam commodi
            nam, natus vel beatae voluptates pariatur saepe laboriosam.
            Blanditiis, sit praesentium? Vel.
          </Typography>
          <Box className="flex mt-4">
            <Box className="w-1/2">
              <InputLabel className="mb-1">First Name</InputLabel>
              <TextField className="w-[95%]" placeholder="First Name" />
            </Box>
            <Box className="w-1/2">
              <InputLabel className="mb-1">Last Name</InputLabel>
              <TextField className="w-full" placeholder="Last Name" />
            </Box>
          </Box>
          <Box className="mt-5">
            <InputLabel className="mb-1">Email Address</InputLabel>
            <TextField className="w-full" placeholder="Email Address" />
          </Box>
          <Button
            sx={{
              color: 'white',
              background:
                'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
              marginTop: 3,
              width: '100%',
              borderRadius: 5,
            }}
          >
            Request Detail Product
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default ProductsPage;
