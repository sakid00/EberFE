import { Box, SxProps, Theme, Typography } from '@mui/material';

export interface IDualColorTextProps {
  text1: string;
  text2: string;
  inline?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
  sx?: SxProps<Theme>;
}

const DualColorText = ({
  text1,
  text2,
  inline,
  color,
  fontWeight,
  fontSize,
  sx,
}: IDualColorTextProps) => {
  return (
    <Box className={`${inline ? 'flex' : ''} mt-1 flex-wrap`} sx={sx}>
      <Typography
        fontWeight={fontWeight ?? 800}
        fontSize={fontSize ?? '1em'}
        sx={{
          color: color ?? 'black',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {text1}
      </Typography>
      <Typography
        fontWeight={fontWeight ?? 800}
        fontSize={fontSize ?? '1em'}
        sx={{
          background:
            'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {text2}
      </Typography>
    </Box>
  );
};

export default DualColorText;
