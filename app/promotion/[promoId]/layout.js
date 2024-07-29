'use client';

import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';

export default function Layout({ children }) {
  const router = useRouter();

  if (isWeb()) {
    router.push(`/promotion`);
    return null;
  }

  return <div className='flex flex-col flex-1 overflow-hidden'>{children}</div>;
}
