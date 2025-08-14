import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import Image from 'next/image';
import fieldPerson from '@public/photo/field_person2.png';

export const CustomProductSection = () => (
  <Box id="home-third-section" className="relative">
    <Box
      className="w-full z-20 animate-slide-left"
      sx={{ position: 'absolute', top: -10, left: 45 }}
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
        <DualColorText
          text1="Make it Yours,"
          text2="Customize Your Product"
          text1Variant="h4"
          text2Variant="h4"
          color="white"
          fontWeight={700}
        />
        <Typography variant="h4" fontWeight={700}>
          Today!
        </Typography>
        <Typography
          color="#D6CBE3"
          variant="body1"
          fontSize={'14px'}
          fontWeight={400}
          sx={{ marginTop: '20px' }}
        >
          Eber Group&apos;s expertise in specialty materials is supported by a
          strong in-house R&D team, which enables the company to provide
          solutions for products and processes improvement in the
          infrastructure, construction, automotive, environmental and
          manufacturing industries.
        </Typography>

        <Button
          size="small"
          sx={{
            color: 'white',
            background:
              'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
            paddingY: 2,
            paddingx: 1,
            borderRadius: 10,
            fontWeight: 600,
            width: '30%',
            height: '10%',
            fontSize: '12px',
            marginTop: 4,
            textTransform: 'none',
          }}
        >
          Custom Product
        </Button>
      </Box>
    </Box>
  </Box>
);
