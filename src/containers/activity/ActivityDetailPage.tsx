'use client';
import { dynamicStylingValue, useDeviceType } from '@/hooks/useDeviceType';
import { Box, Typography, Alert } from '@mui/material';
import DualColorText from '@/components/dualColorText/index';
import { useActivityState } from '@/contexts/DataProvider';
import { useTranslation } from '@/hooks/useTranslation';
import ActivityCard from '@/components/Cards/ActivityCard';
import { ActivityDetailSkeleton } from '@/components/Skeleton';
import ImageWithLoading from '@/components/ImageWithLoading';
import useActivity from '@/hooks/useActivity';
import { useEffect, useState, useRef } from 'react';
import { ActivityData } from '@/contexts/DataProvider';
import DOMPurify from 'isomorphic-dompurify';
import * as Sentry from '@sentry/nextjs';

const ActivityDetailPage = ({ id }: { id: number }) => {
  const { type } = useDeviceType();
  const { activities } = useActivityState();
  const { language } = useTranslation();
  const { getActivityById, getActivities, isLoading, error } = useActivity();
  const [currentActivity, setCurrentActivity] = useState<ActivityData | null>(
    null
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const activitiesLoadAttempted = useRef(false);

  // Format date helper
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

  // Fetch activity data on component mount - always fetch fresh data
  useEffect(() => {
    const loadActivity = async () => {
      try {
        setIsInitialLoading(true);

        // Always fetch fresh data from API (forceRefresh = true)
        const fetchedActivity = await getActivityById(id, true);
        if (fetchedActivity) {
          setCurrentActivity(fetchedActivity);
        } else {
          console.warn(`Activity with ID ${id} returned null from API`);
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: { component: 'ActivityDetailPage', operation: 'loadActivity' },
          extra: { activityId: id },
        });
        // If activity ID is invalid and we have other activities available,
        // we can show a "not found" state but still populate the sidebar
        if (activities.length === 0) {
          try {
            await getActivities({ page: 1, pageSize: 6 });
          } catch (fallbackError) {
            Sentry.captureException(fallbackError, {
              tags: {
                component: 'ActivityDetailPage',
                operation: 'loadFallbackActivities',
              },
            });
          }
        }
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Update current activity when activities in global state change
  useEffect(() => {
    const existingActivity = activities.find((activity) => activity.id === id);
    if (existingActivity && !currentActivity) {
      setCurrentActivity(existingActivity);
      setIsInitialLoading(false);
    }
  }, [activities, id, currentActivity]);

  // Fetch activities for sidebar if the global activities list is empty
  // This ensures "Informasi Lainnya" section is populated on page refresh
  useEffect(() => {
    const loadActivitiesForSidebar = async () => {
      if (
        activities.length === 0 &&
        !isLoading &&
        !activitiesLoadAttempted.current
      ) {
        activitiesLoadAttempted.current = true;
        try {
          // Try to fetch activities from the same group as current activity if possible
          const group = currentActivity?.group;
          if (group) {
            await getActivities({ page: 1, pageSize: 10, group });
          } else {
            // Fallback: fetch mixed activities if no group info available
            await getActivities({ page: 1, pageSize: 10 });
          }
        } catch (error) {
          Sentry.captureException(error, {
            tags: {
              component: 'ActivityDetailPage',
              operation: 'loadActivitiesForSidebar',
            },
            extra: { group: currentActivity?.group },
          });
          // Reset the flag on error so we can retry
          activitiesLoadAttempted.current = false;
        }
      }
    };

    loadActivitiesForSidebar();
  }, [activities.length, isLoading, getActivities, currentActivity?.group]);

  // Filter out the current activity from the activities list for sidebar
  const otherActivities = activities.filter((activity) => activity.id !== id);

  // Use appropriate language based on current language setting
  const displayTitle =
    language === 'en' ? currentActivity?.title_en : currentActivity?.title_id;
  const displayBody =
    language === 'en' ? currentActivity?.body_en : currentActivity?.body_id;

  // Show skeleton while loading
  if (isInitialLoading || isLoading) {
    return <ActivityDetailSkeleton type={type} />;
  }

  // Show error state
  if (error) {
    return (
      <Box
        sx={{
          height: 'auto',
          minHeight: 'fit-content',
          alignItems: 'flex-start',
          marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
          padding: 4,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h6" gutterBottom>
            Failed to load activity
          </Typography>
          <Typography variant="body2">
            {error.includes('not found')
              ? `The activity with ID ${id} could not be found. It may have been removed or the ID is incorrect.`
              : error}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Activity ID: {id}
          </Typography>
        </Alert>
      </Box>
    );
  }

  // Show not found state
  if (!currentActivity) {
    return (
      <Box
        sx={{
          height: 'auto',
          minHeight: 'fit-content',
          alignItems: 'flex-start',
          marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
          padding: 4,
        }}
      >
        <Alert severity="warning" sx={{ maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h6" gutterBottom>
            Activity not found
          </Typography>
          <Typography variant="body2">
            The requested activity (ID: {id}) could not be found.
          </Typography>
        </Alert>
      </Box>
    );
  }

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
        {/* Activity Image with Loading States */}
        <ImageWithLoading
          src={`${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${currentActivity?.image}`}
          alt={`${displayTitle || 'Activity'} - Image`}
          width={1000}
          height={1000}
          skeletonHeight={Number(
            dynamicStylingValue(type, '200', '400', '450')
          )}
          style={{
            objectFit: 'fill',
            borderRadius: '20px',
            width: '100%',
            height: 'auto',
          }}
        />

        {/* Activity Title */}
        <Typography
          fontSize={dynamicStylingValue(type, '1em', '2em', '2em')}
          fontWeight={800}
          color="#030712"
          marginTop={2}
        >
          {displayTitle || 'Activity Title'}
        </Typography>

        {/* Activity Date */}
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
          fontWeight={700}
          color="#4B5563"
          marginTop={1}
        >
          {currentActivity?.createdAt
            ? formatDate(currentActivity.createdAt)
            : 'Date not available'}
        </Typography>

        {/* Activity Content */}
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
            __html: DOMPurify.sanitize(
              displayBody || 'No content available for this activity.'
            ),
          }}
        />
      </Box>

      {/* Sidebar with Other Activities - Only show on desktop/tablet */}
      {type !== 'mobile' && (
        <Box
          className={`flex flex-col p-8 ml-4 bg-white rounded-xl z-100 shadow-lg w-[25%]`}
        >
          <DualColorText
            text="Informasi {Lainnya}"
            fontSize={dynamicStylingValue(type, '0.8em', '1.5em', '1.5em')}
            fontWeight={800}
          />
          <Box
            id="other-activities-container"
            className={`flex flex-col gap-4 mt-4`}
            sx={{
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            {otherActivities.slice(0, 3).map((activity) => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                image={activity.image}
                title_en={activity.title_en}
                title_id={activity.title_id}
                date={activity.createdAt ? formatDate(activity.createdAt) : ''}
                pdfUrl={activity.pdf}
                type={type}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ActivityDetailPage;
