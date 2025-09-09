import ActivityDetailContainer from '../../../containers/activity/ActivityDetailPage';

interface ActivityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ActivityDetailPage = async ({ params }: ActivityDetailPageProps) => {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  return <ActivityDetailContainer id={numericId} />;
};

export default ActivityDetailPage;
