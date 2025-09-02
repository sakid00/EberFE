'use client';
import Image from 'next/image';
import logo from '@public/eber_logo.png';
import bgHeader from '@public/background/bg_header.png';
import bgHeaderHomepage from '@public/background/homepage_header_bg.png';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { headerStyles } from './style';
import ImageBackground from '../ImageBackground';
import { ClientOnly } from '../ClientOnly';
import { useDeviceType } from '@/hooks';
import headerAccessories from '@public/photo/eber-big-2.png';

const navigationList = [
  { name: 'Home', navigation: '/' },
  { name: 'About Us', navigation: '/about-us' },
  { name: 'Corporate', navigation: '/corporate' },
  { name: 'Product', navigation: '/product' },
  { name: 'Activity', navigation: '/activity' },
  { name: 'Careers', navigation: '/careers' },
  { name: 'Contact Us', navigation: '/contact-us' },
];

const langList = ['IDN', 'EN'];

const Header = () => {
  const [langValue, setLangValue] = useState<string>('IDN');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { type } = useDeviceType();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event: SelectChangeEvent) => {
    setLangValue(event.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathName]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathName]);

  const navigationBar = navigationList.map((val, index) => {
    const isPathName =
      pathName
        .substring(1)
        .replaceAll('-', '')
        .includes(val.name.toLowerCase().replaceAll(' ', '')) ||
      (pathName === '/' && val.name === 'Home');

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
          delay: isAnimating ? 0 : index * 0.1,
        }}
      >
        <Button
          variant="text"
          onClick={() => {
            router.push(val.navigation);
          }}
          sx={headerStyles.navigationButton(isPathName)}
        >
          {val.name}
        </Button>
      </motion.div>
    );
  });

  const langMenu = langList.map((val) => (
    <MenuItem key={val} value={val}>
      {val}
    </MenuItem>
  ));

  // Get responsive logo dimensions
  const getLogoDimensions = () => {
    if (isMobile) {
      return { width: '60%', height: 'auto' };
    }
    return { width: '80%', height: 'auto' };
  };

  return (
    <header style={headerStyles.header}>
      <ClientOnly
        fallback={
          <ImageBackground
            src={
              pathName !== '/' && pathName !== '/about-us'
                ? bgHeader
                : bgHeaderHomepage
            }
            objectFit="fill"
            alt=""
            sx={headerStyles.backgroundImage(
              type,
              pathName === '/' || pathName === '/about-us'
            )}
            contentSx={headerStyles.backgroundImageContent}
          >
            {/* Main Header Container */}
            <Box sx={headerStyles.container}>
              {/* Logo */}
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
                <Image
                  src={logo}
                  alt=""
                  style={{ width: '80%', height: 'auto' }}
                />
              </motion.div>

              {/* Desktop Navigation */}
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
                {navigationBar}
              </motion.div>

              {/* Right Section - Language & Search (Desktop) */}
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}
                animate={{
                  opacity: isAnimating ? 0.5 : 1,
                  scale: isAnimating ? 0.95 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <FormControl sx={headerStyles.languageSelect}>
                  <Select
                    value={langValue}
                    onChange={handleChange}
                    sx={{ border: 0 }}
                  >
                    {langMenu}
                  </Select>
                </FormControl>
                <IconButton sx={headerStyles.searchButton}>
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </motion.div>
            </Box>
          </ImageBackground>
        }
      >
        <ImageBackground
          src={bgHeaderHomepage}
          objectFit="fill"
          alt=""
          sx={headerStyles.backgroundImage(
            type,
            pathName === '/' || pathName === '/about-us'
          )}
          contentSx={headerStyles.backgroundImageContent}
        >
          <Image
            src={headerAccessories}
            alt="header accessories"
            style={headerStyles.headerAccessories(
              type,
              pathName === '/' || pathName === '/about-us'
            )}
          />
          {/* Main Header Container */}
          <Box sx={headerStyles.container}>
            {/* Logo */}
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
              <Image src={logo} alt="" style={getLogoDimensions()} />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="desktop-navigation"
              style={{
                display: isMobile ? 'none' : 'flex',
                flexDirection: 'row',
              }}
              animate={{
                opacity: isAnimating ? 0.3 : 1,
                y: isAnimating ? -10 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navigationBar}
            </motion.div>

            {/* Right Section - Language & Search (Desktop) */}
            {!isMobile && (
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}
                animate={{
                  opacity: isAnimating ? 0.5 : 1,
                  scale: isAnimating ? 0.95 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <FormControl sx={headerStyles.languageSelect}>
                  <Select
                    value={langValue}
                    onChange={handleChange}
                    sx={{ border: 0 }}
                  >
                    {langMenu}
                  </Select>
                </FormControl>
                <IconButton sx={headerStyles.searchButton}>
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }}
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={headerStyles.mobileNavigation}
          >
            <Box sx={headerStyles.mobileNavigationContent}>
              {navigationBar}
              <Box sx={headerStyles.mobileRightSection}>
                <FormControl sx={headerStyles.languageSelect}>
                  <Select
                    value={langValue}
                    onChange={handleChange}
                    sx={{ border: 0 }}
                  >
                    {langMenu}
                  </Select>
                </FormControl>
                <IconButton sx={headerStyles.searchButton}>
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
