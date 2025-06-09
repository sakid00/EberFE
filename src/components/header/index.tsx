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

const langList = ['EN', 'ID'];

const Header = () => {
  const [langValue, setLangValue] = useState('');
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
          <FormControl className="bg-white opacity-20 rounded-2xl w-15 h-10 items-center">
            <Select
              value={langValue}
              onChange={handleChange}
              className="w-15 h-10 border-0"
            >
              {langMenu}
            </Select>
          </FormControl>
          <IconButton size="medium">
            <SearchIcon className="bg-white rounded-2xl ml-2 opacity-20" />
          </IconButton>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
