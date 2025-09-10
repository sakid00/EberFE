'use client';
import { useState, useEffect } from 'react';
import SidebarList, { listType } from '@/components/SidebarList/index';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
} from '@mui/material';
import ActivityCard from '@/components/Cards/ActivityCard';
import { useDeviceType } from '@/hooks/useDeviceType';
import useActivity from '@/hooks/useActivity';
import emptyActivity from '@/public/svg/empty-activity.svg';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { styles } from './style';

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

  const {
    getActivities,
    activities,
    isLoading,
    error,
    clearError,
    pagination,
  } = useActivity();

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

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={styles.mainContainer(type)}>
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
      <Box sx={styles.contentContainer(type)}>
        <Typography sx={styles.title(type)}>
          {selectedCategory === 0
            ? sustainabilityList[selectedActivity]?.name
            : newsroomList[selectedActivity]?.name}
        </Typography>
        <Typography sx={styles.subtitle(type)}>
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
          <Box sx={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        )}

        {/* Activities Grid */}
        {!isLoading && !error && (
          <Box sx={styles.activitiesGrid(type)}>
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
              <Box sx={styles.emptyState(type)}>
                <Image
                  src={emptyActivity}
                  alt="empty-activity"
                  width={100}
                  height={100}
                  style={styles.emptyImage(type)}
                />
                <Typography sx={styles.emptyTitle}>
                  {t('activity.empty_list_title')}
                </Typography>
                <Typography sx={styles.emptyDescription}>
                  {t('activity.empty_list_desc')}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Pagination Controls */}
        {!isLoading && !error && pagination && pagination.totalPages > 1 && (
          <Box sx={styles.paginationContainer(type)}>
            {/* Pagination Info - Hide on mobile, show on tablet and desktop */}
            {type !== 'mobile' && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={styles.paginationInfo(type)}
              >
                Showing{' '}
                {Math.min(
                  (pagination.currentPage - 1) * pagination.itemsPerPage + 1,
                  pagination.totalItems
                )}{' '}
                to{' '}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{' '}
                of {pagination.totalItems} activities
              </Typography>
            )}

            {/* Mobile pagination info - compact version */}
            {type === 'mobile' && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={styles.paginationInfoMobile}
              >
                {pagination.currentPage} of {pagination.totalPages}
              </Typography>
            )}

            <Stack spacing={2}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.currentPage}
                onChange={handlePageChange}
                color="primary"
                size={type === 'mobile' ? 'small' : 'large'}
                showFirstButton={type !== 'mobile'}
                showLastButton={type !== 'mobile'}
                siblingCount={type === 'mobile' ? 1 : 2}
                boundaryCount={type === 'mobile' ? 1 : 2}
                sx={styles.pagination(type)}
              />
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ActivityContainer;
