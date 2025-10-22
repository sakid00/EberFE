'use client';
import Photo from '../../../public/photo/safety-person.png';
import FormSubmitContainer from '../../containers/formSubmit';
import { useDeviceType, useTranslation } from '../../hooks';
import { CSSProperties } from 'react';

const ContactUsPage = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile'
      ? ({ top: '28vh', width: 'max-content', height: '40vh' } as CSSProperties)
      : ({
          top: '10%',
          right: '6%',
          maxWidth: '40%',
          minwidth: '20%',
          height: 'auto',
        } as CSSProperties);

  return (
    <FormSubmitContainer
      title={t('contact_us.submit_application_title_small')}
      description={t('contact_us.submit_application_desc')}
      text1={`${t("contact_us.submit_application_title.let's")}\u00a0`}
      text2={t('contact_us.submit_application_title.reach_out')}
      photo={Photo}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default ContactUsPage;
