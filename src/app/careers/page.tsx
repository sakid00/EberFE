'use client';
import DualColorText from '@/components/dualColorText';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface ICareerList {
  title: string;
  status: string;
  desc: string;
  req: string;
}

const careerList: ICareerList[] = [
  {
    title: 'Senior',
    status: 'full time',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
    req: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
  },
  {
    title: 'Senior',
    status: 'full time',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
    req: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
  },
  {
    title: 'Senior',
    status: 'full time',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
    req: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed libero iusto corporis quos quae cupiditate exercitationem, eius laboriosam, perspiciatis dignissimos laborum sint eligendi omnis. Tempore suscipit repellat quisquam beatae?',
  },
];

const CareersPage = () => {
  const router = useRouter();
  const careerListMap = careerList.map((val, index) => {
    return (
      <Accordion
        key={`${index} - ${val.title}`}
        className={`w-full bg-white rounded-2xl ${index !== 0 ? 'mt-4' : 'mt-0'}`}
      >
        <AccordionSummary>
          <Box className="flex w-full justify-between items-center">
            <Box>
              <Typography>Open Roles</Typography>
              <Typography>{val.title}</Typography>
              <Typography>{val.status}</Typography>
            </Box>
            <Box
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
            >
              <Button
                size="small"
                sx={{
                  color: 'white',
                  background:
                    'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
                  padding: 2,
                  borderRadius: 10,
                }}
                onClick={() => {
                  router.push('/careers/submit');
                }}
              >
                Submit Application
              </Button>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Job Description:</Typography>
          <Typography>{val.desc}</Typography>
          <Typography>Job Description:</Typography>
          <Typography>{val.req}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <Box className="flex px-[10vw] z-50">
      <Box className="bg-white max-w-1/4 h-1/5 rounded-xl py-10 px-5">
        <DualColorText
          text1={'Our\u00a0'}
          text2="Open"
          text1Variant="h4"
          text2Variant="h4"
          inline
        />
        <Typography
          variant="h4"
          sx={{
            background:
              'linear-gradient(90deg, rgba(252, 204, 44, 1), rgba(253, 117, 5, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Roles
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ marginTop: '2vh', color: 'rgba(75, 85, 99, 1)' }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          beatae, incidunt asperiores mollitia at hic quisquam accusamus
          consequuntur sequi, repellendus similique nemo dicta pariatur quidem?
          Vero unde impedit maiores minima?
        </Typography>
        <Typography variant="subtitle1" color="black" sx={{ marginTop: '2vh' }}>
          Or Contact Us With
        </Typography>
        <Typography variant="h5" color="black">
          Hello@Eber.com
        </Typography>
      </Box>
      <Box className="ml-8 w-full">{careerListMap}</Box>
    </Box>
  );
};

export default CareersPage;
