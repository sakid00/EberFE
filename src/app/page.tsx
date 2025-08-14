'use client';
import {
  HeaderSection,
  SpecialtySection,
  CustomProductSection,
  SubsidiariesSection,
  InnovationSection,
  useScrollAnimation,
} from '@/containers/home';

export default function Home() {
  useScrollAnimation();

  return (
    <>
      <HeaderSection />
      <SpecialtySection />
      <CustomProductSection />
      <SubsidiariesSection />
      <InnovationSection />
    </>
  );
}
