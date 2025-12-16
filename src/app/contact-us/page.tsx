import type { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us - EBER Group',
  description:
    'Get in touch with EBER Group - reach out for questions, product information, or potential collaborations. Our team is ready to assist you.',
  openGraph: {
    title: 'Contact Us - EBER Group',
    description:
      'Get in touch with EBER Group - reach out for questions, product information, or potential collaborations. Our team is ready to assist you.',
    url: 'https://ebergroup.com/contact-us',
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
