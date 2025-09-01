import { ICareerList } from '@/app/careers/page';
import CareerAccordion from '@/components/CareerAccordion';
import DualColorText from '@/components/DualColorText';
import { Box, Typography } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles, constants } from './style';

interface ICareerContainer {
  careerList: ICareerList[];
  router: AppRouterInstance;
}

const CareerContainer = ({ careerList, router }: ICareerContainer) => {
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.infoCard}>
        <DualColorText
          text1={'Our\u00a0'}
          text2="Open"
          fontSize={'2em'}
          inline
        />
        <Typography fontSize={'2em'} fontWeight={700} sx={styles.rolesTitle}>
          Roles
        </Typography>
        <Typography sx={styles.descriptionText}>
          {constants.description}
        </Typography>
        <Typography sx={styles.contactLabel}>
          {constants.contactLabel}
        </Typography>
        <Typography sx={styles.contactEmail}>
          {constants.contactEmail}
        </Typography>
      </Box>
      <Box sx={styles.accordionContainer}>
        <CareerAccordion list={careerList} router={router} />
      </Box>
    </Box>
  );
};

export default CareerContainer;
