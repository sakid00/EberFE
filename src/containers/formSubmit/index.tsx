import FormBox from '@/components/FormBox/index';
import InfoBox from '@/components/InfoBox/index';
import { Box } from '@mui/material';
import { StaticImageData } from 'next/image';
import { styles } from './style';
import EmailIcon from '@/public/icon/email_purple.svg';
import PhoneIcon from '@/public/icon/phone_purple.svg';
import LocationIcon from '@/public/icon/location_purple.svg';
import { DeviceType } from '@/hooks';

export type infoListType = {
  logo: string;
  title: string;
  desc: string;
};

const infoList = [
  { logo: EmailIcon, title: 'info_box.email', desc: 'info_box.email_desc' },
  { logo: PhoneIcon, title: 'info_box.phone', desc: 'info_box.phone_desc' },
  {
    logo: LocationIcon,
    title: 'info_box.address',
    desc: 'info_box.address_desc',
  },
];

const FormSubmitContainer = ({
  photo,
  title,
  description,
  text,
  imageStyle,
  type,
  containerStyle,
  buttonText,
  customInfoList,
}: {
  photo: string | StaticImageData;
  title: string;
  description: string;
  text: string;
  imageStyle?: React.CSSProperties;
  type: DeviceType;
  containerStyle?: React.CSSProperties;
  buttonText?: string;
  customInfoList?: infoListType[];
}) => {
  return (
    <Box sx={styles.containerBox(type)}>
      <FormBox
        title={title}
        description={
          description ??
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?'
        }
        text={text}
        formBoxStyle={styles.formBoxStyle(type)}
        buttonText={buttonText}
      />
      <InfoBox
        infoList={customInfoList || infoList}
        photo={photo}
        imageStyle={{ ...styles.imageStyle, ...imageStyle }}
        type={type}
        containerStyle={containerStyle}
      />
    </Box>
  );
};

export default FormSubmitContainer;
