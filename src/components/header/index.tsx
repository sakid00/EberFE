'use client';
import Image from 'next/image';
import logo from '@/public/eber_logo.png';
import logoMobile from '@/public/svg/eber-logo-color.svg';
import bgHeaderHomepage from '@/public/background/homepage_header_bg.png';
import idFlag from '@/public/svg/id.svg';
import enFlag from '@/public/svg/en.svg';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { headerStyles } from './style';
import ImageBackground from '../ImageBackground';
import { ClientOnly } from '../ClientOnly';
import { useDeviceType, useTranslation } from '@/hooks';
import headerAccessoriesMobile from '@/public/photo/eber-big-2-mobile.png';
import headerAccessories from '@/public/photo/eber-big-2.png';
import photo from '@/public/photo/subtract.png';
import photoTank from '@/public/photo/tangki-person.png';
import { dynamicStylingValue } from '@/hooks/useDeviceType';

// Constants
const ANIMATION_DURATION = 300;
const ANIMATION_STAGGER_DELAY = 0.1;

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
  isAnimating: boolean;
  pathName: string;
  onNavigate: (path: string) => void;
  t: (key: string) => string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  isAnimating,
  pathName,
  onNavigate,
  t,
}) => {
  return (
    <>
      {NAVIGATION_ITEMS.map((item, index) => {
        const isActive = isActiveNavigation(pathName, item.key);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: isAnimating ? 0 : 1,
              y: isAnimating ? -20 : 0,
              scale: isAnimating ? 0.95 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: isAnimating ? 0 : index * ANIMATION_STAGGER_DELAY,
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
        renderValue={(value) => (
          <Box sx={headerStyles.languageSelectValue}>
            <span>{value}</span>
            <Image
              src={value === 'IDN' ? idFlag : enFlag}
              alt={`${value} flag`}
              width={20}
              height={15}
              style={headerStyles.flagImageStyle}
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
    console.log('Custom language selector clicked:', value);
    onLanguageChange({ target: { value } } as SelectChangeEvent);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    console.log('Custom dropdown toggled:', !isOpen);
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
  const { type, isMobile, isTablet } = useDeviceType();
  const { language, setLanguage, t } = useTranslation();
  const router = useRouter();
  const pathName = usePathname();

  // Derived values
  const langValue = getLanguageDisplay(language);
  const isHomePagePath = isHomePage(pathName);
  const isAboutUsPagePath = isAboutUsPage(pathName);

  // Event handlers
  const handleLanguageChange = (event: SelectChangeEvent) => {
    console.log('Language change triggered:', event.target.value);
    const selectedLang = getLanguageCode(event.target.value);
    setLanguage(selectedLang);
  };

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked. Current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effects
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [pathName]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // Get responsive logo dimensions based on device type
  const getLogoDimensions = () => {
    if (isMobile) {
      return { width: '60%', height: 'auto' };
    }
    if (isTablet) {
      return { width: '70%', height: 'auto' };
    }
    return { width: '80%', height: 'auto' };
  };

  // Logo component
  const LogoSection = () => (
    <motion.div
      style={headerStyles.logoContainer}
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: isAnimating ? 0 : 1,
        y: isAnimating ? -30 : 0,
        scale: isAnimating ? 0.9 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
        delay: isAnimating ? 0 : 0.2,
      }}
    >
      <Image src={logo} alt="Eber Logo" style={getLogoDimensions()} />
    </motion.div>
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

  return (
    <>
      <header style={headerStyles.header}>
        <ClientOnly fallback={<div>Loading header...</div>}>
          <ImageBackground
            src={bgHeaderHomepage}
            alt=""
            objectFit="fill"
            sx={headerStyles.backgroundImage(
              type,
              isHomePagePath || isAboutUsPagePath
            )}
            contentSx={headerStyles.backgroundImageContent}
          >
            <Image
              src={
                isMobile && !isTablet
                  ? headerAccessoriesMobile
                  : headerAccessories
              }
              alt="header accessories"
              style={headerStyles.headerAccessories(type)}
            />

            {isHomePagePath && (
              <Box
                sx={{
                  position: 'absolute',
                  width: dynamicStylingValue(type, '100%', '50%', '50%'),
                  height: dynamicStylingValue(type, '50%', '80%', '80%'),
                  top: dynamicStylingValue(type, '50%', '22%', '22%'),
                  left: dynamicStylingValue(type, '0', '38%', '38%'),
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <Image src={photo} alt="header photo" fill />
              </Box>
            )}

            {isAboutUsPagePath && (
              <Box
                sx={{
                  position: 'absolute',
                  width: dynamicStylingValue(type, '90%', '60%', '60%'),
                  height: dynamicStylingValue(type, '50%', '100%', '100%'),
                  aspectRatio: '1/1.1',
                  top: dynamicStylingValue(type, '50%', '10%', '10%'),
                  left: dynamicStylingValue(type, '10%', '40%', '40%'),
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <Image src={photoTank} alt="header photo" fill />
              </Box>
            )}

            {/* Main Header Container */}
            <Box sx={headerStyles.container}>
              <LogoSection />

              {/* Desktop and Tablet Navigation */}
              {shouldShowDesktopNavigation(isMobile) && (
                <motion.div
                  className="desktop-navigation"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  animate={{
                    opacity: isAnimating ? 0.3 : 1,
                    y: isAnimating ? -10 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <NavigationBar
                    isAnimating={isAnimating}
                    pathName={pathName}
                    onNavigate={handleNavigate}
                    t={t}
                  />
                </motion.div>
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
          </ImageBackground>
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
                  alt="Eber-Logo"
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
