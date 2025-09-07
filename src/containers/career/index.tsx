import { ICareerList } from '@/app/careers/page';
import CareerAccordion from '@/components/CareerAccordion';
import DualColorText from '@/components/DualColorText';
import { Box, Typography } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles } from './style';
import { useDeviceType, useTranslation } from '@/hooks';
import emptyIcon from '@public/icon/empty-career.svg';
import Image from 'next/image';

interface ICareerContainer {
  careerList: ICareerList[];
  router: AppRouterInstance;
  isLoading: boolean;
}

const CareerContainer = ({
  careerList,
  router,
  isLoading,
}: ICareerContainer) => {
  const { type } = useDeviceType();
  const { t } = useTranslation();

  const emptyListContainer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30%',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        gap: '16px',
      }}
    >
      <Image src={emptyIcon} alt="empty-career" width={200} height={200} />
      <Typography fontSize={'1em'} fontWeight={700} color="#030712">
        {t('careers.empty_list_title')}
      </Typography>
      <Typography
        fontSize={'0.8em'}
        fontWeight={400}
        color="#4B5563"
        textAlign={'center'}
      >
        {t('careers.empty_list_desc')}
      </Typography>
    </Box>
  );
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
        {careerList?.length > 0 && !isLoading ? (
          <CareerAccordion list={careerList} router={router} />
        ) : (
          emptyListContainer
        )}
      </Box>
    </Box>
  );
};

export default CareerContainer;
