import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';
import { DeviceType } from '@/hooks/useDeviceType';

interface CardSkeletonProps {
  count?: number;
  type: DeviceType;
  height?: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ 
  count = 6, 
  type,
  height = 300 
}) => {
  const getGridColumns = () => {
    switch (type) {
      case 'mobile':
        return 'repeat(1, 1fr)';
      case 'tablet':
        return 'repeat(2, 1fr)';
      default:
        return 'repeat(3, 1fr)';
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: getGridColumns(),
        gap: 2,
        marginTop: 3,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ height }}>
          <Skeleton
            variant="rectangular"
            height={height * 0.6}
            animation="wave"
          />
          <CardContent>
            <Skeleton
              variant="text"
              height={24}
              width="80%"
              animation="wave"
              sx={{ marginBottom: 1 }}
            />
            <Skeleton
              variant="text"
              height={20}
              width="60%"
              animation="wave"
              sx={{ marginBottom: 1 }}
            />
            <Skeleton
              variant="text"
              height={16}
              width="40%"
              animation="wave"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CardSkeleton;
