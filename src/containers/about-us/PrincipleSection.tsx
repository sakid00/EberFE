import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person3.png';

export const PrincipleSection = () => (
  <Box id="home-third-section" className="relative">
    <Box
      className="w-full z-20 animate-slide-right"
      sx={{ position: 'absolute', bottom: 0, left: -20 }}
    >
      <Image src={fieldPerson} alt="field-person" width={550} height={400} />
    </Box>
    <Box
      className="clip-custom-shape relative text-white flex flex-row gap-8 mt-40 animate-on-scroll"
      sx={{
        background:
          'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
        zIndex: -1,
      }}
    >
      <Box
        className="w-full flex justify-center"
        sx={{ width: 600, height: 509 }}
      />
      <Box className="flex flex-col justify-center max-w-[45%] animate-slide-right">
        <Typography variant="h4" fontWeight={700}>
          Our Guiding
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            background:
              'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Principle &
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            background:
              'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Future Goals
        </Typography>
        <Typography
          fontSize={'24px'}
          fontWeight={700}
          sx={{ marginTop: '10px' }}
        >
          Vision
        </Typography>
        <Typography
          fontSize={'16px'}
          fontWeight={400}
          sx={{ marginTop: '5px' }}
        >
          To be the foremost regional petrochemical company for its performance,
          ESG, people, partnership and business sustainability.
        </Typography>
        <Typography
          fontSize={'24px'}
          fontWeight={700}
          sx={{ marginTop: '10px' }}
        >
          Mission
        </Typography>
        <Typography
          fontSize={'16px'}
          fontWeight={400}
          sx={{ marginTop: '5px' }}
        >
          To develop and produce superior, reliable, environmental friendly
          product and provide the best solution for our customers and society in
          building a national industry advancement by making the best use of
          available resources and embracing a core set of company values.
        </Typography>
      </Box>
    </Box>
  </Box>
);
