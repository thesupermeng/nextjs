import { Pause, Play } from '@/asset/icons';
import { togglePlayPause } from '@/store/videoPlayer';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const PlayPause = ({ size }) => {
  const dispatch = useDispatch();
  const { isPause } = useSelector((e) => e.videoPlayer);

  return (
    <Image
      src={isPause ? Pause : Play}
      alt='reload'
      onClick={(e) => {
        e.preventDefault();
        togglePlayPauseFn();
        dispatch(togglePlayPause(isPause));
      }}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
      className={`cursor-pointer backdrop-blur-0 mr-3 ${
        isWeb() ? '' : 'h-[18px] w-[18px]'
      }`}
    />
  );
};

export const togglePlayPauseFn = async () => {
  const ele = document.getElementsByTagName('video');
  [...ele].forEach((e) => {
    // if (window.tayaPlayer.type === 'FlvPlayer') {
    //   // flv player
    //   if (e?.paused) {
    //     window.tayaPlayer.unload?.();
    //     window.tayaPlayer.load();
    //     window.tayaPlayer?.play();
    //   } else {
    //     window.tayaPlayer.unload?.();
    //     window.tayaPlayer.pause();
    //   }
    // } else {
    // vjs player
    if (window.tayaPlayer.paused?.()) {
      window.tayaPlayer.liveTracker.seekToLiveEdge();
      window.tayaPlayer?.play().then((e) => {});
    } else {
      window.tayaPlayer.pause();
    }
    // }
  });
};
