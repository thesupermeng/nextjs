'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const pathename = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathename === '/aboutus') {
      router.push('/aboutus/privacypolicy');
    }
  }, [pathename, router]);
}
