'use client';
import Photo from '../../../../public/photo/lab-person.png';
import FormSubmitContainer from '../../../containers/formSubmit';
import { styles } from './style';
import { useDeviceType, useTranslation } from '../../../hooks';

const SubmitApplicationPage = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile' ? styles.imageStyleMobile : styles.imageStyle;

  return (
    <FormSubmitContainer
      title={t('custom_product.submit_application_title_small')}
      description={t('custom_product.submit_application_desc')}
      text1={t("custom_product.submit_application_title.let's")}
      text2={t('custom_product.submit_application_title.custom')}
      photo={Photo}
      imageStyle={imageStyle}
      type={type}
      buttonText={t('custom_product.submit_application_button')}
    />
  );
};

export default SubmitApplicationPage;
