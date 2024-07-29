import { Config } from '@/util/config';
import { useEffect, useState } from 'react';

export const useLocaleLanguage = () => {
  const [lang, setLang] = useState(Config.locale);

  useEffect(() => {
    setLang(navigator.language.slice(0, 2));
  }, []);

  return lang;
};
