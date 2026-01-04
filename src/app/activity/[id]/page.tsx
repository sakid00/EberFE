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
      title: 'Activity - EBER Group',
      description: 'Activity details from EBER Group.',
    };
  }

  const title = activity.title_en || activity.title_id || 'Activity';
  const description =
    activity.body_en?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    activity.body_id?.replace(/<[^>]*>/g, '').slice(0, 160) ||
    'Activity details from EBER Group.';

  return {
    title: `${title} - EBER Group`,
    description,
    openGraph: {
      title: `${title} - EBER Group`,
      description,
      url: `https://ebergroup.com/activity/${id}`,
      images: activity.image
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_IMAGE_ACTIVITY_BASE_URL}${activity.image}`,
              alt: title,
            },
          ]
        : undefined,
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
