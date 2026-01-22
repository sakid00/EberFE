import { Box, Typography } from "@mui/material";
import { useDeviceType } from "@/hooks/useDeviceType";
import { getPhoto } from "@/assets/photoAssets";
import Image from "next/image";
import { useMemo } from "react";
import {
  topProductsCardStyles,
  getTopProductsCardClassName,
  topProductsImageStyle,
} from "./topProductsCard.styles";

interface TopProductsCardProps {
  companyName?: string;
  data: string[];
  index: number;
}

export const TopProductsCard = ({ data, index, companyName }: TopProductsCardProps) => {
  const { type } = useDeviceType();
  const companyImage = useMemo(() => {
    const name = companyName?.toLowerCase() ?? '';

    if (name.includes('eternal')) {
      return getPhoto('eternal');
    }
    if (name.includes('eterindo')) {
      return getPhoto('eng');
    }
    if (name.includes('petrowidada')) {
      return getPhoto('petro');
    }
    if (name.includes('solvindo')) {
      return getPhoto('mega');
    }

    return getPhoto('eternal');
  }, [companyName]);

  return (
    <Box
      id={`top-products-${index}`}
      className={getTopProductsCardClassName(type, index)}
    >
      <Box sx={topProductsCardStyles.imageContainer(type)}>
        <Image src={companyImage} width={1000} height={1000} style={topProductsImageStyle} alt={`top-products-img-${index}`} />
      </Box>
      <Box sx={topProductsCardStyles.contentContainer(type)}>
        {data.map((item) => (
          <Typography key={item} sx={topProductsCardStyles.productText(type)}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};