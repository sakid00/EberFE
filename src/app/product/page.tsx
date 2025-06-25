'use client';
import DualColorText from '@/components/dualColorText';
import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography,
} from '@mui/material';
import customIcon from '@public/icon/customize.svg';
import Image from 'next/image';
import { useState } from 'react';

const productTypes = [
  'Solvent-Base',
  'Water-Base',
  'Plasticizers',
  'n-BAC',
  'n-Butanol',
  'Acetic Acid',
];

// const createData = (name: string, calories: number, fat: number) => {
//   return { name, calories, fat };
// };

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const ProductsPage = () => {
  const [isSeeAllProduct, setIsSeeAllProduct] = useState<boolean>(true);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filterByApplication, setFilterByApplication] = useState<string[]>([]);

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
    <Box className="mx-[2vw]">
      <Box className="flex backdrop-blur-sm bg-white/30 rounded-2xl p-8 justify-between">
        <Box className="flex justify-center">
          <Box
            className="justify-center items-center rounded-full p-5 flex w-fit h-fit mr-5"
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          >
            <Image src={customIcon} width={30} height={30} alt="" />
          </Box>
          <DualColorText
            text1="Make it Yours"
            text1Variant="h5"
            text2="Customize Your Product"
            text2Variant="h5"
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

      <Box className="flex bg-white rounded-2xl p-8 mt-4 justify-between">
        <Box className="flex flex-row w-[60%]">
          <Button
            variant="outlined"
            sx={{
              color: isSeeAllProduct ? '#784791' : '#4B5563',
              backgroundColor: isSeeAllProduct ? '#D6CBE3' : '#F3F5F7',
              borderColor: isSeeAllProduct ? '#784791' : '#4B5563',
              borderWidth: 1,
              padding: 2,
              borderRadius: 5,
              marginRight: '0.5vw',
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
              backgroundColor: filterByType.length > 0 ? '#D6CBE3' : '#F3F5F7',
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
          className="bg-red-500"
          slotProps={{
            input: {
              startAdornment: <Search className="mr-4" />,
              className: 'bg-[#F3F5F7] border-0',
            },
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProductsPage;
