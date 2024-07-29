import { FullScreenIcon, FullScreenExitIcon } from '@/asset/icons';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullscreen } from '@/store/videoPlayer';

export default function FullScreen({ onClick }) {
  const dispatch = useDispatch();
  const isFull = useSelector((s) => s.videoPlayer.isFull);

  const fullScreenClick = (e) => {
    if (onClick) {
      onClick();
    } else {
      e?.stopPropagation();
      const resp = makeFullScreen();
      if (resp) {
        dispatch(toggleFullscreen());
      }
    }
  };

  return (
    <Image
      onClick={fullScreenClick}
      alt='full screen'
      src={isFull ? FullScreenExitIcon : FullScreenIcon}
      className='flex flex-initial w-8 h-8 p-2 cursor-pointer'
    />
  );
}

export const makeFullScreen = () => {
  let eleFound = false;
  const ele = document.getElementsByClassName('video-js');
  console.log('parent1', ele);
  [...ele].forEach((e) => {
    const container = e.closest('.video-wrapper');
    eleFound = true;
    console.log('container', container);
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement
    ) {
      document.exitFullscreen() ||
        document.webkitExitFullscreen() ||
        document.msExitFullscreen() ||
        document.mozCancelFullScreen();
    } else {
      container?.requestFullscreen?.() ||
        container?.webkitRequestFullscreen?.() ||
        container?.mozRequestFullScreen?.() ||
        container?.msRequestFullscreen?.();
    }
  });

  return eleFound;
};
