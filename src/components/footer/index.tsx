import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../../../public/eber_logo.png';
import LocationIcon from '@mui/icons-material/LocationPin';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/CallOutlined';
import BusinessIcon from '@mui/icons-material/BusinessOutlined';
import CopyrightIcon from '@mui/icons-material/CopyrightOutlined';

const Footer = () => {
  const contactInfoList = [
    {
      logo: <LocationIcon />,
      desc: 'Millennium Centennial Center, 38th Floor, Jl. Jend Sudirman Kav.25, Jakarta 12920, Indonesia',
    },
    {
      logo: <EmailIcon />,
      desc: 'info@ebergroup.com',
    },
    {
      logo: <PhoneIcon />,
      desc: '+62-21 5020 2622',
    },
  ];
  const subsidiariesList = [
    {
      logo: <BusinessIcon />,
      name: 'PT Eternal Buana Chemical Industries',
    },
    {
      logo: <BusinessIcon />,
      name: 'PT Petrowidada',
    },
    {
      logo: <BusinessIcon />,
      name: 'PT Eterindo Nusa Graha',
    },
    {
      logo: <BusinessIcon />,
      name: 'PT Mega Prima Solvindo',
    },
  ];

  const contactInfoListMap = contactInfoList.map((val, index) => {
    return (
      <Box className="flex mt-4" key={index}>
        {val.logo}
        <Typography marginLeft={1}>{val.desc}</Typography>
      </Box>
    );
  });
  const subsidiariesListMap = subsidiariesList.map((val) => {
    return (
      <Box className="flex mt-4">
        {val.logo}
        <Typography marginLeft={1}>{val.name}</Typography>
      </Box>
    );
  });

  return (
    <footer>
      <Box className="mb-100">
        <Box className="flex flex-row items-center justify-between w-1/2">
          <Image src={logo} className="w-30 h-15" alt="" />
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{
              marginX: 2,
              backgroundColor: '#8F92A7',
              borderRadius: 10,
              height: 100,
              width: 4,
            }}
          />
          <Typography>
            Established in 2021, Eber Group oversees four top-performing
            chemical manufacturing companies operating across Indonesia,
            delivering high-performance specialty materials and chemical
            solutions.
          </Typography>
        </Box>
        <Box className="flex mt-4 w-1/2">
          <Box>
            <Typography>Contact Information</Typography>
            <Box className="w-3/4">{contactInfoListMap}</Box>
          </Box>
          <Box>
            <Typography>Our Subsidiaries</Typography>
            <Box>{subsidiariesListMap}</Box>
          </Box>
        </Box>
        <Divider
          variant="middle"
          sx={{
            marginY: 2,
            backgroundColor: '#8F92A7',
            borderRadius: 10,
            height: 1,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Box className="flex">
          <CopyrightIcon />
          <Typography marginLeft={0.5}>
            2025 Eber Group. All right reserved
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
