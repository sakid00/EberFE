import { ICareerList } from '../../app/careers/page';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles, getAccordionMarginTop } from './style';
import { useDeviceType, useTranslation } from '../../hooks';
import { dynamicStylingValue } from '../../hooks/useDeviceType';

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
            <Box
              fontSize={dynamicStylingValue(
                type,
                '0.8em',
                '0.875em',
                '0.875em'
              )}
              fontWeight={400}
              color="#4B5563"
              marginTop={dynamicStylingValue(type, '5%', '3%', '3%')}
              sx={{
                wordBreak: 'break-word',
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  fontWeight: 700,
                  marginTop: '1em',
                  marginBottom: '0.5em',
                  color: '#030712',
                },
                '& p': {
                  marginBottom: '1em',
                  lineHeight: 1.6,
                },
                '& ul, & ol': {
                  marginBottom: '1em',
                  paddingLeft: '1.5em',
                },
                '& ul li': {
                  marginBottom: '0.5em',
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                },
                '& ol li': {
                  marginBottom: '0.5em',
                  listStyleType: 'decimal',
                  listStylePosition: 'outside',
                },
                '& strong, & b': {
                  fontWeight: 700,
                },
                '& em, & i': {
                  fontStyle: 'italic',
                },
                '& a': {
                  color: '#784791',
                  textDecoration: 'underline',
                },
                '& blockquote': {
                  borderLeft: '4px solid #784791',
                  paddingLeft: '1em',
                  margin: '1em 0',
                  fontStyle: 'italic',
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  margin: '1em 0',
                },
              }}
              dangerouslySetInnerHTML={{
                __html: val.desc || 'No content available for this activity.',
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  });
};
export default CareerAccordion;
