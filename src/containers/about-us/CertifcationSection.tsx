import { Box, Button, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import DualColorText from '@/components/dualColorText/index';
import { CertificationCard } from '@/components/Cards/CertificationCard';
import { certificationStyles } from './styles';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { useCertificate, useTranslation } from '@/hooks';
import { useEffect, useState, useCallback, useRef } from 'react';

const VISIBLE_CARDS_DESKTOP = 4;
const VISIBLE_CARDS_MOBILE = 2;
const AUTO_SLIDE_INTERVAL = 3000;
const CARD_WIDTH_DESKTOP = 250;
const CARD_WIDTH_MOBILE = 150;
const GAP_DESKTOP = 16;
const GAP_MOBILE = 12;

export const CertificationSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const { getCertificates, certificates } = useCertificate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isMobile = type === 'mobile';
  const visibleCards = isMobile ? VISIBLE_CARDS_MOBILE : VISIBLE_CARDS_DESKTOP;
  const shouldShowSlider = certificates.length > visibleCards;
  const shouldAutoSlide = shouldShowSlider && !isMobile;
  const shouldAutoSlideMobile =
    certificates.length > VISIBLE_CARDS_MOBILE && isMobile;

  const maxIndex = Math.max(0, certificates.length - VISIBLE_CARDS_DESKTOP);
  const maxMobileIndex = Math.max(
    0,
    certificates.length - VISIBLE_CARDS_MOBILE
  );

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/eber-compro.pdf';
    link.download = 'eber-company-profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Desktop slide functions
  const slideNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const slidePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Mobile slide functions
  const mobileSlideNext = useCallback(() => {
    setMobileIndex((prev) => (prev >= maxMobileIndex ? 0 : prev + 1));
  }, [maxMobileIndex]);

  const mobileSlidePrev = useCallback(() => {
    setMobileIndex((prev) => (prev <= 0 ? maxMobileIndex : prev - 1));
  }, [maxMobileIndex]);

  // Auto slide effect for desktop
  useEffect(() => {
    if (shouldAutoSlide && !isHovered) {
      intervalRef.current = setInterval(slideNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldAutoSlide, isHovered, slideNext]);

  // Auto slide effect for mobile
  useEffect(() => {
    if (shouldAutoSlideMobile) {
      mobileIntervalRef.current = setInterval(
        mobileSlideNext,
        AUTO_SLIDE_INTERVAL
      );
    }
    return () => {
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
      }
    };
  }, [shouldAutoSlideMobile, mobileSlideNext]);

  useEffect(() => {
    getCertificates({ page: 1, pageSize: 10 });
  }, []);

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
            fontSize={dynamicStylingValue(type, '1.5em', '2rem', '2rem')}
            fontWeight={700}
            inline
          />
        </Box>
        <Typography
          flexWrap={'wrap'}
          className=" text-[#4B5563] animate-fade-in"
          textAlign={'center'}
          fontSize="1.2rem"
          style={certificationStyles.description(type)}
        >
          {t('about_us.certification_section_desc')}
        </Typography>
        {type === 'mobile' ? (
          <Box sx={certificationStyles.cardsContainerMobile}>
            {/* Mobile Left Arrow */}
            {certificates.length > VISIBLE_CARDS_MOBILE && (
              <IconButton
                onClick={mobileSlidePrev}
                sx={certificationStyles.leftArrowMobile}
              >
                <ChevronLeft sx={{ fontSize: 24, color: '#F54B02' }} />
              </IconButton>
            )}

            {/* Mobile Cards Container */}
            <Box
              sx={{
                overflow: 'hidden',
                width:
                  certificates.length > VISIBLE_CARDS_MOBILE
                    ? 'calc(100% - 80px)'
                    : 'auto',
                mx: 'auto',
              }}
            >
              <Box
                id="specialty-list"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: `${GAP_MOBILE}px`,
                  transform: `translateX(-${mobileIndex * (CARD_WIDTH_MOBILE + GAP_MOBILE)}px)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {certificates.map((data, index) => (
                  <CertificationCard
                    key={index}
                    data={data.image}
                    index={index}
                    isMobile
                  />
                ))}
              </Box>
            </Box>

            {/* Mobile Right Arrow */}
            {certificates.length > VISIBLE_CARDS_MOBILE && (
              <IconButton
                onClick={mobileSlideNext}
                sx={certificationStyles.rightArrowMobile}
              >
                <ChevronRight sx={{ fontSize: 24, color: '#F54B02' }} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box
            sx={certificationStyles.cardsContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Arrow */}
            {certificates.length > VISIBLE_CARDS_DESKTOP && (
              <IconButton
                onClick={slidePrev}
                sx={certificationStyles.leftArrow}
              >
                <ChevronLeft sx={{ fontSize: 32, color: '#F54B02' }} />
              </IconButton>
            )}

            {/* Cards Container */}
            <Box
              sx={{
                overflow: 'hidden',
                width:
                  certificates.length > VISIBLE_CARDS_DESKTOP
                    ? 'calc(100% - 120px)'
                    : 'auto',
                mx: certificates.length > VISIBLE_CARDS_DESKTOP ? 'auto' : 0,
              }}
            >
              <Box
                id="specialty-list"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: `${GAP_DESKTOP}px`,
                  transform: `translateX(-${currentIndex * (CARD_WIDTH_DESKTOP + GAP_DESKTOP)}px)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {certificates.map((data, index) => (
                  <CertificationCard
                    key={index}
                    data={data.image}
                    index={index}
                    isMobile={false}
                  />
                ))}
              </Box>
            </Box>

            {/* Right Arrow */}
            {certificates.length > VISIBLE_CARDS_DESKTOP && (
              <IconButton
                onClick={slideNext}
                sx={certificationStyles.rightArrow}
              >
                <ChevronRight sx={{ fontSize: 32, color: '#F54B02' }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
