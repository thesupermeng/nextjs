import { toggleVideoLoading } from '@/store/videoPlayer';
import ReactHlsPlayer from '@ducanh2912/react-hls-player';

import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from './loading';

export const VideoPlayer = forwardRef(
  ({ link, paused = false, muted: propMuted }, ref) => {
    const dispatch = useDispatch();
    const [hlsSupported, setHlsSupported] = useState(null);
    const [isPlay, setIsPlay] = useState(true);
    const [loading, setIsLoading] = useState(null);
    const [muted, setMuted] = useState(true);

    const videoPlayerProp = useSelector((s) => s.videoPlayer);

    function supportsHLS() {
      var video = document.createElement('video');
      return Boolean(
        video.canPlayType('application/vnd.apple.mpegURL') ||
          video.canPlayType('audio/mpegurl')
      );
    }
    const updateLoading = (flag) => {
      setIsLoading(flag);
      dispatch(toggleVideoLoading(flag));
    };
    useEffect(() => {
      setHlsSupported(supportsHLS());
      // setInterval(() => {
      //   setFinishLoading(true);
      // }, 5000);
      return () => {
        // clearInterval()
      };
    }, []);

    useEffect(() => {
      setMuted(videoPlayerProp.muted);
    }, [videoPlayerProp.muted]);

    const playVideo = (e, action = true) => {
      e?.stopPropagation();
      if (action) {
        ref.current?.play?.();
      }
      setIsPlay(true);
    };
    const pauseVideo = (e, action = true) => {
      e?.stopPropagation();
      if (action) {
        ref.current.pause();
      }
      setIsPlay(false);
    };

    const handleStalled = () => {
      const videoElement = ref.current;

      if (
        videoElement &&
        videoElement.readyState < videoElement.HAVE_ENOUGH_DATA
      ) {
        videoElement.load(); // Reload the video
      }
    };
    const handleTogglePiP = async () => {};
    console.log('hlsSupported', hlsSupported, link);
    const getCommonProp = () => {
      return {
        // width: '100%',
        // height: '100%',
        className: 'flex h-full m-auto',
        src: link,
        playsInline: true,
        autoPlay: true,
        controls: false,

        onPlay: (e) => {
          console.log('called play', e);
          playVideo(e, false);
        },
        onPause: (e) => {
          console.log('called pause', e);
          pauseVideo(e, false);
        },
        onLoadStart: () => {
          if (link) updateLoading(true);
        },
        onError: () => updateLoading(false),
        onLoadedMetadata: () => {
          updateLoading(false);
        },
        onStalled: handleStalled,
      };
    };
    console.log('videoPlayerProp.muted', videoPlayerProp.muted);
    return hlsSupported ? (
      <video ref={ref} {...getCommonProp()} muted={propMuted ?? muted}></video>
    ) : (
      <ReactHlsPlayer
        playerRef={ref}
        {...getCommonProp()}
        muted={propMuted ?? muted}
      />
    );
  }
);
