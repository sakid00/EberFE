import { Box, Typography } from '@mui/material';
import DualColorText from '@/components/DualColorText';
import { CorporateCard } from '../../components/Cards/CorporateCard';
import { CORPORATE_DATA } from './constants';
import { corporateStyles } from './styles';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import { useDeviceType, useTranslation } from '@/hooks';

export const CorporateSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return (
    <Box
      id="home-fourth-section"
      className="flex flex-col justify-center items-center mt-40 animate-on-scroll"
    >
      <div className="animate-fade-in">
        <DualColorText
          text1={`${t('about_us.corporate_section_title.corporate')}\u00a0`}
          text2={t('about_us.corporate_section_title.governance')}
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={700}
          inline
        />
      </div>
      <Typography
        flexWrap={'wrap'}
        className=" text-[#4B5563] animate-fade-in"
        textAlign={'center'}
        fontSize={dynamicStylingValue(type, '0.8em', '1.2em', '1.2em')}
        style={corporateStyles.description(type)}
      >
        {t('about_us.corporate_section_desc')}
      </Typography>
      {type === 'mobile' ? (
        <Box className="flex flex-col gap-2 mt-5">
          {CORPORATE_DATA.map((data, index) => (
            <CorporateCard key={index} data={data} index={index} isMobile />
          ))}
        </Box>
      ) : (
        <Box
          className="flex flex-row gap-3"
          sx={corporateStyles.cardsContainer}
        >
          {CORPORATE_DATA.map((data, index) => (
            <CorporateCard
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
