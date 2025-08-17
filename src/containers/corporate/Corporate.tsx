'use client';
import SidebarList, { listType } from '@/components/SidebarList';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import HeaderImage from '@public/photo/header_corporate.png';
import { Map } from '@mui/icons-material';
import useStyles from './style';
import dynamic from 'next/dynamic';

const companyList: listType[] = [
  {
    name: 'PT Eternal Buana Chemical Industries',
    type: 'Manufacturing Facility',
  },
  { name: 'PT Eterindo Nusa Graha', type: 'Manufacturing Facility' },
  { name: 'Petrowidada', type: 'Manufacturing Facility' },
  { name: 'Mega Prima Solvindo', type: 'Manufacturing Facility' },
];

const CorporateContainer = () => {
  const [selectedCompany, setSelectedCompany] = useState<number>(0);

  const classes = useStyles();

  return (
    <Box className="flex">
      <SidebarList
        selected={selectedCompany}
        setSelected={setSelectedCompany}
        list={companyList}
        text1={'Our\u00a0'}
        text2="Key"
        secondaryText="Subsidiaries"
        inline
      />
      <Box className="flex-1 p-8 ml-4 bg-white rounded-xl z-100">
        <Image
          src={HeaderImage}
          alt={companyList[selectedCompany].name}
          className="object-cover rounded-lg"
        />
        <Typography marginTop={3} color="#030712" variant="h4" fontWeight={800}>
          {companyList[selectedCompany].name}
        </Typography>

        <Box className="flex justify-between items-center">
          <Box className="mt-2">
            <Typography color="#4B5563" variant="subtitle1">
              Address
            </Typography>
            <Typography color="#030712" variant="h6">
              Eber Tower, 123 Business District Jakarta, Indonesia 12345
            </Typography>
          </Box>
          <Button
            variant={'contained'}
            disableElevation
            startIcon={<Map />}
            classes={{
              root: classes.root,
              contained: classes.contained,
            }}
          >
            Maps
          </Button>
        </Box>

        <Typography marginTop={4}>
          First Production in 1982 with capacity 10.000 TPY, expanded to 20.000
          TPY in 1986 then final expansion capacity to 82.000 TPY.
        </Typography>

        <Grid container spacing={2} className="mt-6">
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Product Type
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Certified to Standard
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Capacity
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Capacity Storage Tank Raw Material
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Solid R.M. – Finish Goods Whs Cap
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={6}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Technology
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography marginTop={4}>
          PT Eternal Buana Chemicals Industry Plant is one of the biggest
          Specialty Chemical Resin Production facility in Indonesia, occupying
          area app. 16,2 Hectare, located in Tangerang – Banten Province.
        </Typography>

        <Grid container spacing={2} className="mt-6">
          <Grid component={'span'} size={4}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Product Type
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={4}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Certified to Standard
              </Typography>
            </Box>
          </Grid>
          <Grid component={'span'} size={4}>
            <Box className="p-4 border border-gray-200 rounded-lg">
              <Typography variant="h6" color="#030712">
                Capacity
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box className="mt-4">
          <Typography>Product Application</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            aliquid excepturi placeat tempora non cum, quaerat voluptatem sint
            reprehenderit impedit nemo eveniet incidunt vero maiores harum. Non
            obcaecati repellendus eos?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(CorporateContainer), {
  ssr: false,
});
