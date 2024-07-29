'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useGetCategories from '@/hook/user/useGetCategories';
import { LoadingPage } from '@/components/loading';
import { isWeb } from '@/util/common';

export default function Page() {
  const pathename = usePathname();
  const router = useRouter();
  const { sportsCategories: types } = useGetCategories();

  useEffect(() => {
    if (pathename === '/bettingrules' && types[0]) {
      router.replace(`/bettingrules/${types[0].id}`);
    }
  }, [pathename, types]);

  return <LoadingPage full={!isWeb()} />;
}
