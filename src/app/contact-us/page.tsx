import type { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with EBER Group - reach out for questions, product information, or potential collaborations. Our team is ready to assist you.',
  openGraph: {
    title: 'Contact Us - EBER Group',
    description:
      'Get in touch with EBER Group - reach out for questions, product information, or potential collaborations. Our team is ready to assist you.',
    url: 'https://ebergroup.com/contact-us',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact EBER Group',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - EBER Group',
    description:
      'Get in touch with EBER Group - reach out for questions, product information, or potential collaborations. Our team is ready to assist you.',
    images: ['/logo.png'],
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
