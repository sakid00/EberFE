'use client';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks';
import Image from 'next/image';
import notFound from '@public/svg/404.svg';

export default function NotFound() {
  const router = useRouter();
  const { language } = useTranslation();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        margin: '2rem 0',
      }}
    >
      <Image
        src={notFound}
        alt="Not-Found"
        style={{ width: '30%', height: 'auto' }}
      />
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 600,
          color: '#030712',
          marginBottom: '1rem',
        }}
      >
        {language === 'en' ? 'Something went wrong' : 'Terjadi Kesalahan'}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.9rem', md: '1rem' },
          marginBottom: '2rem',
          color: '#4B5563',
          maxWidth: '500px',
          lineHeight: 1.6,
        }}
      >
        {language === 'en'
          ? 'Oops, the page you are looking for is not available right now. Please try again later or go back to the homepage.'
          : 'Ups, halaman ini tidak bisa ditampilkan sekarang. Silakan coba lagi nanti atau kembali ke beranda.'}
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoHome}
        sx={{
          backgroundColor: '#784791',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#6a3d7a',
          },
        }}
      >
        {language === 'en' ? 'Go Home' : 'Kembali ke Beranda'}
      </Button>
    </Box>
  );
}
