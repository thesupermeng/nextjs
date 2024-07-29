'use client';
import { LoadingPage } from '@/components/loading';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import useGetCategories from '@/hook/user/useGetCategories';
import { isWeb } from '@/util/common';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const pathename = usePathname();
  const router = useRouter();
  const { sportsCategories: types } = useGetCategories();
  useEffect(() => {
    if (pathename === '/live') {
      router.replace(`/live/all`);
    }
  }, [pathename, types]);

  return <LoadingPage full={!isWeb()} />;
}
