'use client';
import { Box, Divider, Typography } from '@mui/material';
import { useDeviceType } from '@/hooks';
import Image from 'next/image';
import logo from '@/public/eber_logo.png';
import CopyrightIcon from '@mui/icons-material/CopyrightOutlined';
import { footerStyles } from './style';
import locationIcon from '@/public/icon/footer-loc.svg';
import emailIcon from '@/public/icon/footer-mail.svg';
import phoneIcon from '@/public/icon/footer-phone.svg';
import company1Icon from '@/public/icon/footer-company-1.svg';
import company2Icon from '@/public/icon/footer-company-2.svg';
import company3Icon from '@/public/icon/footer-company-3.svg';
import company4Icon from '@/public/icon/footer-company-4.svg';
import bgFooter from '@/public/eber-footer.png';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import site from '@/public/background/site-bg-mobile.png';
import { usePathname } from 'next/navigation';

const contactInfoList = [
  {
    logo: (
      <Image
        src={locationIcon}
        alt="location"
        width={20}
        height={20}
        style={{ alignSelf: 'start' }}
      />
    ),
    desc: `Millennium Centennial Center, 38th Floor\n Jl. Jend Sudirman Kav.25\n Jakarta 12920, Indonesia`,
  },
  {
    logo: <Image src={emailIcon} alt="email" width={20} height={20} />,
    desc: 'info@ebergroup.com',
  },
  {
    logo: <Image src={phoneIcon} alt="phone" width={20} height={20} />,
    desc: '+62-21 5020 2622',
  },
];
const subsidiariesList = [
  {
    logo: <Image src={company1Icon} alt="company1" width={20} height={20} />,
    name: 'PT Eternal Buana Chemical Industries',
  },
  {
    logo: <Image src={company2Icon} alt="company2" width={20} height={20} />,
    name: 'PT Petrowidada',
  },
  {
    logo: <Image src={company3Icon} alt="company2" width={20} height={20} />,
    name: 'PT Eterindo Nusa Graha',
  },
  {
    logo: <Image src={company4Icon} alt="company3" width={20} height={20} />,
    name: 'PT Mega Prima Solvindo',
  },
];

const Footer = () => {
  const { type } = useDeviceType();
  const pathName = usePathname();
  const ABOUT_US_PATHS = ['/about-us'];
  const isAboutUsPage = ABOUT_US_PATHS.includes(pathName);

  const contactInfoListMap = contactInfoList.map((val, index) => {
    return (
      <Box className="flex mt-4" key={index}>
        {val.logo}
        <Typography sx={footerStyles.contactText}>{val.desc}</Typography>
      </Box>
    );
  });

  const subsidiariesListMap = subsidiariesList.map((val, index) => {
    return (
      <Box className="flex mt-4" key={index}>
        {val.logo}
        <Typography sx={footerStyles.subsidiaryText}>{val.name}</Typography>
      </Box>
    );
  });

  return (
    <footer style={{ position: 'relative' }}>
      {type === 'mobile' && isAboutUsPage && (
        <Box
          sx={{
            position: 'absolute',
            bottom: ' 100%',
            right: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}
        >
          <Image src={site} alt="site" fill />
        </Box>
      )}
      <Box
        sx={footerStyles.container(type)}
        className="justify-center align-center px-[10vw] pb-[2vh] z-100"
      >
        <Box className="flex flex-col relative">
          <Box
            sx={{
              position: 'absolute',
              top: dynamicStylingValue(type, '-28%', '-50%', '-50%'),
              right: '-15%',
              bottom: 0,
              zIndex: 10,
            }}
          >
            <Image
              src={bgFooter}
              alt="bg-footer"
              style={{
                width: dynamicStylingValue(type, '85vw', '50vw', '50vw'),
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box sx={footerStyles.headerSection(type)}>
            <Image src={logo} style={footerStyles.logo(type)} alt="logo" />
            <Box sx={footerStyles.dividerContainer}>
              <Divider
                orientation="vertical"
                variant="middle"
                sx={footerStyles.verticalDivider}
              />
              <Typography sx={footerStyles.descriptionText(type)}>
                {
                  'Established in 2021, EBER Group oversees four\n top-performing chemical manufacturing companies operating across\n Indonesia, delivering high-performance specialty materials and chemical\n solutions.'
                }
              </Typography>
            </Box>
          </Box>
          <Box sx={footerStyles.infoSection(type)}>
            <Box>
              <Typography sx={footerStyles.sectionTitle}>
                Contact Information
              </Typography>
              <Box className="w-[100%]">{contactInfoListMap}</Box>
            </Box>
            <Box>
              <Typography sx={footerStyles.sectionTitle}>
                Our Subsidiaries
              </Typography>
              <Box>{subsidiariesListMap}</Box>
            </Box>
          </Box>
          <Divider
            variant="middle"
            className="flex self-center"
            sx={footerStyles.horizontalDivider}
          />
          <Box className="flex justify-center items-center">
            <CopyrightIcon sx={footerStyles.copyrightIcon} />
            <Typography sx={footerStyles.copyrightText}>
              2025 EBER Group. All right reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
