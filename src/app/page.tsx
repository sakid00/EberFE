'use client';
import {
  SpecialtySection,
  CustomProductSection,
  SubsidiariesSection,
  InnovationSection,
  useScrollAnimation,
} from '../containers/home';

export default function Home() {
  useScrollAnimation();

  return (
    <>
      <SpecialtySection />
      <CustomProductSection />
      <SubsidiariesSection />
      <InnovationSection />
    </>
  );
}
