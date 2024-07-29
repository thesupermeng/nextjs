import { useLocaleLanguage } from '@/hook/common/useLocaleLanguage';
import { useAnnouncements } from '@/hook/user/useAnnouncements';
import { Config } from '@/util/config';
import { useEffect, useState } from 'react';

export const useDownloadSlides = () => {
  const lang = useLocaleLanguage();
  const { downloadsAnnouncements } = useAnnouncements();
  const [slidesArray, setSlidesArray] = useState([]);

  useEffect(() => {
    setSlidesArray(
      downloadsAnnouncements.map((dl) => ({
        ...dl,
        data: dl.data[lang] ?? dl.data[Config.locale],
      }))
    );
  }, [lang, JSON.stringify(downloadsAnnouncements)]);

  return slidesArray;
};
