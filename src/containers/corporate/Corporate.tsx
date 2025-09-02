'use client';
import SidebarList from '@/components/SidebarList';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import HeaderImage from '@public/photo/header_corporate.png';
import { Map } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { styles, constants } from './style';
import { useDeviceType } from '@/hooks';

const CorporateContainer = () => {
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const { type } = useDeviceType();

  const infoboxContainer = (title: string, value: string) => {
    return (
      <Box sx={styles.infoBox}>
        <Typography sx={styles.infoBoxTitle}>{title}</Typography>
        <Typography sx={styles.infoBoxValue}>{value}</Typography>
      </Box>
    );
  };

  return (
    <Box sx={styles.mainContainer(type)}>
      <SidebarList
        selected={selectedCompany}
        setSelected={setSelectedCompany}
        list={constants.companyList}
        text1={'Our\u00a0'}
        text2="Key"
        secondaryText="Subsidiaries"
        inline
        type={type}
      />
      <Box sx={styles.contentContainer(type)}>
        <Image
          src={HeaderImage}
          alt={constants.companyList[selectedCompany].name}
          style={styles.headerImageStyle}
        />
        <Typography marginTop={3} sx={styles.companyTitle(type)}>
          {constants.companyList[selectedCompany].name}
        </Typography>

        <Box sx={styles.addressContainer(type)}>
          <Box sx={styles.addressTextContainer}>
            <Typography sx={styles.addressLabel(type)}>Address</Typography>
            <Typography sx={styles.addressValue(type)}>
              {constants.address}
            </Typography>
          </Box>
          <Button
            variant={'contained'}
            disableElevation
            startIcon={<Map width={10} height={10} />}
            sx={styles.mapsButton(type)}
          >
            Maps
          </Button>
        </Box>

        <Typography marginY={4} sx={styles.descriptionText(type)}>
          {constants.description1}
        </Typography>

        {type !== 'mobile' ? (
          <Grid container spacing={2} sx={styles.gridContainer}>
            {constants.infoboxList.map((item, index) => (
              <Grid component={'span'} size={6} key={index}>
                {infoboxContainer(item.title, item.value)}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {constants.infoboxList.map((item, index) => (
              <Box key={index}>{infoboxContainer(item.title, item.value)}</Box>
            ))}
          </Box>
        )}

        <Typography marginY={4} sx={styles.descriptionText(type)}>
          {constants.description2}
        </Typography>

        {type !== 'mobile' ? (
          <Grid container spacing={2} sx={styles.gridContainer}>
            {constants.infoboxList.map((item, index) => (
              <Grid component={'span'} size={4} key={index}>
                {infoboxContainer(item.title, item.value)}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {constants.infoboxList.map((item, index) => (
              <Box key={index}>{infoboxContainer(item.title, item.value)}</Box>
            ))}
          </Box>
        )}

        <Box sx={styles.productApplicationContainer}>
          <Typography sx={styles.productApplicationTitle(type)}>
            Product Application
          </Typography>
          <Typography sx={styles.productApplicationText(type)} marginTop={1}>
            {constants.productApplicationDescription}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(CorporateContainer), {
  ssr: false,
});
