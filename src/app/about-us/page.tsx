'use client';
import {
  HeaderSection,
  CertificationSection,
  useScrollAnimation,
  PrincipleSection,
  CorporateSection,
  ValueSection,
} from '@/containers/about-us';

const AboutUs = () => {
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

export default AboutUs;
