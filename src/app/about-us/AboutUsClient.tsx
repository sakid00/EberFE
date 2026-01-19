'use client';
import {
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
      <CertificationSection />
      <PrincipleSection />
      <CorporateSection />
      <ValueSection />
    </>
  );
};

export default AboutUsClient;
