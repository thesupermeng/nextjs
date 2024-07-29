'use client';
import { useEffect } from 'react';

const GoogleAnalyticComponent = () => {

  useEffect(() => {
    // Google Analytics script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HGN89T8ESW';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-HGN89T8ESW');

    return () => {
      // Clean up function if needed
      // For example, if you need to remove the script element
      document.head.removeChild(script);
    };
  }, []);

  return (
  <></>
  );
};

export default GoogleAnalyticComponent;
