'use client';
import Image from 'next/image';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useEffect, useState, useRef, useMemo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  headerStyles,
  aboutUsDescriptionStyle,
  aboutUsFontSizes,
} from './style';
import ProgressiveBackgroundImage from '../ProgressiveBackgroundImage';
import { ClientOnly } from '../ClientOnly';
import { HeaderLoadingScreen } from '../ModernLoadingScreen';
import { useDeviceType, useTranslation } from '@/hooks';
import { useNavigation } from '@/contexts/NavigationContext';
import { getPhoto } from '@/assets/photoAssets';
import {
  animationClasses,
  headerSectionStyles,
} from '@/containers/home/styles';
import DualColorText from '../dualColorText';

const logo = '/eber_logo.png';
const logoMobile = '/svg/eber-logo-color.svg';
const idFlag = '/svg/id.svg';
const enFlag = '/svg/en.svg';

// Constants
const ANIMATION_DURATION = 50; // Sangat cepat
const ANIMATION_STAGGER_DELAY = 0.1; // Stagger delay for navigation items

const NAVIGATION_ITEMS = [
  { name: 'navigation_bar.home', navigation: '/', key: 'home' },
  { name: 'navigation_bar.about_us', navigation: '/about-us', key: 'aboutus' },
  {
    name: 'navigation_bar.corporate',
    navigation: '/corporate',
    key: 'corporate',
  },
  { name: 'navigation_bar.product', navigation: '/product', key: 'product' },
  { name: 'navigation_bar.activity', navigation: '/activity', key: 'activity' },
  { name: 'navigation_bar.careers', navigation: '/careers', key: 'careers' },
  {
    name: 'navigation_bar.contact_us',
    navigation: '/contact-us',
    key: 'contactus',
  },
];

const LANGUAGE_OPTIONS = ['IDN', 'EN'] as const;

const HOMEPAGE_PATHS = ['/'];
const ABOUT_US_PATHS = ['/about-us'];

// Helper functions
const isHomePage = (pathname: string): boolean =>
  HOMEPAGE_PATHS.includes(pathname);

const isAboutUsPage = (pathname: string): boolean =>
  ABOUT_US_PATHS.includes(pathname);

const isActiveNavigation = (pathname: string, navKey: string): boolean => {
  const cleanPath = pathname.substring(1).replaceAll('-', '');
  return cleanPath.includes(navKey) || (pathname === '/' && navKey === 'home');
};

const getLanguageCode = (displayValue: string): 'en' | 'id' =>
  displayValue === 'EN' ? 'en' : 'id';

const getLanguageDisplay = (language: string): string =>
  language === 'en' ? 'EN' : 'IDN';

const shouldShowDesktopNavigation = (isMobile: boolean): boolean => !isMobile;

// Subcomponents
interface NavigationBarProps {
  pathName: string;
  onNavigate: (path: string) => void;
  t: (key: string) => string;
  animationKey: number;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  pathName,
  onNavigate,
  t,
  animationKey,
}) => {
  return (
    <>
      {NAVIGATION_ITEMS.map((item, index) => {
        const isActive = isActiveNavigation(pathName, item.key);

        return (
          <motion.div
            key={`${animationKey}-${index}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: index * ANIMATION_STAGGER_DELAY,
            }}
          >
            <Button
              variant="text"
              onClick={() => onNavigate(item.navigation)}
              sx={headerStyles.navigationButton(isActive)}
            >
              {t(item.name)}
            </Button>
          </motion.div>
        );
      })}
    </>
  );
};

interface LanguageSelectorProps {
  langValue: string;
  onLanguageChange: (event: SelectChangeEvent) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  langValue,
  onLanguageChange,
}) => {
  const langMenu = LANGUAGE_OPTIONS.map((val) => (
    <MenuItem key={val} value={val} sx={headerStyles.languageMenuItem}>
      <Box sx={headerStyles.languageMenuItemContent}>
        <span>{val}</span>
        <Image
          src={val === 'IDN' ? idFlag : enFlag}
          alt={`${val} flag`}
          width={20}
          height={15}
          style={headerStyles.flagImageStyle}
        />
      </Box>
    </MenuItem>
  ));

  return (
    <FormControl sx={headerStyles.languageSelect}>
      <Select
        value={langValue}
        onChange={onLanguageChange}
        sx={{ border: 0 }}
        MenuProps={{
          disableScrollLock: true,
        }}
        renderValue={(value) => (
          <Box sx={headerStyles.languageSelectValue}>
            <span style={{ fontSize: '1.1rem' }}>{value}</span>
            <Image
              src={value === 'IDN' ? idFlag : enFlag}
              alt={`${value} flag`}
              style={headerStyles.flagImageStyle}
              width={20}
              height={15}
            />
          </Box>
        )}
      >
        {langMenu}
      </Select>
    </FormControl>
  );
};

const MobileLanguageSelector: React.FC<LanguageSelectorProps> = ({
  langValue,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageClick = (value: string) => {
    onLanguageChange({ target: { value } } as SelectChangeEvent);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box ref={dropdownRef} sx={headerStyles.customMobileLanguageSelect}>
      {/* Language Selector Button */}
      <Box onClick={toggleDropdown} sx={headerStyles.customLanguageButton}>
        <span>{langValue}</span>
        <Image
          src={langValue === 'IDN' ? idFlag : enFlag}
          alt={`${langValue} flag`}
          width={16}
          height={12}
          style={headerStyles.mobileMenuFlagImageStyle}
        />
        <Box component="span" sx={headerStyles.customDropdownArrow(isOpen)}>
          ▼
        </Box>
      </Box>

      {/* Custom Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={headerStyles.customDropdownContainer}
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <Box
                key={option}
                onClick={() => handleLanguageClick(option)}
                sx={headerStyles.customLanguageOption(option === langValue)}
              >
                <span>{option}</span>
                <Image
                  src={option === 'IDN' ? idFlag : enFlag}
                  alt={`${option} flag`}
                  width={16}
                  height={12}
                  style={headerStyles.mobileMenuFlagImageStyle}
                />
              </Box>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const Header = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Track page changes for re-animation
  const { type, isMobile, isTablet } = useDeviceType();
  const { language, setLanguage, t } = useTranslation();
  const { navigateTo } = useNavigation();
  // const router = useRouter(); // Currently unused
  const pathName = usePathname();

  // Derived values
  const langValue = getLanguageDisplay(language);
  const isHomePagePath = isHomePage(pathName);
  const isAboutUsPagePath = isAboutUsPage(pathName);

  // Event handlers
  const handleLanguageChange = (event: SelectChangeEvent) => {
    const selectedLang = getLanguageCode(event.target.value);
    setLanguage(selectedLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effects - Trigger animation on every page change
  useEffect(() => {
    setIsAnimating(true);
    setAnimationKey((prev) => prev + 1); // Increment key to force re-animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [pathName]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  const handleNavigate = (path: string) => {
    // Use fast navigation context instead of direct router.push
    navigateTo(path);
  };

  // Get responsive logo dimensions based on device type
  const getLogoDimensions = () => {
    if (isMobile) {
      return { width: '60%', height: 'auto' };
    }
    if (isTablet) {
      return { width: '10vw', height: 'auto' };
    }
    return { width: '10vw', maxWidth: '180px', height: 'auto' };
  };

  // Logo component
  const LogoSection = () => (
    <Box style={headerStyles.logoContainer}>
      <Image
        src={logo}
        alt="EBER Logo"
        width={100}
        height={100}
        style={getLogoDimensions()}
      />
    </Box>
  );

  // Right section component
  const RightSection = () => (
    <motion.div
      style={headerStyles.rightSectionContainer}
      animate={{
        opacity: isAnimating ? 0.5 : 1,
        scale: isAnimating ? 0.95 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <LanguageSelector
        langValue={langValue}
        onLanguageChange={handleLanguageChange}
      />
    </motion.div>
  );

  const homepageImage = useMemo(
    () => (
      <>
        <Box sx={headerStyles.homepageTitleSection}>
          <Typography
            className={animationClasses.slideRight}
            fontSize={'clamp(2em, 3vw, 5em)'}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.innovating')}
          </Typography>
          <DualColorText
            text={`${t('home.title.as')}\u00a0{${t('home.title.sustainable')}}`}
            fontSize={'clamp(2em, 3vw, 5em)'}
            fontWeight={800}
            inline
            color="white"
            sx={headerSectionStyles.title}
            className={animationClasses.slideRight}
          />
          <Typography
            className={animationClasses.slideRight}
            fontSize={'clamp(2em, 3vw, 5em)'}
            fontWeight={800}
            sx={headerSectionStyles.title}
          >
            {t('home.title.future')}
          </Typography>
          <Typography
            sx={headerStyles.homepageDescriptionText}
            className={animationClasses.stagger}
          >
            {t('home.desc')}
          </Typography>
          <Box
            id="buttons-wrapper"
            sx={headerStyles.homepageButtonsWrapper}
            className={animationClasses.stagger}
          >
            <Button
              size="small"
              sx={headerSectionStyles.primaryButton}
              onClick={() => handleNavigate('/product')}
            >
              {t('home.product_button')}
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={headerSectionStyles.secondaryButton(type)}
              onClick={() => handleNavigate('/product/submit')}
            >
              {t('home.custom_product_button')}
            </Button>
          </Box>
        </Box>
        <Box sx={headerStyles.homepageImageContainer}>
          <Box
            sx={headerStyles.homepageModalBox}
            className={animationClasses.slideLeft}
          >
            <Typography color="white" fontSize="0.85em" fontWeight={800}>
              {t('home.modal.title')}
            </Typography>
            <Typography color="white" fontSize="0.85em" fontWeight={400}>
              {t('home.modal.desc')}
            </Typography>
          </Box>
          <Box
            sx={headerStyles.homepageImageWrapper}
            className={animationClasses.slideRight}
          >
            <Image
              src="/photo/subtract.png"
              alt="header-photo"
              width={900}
              height={900}
              style={headerStyles.contentImageStyle}
              loading="lazy"
            />
          </Box>
        </Box>
      </>
    ),
    [type, t]
  );

  const homepageImageMobile = useMemo(
    () => (
      <Box sx={headerStyles.mobileHomepageContainer}>
        <Box sx={headerStyles.mobileHomepageTitleSection}>
          <Typography
            className={animationClasses.slideRight}
            fontSize={'9vw'}
            fontWeight={800}
            sx={headerSectionStyles.titleMobile}
          >
            {t('home.title.innovating')}
          </Typography>
          <DualColorText
            text={`${t('home.title.as')}\u00a0{${t('home.title.sustainable')}}`}
            className={animationClasses.slideRight}
            fontSize={'9vw'}
            fontWeight={800}
            inline
            color="white"
            sx={headerSectionStyles.titleMobile}
          />
          <Typography
            className={animationClasses.slideRight}
            fontSize={'9vw'}
            fontWeight={800}
            sx={headerSectionStyles.titleMobile}
          >
            {t('home.title.future')}
          </Typography>
        </Box>

        <Box sx={headerStyles.mobileHomepageContentSection}>
          <Box sx={headerStyles.mobileHomepageImageWrapper}>
            <Box
              sx={headerStyles.mobileHomepageModalBox}
              className={animationClasses.slideLeft}
            >
              <Typography color="white" fontSize={'2.2vw'} fontWeight={800}>
                {t('home.modal.title')}
              </Typography>
              <Typography color="white" fontSize={'2.2vw'} fontWeight={400}>
                {t('home.modal.desc')}
              </Typography>
            </Box>
            <Box sx={headerStyles.mobileHomepageImage}>
              <Image
                src={getPhoto('subtract')}
                alt="header-photo"
                fill
                loading="lazy"
                className={animationClasses.slideRight}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    [type, t]
  );

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/eber-compro.pdf';
    link.download = 'eber-company-profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const aboutUsImage = useMemo(
    () => (
      <>
        <Box sx={headerStyles.aboutUsContentContainer(type)}>
          <DualColorText
            text={`${t('about_us.title.our')}\u00a0{${t('about_us.title.company')}}`}
            fontSize={aboutUsFontSizes.title(type)}
            fontWeight={800}
            inline
            color="white"
            sx={headerStyles.aboutUsDualColorText(type)}
          />
          <Typography
            fontSize={aboutUsFontSizes.title(type)}
            fontWeight={800}
            marginTop={aboutUsFontSizes.marginTop(type)}
            sx={headerStyles.aboutUsGradientTitle(type)}
          >
            {t('about_us.title.background')}
          </Typography>
          <Typography style={aboutUsDescriptionStyle(type, language)}>
            {t('about_us.desc')}
          </Typography>
          {type !== 'mobile' && (
            <Button
              size="small"
              onClick={handleDownload}
              sx={headerStyles.aboutUsDownloadButton}
            >
              {t('about_us.download_button')}
            </Button>
          )}
        </Box>
        <Box sx={headerStyles.aboutUsImageContainer(type)}>
          <Image
            src={getPhoto('tankiPerson')}
            alt="header photo"
            fill
            loading="lazy"
          />
        </Box>
      </>
    ),
    [type, language]
  );

  return (
    <>
      <header style={headerStyles.header}>
        <ClientOnly fallback={<HeaderLoadingScreen />}>
          <ProgressiveBackgroundImage
            alt="header background"
            sx={headerStyles.backgroundImage(
              type,
              isHomePagePath || isAboutUsPagePath
            )}
            contentSx={headerStyles.backgroundImageContent}
            customGradient={
              isMobile
                ? 'linear-gradient(135deg, rgba(19, 64, 91, 1) 0%, rgba(120, 71, 145, 1) 98%, rgba(221, 156, 54, 1) 100%)'
                : 'linear-gradient(135deg, rgba(19, 64, 91, 1) 0%, rgba(120, 71, 145, 1) 84%, rgba(221, 156, 54, 1) 100%)'
            }
            roundedBottom={true}
            roundedBottomRadius={
              isMobile
                ? '0 0 95% 95% / 0 0 10% 10%'
                : '0% 0% 32% 85% / 0% 0% 15% 21%'
            }
          >
            <Box
              style={headerStyles.headerAccessories(type)}
              className={animationClasses.slideRight}
            >
              <Image
                src={
                  isMobile && !isTablet
                    ? getPhoto('eberBig2Mobile')
                    : getPhoto('eberBig2')
                }
                width={1000}
                height={1000}
                alt="header accessories"
                style={{
                  objectFit: 'fill',
                  width: '100%',
                  height: '100%',
                }}
                loading="lazy"
              />
            </Box>

            {/* Main Header Container */}
            <Box
              sx={headerStyles.container}
              style={{ marginBottom: isMobile ? '20px' : '70px' }}
            >
              <LogoSection />

              {/* Desktop and Tablet Navigation */}
              {shouldShowDesktopNavigation(isMobile) && (
                <Box
                  className="desktop-navigation"
                  sx={headerStyles.desktopNavigationContainer}
                >
                  <NavigationBar
                    animationKey={animationKey}
                    pathName={pathName}
                    onNavigate={handleNavigate}
                    t={t}
                  />
                </Box>
              )}

              {/* Right Section - Language & Search (Desktop & Tablet) */}
              {shouldShowDesktopNavigation(isMobile) && <RightSection />}

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={headerStyles.mobileMenuButtonContainer}
                >
                  <IconButton
                    onClick={toggleMobileMenu}
                    sx={headerStyles.mobileMenuButton}
                    aria-label="Toggle mobile menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </motion.div>
              )}
            </Box>
            {isHomePagePath && (
              <Box
                key={`homepage-content-${isMobile ? 'mobile' : 'desktop'}`}
                sx={headerStyles.homepageContentWrapper(isMobile)}
              >
                {isMobile ? homepageImageMobile : homepageImage}
              </Box>
            )}
            {isAboutUsPagePath && (
              <Box sx={headerStyles.aboutUsPageWrapper(isMobile)}>
                {aboutUsImage}
              </Box>
            )}
          </ProgressiveBackgroundImage>
        </ClientOnly>
      </header>

      {/* Mobile Navigation Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={headerStyles.mobileBackdrop}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={headerStyles.mobileSlideMenu}
          >
            {/* Menu Header with Logo, Language Selector, and Search */}
            <Box sx={headerStyles.mobileMenuHeader}>
              <Box sx={headerStyles.mobileMenuLogoContainer}>
                <Image
                  src={type === 'mobile' ? logoMobile : logo}
                  width={100}
                  height={100}
                  alt="EBER-Logo"
                  style={headerStyles.mobileMenuLogo}
                />
              </Box>
              <Box sx={headerStyles.mobileMenuHeaderRight}>
                <MobileLanguageSelector
                  langValue={langValue}
                  onLanguageChange={handleLanguageChange}
                />
              </Box>
            </Box>

            {/* Navigation List */}
            <Box sx={headerStyles.mobileMenuNavigation}>
              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = isActiveNavigation(pathName, item.key);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    <Button
                      variant="text"
                      onClick={() => handleNavigate(item.navigation)}
                      sx={headerStyles.mobileMenuNavigationButton(isActive)}
                      fullWidth
                    >
                      {t(item.name)}
                    </Button>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
