'use client';
import { getPhoto } from '@/assets/photoAssets';
import FormSubmitContainer from '../../../containers/formSubmit';
import { styles } from './style';
import { useDeviceType, useTranslation } from '../../../hooks';

const CustomProductClient = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile' ? styles.imageStyleMobile : styles.imageStyle;

  return (
    <FormSubmitContainer
      title={t('custom_product.submit_application_title_small')}
      description={t('custom_product.submit_application_desc')}
      text={`${t("custom_product.submit_application_title.let's")}{${t('custom_product.submit_application_title.custom')}}`}
      photo={getPhoto('labPerson')}
      imageStyle={imageStyle}
      type={type}
      buttonText={t('custom_product.submit_application_button')}
    />
  );
};

export default CustomProductClient;

