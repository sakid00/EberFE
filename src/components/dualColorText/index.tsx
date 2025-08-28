import { Box, Typography, TypographyVariant } from '@mui/material';

export interface IDualColorTextProps {
  text1: string;
  text1Variant?: TypographyVariant;
  text2: string;
  text2Variant?: TypographyVariant;
  inline?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
}

const DualColorText = ({
  text1,
  text2,
  inline,
  text1Variant,
  text2Variant,
  color,
  fontWeight,
  fontSize,
}: IDualColorTextProps) => {
  return (
    <Box className={`${inline ? 'flex' : ''} mt-1`}>
      <Typography
        variant={text1Variant}
        fontWeight={fontWeight ?? 800}
        fontSize={fontSize ?? '1em'}
        sx={{ color: color ?? 'black' }}
      >
        {text1}
      </Typography>
      <Typography
        variant={text2Variant}
        fontWeight={fontWeight ?? 800}
        fontSize={fontSize ?? '1em'}
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
