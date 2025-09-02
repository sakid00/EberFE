'use client';
import Photo from '@public/photo/field-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { styles } from './style';
import { useDeviceType, useTranslation } from '@/hooks';
import { CSSProperties } from 'react';

const SubmitApplicationPage = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile'
      ? ({
          left: '2vw',
          top: '30vh',
          width: '100vw',
          height: '50vh',
        } as CSSProperties)
      : styles.imageStyle;

  return (
    <FormSubmitContainer
      title={t('careers.submit_application_title_small')}
      description={t('careers.submit_application_desc')}
      text1={`${t("careers.submit_application_title.let's")}\u00a0`}
      text2={t('careers.submit_application_title.the_future')}
      photo={Photo}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default SubmitApplicationPage;
