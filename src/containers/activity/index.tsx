'use client';
import { useState, useEffect } from 'react';
import SidebarList, { listType } from '../../components/SidebarList';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import ActivityCard from '../../components/Cards/ActivityCard';
import { dynamicStylingValue, useDeviceType } from '../../hooks/useDeviceType';
import useActivity from '../../hooks/useActivity';
import emptyActivity from '../../../public/svg/empty-activity.svg';
import Image from 'next/image';
import { useTranslation } from '../../hooks/useTranslation';

const activityList = ['Sustainability', 'Newsroom'];
const sustainabilityList: listType[] = [
  {
    type: 'Sustainability',
    name: 'CSR & Community Engagement',
  },
  {
    type: 'Sustainability',
    name: 'Health, Safety & Environmental',
  },
  {
    type: 'Sustainability',
    name: 'Ethical Governence & Compliance',
  },
];
const newsroomList: listType[] = [
  {
    type: 'Newsroom',
    name: 'Eber Magazine',
  },
  {
    type: 'Newsroom',
    name: 'Company Event',
  },
];

const ActivityContainer = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20; // 3x3 grid

  const { getActivities, activities, isLoading, error, clearError } =
    useActivity();

  // Fetch activities when category, activity, or page changes
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const groupFilter =
          selectedCategory === 0
            ? sustainabilityList[selectedActivity]?.name || 'Sustainability'
            : newsroomList[selectedActivity]?.name || 'Newsroom';

        await getActivities({
          page: currentPage,
          pageSize,
          group: groupFilter,
        });
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedActivity, currentPage]);

  // Handle category change
  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category);
    setSelectedActivity(0); // Reset to first activity when category changes
    setCurrentPage(1); // Reset to first page
  };

  // Handle activity change
  const handleActivityChange = (activity: number) => {
    setSelectedActivity(activity);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <Box
      className={`flex ${type !== 'mobile' ? 'flex-row' : 'flex-col'} ${type === 'mobile' ? '-mt-[60vh]' : '-mt-[20vh]'}`}
    >
      <SidebarList
        selected={selectedActivity}
        setSelected={handleActivityChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        listCategory={activityList}
        list={sustainabilityList}
        secondList={newsroomList}
        text1={`${t('activity.title.Our')}\u00a0`}
        text2={t('activity.title.Activity')}
        type={type}
      />
      <Box
        className={`flex-1 p-8 ${type !== 'mobile' ? 'ml-4' : 'mt-4'} bg-white rounded-xl z-100 shadow-lg`}
      >
        <Typography
          fontSize={dynamicStylingValue(type, '1.5em', '2em', '2em')}
          fontWeight={700}
          color="#030712"
        >
          {selectedCategory === 0
            ? sustainabilityList[selectedActivity]?.name
            : newsroomList[selectedActivity]?.name}
        </Typography>
        <Typography
          fontSize={dynamicStylingValue(type, '0.8em', '16px', '16px')}
          fontWeight={400}
          color="#4B5563"
          marginTop={2}
        >
          {selectedCategory === 0
            ? 'Explore our sustainability initiatives and community engagement programs that make a positive impact on society and the environment.'
            : 'Stay updated with the latest news, company events, and publications from Eber Group.'}
        </Typography>

        {/* Error State */}
        {error && (
          <Alert severity="error" onClose={clearError} sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
            mt={2}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Activities Grid */}
        {!isLoading && !error && (
          <Box
            className={`${type !== 'mobile' ? 'grid grid-rows-3 grid-cols-3 gap-4 mt-4' : 'flex flex-col gap-4 mt-4'}`}
            sx={{
              width: '100%',
              maxWidth: '1200px',
              flexWrap: 'wrap',
            }}
          >
            {activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  image={activity.image}
                  date={(() => {
                    const date = new Date(activity.updatedAt);
                    if (isNaN(date.getTime())) {
                      return 'Date not available';
                    }
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  })()}
                  pdfUrl={activity.pdf}
                  type={type}
                  id={activity.id}
                  title_en={activity.title_en}
                  title_id={activity.title_id}
                />
              ))
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
                gridColumn="1 / -1"
                gap={2}
              >
                <Image
                  src={emptyActivity}
                  alt="empty-activity"
                  width={100}
                  height={100}
                  style={{
                    width: dynamicStylingValue(type, '50%', '25%', '25%'),
                    height: 'auto',
                    marginTop: '10%',
                  }}
                />
                <Typography fontSize={'1em'} fontWeight={700} color="#030712">
                  {t('activity.empty_list_title')}
                </Typography>
                <Typography
                  fontSize={'0.8em'}
                  fontWeight={400}
                  color="#4B5563"
                  textAlign={'center'}
                >
                  {t('activity.empty_list_desc')}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ActivityContainer;
