import { Box, Typography, TypographyVariant } from '@mui/material';

interface IDualColorTextProps {
  text1: string;
  text1Variant?: TypographyVariant
  text2: string;
  text2Variant?: TypographyVariant
  inline?: boolean;
}

const DualColorText = ({ text1, text2, inline, text1Variant, text2Variant }: IDualColorTextProps) => {
  return (
    <Box className={`${inline ? 'flex' : ''} mt-1`}>
      <Typography variant={text1Variant} sx={{ color: 'black' }}>
        {text1}
      </Typography>
      <Typography
        variant={text2Variant}
        sx={{
          background:
            'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {text2}
      </Typography>
    </Box>
  );
};

export default DualColorText;
