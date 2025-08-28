import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import calendar from '@public/icon/calendar.svg';
import testImage from '@public/photo/header_corporate.png';

const PDFViewer = dynamic(() => import('../PDFViewer'), {
  ssr: false,
});

interface ActivityCardProps {
  image?: string;
  title?: string;
  date?: string;
  description?: string;
  hideDesc?: boolean;
  pdfUrl?: string;
}

const ActivityCard = ({
  image,
  title,
  date,
  description,
  hideDesc,
  pdfUrl = '/test.pdf',
}: ActivityCardProps) => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  return (
    <>
      <Box
        className={`flex flex-col justify-start items-start p-2 gap-2 rounded-xl shadow-lg/20 cursor-pointer hover:shadow-xl transition-shadow`}
        onClick={() => setIsPDFOpen(true)}
      >
        <Box className="relative w-full h-[220px] overflow-hidden rounded-lg">
          <Image
            src={image ?? testImage}
            alt="activity-image"
            fill
            className="object-cover"
            sizes="(max-width: 25%) 100vw, 550px"
          />
        </Box>
        <Box className="flex flex-col gap-1 p-2">
          <Typography
            fontSize={'1.5em'}
            fontWeight={800}
            color="#030712"
            flexWrap={'wrap'}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title ?? 'Eber Group Launches New Sustainable Materials Line'}
          </Typography>
          <Box className="flex flex-row gap-2 items-center">
            <Image src={calendar} alt="calender" width={15} height={15} />
            <Typography fontSize={'0.875em'} fontWeight={400} color="#784791">
              {date ?? 'April 2, 2025'}
            </Typography>
          </Box>

          {!hideDesc && (
            <Typography
              fontSize={'0.875em'}
              fontWeight={400}
              color="#4B5563"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {description ??
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus amet ut libero minus facilis? Facilis, rem laboriosam! Iste facere sapiente, ipsam delectus expedita nam nisi minus a quis illum laborum!'}
            </Typography>
          )}
        </Box>
      </Box>
      <PDFViewer
        open={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl={pdfUrl}
      />
    </>
  );
};

export default ActivityCard;
