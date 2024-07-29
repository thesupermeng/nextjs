'use client';

import { LoadingPage } from '@/components/loading';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { isWeb } from '@/util/common';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/sports') {
      router.replace('/sports/Eastrich');
    }
  }, [pathname]);
  return <LoadingPage full={!isWeb()} />;
}
