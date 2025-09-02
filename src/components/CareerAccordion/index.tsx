import { ICareerList } from '@/app/careers/page';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles, getAccordionMarginTop } from './style';
import { useDeviceType, useTranslation } from '@/hooks';

interface ICareerAccordion {
  list: ICareerList[];
  router: AppRouterInstance;
}

const CareerAccordion: React.FC<ICareerAccordion> = ({ list, router }) => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return list.map((val, index) => {
    return (
      <Accordion
        key={`${index} - ${val.title}`}
        sx={{
          ...styles.accordion,
          marginTop: getAccordionMarginTop(index),
        }}
      >
        <AccordionSummary sx={styles.accordionSummary}>
          <Box sx={styles.summaryContainer(type)}>
            <Box sx={styles.jobInfoContainer(type)}>
              <Typography sx={styles.openRolesText(type)}>
                {t('careers.open_roles')}
              </Typography>
              <Typography sx={styles.jobTitleText(type)}>
                {val.title}
              </Typography>
              <Typography sx={styles.jobStatusText(type)}>
                {val.status}
              </Typography>
            </Box>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                router.push('/careers/submit');
              }}
              onFocus={(e) => e.stopPropagation()}
              sx={styles.submitButton(type)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push('/careers/submit');
                }
              }}
            >
              {t('careers.submit_application_button')}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={styles.accordionDetails}>
          <Box sx={styles.detailsContainer}>
            <Box>
              <Typography sx={styles.sectionTitle}>Job Description:</Typography>
              <Typography sx={styles.sectionContent}>{val.desc}</Typography>
            </Box>
            <Box>
              <Typography sx={styles.sectionTitle}>Requirements:</Typography>
              <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                {val.req.map((requirement, reqIndex) => (
                  <Typography
                    key={reqIndex}
                    component="li"
                    sx={{
                      ...styles.sectionContent,
                      listStyleType: 'disc',
                      display: 'list-item',
                      marginBottom: 0.5,
                    }}
                  >
                    {requirement}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  });
};
export default CareerAccordion;
