'use client';
import { useRouter } from 'next/navigation';
import CareerContainer from '@/containers/career';
import { careerListData } from '@/containers/career/constants';

export interface ICareerList {
  title: string;
  status: string;
  desc: string;
  req: string;
}

const CareersPage = () => {
  const router = useRouter();

  return <CareerContainer careerList={careerListData} router={router} />;
};

export default CareersPage;
