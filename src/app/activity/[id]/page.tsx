import type { Metadata } from 'next';
import ActivityDetailContainer from '../../../containers/activity/ActivityDetailPage';
import * as Sentry from '@sentry/nextjs';

interface ActivityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch activity data for metadata
async function getActivity(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Handle different possible response structures
    if (data?.data?.data) {
      return data.data.data;
    } else if (data?.data) {
      return data.data;
    }
    return data;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { page: 'ActivityDetailPage', operation: 'getActivityMetadata' },
      extra: { activityId: id },
    });
    return null;
  }
}

export async function generateMetadata({
  params,
}: ActivityDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  const activity = await getActivity(numericId);

  if (!activity) {
    return {
      title: 'Activity',
      description: 'Activity details from EBER Petrochemical.',
      openGraph: {
        title: 'Activity - EBER Petrochemical',
        description: 'Activity details from EBER Petrochemical.',
        url: `https://ebergroup.com/activity/${id}`,
        siteName: 'EBER Petrochemical',
        images: [
          {
            url: '/logo.png',
            width: 1200,
            height: 630,
            alt: 'EBER Petrochemical Activity',
          },
        ],
        locale: 'en_US',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Activity - EBER Petrochemical',
        description: 'Activity details from EBER Petrochemical.',
        images: ['/logo.png'],
      },
    };
  }

  const title = activity.title_en || activity.title_id || 'Activity';
  const description =
    activity.body_en?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    activity.body_id?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    'Activity details from EBER Petrochemical.';

  const imageUrl = activity.image
    ? `${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${activity.image}`
    : '/logo.png';

  return {
    title: title,
    description,
    openGraph: {
      title: `${title} - EBER Petrochemical`,
      description,
      url: `https://ebergroup.com/activity/${id}`,
      siteName: 'EBER Petrochemical',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - EBER Petrochemical`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ActivityDetailPage({
  params,
}: ActivityDetailPageProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return <ActivityDetailContainer id={numericId} />;
}
