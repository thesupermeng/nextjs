import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useOpenInstall = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const channelCode = searchParams.get('channelCode');
  const openinstallRef = useRef(null);

  const downloadButtonClick = () => {
    if (openinstallRef.current) {
      openinstallRef.current.wakeupOrInstall();
    }
  };

  useEffect(() => {
    if (!channelCode) {
      const localChannelCode = localStorage.getItem('channelCode');
      if (localChannelCode) {
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('channelCode', localChannelCode);
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}?${newSearchParams}`
        );
      }
    } else {
      localStorage.setItem('channelCode', channelCode);
    }
  }, [channelCode, router]);

  useEffect(() => {
    const initializeOpenInstall = () => {
      const data = window.OpenInstall.parseUrlParams();
      openinstallRef.current = new window.OpenInstall(
        {
          appKey: '', //to be updated
        },
        data
      );
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = 'https://web.cdn.openinstall.io/openinstall.js';
    document.body.appendChild(script);

    script.onload = initializeOpenInstall;

    return () => {};
  }, []);

  return { downloadButtonClick };
};
