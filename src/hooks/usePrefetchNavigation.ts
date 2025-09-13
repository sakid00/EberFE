'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCompany from './useCompany';
import useProduct from './useProduct';

export const usePrefetchNavigation = () => {
  const router = useRouter();
  const { getCompany, companies } = useCompany();
  const { getProduct, products } = useProduct();

  useEffect(() => {
    // Prefetch semua route utama setelah first load
    const prefetchRoutes = () => {
      console.log('🔄 Prefetching all routes for instant navigation...');
      
      // Prefetch halaman
      router.prefetch('/');
      router.prefetch('/about-us');
      router.prefetch('/corporate');
      router.prefetch('/product');
      router.prefetch('/activity');
      router.prefetch('/careers');
      router.prefetch('/contact-us');
      
      console.log('✅ Routes prefetched');
    };

    // Prefetch data jika belum ada
    const prefetchData = async () => {
      // Prefetch company data jika belum ada
      if (companies.length === 0) {
        console.log('🔄 Prefetching company data...');
        try {
          await getCompany({ page: 1, pageSize: 10 });
          console.log('✅ Company data prefetched');
        } catch (error) {
          console.log('⚠️ Company prefetch failed:', error);
        }
      }

      // Prefetch product data jika belum ada
      if (products.length === 0) {
        console.log('🔄 Prefetching product data...');
        try {
          await getProduct({ page: 1, pageSize: 100 });
          console.log('✅ Product data prefetched');
        } catch (error) {
          console.log('⚠️ Product prefetch failed:', error);
        }
      }
    };

    // Delay prefetch sedikit agar tidak mengganggu first load
    const timer = setTimeout(() => {
      prefetchRoutes();
      prefetchData();
    }, 2000); // Tunggu 2 detik setelah component mount

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
