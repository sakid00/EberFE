'use client';
import { Box, Divider, Typography } from '@mui/material';
import { useDeviceType } from '../../hooks';
import Image from 'next/image';
import logo from '../../../public/eber_logo.png';
import LocationIcon from '@mui/icons-material/LocationPin';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/CallOutlined';
import BusinessIcon from '@mui/icons-material/BusinessOutlined';
import CopyrightIcon from '@mui/icons-material/CopyrightOutlined';
import { footerStyles } from './style';

const contactInfoList = [
  {
    logo: <LocationIcon sx={{ color: 'white' }} />,
    desc: `Millennium Centennial Center, 38th Floor\n Jl. Jend Sudirman Kav.25\n Jakarta 12920, Indonesia`,
  },
  {
    logo: <EmailIcon sx={{ color: 'white' }} />,
    desc: 'info@ebergroup.com',
  },
  {
    logo: <PhoneIcon sx={{ color: 'white' }} />,
    desc: '+62-21 5020 2622',
  },
];
const subsidiariesList = [
  {
    logo: <BusinessIcon sx={{ color: 'white' }} />,
    name: 'PT Eternal Buana Chemical Industries',
  },
  {
    logo: <BusinessIcon sx={{ color: 'white' }} />,
    name: 'PT Petrowidada',
  },
  {
    logo: <BusinessIcon sx={{ color: 'white' }} />,
    name: 'PT Eterindo Nusa Graha',
  },
  {
    logo: <BusinessIcon sx={{ color: 'white' }} />,
    name: 'PT Mega Prima Solvindo',
  },
];

const Footer = () => {
  const { type } = useDeviceType();

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
    <footer>
      <Box
        sx={footerStyles.container}
        className="justify-center align-center pt-[10vh] px-[10vw] pb-[2vh] z-100"
      >
        <Box className="flex flex-col">
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
                  'Established in 2021, Eber Group oversees four\n top-performing chemical manufacturing companies operating across\n Indonesia, delivering high-performance specialty materials and chemical\n solutions.'
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
              2025 Eber Group. All right reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
