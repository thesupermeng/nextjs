import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useGracefulBack = (fallbackUrl = '/', waitTimeoutMs = 1000) => {
  const router = useRouter();
  const fallbackRedirect = useRef(setTimeout(() => {}, 0));

  useEffect(() => {
    window.addEventListener('popstate', () => {
      clearTimeout(fallbackRedirect.current);
    });
    return () => {
      clearTimeout(fallbackRedirect.current);
    };
  }, []);

  function gracefulBack() {
    router.back();
    fallbackRedirect.current = setTimeout(() => {
      router.replace(fallbackUrl);
    }, waitTimeoutMs);
  }

  return { gracefulBack };
};
