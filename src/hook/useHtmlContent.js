import { useEffect, useState } from 'react';
import useGetConfig from '@/hook/user/useGetConfig';

export const HtmlType = {
  tc: 't&c',
  privacy: 'privacy'
};

const useHtmlContent = (type) => {
  const [htmlContent, setHtmlContent] = useState('');
  const { config } = useGetConfig();

  useEffect(() => {
    if (config?.app_url?.[type]) {
      fetch(config?.app_url?.[type])
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((html) => {
          setHtmlContent(html);
        })
        .catch((error) => {
          console.error('Error fetching the HTML content:', error.message);
        });
    }
  }, [config]);

  return { htmlContent }
};

export default useHtmlContent;