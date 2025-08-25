import FormBox from '@/components/FormBox';
import InfoBox from '@/components/InfoBox';
import { Box } from '@mui/material';
import { infoListType } from '@/app/contact-us/page';
import { StaticImageData } from 'next/image';
import { styles } from './style';

const ContactUsContainer = ({
  list,
  photo,
}: {
  list: infoListType[];
  photo: StaticImageData;
}) => {
  return (
    <Box sx={styles.containerBox}>
      <FormBox
        title="Get in touch"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
        text1={"Let's Chat,\u00a0"}
        text2=" Reach Out to Us"
      />
      <InfoBox infoList={list} photo={photo} />
    </Box>
  );
};

export default ContactUsContainer;
