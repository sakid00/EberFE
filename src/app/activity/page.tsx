import type { Metadata } from 'next';
import ActivityContainer from '../../containers/activity';

export const metadata: Metadata = {
  title: 'Activity',
  description:
    'Explore EBER Group sustainability initiatives, community engagement programs, company events, and latest news from our petrochemical operations.',
  openGraph: {
    title: 'Activity - EBER Group',
    description:
      'Explore EBER Group sustainability initiatives, community engagement programs, company events, and latest news from our petrochemical operations.',
    url: 'https://ebergroup.com/activity',
    siteName: 'EBER Group',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EBER Group Activities and News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activity - EBER Group',
    description:
      'Explore EBER Group sustainability initiatives, community engagement programs, company events, and latest news from our petrochemical operations.',
    images: ['/logo.png'],
  },
};

export default function ActivityPage() {
  return <ActivityContainer />;
}
