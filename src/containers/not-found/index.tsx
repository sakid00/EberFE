'use client';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDeviceType, useTranslation } from '@/hooks';
import Image from 'next/image';
import notFound from '@public/svg/404.svg';
import { notFoundStyles } from './styles';

export default function NotFound() {
  const router = useRouter();
  const { language } = useTranslation();
  const { type } = useDeviceType();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box sx={notFoundStyles.container(type)}>
      <Image src={notFound} alt="Not-Found" style={notFoundStyles.image} />
      <Typography variant="h4" sx={notFoundStyles.title}>
        {language === 'en' ? 'Something went wrong' : 'Terjadi Kesalahan'}
      </Typography>
      <Typography variant="body1" sx={notFoundStyles.description}>
        {language === 'en'
          ? 'Oops, the page you are looking for is not available right now. Please try again later or go back to the homepage.'
          : 'Ups, halaman ini tidak bisa ditampilkan sekarang. Silakan coba lagi nanti atau kembali ke beranda.'}
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoHome}
        sx={notFoundStyles.button}
      >
        {language === 'en' ? 'Go Home' : 'Kembali ke Beranda'}
      </Button>
    </Box>
  );
}
