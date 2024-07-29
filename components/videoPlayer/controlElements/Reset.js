import { Reload } from '@/asset/icons';
import { isWeb } from '@/util/common';
import Image from 'next/image';

export const Reset = ({ size }) => {
  return (
    <Image
      src={Reload}
      alt='reload'
      onClick={reloadPlayer}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      className={`cursor-pointer backdrop-blur-0 ${
        isWeb() ? '' : 'h-[18px] w-[18px]'
      }`}
    />
  );
};
export const reloadPlayer = () => {
  const ele = document.getElementsByTagName('video');
  [...ele].forEach((e) => {
    //todo add reload
    window.tayaPlayer.pause();
    window.tayaPlayer.unload?.();
    window.tayaPlayer.load();
    window.tayaPlayer?.play();
  });
};
