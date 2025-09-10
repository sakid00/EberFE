'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import calendar from '../../../public/icon/calendar.svg';
import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../hooks/useTranslation';

const PDFViewer = dynamic(() => import('../PDFViewer'), {
  ssr: false,
});

interface ActivityCardProps {
  image?: string;
  title?: string;
  date?: string;
  pdfUrl?: string;
  type: DeviceType;
  id?: number;
  title_en?: string;
  title_id?: string;
}

const ActivityCard = ({
  image,
  date,
  pdfUrl,
  type,
  id,
  title_en,
  title_id,
}: ActivityCardProps) => {
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const router = useRouter();
  const { language } = useTranslation();

  const handleClick = () => {
    if (pdfUrl) {
      setIsPDFOpen(true);
      return;
    }
    router.push(`/activity/${id}`);
  };

  return (
    <>
      <Box
        className={`flex flex-col justify-start items-start p-2 gap-2 rounded-xl shadow-md/20 cursor-pointer hover:shadow-xl transition-shadow`}
        onClick={handleClick}
      >
        <Box className="relative w-full h-[220px] overflow-hidden rounded-lg">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${image}`}
            alt="activity-image"
            fill
            className="object-cover"
            sizes="(max-width: 25%) 100vw, 550px"
          />
        </Box>
        <Box className="flex flex-col gap-1 p-2">
          <Typography
            fontSize={dynamicStylingValue(type, '1em', '1.2em', '1.2em')}
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
            {language === 'en' ? title_en : title_id}
          </Typography>
          <Box className="flex flex-row gap-2 items-center">
            <Image src={calendar} alt="calender" width={15} height={15} />
            <Typography fontSize={'0.8em'} fontWeight={400} color="#784791">
              {date ?? ''}
            </Typography>
          </Box>
        </Box>
      </Box>
      <PDFViewer
        open={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl={`${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${pdfUrl}`}
      />
    </>
  );
};

export default ActivityCard;
