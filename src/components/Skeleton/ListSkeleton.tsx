import React from 'react';
import { 
  Skeleton, 
  Box, 
  Card, 
  CardContent,
  Stack
} from '@mui/material';
import { DeviceType } from '@/hooks/useDeviceType';

interface ListSkeletonProps {
  count?: number;
  type: DeviceType;
  showBadge?: boolean;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({ 
  count = 4, 
  type,
  showBadge = true 
}) => {
  return (
    <Stack spacing={2} sx={{ marginTop: 3 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ 
          padding: type === 'mobile' ? 2 : 3,
          '&:hover': {
            boxShadow: 2,
          },
        }}>
          <CardContent sx={{ padding: '0 !important' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexDirection: type === 'mobile' ? 'column' : 'row',
              gap: type === 'mobile' ? 2 : 0
            }}>
              <Box sx={{ flex: 1 }}>
                {/* Title */}
                <Skeleton 
                  variant="text" 
                  height={type === 'mobile' ? 24 : 28} 
                  width={type === 'mobile' ? '100%' : '80%'} 
                  animation="wave"
                  sx={{ marginBottom: 1 }}
                />
                
                {/* Description */}
                <Skeleton 
                  variant="text" 
                  height={20} 
                  width="90%" 
                  animation="wave"
                  sx={{ marginBottom: 0.5 }}
                />
                <Skeleton 
                  variant="text" 
                  height={20} 
                  width="75%" 
                  animation="wave"
                  sx={{ marginBottom: 0.5 }}
                />
                <Skeleton 
                  variant="text" 
                  height={20} 
                  width="60%" 
                  animation="wave"
                />
              </Box>
              
              {showBadge && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: type === 'mobile' ? 'flex-start' : 'flex-end',
                  gap: 1
                }}>
                  {/* Status badge */}
                  <Skeleton 
                    variant="rectangular" 
                    width={80} 
                    height={24} 
                    animation="wave"
                    sx={{ borderRadius: 4 }}
                  />
                  
                  {/* Apply button */}
                  <Skeleton 
                    variant="rectangular" 
                    width={100} 
                    height={36} 
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ListSkeleton;
