import { useEffect, useState } from 'react';

export const useLiveFullScreenStatus = () => {
  const [hasFullScreenElement, setHasFullScreenElement] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      try {
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement
        ) {
          setHasFullScreenElement(
            document.fullscreenElement.className.includes('video-wrapper') ||
              document.mozFullScreenElement.className.includes(
                'video-wrapper'
              ) ||
              document.webkitFullscreenElement.className.includes(
                'video-wrapper'
              )
          );
        } else {
          setHasFullScreenElement(false);
        }
      } catch (e) {}
    });
    const ele = document.getElementsByClassName('video-wrapper');

    [...ele].forEach((e) => {
      resizeObserver.observe(e);
    });
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return hasFullScreenElement;
};
