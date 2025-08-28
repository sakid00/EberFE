import { infoListType } from '@/app/contact-us/page';
import FormBox from '@/components/FormBox';
import InfoBox from '@/components/InfoBox';
import { Box } from '@mui/material';
import { StaticImageData } from 'next/image';
import { styles } from './style';

const SubmitProduct = ({
  list,
  photo,
}: {
  list: infoListType[];
  photo: StaticImageData;
}) => {
  return (
    <Box className="flex items-end justify-center">
      <FormBox
        title="Talk to Us!"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
        text1={'Let’s Build Your\u00a0'}
        text2="Custom Product"
        formBoxStyle={styles.formBoxStyle}
      />
      <InfoBox infoList={list} photo={photo} imageStyle={styles.imageStyle} />
    </Box>
  );
};

export default SubmitProduct;
