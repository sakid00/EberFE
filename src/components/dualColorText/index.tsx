import { Box, SxProps, Theme } from '@mui/material';
import TextParser from '@/components/TextParser';

export interface IDualColorTextProps {
  /**
   * Text with markers for gradient highlighting.
   * Use curly braces to mark text for gradient: "Our {Company}"
   * Multiple markers supported: "The {quick} brown {fox}"
   */
  text?: string;
  inline?: boolean;
  color?: string;
  fontWeight?: number;
  fontSize?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const gradientStyle: React.CSSProperties = {
  background:
    'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const DualColorText = ({
  text,
  inline,
  color,
  fontWeight,
  fontSize,
  sx,
  className,
}: IDualColorTextProps) => {
  const defaultStyle: React.CSSProperties = {
    color: color ?? 'black',
    fontWeight: fontWeight ?? 800,
    fontSize: fontSize ?? '1em',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  if (!text) return null;

  // Remove curly braces from the text for display, but use pattern to find them
  const displayText = text.replace(/\{([^}]+)\}/g, '$1');

  // Extract all words that were in curly braces to create patterns
  const matches = text.match(/\{([^}]+)\}/g);
  const patterns = matches
    ? matches.map((match) => ({
        pattern: match.slice(1, -1), // Remove curly braces
        style: gradientStyle,
      }))
    : [];

  return (
    <Box
      className={`${inline ? 'flex' : ''} mt-1 flex-wrap ${className}`}
      sx={sx}
    >
      <TextParser
        text={displayText}
        patterns={patterns}
        defaultStyle={defaultStyle}
        fontWeight={fontWeight ?? 800}
      />
    </Box>
  );
};

export default DualColorText;
