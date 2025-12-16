import type { Metadata } from 'next';
import SubmitApplicationClient from './SubmitApplicationClient';

export const metadata: Metadata = {
  title: 'Submit Application - Careers - EBER Group',
  description:
    "Apply to join EBER Group - submit your application and be part of a team that's building the future of the petrochemical industry.",
  openGraph: {
    title: 'Submit Application - Careers - EBER Group',
    description:
      "Apply to join EBER Group - submit your application and be part of a team that's building the future of the petrochemical industry.",
    url: 'https://ebergroup.com/careers/submit',
  },
};

export default function SubmitApplicationPage() {
  return <SubmitApplicationClient />;
}
