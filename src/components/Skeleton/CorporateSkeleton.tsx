import React from 'react';
import { 
  Skeleton, 
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DeviceType } from '@/hooks/useDeviceType';

interface CorporateSkeletonProps {
  type: DeviceType;
}

const CorporateSkeleton: React.FC<CorporateSkeletonProps> = ({ type }) => {
  const InfoBoxSkeleton = ({ isSmall = false }: { isSmall?: boolean }) => (
    <Box sx={{ 
      border: '1px solid #e0e0e0', 
      borderRadius: 2, 
      padding: 2,
      height: isSmall ? 100 : 120
    }}>
      <Skeleton 
        variant="text" 
        height={24} 
        width="70%" 
        animation="wave"
        sx={{ marginBottom: 1 }}
      />
      <Skeleton 
        variant="text" 
        height={32} 
        width="90%" 
        animation="wave"
      />
    </Box>
  );

  const ImageGridSkeleton = ({ count = 3 }: { count?: number }) => (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: type === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 2,
      marginTop: 2
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ textAlign: 'center' }}>
          <Skeleton 
            variant="rectangular" 
            height={150} 
            animation="wave"
            sx={{ borderRadius: 1, marginBottom: 1 }}
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width="80%" 
            animation="wave"
            sx={{ margin: '0 auto' }}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header Image Skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={type === 'mobile' ? 200 : 400} 
        animation="wave"
        sx={{ borderRadius: 2, marginBottom: 3 }}
      />

      {/* Company Title Skeleton */}
      <Skeleton 
        variant="text" 
        height={type === 'mobile' ? 32 : 40} 
        width="60%" 
        animation="wave"
        sx={{ marginBottom: 2 }}
      />

      {/* Address Section Skeleton */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 4,
        flexDirection: type === 'mobile' ? 'column' : 'row',
        gap: type === 'mobile' ? 2 : 0
      }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton 
            variant="text" 
            height={20} 
            width="15%" 
            animation="wave"
            sx={{ marginBottom: 1 }}
          />
          <Skeleton 
            variant="text" 
            height={24} 
            width={type === 'mobile' ? '100%' : '80%'} 
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            height={20} 
            width={type === 'mobile' ? '100%' : '60%'} 
            animation="wave"
          />
        </Box>
        <Skeleton 
          variant="rectangular" 
          width={100} 
          height={40} 
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Description 1 Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton variant="text" height={20} width="100%" animation="wave" />
        <Skeleton variant="text" height={20} width="95%" animation="wave" />
        <Skeleton variant="text" height={20} width="85%" animation="wave" />
        <Skeleton variant="text" height={20} width="60%" animation="wave" />
      </Box>

      {/* Info Boxes Grid 1 Skeleton */}
      {type !== 'mobile' ? (
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid size={6} key={index}>
              <InfoBoxSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <InfoBoxSkeleton key={index} />
          ))}
        </Box>
      )}

      {/* Description 2 Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton variant="text" height={20} width="100%" animation="wave" />
        <Skeleton variant="text" height={20} width="90%" animation="wave" />
        <Skeleton variant="text" height={20} width="75%" animation="wave" />
      </Box>

      {/* Info Boxes Grid 2 Skeleton */}
      {type !== 'mobile' ? (
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid size={4} key={index}>
              <InfoBoxSkeleton isSmall />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <InfoBoxSkeleton key={index} isSmall />
          ))}
        </Box>
      )}

      {/* Product Application Section Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton 
          variant="text" 
          height={28} 
          width="50%" 
          animation="wave"
          sx={{ marginBottom: 1 }}
        />
        <Skeleton variant="text" height={20} width="100%" animation="wave" />
        <Skeleton variant="text" height={20} width="85%" animation="wave" />
      </Box>

      {/* Content Section 1 Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton 
          variant="text" 
          height={24} 
          width="40%" 
          animation="wave"
          sx={{ marginBottom: 1 }}
        />
        <Skeleton variant="text" height={20} width="95%" animation="wave" />
        <Skeleton variant="text" height={20} width="80%" animation="wave" />
        <ImageGridSkeleton />
      </Box>

      {/* Content Section 2 Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton 
          variant="text" 
          height={24} 
          width="45%" 
          animation="wave"
          sx={{ marginBottom: 1 }}
        />
        <Skeleton variant="text" height={20} width="90%" animation="wave" />
        <Skeleton variant="text" height={20} width="75%" animation="wave" />
        <ImageGridSkeleton count={4} />
      </Box>

      {/* Content Section 3 Skeleton */}
      <Box sx={{ marginBottom: 4 }}>
        <Skeleton 
          variant="text" 
          height={24} 
          width="35%" 
          animation="wave"
          sx={{ marginBottom: 1 }}
        />
        <Skeleton variant="text" height={20} width="85%" animation="wave" />
        <Skeleton variant="text" height={20} width="70%" animation="wave" />
        <ImageGridSkeleton count={2} />
      </Box>
    </Box>
  );
};

export default CorporateSkeleton;
