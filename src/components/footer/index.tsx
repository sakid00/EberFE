import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../../../public/eber_logo.png';
import LocationIcon from '@mui/icons-material/LocationPin';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/CallOutlined';
import BusinessIcon from '@mui/icons-material/BusinessOutlined';
import CopyrightIcon from '@mui/icons-material/CopyrightOutlined';
import { Plus_Jakarta_Sans } from 'next/font/google';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Footer = () => {
  const contactInfoList = [
    {
      logo: <LocationIcon />,
      desc: `Millennium Centennial Center, 38th Floor\n Jl. Jend Sudirman Kav.25\n Jakarta 12920, Indonesia`,
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
        <Typography marginLeft={1} sx={{ whiteSpace: 'pre-line' }}>
          {val.desc}
        </Typography>
      </Box>
    );
  });
  const subsidiariesListMap = subsidiariesList.map((val, index) => {
    return (
      <Box className="flex mt-4" key={index}>
        {val.logo}
        <Typography marginLeft={1}>{val.name}</Typography>
      </Box>
    );
  });

  return (
    <footer>
      <Box
        sx={{
          backgroundImage: `url(/background/bg_footer.png)`,
          backgroundSize: 'auto',
          backgroundPosition: 'center',
        }}
        className="justify-center align-center pt-[5vh] px-[10vw] pb-[2vh] z-100 mt-[5vh]"
      >
        <Box className="flex flex-col">
          <Box className="flex flex-row items-center w-1/2">
            <Image src={logo} style={{ width: '6vw', height: '4vh' }} alt="" />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{
                marginX: 2,
                backgroundColor: '#8F92A7',
                borderRadius: 10,
                height: 100,
                width: 2,
              }}
            />
            <Typography
              className={`${font.className}`}
              sx={{ whiteSpace: 'pre-line' }}
            >
              {
                'Established in 2021, Eber Group oversees four\n top-performing chemical manufacturing companies operating across\n Indonesia, delivering high-performance specialty materials and chemical\n solutions.'
              }
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
            className="flex self-center"
            sx={{
              marginTop: '5vh',
              marginBottom: '2vh',
              backgroundColor: '#8F92A7',
              borderRadius: 10,
              height: 1,
              width: '80vw',
            }}
          />
          <Box className="flex justify-center">
            <CopyrightIcon />
            <Typography marginLeft={0.5}>
              2025 Eber Group. All right reserved
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
