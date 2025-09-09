import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText/index';
import { CertificationCard } from '@/components/Cards/CertificationCard';
import { CERTIFICATION_DATA } from './constants';
import { certificationStyles } from './styles';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks';

export const CertificationSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/eber-compro.pdf';
    link.download = 'eber-company-profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {type === 'mobile' && (
        <Button
          onClick={handleDownload}
          sx={{
            width: '100%',
            color: 'white',
            background:
              'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
            padding: 2,
            borderRadius: 10,
            fontWeight: 600,
            textTransform: 'none',
            marginTop: '4vh',
            zIndex: 1,
            '&:hover': {
              background:
                'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
            },
          }}
        >
          {t('about_us.download_button')}
        </Button>
      )}
      <Box
        id="home-second-section"
        className={`flex flex-col items-center justify-center animate-on-scroll ${type === 'mobile' ? 'mt-[15vh]' : 'mt-[10vh]'}`}
      >
        <Box className="flex flex-col animate-fade-in justify-center">
          <DualColorText
            text1={`${t('about_us.certification_section_title.our')}\u00a0`}
            text2={t('about_us.certification_section_title.certification')}
            fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
            fontWeight={700}
            inline
          />
        </Box>
        <Typography
          flexWrap={'wrap'}
          className=" text-[#4B5563] animate-fade-in"
          textAlign={'center'}
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          style={certificationStyles.description(type)}
        >
          {t('about_us.certification_section_desc')}
        </Typography>
        {type === 'mobile' ? (
          <Box id="specialty-list" className="grid grid-cols-2 gap-2 p-4">
            {CERTIFICATION_DATA.map((data, index) => (
              <CertificationCard
                key={index}
                data={data}
                index={index}
                isMobile
              />
            ))}
          </Box>
        ) : (
          <Box id="specialty-list" sx={certificationStyles.cardsContainer}>
            {CERTIFICATION_DATA.map((data, index) => (
              <CertificationCard
                key={index}
                data={data}
                index={index}
                isMobile={false}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
