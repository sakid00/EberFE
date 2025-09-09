import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DualColorText, {
  IDualColorTextProps,
} from '@/components/DualColorText/index';
import { useState } from 'react';
import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';

export interface listType {
  type: string;
  name: string;
}

interface ISidebarListProps extends IDualColorTextProps {
  selected: number;
  setSelected: (index: number) => void;
  selectedCategory?: number;
  setSelectedCategory?: (index: number) => void;
  /**
   * Array of category names for the accordion sections.
   * When provided with 2 items, enables dual accordion mode.
   */
  listCategory?: string[];
  /** Primary list of items for the first accordion section */
  list: listType[];
  /** Optional secondary list of items for the second accordion section */
  secondList?: listType[];
  /** Optional secondary text to display below the main title */
  secondaryText?: string;
  type: DeviceType;
}

const SidebarList: React.FC<ISidebarListProps> = ({
  selected,
  setSelected,
  selectedCategory,
  setSelectedCategory,
  list,
  text1,
  text2,
  inline,
  secondaryText,
  secondList,
  listCategory,
  type,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const renderListValues = (items: listType[]) => {
    const listItems = items.map((val, index) => {
      return (
        <Box
          onClick={() => {
            setSelected(index);
          }}
          key={index}
          className={`items-center ${selected === index ? 'bg-[#D6CBE3]' : 'bg-[#F3F5F7]'} p-4 ${selected === index ? 'border-[#784791]' : 'border-transparent'} border-2 rounded-xl ${type === 'mobile' ? 'mr-4 flex-shrink-0' : 'mb-4'}`}
          sx={{
            minWidth: 'auto',
          }}
        >
          {type !== 'mobile' && (
            <Typography
              fontSize={'0.875em'}
              fontWeight={400}
              color={selected === index ? '#784791' : '#4B5563'}
              className="mt-4"
            >
              {val.type}
            </Typography>
          )}
          <Typography
            fontSize={dynamicStylingValue(type, '0.8em', '1em', '1em')}
            color={selected === index ? '#784791' : '#030712'}
            fontWeight={700}
            className="mt-4"
          >
            {val.name}
          </Typography>
        </Box>
      );
    });

    // On mobile, wrap in a horizontally scrollable container
    if (type === 'mobile') {
      return (
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
        >
          {listItems}
        </Box>
      );
    }

    // On tablet/desktop, return items normally (vertical layout)
    return listItems;
  };

  const dualList = () => {
    return (
      <Box>
        {listCategory?.map((val, index) => {
          return (
            <Accordion
              expanded={index === selectedCategory && expanded}
              defaultExpanded={index === 0}
              key={index}
              sx={{ boxShadow: 'none' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
                onClick={() => {
                  setSelectedCategory?.(index);
                  setExpanded(!expanded);

                  if (!expanded) {
                    setSelected(0);
                  }
                }}
              >
                <Typography>{val}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {index === 0
                  ? renderListValues(list)
                  : renderListValues(secondList ?? [])}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    );
  };

  return (
    <Box className="bg-white max-w-1/4 h-1/5 rounded-xl p-5 z-100">
      <DualColorText
        text1={text1}
        text2={text2}
        fontSize="1.8em"
        fontWeight={800}
        inline={inline ?? false}
      />
      {secondaryText && (
        <DualColorText
          text1={''}
          text2={secondaryText ?? ''}
          fontSize="1.8em"
          fontWeight={800}
          inline
        />
      )}
      <Box
        className="mt-6"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {listCategory && listCategory.length >= 2
          ? dualList()
          : renderListValues(list)}
      </Box>
    </Box>
  );
};

export default SidebarList;
