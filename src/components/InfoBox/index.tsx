import { Box, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { styles, getInfoItemClassName } from './style';
import { infoListType } from '@/containers/formSubmit';

interface IInfoBoxProps {
  infoList: infoListType[];
  photo: StaticImageData;
  imageStyle?: React.CSSProperties;
}

const InfoBox: React.FC<IInfoBoxProps> = ({ infoList, photo, imageStyle }) => {
  const infoListMap = infoList.map((val, index) => {
    return (
      <Box
        className={getInfoItemClassName(index, infoList.length)}
        key={index}
        sx={styles.infoItemContainer}
      >
        <Image src={val.logo} width={30} height={30} alt="" />
        <Box sx={styles.infoContent}>
          <Typography sx={styles.infoTitle}>{val.title}</Typography>
          <Typography sx={styles.infoDescription}>{val.desc}</Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Box sx={styles.container}>
      <Image src={photo} style={imageStyle ?? styles.imageStyle} alt="image" />
      <Box sx={styles.infoCard}>{infoListMap}</Box>
    </Box>
  );
};

export default InfoBox;
