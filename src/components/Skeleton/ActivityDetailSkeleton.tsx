'use client';
import { Box, Skeleton } from '@mui/material';
import { dynamicStylingValue } from '@/hooks/useDeviceType';
import DualColorText from '@/components/dualColorText';

interface ActivityDetailSkeletonProps {
  type: 'mobile' | 'tablet' | 'desktop';
}

const ActivityDetailSkeleton: React.FC<ActivityDetailSkeletonProps> = ({ type }) => {
  return (
    <Box
      className={`flex flex-row`}
      sx={{
        height: 'auto',
        minHeight: 'fit-content',
        alignItems: 'flex-start',
        marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
      }}
    >
      {/* Main Content Skeleton */}
      <Box
        className={`flex flex-col p-8 ${type !== 'mobile' ? 'w-[75%]' : 'w-[100%]'} bg-white rounded-xl z-100 shadow-lg`}
        sx={{
          height: 'auto',
          minHeight: 'fit-content',
          flexShrink: 0,
        }}
      >
        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={Number(dynamicStylingValue(type, '200', '400', '450'))}
          sx={{
            borderRadius: '20px',
            mb: 2,
          }}
        />

        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          width="80%"
          height={Number(dynamicStylingValue(type, '40', '60', '60'))}
          sx={{ mb: 1 }}
        />

        {/* Date Skeleton */}
        <Skeleton
          variant="text"
          width="30%"
          height={Number(dynamicStylingValue(type, '25', '30', '30'))}
          sx={{ mb: 3 }}
        />

        {/* Content Skeleton - Multiple paragraphs */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="88%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="92%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="85%" height={20} sx={{ mb: 2 }} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="94%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="87%" height={20} sx={{ mb: 2 }} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="91%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="75%" height={20} sx={{ mb: 1 }} />
        </Box>
      </Box>

      {/* Sidebar Skeleton - Only show on desktop/tablet */}
      {type !== 'mobile' && (
        <Box
          className={`flex flex-col p-8 ml-4 bg-white rounded-xl z-100 shadow-lg w-[25%]`}
        >
          {/* Sidebar Title */}
          <DualColorText
            text1="Informasi"
            text2="Lainnya"
            fontSize={dynamicStylingValue(type, '0.8em', '1.5em', '1.5em')}
            fontWeight={800}
          />

          {/* Activity Cards Skeleton */}
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1, 2, 3].map((item) => (
              <Box key={item}>
                {/* Card Image */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={120}
                  sx={{ borderRadius: '10px', mb: 1 }}
                />
                {/* Card Title */}
                <Skeleton variant="text" width="90%" height={18} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="70%" height={18} sx={{ mb: 1 }} />
                {/* Card Date */}
                <Skeleton variant="text" width="50%" height={14} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ActivityDetailSkeleton;
