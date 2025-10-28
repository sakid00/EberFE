import { Box, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { styles, getInfoItemClassName } from './style';
import { infoListType } from '../../containers/formSubmit';
import { DeviceType, useTranslation } from '../../hooks';

interface IInfoBoxProps {
  infoList: infoListType[];
  photo: string | StaticImageData;
  imageStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  type: DeviceType;
}

const InfoBox: React.FC<IInfoBoxProps> = ({
  infoList,
  photo,
  imageStyle,
  containerStyle,
  type,
}) => {
  const { t } = useTranslation();
  const infoListMap = infoList.map((val, index) => {
    return (
      <Box
        className={getInfoItemClassName(index, infoList.length)}
        key={index}
        sx={styles.infoItemContainer}
      >
        <Image
          src={val.logo}
          width={30}
          height={30}
          style={{
            objectFit: 'fill',
            width: index === 2 ? '16%' : '12%',
            height: index === 2 ? '16%' : '12%',
          }}
          alt=""
        />
        <Box sx={styles.infoContent}>
          <Typography sx={styles.infoTitle}>{t(val.title)}</Typography>
          <Typography sx={styles.infoDescription}>{t(val.desc)}</Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Box sx={{ ...styles.container(type), ...containerStyle }}>
      <Box sx={imageStyle}>
        <Image
          src={photo}
          style={{
            objectFit: 'fill',
            width: '100%',
            height: 'auto',
          }}
          height={1000}
          width={1000}
          alt="image"
        />
      </Box>
      <Box sx={styles.infoCard}>{infoListMap}</Box>
    </Box>
  );
};

export default InfoBox;
