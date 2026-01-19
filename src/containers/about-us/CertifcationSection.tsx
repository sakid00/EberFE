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
const CARD_WIDTH_DESKTOP = 200;
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
          sx={certificationStyles.mobileDownloadButton}
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
            text={`${t('about_us.certification_section_title.our')}\u00a0{${t('about_us.certification_section_title.certification')}}`}
            fontSize={dynamicStylingValue(type, '1.5em', '2rem', '3rem')}
            fontWeight={700}
            inline
          />
        </Box>
        <Typography
          flexWrap={'wrap'}
          className=" text-[#4B5563] animate-fade-in"
          textAlign={'center'}
          fontSize={dynamicStylingValue(type, '1.2rem', '1.5rem', '1.5rem')}
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
                <ChevronLeft sx={certificationStyles.arrowIconMobile} />
              </IconButton>
            )}

            {/* Mobile Cards Container */}
            <Box
              sx={certificationStyles.mobileCardsOverflowContainer(
                certificates.length,
                VISIBLE_CARDS_MOBILE
              )}
            >
              <Box
                id="specialty-list"
                sx={certificationStyles.mobileSliderContainer(
                  mobileIndex,
                  CARD_WIDTH_MOBILE,
                  GAP_MOBILE
                )}
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
                <ChevronRight sx={certificationStyles.arrowIconMobile} />
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
                <ChevronLeft sx={certificationStyles.arrowIconDesktop} />
              </IconButton>
            )}

            {/* Cards Container */}
            <Box
              sx={certificationStyles.desktopCardsOverflowContainer(
                certificates.length,
                VISIBLE_CARDS_DESKTOP,
                CARD_WIDTH_DESKTOP,
                GAP_DESKTOP
              )}
            >
              <Box
                id="specialty-list"
                sx={certificationStyles.desktopSliderContainer(
                  currentIndex,
                  CARD_WIDTH_DESKTOP,
                  GAP_DESKTOP
                )}
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
                <ChevronRight sx={certificationStyles.arrowIconDesktop} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
