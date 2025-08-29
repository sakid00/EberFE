import FormBox from '@/components/FormBox';
import InfoBox from '@/components/InfoBox';
import { Box } from '@mui/material';
import { StaticImageData } from 'next/image';
import { styles } from './style';
import EmailIcon from '@public/icon/email_purple.svg';
import PhoneIcon from '@public/icon/phone_purple.svg';
import LocationIcon from '@public/icon/location_purple.svg';

export type infoListType = {
  logo: string;
  title: string;
  desc: string;
};

const infoList = [
  { logo: EmailIcon, title: 'Email', desc: 'info@ebergroup.com' },
  { logo: PhoneIcon, title: 'Phone', desc: '+62 21 1234 5678' },
  {
    logo: LocationIcon,
    title: 'Address',
    desc: 'Eber Tower, 123 Business District\n Jakarta, Indonesia 12345',
  },
];

const FormSubmitContainer = ({
  photo,
  title,
  description,
  text1,
  text2,
  imageStyle,
}: {
  photo: StaticImageData;
  title: string;
  description: string;
  text1: string;
  text2: string;
  imageStyle?: React.CSSProperties;
}) => {
  return (
    <Box sx={styles.containerBox}>
      <FormBox
        title={title}
        description={
          description ??
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?'
        }
        text1={text1}
        text2={text2}
        formBoxStyle={styles.formBoxStyle}
      />
      <InfoBox
        infoList={infoList}
        photo={photo}
        imageStyle={imageStyle ?? styles.imageStyle}
      />
    </Box>
  );
};

export default FormSubmitContainer;
