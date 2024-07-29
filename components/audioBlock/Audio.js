import { setIsAudioAnnPlaying } from '@/store/videoPlayerMisc';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export const AudioComponent = ({ src, onEnded, loop = -1 }) => {
  const ref = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (!playCount) {
    //   return;
    // }
    // console.log('playCount !== loop', playCount, loop, ref.current);
    if (playCount !== loop) {
      playAudio();
    } else {
      onEnded?.();
    }
  }, [ref.current, playCount]);
  const onAudioEnd = (e) => {
    // console.log('audio', e);
    setPlayCount((a) => a + 1);
  };

  const onPlay = () => {
    dispatch(setIsAudioAnnPlaying(true));
  };
  const playAudio = () => {
    ref.current?.play().catch((e) => {
      console.warn(e); //this error need to trigger a flag to toggle auto play
      // dispatch(setIsAudioAnnPlaying(false));
    });
  };
  return (
    <audio
      id='audioAnnouncementBlock'
      ref={ref}
      src={src}
      onPlay={onPlay}
      onEnded={onAudioEnd}
    ></audio>
  );
};
