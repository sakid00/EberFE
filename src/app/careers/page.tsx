'use client';
import { useRouter } from 'next/navigation';
import CareerContainer from '@/containers/career';
import useCareer from '@/hooks/useCareer';
import { useEffect, useMemo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from '@/hooks';

export interface ICareerList {
  title: string;
  status: string;
  desc: string;
}

const CareersPage = () => {
  const router = useRouter();
  const { language } = useTranslation();
  const { getCareer, careers, isLoading } = useCareer();

  useEffect(() => {
    console.log('Fetching careers from API...');
    getCareer({
      page: 1,
      pageSize: 10,
    }).catch((error) => {
      console.error('Failed to fetch careers:', error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Transform global state careers to ICareerList format
  const careerList: ICareerList[] = useMemo(() => {
    if (careers?.length > 0) {
      return careers?.map((career) => ({
        title: career.position,
        status:
          career.type === 'fulltime'
            ? 'Full Time'
            : career.type === 'parttime'
              ? 'Part Time'
              : career.type.charAt(0).toUpperCase() + career.type.slice(1), // Transform types to display format
        desc: language === 'en' ? career.description_en : career.description_id,
      }));
    }
    return [];
  }, [careers, language]);

  // Loading state
  if (isLoading && careers?.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading career opportunities...
        </Typography>
      </Box>
    );
  }

  return (
    <CareerContainer
      careerList={careerList}
      router={router}
      isLoading={isLoading}
    />
  );
};

export default CareersPage;
