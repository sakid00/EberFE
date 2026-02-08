import ImageBackground from '@/components/ImageBackground';
import { Box, Typography } from '@mui/material';
import container from '@/public/background/container3.png';
import containerMobile from '@/public/background/container3-mobile.png';
import { useDeviceType } from '@/hooks/useDeviceType';
import DualColorText from '@/components/dualColorText';
import { useTopProducts, useTranslation } from '@/hooks';
import { TopProductsCard } from '@/components/Cards/TopProductsCard';
import { useEffect } from 'react';
import {
  animationClasses,
  topProductSectionStyles,
  getTitleFontSize,
} from './styles';

export const TopProductSection = () => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  const { data: topProductsData, getTopProducts } = useTopProducts();

  useEffect(() => {
    getTopProducts();
  }, []);

  return (
    <Box
      id="home-top-product-section"
      className="relative flex flex-col items-center py-[10vh] mb-[20vh]"
    >
      <ImageBackground
        className={animationClasses.slideRight}
        src={type === 'mobile' ? containerMobile : container}
        alt="container"
        objectFit={'fill'}
        sx={topProductSectionStyles.imageBackground(type)}
        contentSx={topProductSectionStyles.contentContainer(type)}
      >
        <DualColorText
          text={`${t('home.top_product_section_title.our_top_products')} {${t('home.top_product_section_title.products')}}`}
          fontSize={getTitleFontSize(type)}
          fontWeight={700}
          inline
          color="white"
          className={animationClasses.slideLeft}
        />
        <Typography
          className={animationClasses.slideLeft}
          sx={topProductSectionStyles.description(type)}
        >
          {t('home.top_product_section_desc')}
        </Typography>
        <Box sx={topProductSectionStyles.cardsContainer(type)}>
          {topProductsData.map(
            (item, index) =>
              item.topProducts.length > 0 && (
                <TopProductsCard
                  key={item.company.name}
                  data={item.topProducts.map(
                    (product) => product.product.segment ?? ''
                  )}
                  companyName={item.company.name}
                  index={index}
                />
              )
          )}
        </Box>
      </ImageBackground>
    </Box>
  );
};
