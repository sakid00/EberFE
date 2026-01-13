'use client';
import { getPhoto } from '@/assets/photoAssets';
import FormSubmitContainer from '../../../containers/formSubmit';
import { styles } from './style';
import { useDeviceType, useTranslation } from '../../../hooks';
import EmailIcon from '@/public/icon/email_purple.svg';
import PhoneIcon from '@/public/icon/phone_purple.svg';
import LocationIcon from '@/public/icon/location_purple.svg';

const SubmitApplicationClient = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const imageStyle =
    type === 'mobile' ? styles.imageStyleMobile : styles.imageStyle;

  const careerInfoList = [
    { logo: EmailIcon, title: 'info_box.email', desc: 'info_box.email_desc_2' },
    { logo: PhoneIcon, title: 'info_box.phone', desc: 'info_box.phone_desc' },
    {
      logo: LocationIcon,
      title: 'info_box.address',
      desc: 'info_box.address_desc',
    },
  ];

  return (
    <FormSubmitContainer
      title={t('careers.submit_application_title_small')}
      description={t('careers.submit_application_desc')}
      text={`${t("careers.submit_application_title.let's")}\u00a0{${t('careers.submit_application_title.the_future')}}`}
      photo={getPhoto('fieldPerson')}
      type={type}
      imageStyle={imageStyle}
      containerStyle={{ alignSelf: 'start', height: '90vh' }}
      customInfoList={careerInfoList}
    />
  );
};

export default SubmitApplicationClient;

