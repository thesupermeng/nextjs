import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleError, toggleMute, toggleTempMute } from '@/store/videoPlayer';

export const VideoJSPlayer = forwardRef(({ link, isActive, id }, ref) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const muted = useSelector((s) => s.videoPlayer.muted);
  const isError = useSelector((s) => s.videoPlayer.isError);
  const audioRedux = useSelector((s) => s.videoPlayerMisc.audio);
  const dispatch = useDispatch();
  const disposeCurrent = () => {
    const player = playerRef.current;
    dispatch(toggleError(false));
    if (player && !player.isDisposed()) {
      player.dispose();
      playerRef.current = null;
    }
  };

  useEffect(() => {
    dispatch(toggleTempMute(muted));
    return () => {
      disposeCurrent();
    };
  }, []);

  useEffect(() => {
    const hasAudioMsg = audioRedux?.data?.mp3;
    try {
      const ele = document.getElementsByTagName('video');
      [...ele].forEach((e) => {
        e.muted = hasAudioMsg ? true : false;
        dispatch(toggleMute(Boolean(e.muted)));
      });
    } catch {
      (e) => {
        console.log('Log:e', e);
      };
    }
  }, [audioRedux?.data?.mp3]);
  useEffect(() => {
    dispatch(toggleTempMute(muted));
  }, [muted]);
  useEffect(() => {
    const playVideo = () => {
      try {
        if (isActive && link) {
          videojs.getAllPlayers().forEach((player) => player.dispose());
          const videoElement = document.createElement('video-js');
          (document.getElementById(id) || videoRef.current)?.appendChild(
            videoElement
          );
          const thisPlayer =
            (playerRef.current =
            window.tayaPlayer =
              videojs(videoElement, {
                autoplay: 'any',
                playsinline: true,
                controls: false,
                responsive: true,
                live: true,
                fill: true,
                preload: 'auto',
                muted: true,
              }));
          thisPlayer.src({ src: link });
          thisPlayer.play?.();
          thisPlayer.on('error', () => {
            dispatch(toggleError(true));
          });
          thisPlayer.on('play', () => {
            const muted = thisPlayer.muted();
            dispatch(toggleTempMute(muted));
          });
        } else {
          disposeCurrent();
        }
      } catch (e) {
        console.error('videojs error', e);
        return playVideo();
      }
    };
    playVideo();
  }, [isActive, link]);
  useEffect(() => {
    playerRef.current?.muted && playerRef.current?.muted?.(muted);
  }, [muted]);

  return (
    <div
      data-vjs-player
      className='w-full h-full items-center justify-center pointer-events-none'
    >
      <div id={id} ref={videoRef} className='w-full h-full' />
    </div>
  );
});
