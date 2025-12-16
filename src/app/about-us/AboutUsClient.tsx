'use client';
import {
  HeaderSection,
  CertificationSection,
  useScrollAnimation,
  PrincipleSection,
  CorporateSection,
  ValueSection,
} from '../../containers/about-us';

const AboutUsClient = () => {
  useScrollAnimation();

  return (
    <>
      <HeaderSection />
      <CertificationSection />
      <PrincipleSection />
      <CorporateSection />
      <ValueSection />
    </>
  );
};

export default AboutUsClient;
