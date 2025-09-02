import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { CertificationCard } from '../../components/Cards/CertificationCard';
import { CERTIFICATION_DATA } from './constants';
import { certificationStyles } from './styles';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useTranslation } from '@/hooks';

export const CertificationSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return (
    <Box
      id="home-second-section"
      className={`flex flex-col items-center justify-center animate-on-scroll ${type === 'mobile' ? 'mt-[15vh]' : 'mt-[50vh]'}`}
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
            <CertificationCard key={index} data={data} index={index} isMobile />
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
  );
};
