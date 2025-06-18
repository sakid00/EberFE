'use client';
import Image from 'next/image';
import logo from '../../../public/eber_logo.png';
import bgHeader from '../../../public/background/bg_header.png';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

const navigationList = [
  { name: 'Home', navigation: '/' },
  { name: 'About Us', navigation: 'about-us' },
  { name: 'Corporate', navigation: 'corporate' },
  { name: 'Product', navigation: '/product' },
  { name: 'Careers', navigation: '/carreers' },
  { name: 'Contact Us', navigation: '/contact-us' },
];

const langList = ['IDN', 'EN'];

const Header = () => {
  const [langValue, setLangValue] = useState<string>('IDN');
  const handleChange = (event: SelectChangeEvent) => {
    setLangValue(event.target.value);
  };
  const router = useRouter();

  const navigationBar = navigationList.map((val, index) => {
    return (
      <Button
        key={index}
        variant="text"
        onClick={() => {
          router.push(val.navigation);
        }}
        sx={{
          textTransform: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1.3rem',
          marginRight: 4,
        }}
      >
        {val.name}
      </Button>
    );
  });
  const langMenu = langList.map((val) => (
    <MenuItem key={val} value={val}>
      {val}
    </MenuItem>
  ));

  return (
    <header>
      <Image
        src={bgHeader}
        alt=""
        style={{ position: 'absolute', width: '100vw', height: '30vh', right: '10vw', left: 0, top: 0, zIndex: -1000}}
      />
      <Box className="flex flex-row justify-around items-center mt-10 mb-20">
        <Image src={logo} alt="" style={{ width: '6vw', height: '4vh' }} />
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
