'use client';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import activityDetail from '@public/photo/test-activity.png';
import DualColorText from '@/components/DualColorText';
import ActivityCard from '@/components/Cards/ActivityCard';

const ActivityDetailPage = () => {
  const { type } = useDeviceType();

  return (
    <Box
      className={`flex flex-row`}
      sx={{
        height: 'auto',
        minHeight: 'fit-content',
        alignItems: 'flex-start',
      }}
    >
      <Box
        id="detail-container"
        className={`flex flex-col p-8 ${type !== 'mobile' ? 'w-[75%]' : 'w-[100%]'} bg-white rounded-xl z-100 shadow-lg`}
        sx={{
          height: 'auto',
          minHeight: 'fit-content',
          flexShrink: 0,
        }}
      >
        <Image
          src={activityDetail}
          alt="activity-detail"
          style={{ width: '100%', borderRadius: '20px' }}
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1em', '2em', '2em')}
          fontWeight={800}
          color="#030712"
          marginTop={2}
        >
          Corporate Social Responsibility
        </Typography>

        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          fontWeight={700}
          color="#4B5563"
          marginTop={1}
        >
          April 2, 2025
        </Typography>

        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '0.875em', '0.875em')}
          fontWeight={400}
          color="#4B5563"
          marginTop={dynamicStylingValue(type, '5%', '3%', '3%')}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          qui aspernatur in quos enim commodi exercitationem architecto, nostrum
          labore obcaecati temporibus totam? Tenetur voluptate non asperiores
          vitae. Consequuntur, modi? Dicta.
        </Typography>

        <Typography
          fontSize={dynamicStylingValue(type, '1em', '1.5em', '1.5em')}
          fontWeight={800}
          color="#4B5563"
          marginTop={3}
        >
          Title here
        </Typography>
      </Box>

      {type !== 'mobile' && (
        <Box
          className={`flex flex-col p-8 ml-4 bg-white rounded-xl z-100 shadow-lg w-[25%]`}
        >
          <DualColorText
            text1="Informasi"
            text2="Lainnya"
            fontSize={dynamicStylingValue(type, '0.8em', '1.5em', '1.5em')}
            fontWeight={800}
          />
          <Box
            className={`flex flex-col gap-4 mt-4`}
            sx={{
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <ActivityCard type={type} />
            <ActivityCard type={type} />
            <ActivityCard type={type} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ActivityDetailPage;
