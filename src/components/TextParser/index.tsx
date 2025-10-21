import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface TextParserProps extends Omit<TypographyProps, 'children'> {
  text: string;
  patterns?: Array<{
    pattern: string | RegExp;
    style?: React.CSSProperties;
    component?: React.ElementType;
  }>;
  defaultStyle?: React.CSSProperties;
}

const TextParser: React.FC<TextParserProps> = ({
  text,
  patterns = [],
  defaultStyle = {},
  ...typographyProps
}) => {
  const parseText = (inputText: string): React.ReactNode[] => {
    if (patterns.length === 0) {
      return [inputText];
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let keyCounter = 0;

    // Create a combined pattern that matches any of the provided patterns
    const combinedPattern = new RegExp(
      patterns
        .map((p) =>
          p.pattern instanceof RegExp ? p.pattern.source : p.pattern
        )
        .join('|'),
      'gi'
    );

    let match: RegExpExecArray | null;
    while ((match = combinedPattern.exec(inputText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${keyCounter++}`} style={defaultStyle}>
            {inputText.slice(lastIndex, match.index)}
          </span>
        );
      }

      // Find which pattern matched
      const matchedPattern = patterns.find((p) => {
        const testPattern =
          p.pattern instanceof RegExp ? p.pattern : new RegExp(p.pattern, 'gi');
        return testPattern.test(match![0]);
      });

      if (matchedPattern) {
        const Component = matchedPattern.component || 'span';
        elements.push(
          <Component
            key={`match-${keyCounter++}`}
            style={{
              ...defaultStyle,
              ...matchedPattern.style,
            }}
          >
            {match[0]}
          </Component>
        );
      } else {
        // Fallback if no pattern matches
        elements.push(
          <span key={`fallback-${keyCounter++}`} style={defaultStyle}>
            {match[0]}
          </span>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < inputText.length) {
      elements.push(
        <span key={`text-${keyCounter++}`} style={defaultStyle}>
          {inputText.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return <Typography {...typographyProps}>{parseText(text)}</Typography>;
};

export default TextParser;
