'use client';
import Photo from '@public/photo/lab-person.png';
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
          left: '0',
          top: '20vh',
          width: '100vw',
          height: '60vh',
        } as CSSProperties)
      : styles.imageStyle;

  return (
    <FormSubmitContainer
      title={t('custom_product.submit_application_title_small')}
      description={t('custom_product.submit_application_desc')}
      text1={t("custom_product.submit_application_title.let's")}
      text2={t('custom_product.submit_application_title.custom')}
      photo={Photo}
      imageStyle={imageStyle}
      type={type}
    />
  );
};

export default SubmitApplicationPage;
