'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PrefetchWrapperProps {
  children: React.ReactNode;
}

export const PrefetchWrapper: React.FC<PrefetchWrapperProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Prefetch semua route utama setelah first load selesai
    const prefetchTimer = setTimeout(() => {
      // Prefetch halaman utama
      router.prefetch('/');
      router.prefetch('/about-us');
      router.prefetch('/corporate');
      router.prefetch('/product');
      router.prefetch('/activity');
      router.prefetch('/careers');
      router.prefetch('/contact-us');
    }, 3000); // Tunggu 3 detik setelah mount

    return () => clearTimeout(prefetchTimer);
  }, [router]);

  return <>{children}</>;
};
