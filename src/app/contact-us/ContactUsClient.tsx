'use client';
import { getPhoto } from '@/assets/photoAssets';
import FormSubmitContainer from '../../containers/formSubmit';
import { useDeviceType, useTranslation } from '../../hooks';
import { CSSProperties } from 'react';

const ContactUsClient = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile'
      ? ({
          position: 'absolute',
          top: '28vh',
          right: '5vw',
          width: 'max-content',
          height: '40vh',
        } as CSSProperties)
      : ({
          top: '2vw',
          right: '6%',
          maxWidth: '100vw',
          width: '35vw',
          minwidth: '20%',
          height: 'auto',
        } as CSSProperties);

  return (
    <FormSubmitContainer
      title={t('contact_us.submit_application_title_small')}
      description={t('contact_us.submit_application_desc')}
      text1={`${t("contact_us.submit_application_title.let's")}\u00a0`}
      text2={t('contact_us.submit_application_title.reach_out')}
      photo={getPhoto('safetyPerson')}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default ContactUsClient;

