import { MetadataRoute } from 'next';

/**
 * Dynamic Sitemap Generator for Eber Group
 * 
 * Generates a sitemap.xml file with all public pages
 * Update the baseUrl to match your production domain
 */

interface ActivityResponse {
  id: number;
  updatedAt: string;
}

interface CareerResponse {
  id: number;
}

// Fetch all activities for sitemap
async function fetchActivities(): Promise<ActivityResponse[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?page=1&pageSize=1000`,
      {
        next: { revalidate: 86400 }, // Revalidate once per day
      }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error('Error fetching activities for sitemap:', error);
    return [];
  }
}

// Fetch all careers for sitemap
async function fetchCareers(): Promise<CareerResponse[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/careers?page=1&pageSize=1000`,
      {
        next: { revalidate: 86400 }, // Revalidate once per day
      }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data?.data?.data || [];
  } catch (error) {
    console.error('Error fetching careers for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ebergroup.com';
  
  // Static routes - pages that always exist
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/activity`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Fetch dynamic routes
  const [activities, careers] = await Promise.all([
    fetchActivities(),
    fetchCareers(),
  ]);

  // Activity detail pages
  const activityRoutes: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${baseUrl}/activity/${activity.id}`,
    lastModified: new Date(activity.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Career detail pages
  const careerRoutes: MetadataRoute.Sitemap = careers.map((career) => ({
    url: `${baseUrl}/careers/${career.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...activityRoutes,
    ...careerRoutes,
  ];
}
