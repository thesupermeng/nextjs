import { getMobileOperatingSystem } from '@/util/common';
import useGetConfig from '../user/useGetConfig';

export const useDownloadApp = () => {
  const { config } = useGetConfig();

  const onClickDownloadApp = (e) => {
    e?.preventDefault();
    const userMobileOS = getMobileOperatingSystem();
    const myInterval = setInterval(() => {
      let hidden =
        window.document.hidden ||
        window.document.mozHidden ||
        window.document.msHidden ||
        window.document.webkitHidden;

      if (!hidden || typeof hidden == 'undefined') {
        if (userMobileOS === 'Android' || userMobileOS === 'Windows Phone') {
          window.location.href = config?.download_url?.android;
        } else if (userMobileOS === 'iOS') {
          window.location.href = config?.download_url?.ios;
        } else {
          return;
        }
        clearInterval(myInterval);
      }
      return () => {
        clearInterval(myInterval);
      };
    }, 750);
  };
  return { onClickDownloadApp };
};
