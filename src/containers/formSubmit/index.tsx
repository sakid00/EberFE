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
  text1,
  text2,
  imageStyle,
  type,
}: {
  photo: StaticImageData;
  title: string;
  description: string;
  text1: string;
  text2: string;
  imageStyle?: React.CSSProperties;
  type: DeviceType;
}) => {
  return (
    <Box sx={styles.containerBox(type)}>
      <FormBox
        title={title}
        description={
          description ??
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?'
        }
        text1={text1}
        text2={text2}
        formBoxStyle={styles.formBoxStyle(type)}
      />
      <InfoBox
        infoList={infoList}
        photo={photo}
        imageStyle={{ ...styles.imageStyle, ...imageStyle }}
        type={type}
      />
    </Box>
  );
};

export default FormSubmitContainer;
