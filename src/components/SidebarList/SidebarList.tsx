import { Box, Typography } from '@mui/material';
import DualColorText from '../dualColorText';

export interface listType {
  type: string;
  name: string;
}

interface ISidebarListProps {
  selected: number;
  setSelected: (index: number) => void;
  list: listType[];
}

const SidebarList: React.FC<ISidebarListProps> = ({
  selected,
  setSelected,
  list,
}) => {
  const renderCompanyList = () => {
    return list.map((val, index) => (
      <Box
        onClick={() => {
          setSelected(index);
        }}
        key={index}
        className={`items-center ${selected === index ? 'bg-[#D6CBE3]' : 'bg-[#F3F5F7]'} p-4 ${selected === index ? 'border-[#784791]' : 'border-transparent'} border-2 rounded-xl mb-4`}
      >
        <Typography
          variant="caption"
          color={selected === index ? '#784791' : '#4B5563'}
          className="mt-4"
        >
          {val.type}
        </Typography>
        <Typography
          variant="h6"
          color={selected === index ? '#784791' : '#030712'}
          fontWeight={700}
          className="mt-4"
        >
          {val.name}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box className="bg-white max-w-1/4 h-1/5 rounded-xl p-5 z-100">
      <DualColorText
        text1={'Our\u00a0'}
        text2="Key"
        text1Variant="h4"
        text2Variant="h4"
        inline
      />
      <DualColorText text1={''} text2="Subsidiaries" text2Variant="h4" inline />
      <Box className="mt-6">{renderCompanyList()}</Box>
    </Box>
  );
};

export default SidebarList;
