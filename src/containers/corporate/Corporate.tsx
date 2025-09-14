'use client';
import SidebarList from '@/components/SidebarList/index';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeaderImage from '@/public/photo/header_corporate.png';
import { Map } from '@mui/icons-material';
import { styles } from './style';
import { useDeviceType, useTranslation } from '@/hooks';
import useCompany from '@/hooks/useCompany';
import { useNavigation } from '@/contexts/NavigationContext';
import { CorporateSkeleton } from '@/components/Skeleton';

// Type for info box items that can come from either API or constants
type InfoBoxItem = {
  name_en?: string;
  name_id?: string;
  data_en?: string;
  data_id?: string;
  name?: string;
  data?: string;
  title?: string;
  value?: string;
};

const CorporateContainer = () => {
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const { t, language } = useTranslation();
  const { type } = useDeviceType();
  const { setNavigationComplete } = useNavigation();
  const { companies, isLoading, getCompany } = useCompany();

  // Fetch companies on component mount with optimized loading
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Check if we already have data to avoid loading state
        if (companies.length > 0) {
          console.log('📊 Using existing company data');
          return;
        }
        
        console.log('🔄 Fetching company data...');
        await getCompany({ page: 1, pageSize: 10 });
        console.log('✅ Company data loaded');
      } catch (error) {
        console.error('❌ Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Complete navigation once component is mounted and data is ready
  useEffect(() => {
    if (!isLoading) {
      // Navigation is complete when data loading is done
      setNavigationComplete();
    }
  }, [isLoading, setNavigationComplete]);

  const infoboxContainer = (title: string, value: string) => {
    return (
      <Box sx={styles.infoBox}>
        <Typography sx={styles.infoBoxTitle}>{title}</Typography>
        <Typography sx={styles.infoBoxValue}>{value}</Typography>
      </Box>
    );
  };

  const infoboxContainer2 = (title: string, value: string) => {
    return (
      <Box sx={styles.infoBox2}>
        <Typography sx={styles.infoBoxTitle2}>{title}</Typography>
        <Typography sx={styles.infoBoxValue2}>{value}</Typography>
      </Box>
    );
  };

  // Get current company data
  const currentCompany = companies?.[selectedCompany];
  const currentCompanyDetail = currentCompany?.data;

  // Show skeleton loading state only when actually loading AND no data
  // More aggressive: only show skeleton on first load with no cache
  if (isLoading && companies.length === 0) {
    console.log('⏳ Showing corporate skeleton loading...');
    return (
      <Box sx={styles.mainContainer(type)}>
        <SidebarList
          selected={selectedCompany}
          setSelected={() => {}} // Disabled during loading
          list={[{ name: 'Loading...', type: 'Loading...' }]}
          text1={t('home.subsidiaries_section_title.eber_group')}
          text2={t('home.subsidiaries_section_title.subsidiaries')}
          inline={false}
          type={type}
        />
        <Box sx={styles.contentContainer(type)}>
          <CorporateSkeleton type={type} />
        </Box>
      </Box>
    );
  }
  
  // If no data after loading, show empty state instead of skeleton
  if (!isLoading && companies.length === 0) {
    console.log('📭 No company data available');
    return (
      <Box sx={styles.mainContainer(type)}>
        <Box sx={styles.contentContainer(type)}>
          <Typography>No company data available</Typography>
        </Box>
      </Box>
    );
  }

  // At this point, we have real API data
  const companyList = companies.map((company) => ({
    name: company.name,
    type: 'Manufacturing Facility',
  }));

  return (
    <Box sx={styles.mainContainer(type)}>
      <SidebarList
        selected={selectedCompany}
        setSelected={setSelectedCompany}
        list={companyList}
        text1={t('home.subsidiaries_section_title.eber_group')}
        text2={t('home.subsidiaries_section_title.subsidiaries')}
        inline={false}
        type={type}
      />
      <Box sx={styles.contentContainer(type)}>
        <Box sx={styles.headerImageStyle}>
          <Image
            src={
              currentCompany?.main_image
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${currentCompany.main_image}`
                : HeaderImage
            }
            alt={companyList[selectedCompany]?.name || 'Company'}
            width={1000}
            height={1000}
            style={{ objectFit: 'fill' }}
          />
        </Box>
        <Typography sx={styles.companyTitle(type)}>
          {companyList[selectedCompany]?.name || 'Company Name'}
        </Typography>

        <Box sx={styles.addressContainer(type)}>
          <Box sx={styles.addressTextContainer}>
            <Typography sx={styles.addressLabel(type)}>Address</Typography>
            <Typography sx={styles.addressValue(type)}>
              {language === 'en'
                ? currentCompany?.address_en
                : currentCompany?.address_id}
            </Typography>
          </Box>
          <Button
            variant={'contained'}
            disableElevation
            startIcon={<Map width={10} height={10} />}
            sx={styles.mapsButton(type)}
            onClick={() => {
              if (currentCompany?.coordinate) {
                window.open(currentCompany.coordinate, '_blank');
              }
            }}
          >
            Maps
          </Button>
        </Box>

        {currentCompanyDetail?.description_1_en && (
          <Typography marginY={4} sx={styles.descriptionText(type)}>
            {currentCompanyDetail.description_1_en}
          </Typography>
        )}

        {currentCompanyDetail?.box_1?.data?.length > 0 && (
          type !== 'mobile' ? (
            <Grid container spacing={2} sx={styles.gridContainer}>
              {currentCompanyDetail.box_1.data.map(
                (item: InfoBoxItem, index) => (
                  <Grid component={'span'} size={6} key={index}>
                    {infoboxContainer(
                      (language === 'en' ? item.name_en : item.name_id) ?? '',
                      (language === 'en' ? item.data_en : item.data_id) ?? ''
                    )}
                  </Grid>
                )
              )}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentCompanyDetail.box_1.data.map((item, index) => (
                <Box key={index}>
                  {infoboxContainer(
                    (language === 'en' ? item.name_en : item.name_id) ?? '',
                    (language === 'en' ? item.data_en : item.data_id) ?? ''
                  )}
                </Box>
              ))}
            </Box>
          )
        )}

        {currentCompanyDetail?.description_2_en && (
          <Typography marginY={4} sx={styles.descriptionText(type)}>
            {currentCompanyDetail.description_2_en}
          </Typography>
        )}

        {currentCompanyDetail?.box_2?.data?.length > 0 && (
          type !== 'mobile' ? (
            <Grid container spacing={2} sx={styles.gridContainer}>
              {currentCompanyDetail.box_2.data.map((item, index) => (
                <Grid component={'span'} size={4} key={index}>
                  {infoboxContainer2(item.name ?? '', item.data ?? '')}
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {currentCompanyDetail.box_2.data.map((item, index) => (
                <Box key={index}>
                  {infoboxContainer2(item.name ?? '', item.data ?? '')}
                </Box>
              ))}
            </Box>
          )
        )}

        {currentCompanyDetail?.p && (
          <Box sx={styles.productApplicationContainer}>
            <Typography sx={styles.productApplicationTitle(type)}>
              {language === 'en'
                ? currentCompanyDetail.p.title_en
                : currentCompanyDetail.p.title_id}
            </Typography>
            <Typography sx={styles.productApplicationText(type)} marginTop={1}>
              {language === 'en'
                ? currentCompanyDetail.p.description_en
                : currentCompanyDetail.p.description_id}
            </Typography>
          </Box>
        )}

        {currentCompanyDetail?.title_1_en && (
          <Box sx={styles.productApplicationContainer}>
            <Typography sx={styles.titleContentText}>
              {language === 'en'
                ? currentCompanyDetail.title_1_en
                : currentCompanyDetail.title_1_id}
            </Typography>
            <Typography sx={styles.productApplicationText(type)} marginTop={1}>
              {language === 'en'
                ? currentCompanyDetail.description_1_en
                : currentCompanyDetail.description_1_id}
            </Typography>
            {currentCompanyDetail?.images_1?.length > 0 && (
              <Box sx={styles.imageGridContainer(type)}>
                {currentCompanyDetail.images_1.map((item, index) => (
                  <Box key={index} sx={styles.imageCard}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.url}`}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={styles.imageStyle}
                    />
                    <Typography sx={styles.imageTitle(type)}>
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {currentCompanyDetail?.title_2_en && (
          <Box sx={styles.productApplicationContainer}>
            <Typography sx={styles.titleContentText}>
              {language === 'en'
                ? currentCompanyDetail.title_2_en
                : currentCompanyDetail.title_2_id}
            </Typography>
            <Typography sx={styles.productApplicationText(type)} marginTop={1}>
              {language === 'en'
                ? currentCompanyDetail.description_2_en
                : currentCompanyDetail.description_2_id}
            </Typography>
            {currentCompanyDetail?.images_2?.length > 0 && (
              <Box sx={styles.imageGridContainer(type)}>
                {currentCompanyDetail.images_2.map((item, index) => (
                  <Box key={index} sx={styles.imageCard}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.url}`}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={styles.imageStyle}
                    />
                    <Typography sx={styles.imageTitle(type)}>
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {currentCompanyDetail?.title_3_en && (
          <Box sx={styles.productApplicationContainer}>
            <Typography sx={styles.title3ContentText}>
              {language === 'en'
                ? currentCompanyDetail.title_3_en
                : currentCompanyDetail.title_3_id}
            </Typography>
            <Typography sx={styles.productApplicationText(type)} marginTop={1}>
              {language === 'en'
                ? currentCompanyDetail.description_3_en
                : currentCompanyDetail.description_3_id}
            </Typography>
            {currentCompanyDetail?.images_3?.length > 0 && (
              <Box sx={styles.imageGridContainer(type)}>
                {currentCompanyDetail.images_3.map((item, index) => (
                  <Box key={index} sx={styles.imageCard}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.url}`}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={styles.imageStyle}
                    />
                    <Typography sx={styles.imageTitle(type)}>
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Remove dynamic import for faster loading
export default CorporateContainer;
