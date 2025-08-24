import { Box, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { styles, getInfoItemClassName } from './style';

interface IInfoBoxProps {
  infoList: {
    logo: string;
    title: string;
    desc: string;
  }[];
  photo: StaticImageData;
}

const InfoBox: React.FC<IInfoBoxProps> = ({ infoList, photo }) => {
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
      <Image src={photo} style={styles.imageStyle} alt="image" />
      <Box sx={styles.infoCard}>{infoListMap}</Box>
    </Box>
  );
};

export default InfoBox;
