'use client';
import Photo from '../../../../public/photo/field-person.png';
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
      title={t('careers.submit_application_title_small')}
      description={t('careers.submit_application_desc')}
      text1={`${t("careers.submit_application_title.let's")}\u00a0`}
      text2={t('careers.submit_application_title.the_future')}
      photo={Photo}
      type={type}
      imageStyle={imageStyle}
      containerStyle={{ alignSelf: 'start', height: '90vh' }}
    />
  );
};

export default SubmitApplicationPage;
