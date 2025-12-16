import type { Metadata } from 'next';
import ActivityContainer from '../../containers/activity';

export const metadata: Metadata = {
  title: 'Activity - EBER Group',
  description:
    'Explore EBER Group sustainability initiatives, community engagement programs, company events, and latest news from our petrochemical operations.',
  openGraph: {
    title: 'Activity - EBER Group',
    description:
      'Explore EBER Group sustainability initiatives, community engagement programs, company events, and latest news from our petrochemical operations.',
    url: 'https://ebergroup.com/activity',
  },
};

export default function ActivityPage() {
  return <ActivityContainer />;
}
