// import { toggleShowThumbnail } from '@/store/videoPlayer';
import React from 'react';

import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const VideoFlvPlayer = forwardRef(
  ({ link, isActive, muted: propMuted, id }, ref) => {
    const videoPlayerProp = useSelector((s) => s.videoPlayer);
    const isFlvSupported = useSelector((s) => s.common.isFlvSupported);
    const videoRef = React.useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
      // dispatch(toggleShowThumbnail(true));
      let flvPlayer = null;
      if (link && isFlvSupported && isActive) {
        ref.current = flvPlayer = window.flvjs.createPlayer(
          { url: link, type: 'flv', isLive: true },
          {
            lazyLoad: true,
            lazyLoadMaxDuration: 10 * 60,
            muted: false,
            cors: true,
          }
        );
        flvPlayer.on(window.flvjs.Events.ERROR, (e) => {
          console.error('flv err', e);
        });
        // flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
        //   // 参数 err 是一级异常，errdet 是二级异常
        //   if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
        //     console.log('媒体错误')
        //     if(errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
        //       console.log('媒体格式不支持')
        //     }
        //   }
        //   if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
        //     console.log('网络错误')
        //     if(errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
        //       console.log('http状态码异常')
        //     }
        //   }
        //   if(err == flvjs.ErrorTypes.OTHER_ERROR) {
        //     console.log('其他异常：', errdet)
        //   }
        // }

        const handleLoadedMetadata = () => {
          // dispatch(toggleShowThumbnail(false));
        };

        const videoElement = document.getElementById(id)
          ? document.getElementById(id).getElementsByTagName('video')[0]
          : videoRef.current;

        videoElement?.addEventListener('loadedmetadata', handleLoadedMetadata);

        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.unload();
        flvPlayer.load();
        flvPlayer.play();

        window.tayaPlayer = flvPlayer;
      } else {
      }
      return () => {
        if (ref.current) {
          const flvPlayer = ref.current;
          flvPlayer.unload();
          flvPlayer.detachMediaElement();
          // flvPlayer?.destroy?.();
        }
      };
    }, [link, isActive, isFlvSupported, videoRef.current]);
    return (
      <video
        onClick={() => {
          try {
            window.tayaPlayer?.play();
          } catch (e) {}
        }}
        controls={false}
        className='object-contain min-h-full'
        ref={videoRef}
        muted={isActive ? videoPlayerProp.muted || propMuted : true}
      />
    );
  }
);

// setInterval(function () {
//   console.log("时延校正判断");
//   if (!flvPlayer.buffered.length) {
//       return;
//   }
//   var end = flvPlayer.buffered.end(0);
//   var diff = end - flvPlayer.currentTime;
//   console.log(diff);
//   if (diff >= 4) {
//       console.log("进行时延校正");
//       flvPlayer.currentTime = end - 0.1;
//       //alert("时延过长，请点击时延校准");
//   }
// }, 3000)
