import { useState } from 'react';
import SidebarList, { listType } from '@/components/SidebarList';
import { Box, Typography } from '@mui/material';
import ActivityCard from '@/components/Cards/ActivityCard';

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
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<number>(0);

  return (
    <Box className="flex flex-row">
      <SidebarList
        selected={selectedActivity}
        setSelected={setSelectedActivity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        listCategory={activityList}
        list={sustainabilityList}
        secondList={newsroomList}
        text1={'Our\u00a0'}
        text2="Activity"
      />
      <Box className="flex-1 p-8 ml-4 bg-white rounded-xl z-100">
        <Typography variant="h4" fontWeight={700} color="#030712">
          {selectedCategory === 0
            ? sustainabilityList[selectedActivity]?.name
            : newsroomList[selectedActivity]?.name}
        </Typography>
        <Typography
          fontSize={'16px'}
          fontWeight={400}
          color="#4B5563"
          marginTop={2}
        >
          First Production in 1982 with capacity 10.000 TPY, expanded to 20.000
          TPY in 1986 then final expansion capacity to 82.000 TPY.
        </Typography>

        <Box
          className="grid grid-rows-3 grid-cols-3 gap-4 mt-4"
          sx={{
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <ActivityCard
            hideDesc={selectedActivity === 0 && selectedCategory === 1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityContainer;
