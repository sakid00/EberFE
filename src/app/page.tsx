'use client';
import {
  SpecialtySection,
  CustomProductSection,
  SubsidiariesSection,
  InnovationSection,
  useScrollAnimation,
  TopProductSection,
} from '../containers/home';

export default function Home() {
  useScrollAnimation();

  return (
    <>
      <SpecialtySection />
      <TopProductSection />
      <CustomProductSection />
      <SubsidiariesSection />
      <InnovationSection />
    </>
  );
}
