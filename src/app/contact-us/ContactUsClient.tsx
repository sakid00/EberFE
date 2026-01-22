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
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          maxWidth: '90vw',
          alignSelf: 'center',
          right: '6%',
          marginTop: '-30vh',
          marginBottom: '-15vw',
        } as CSSProperties)
      : ({
          top: '2vw',
          right: '6%',
          maxWidth: '100vw',
          width: '35vw',
          minwidth: '20%',
          height: 'auto',
          zIndex: -1000,
          position: 'relative' as const,
        } as CSSProperties);

  return (
    <FormSubmitContainer
      title={t('contact_us.submit_application_title_small')}
      description={t('contact_us.submit_application_desc')}
      text={`${t("contact_us.submit_application_title.let's")}\u00a0{${t('contact_us.submit_application_title.reach_out')}}`}
      photo={getPhoto('safetyPerson')}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default ContactUsClient;
