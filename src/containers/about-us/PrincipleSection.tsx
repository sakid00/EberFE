import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person3.png';
import { principleStyles } from './styles';
import container from '@public/svg/container.svg';

export const PrincipleSection = () => (
  <Box id="home-third-section" className="relative justify-center items-center">
    <Box
      className="w-full z-20 animate-slide-right"
      sx={principleStyles.fieldPersonContainer}
    >
      <Image src={fieldPerson} alt="field-person" width={550} height={400} />
    </Box>
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        '& svg': {
          color: '#4ECDC4', // Target the SVG specifically
        },
      }}
    >
      <Image src={container} alt="container" fill />
    </Box>
    <Box
      className="clip-custom-shape relative w-[100vw] h-[85vh] flex flex-row gap-8 mt-40 animate-on-scroll"
      sx={principleStyles.mainContainer}
    >
      <Box
        className="w-full flex justify-center"
        sx={principleStyles.spacerBox}
      />
      <Box
        className="flex flex-col justify-center animate-slide-right"
        sx={principleStyles.contentContainer}
      >
        <Typography fontSize={'3em'} fontWeight={700}>
          Our Guiding
        </Typography>
        <Typography
          fontSize={'3em'}
          fontWeight={700}
          sx={principleStyles.backgroundText}
        >
          Principle &
        </Typography>
        <Typography
          fontSize={'3em'}
          fontWeight={700}
          sx={principleStyles.backgroundText}
        >
          Future Goals
        </Typography>
        <Typography
          fontSize={'1.5em'}
          fontWeight={700}
          sx={principleStyles.visionTitle}
        >
          Vision
        </Typography>
        <Typography
          fontSize={'1em'}
          fontWeight={400}
          sx={principleStyles.visionDescription}
        >
          To be the foremost regional petrochemical company for its performance,
          ESG, people, partnership and business sustainability.
        </Typography>
        <Typography
          fontSize={'1.5em'}
          fontWeight={700}
          sx={principleStyles.missionTitle}
        >
          Mission
        </Typography>
        <Typography
          fontSize={'1em'}
          fontWeight={400}
          sx={principleStyles.missionDescription}
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
