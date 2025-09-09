'use client';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import DualColorText from '@/components/DualColorText/index';
import { useActivityState } from '@/contexts/DataProvider';
import { useTranslation } from '@/hooks/useTranslation';

const ActivityDetailPage = ({ id }: { id: number }) => {
  const { type } = useDeviceType();
  const { activities } = useActivityState();
  const { language } = useTranslation();

  // Find the specific activity by ID from global state
  const currentActivity = activities.find((activity) => activity.id === id);

  // Use appropriate language based on current language setting
  const displayTitle =
    language === 'en' ? currentActivity?.title_en : currentActivity?.title_id;
  const displayBody =
    language === 'en' ? currentActivity?.body_en : currentActivity?.body_id;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Date not available';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
          src={`${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${currentActivity?.image}`}
          alt="activity-detail"
          width={1000}
          height={1000}
          style={{
            objectFit: 'fill',
            borderRadius: '20px',
            width: '100%',
            height: 'auto',
          }}
        />
        <Typography
          fontSize={dynamicStylingValue(type, '1em', '2em', '2em')}
          fontWeight={800}
          color="#030712"
          marginTop={2}
        >
          {displayTitle || 'Activity Title'}
        </Typography>

        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          fontWeight={700}
          color="#4B5563"
          marginTop={1}
        >
          {currentActivity?.updatedAt
            ? formatDate(currentActivity.updatedAt)
            : 'Date not available'}
        </Typography>

        <Box
          fontSize={dynamicStylingValue(type, '0.8em', '0.875em', '0.875em')}
          fontWeight={400}
          marginTop={2}
          color="#4B5563"
          sx={{
            wordBreak: 'break-word',
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              fontWeight: 700,
              marginTop: '1em',
              marginBottom: '0.5em',
              color: '#030712',
            },
            '& p': {
              marginBottom: '1em',
              lineHeight: 1.6,
            },
            '& ul, & ol': {
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            '& li': {
              marginBottom: '0.5em',
            },
            '& strong, & b': {
              fontWeight: 700,
            },
            '& em, & i': {
              fontStyle: 'italic',
            },
            '& a': {
              color: '#784791',
              textDecoration: 'underline',
            },
            '& blockquote': {
              borderLeft: '4px solid #784791',
              paddingLeft: '1em',
              margin: '1em 0',
              fontStyle: 'italic',
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              margin: '1em 0',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: displayBody || 'No content available for this activity.',
          }}
        />
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
            {/* <ActivityCard type={type} />
            <ActivityCard type={type} />
            <ActivityCard type={type} /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ActivityDetailPage;
