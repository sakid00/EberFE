'use client';
import Image from 'next/image';
import logo from '../../../public/eber_logo.png';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const navigationList = [
  { name: 'Home', navigation: '' },
  { name: 'About Us', navigation: '' },
  { name: 'Corporate', navigation: '' },
  { name: 'Product', navigation: '' },
  { name: 'Careers', navigation: '' },
  { name: 'Contact Us', navigation: '' },
];

const langList = ['IDN','EN'];

const Header = () => {
  const [langValue, setLangValue] = useState<string>('IDN');
  const handleChange = (event: SelectChangeEvent) => {
    setLangValue(event.target.value);
  };

  const navigationBar = navigationList.map((val, index) => {
    return (
      <Typography sx={{ marginRight: 4 }} key={index}>
        {val.name}
      </Typography>
    );
  });
  const langMenu = langList.map((val) => (
    <MenuItem key={val} value={val}>
      {val}
    </MenuItem>
  ));

  return (
    <header>
      <Box className="flex flex-row justify-around items-center mt-10">
        <Image src={logo} width={100} height={100} alt="" />
        <Box className="flex flex-row">{navigationBar}</Box>
        <Box>
          <FormControl className="bg-white opacity-20 rounded-2xl w-20 h-10 items-center">
            <Select
              value={langValue}
              onChange={handleChange}
              className="w-20 h-10 border-0"
            >
              {langMenu}
            </Select>
          </FormControl>
          <IconButton
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              width: 40,
              height: 40,
              borderRadius: 20,
              marginLeft: 1,
            }}
          >
            <SearchIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
