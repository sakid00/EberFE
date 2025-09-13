'use client';
import { useRouter } from 'next/navigation';
import CareerContainer from '../../containers/career';
import useCareer from '../../hooks/useCareer';
import { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from '../../hooks';
import { useDeviceType } from '../../hooks/useDeviceType';
import { ListSkeleton } from '@/components/Skeleton';

export interface ICareerList {
  title: string;
  status: string;
  desc: string;
}

const CareersPage = () => {
  const router = useRouter();
  const { language, t } = useTranslation();
  const { type } = useDeviceType();
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

  // Loading state with skeleton
  if (isLoading && careers?.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 700 }}>
          {t('career.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
          {t('career.subtitle')}
        </Typography>
        <ListSkeleton count={6} type={type} showBadge={true} />
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
