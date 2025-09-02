import { ICareerList } from '@/app/careers/page';
import CareerAccordion from '@/components/CareerAccordion';
import DualColorText from '@/components/DualColorText';
import { Box, Typography } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles } from './style';
import { useDeviceType, useTranslation } from '@/hooks';

interface ICareerContainer {
  careerList: ICareerList[];
  router: AppRouterInstance;
}

const CareerContainer = ({ careerList, router }: ICareerContainer) => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return (
    <Box sx={styles.mainContainer(type)}>
      <Box sx={styles.infoCard(type)}>
        <DualColorText
          text1={t('careers.title.our')}
          text2={t('careers.title.open')}
          fontSize={'2em'}
          inline
        />
        <Typography fontSize={'2em'} fontWeight={700} sx={styles.rolesTitle}>
          {t('careers.title.roles')}
        </Typography>
        <Typography sx={styles.descriptionText}>{t('careers.desc')}</Typography>
        <Typography sx={styles.contactLabel}>
          {t('careers.contact_label')}
        </Typography>
        <Typography sx={styles.contactEmail}>
          {t('careers.contact_email')}
        </Typography>
      </Box>
      <Box sx={styles.accordionContainer}>
        <CareerAccordion list={careerList} router={router} />
      </Box>
    </Box>
  );
};

export default CareerContainer;
