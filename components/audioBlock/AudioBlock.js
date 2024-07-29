import { AudioGif } from '@/asset/gif';
import { Avatar, IconChevron, Play, PlayBlackBg } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NewsTicker } from '../newsTicker/NewsTicker';
import { AudioComponent } from './Audio';
import { useDispatch, useSelector } from 'react-redux';
import { isWeb } from '@/util/common';
import {
  setAudioEnd,
  setIsAudioAnnPlaying,
  setTopAnnContent,
} from '@/store/videoPlayerMisc';
import { useMessageClick } from '@/app/liveplay/[streamerId]/useMessageClick';

export const AudioBlock = ({ onClick = () => {}, onEnded = () => {} }) => {
  useEffect(() => {
    dispatch(setIsAudioAnnPlaying(false));
  }, []);
  const audioRedux = useSelector((s) => s.videoPlayerMisc.audio);
  const { onClickMessage } = useMessageClick();
  const audioData = audioRedux?.data || {};
  const dispatch = useDispatch();
  const [isAudioEnd, setIsAudioEnd] = useState(false);
  const onAudioEnd = () => {
    setIsAudioEnd(true);
    dispatch(setIsAudioAnnPlaying(false));
    setTimeout(() => {
      dispatch(setAudioEnd());
      dispatch(setTopAnnContent({}));
    }, 500);
  };
  const isAudioAnnPlaying = useSelector(
    (s) => s.videoPlayerMisc.isAudioAnnPlaying
  );

  const onDivClick = (data) => {
    onClickMessage(data);
    onClick?.();
  };
  if (!audioData?.mp3) {
    return null;
  }
  return (
    <>
      <div
        onClick={() => onDivClick(audioRedux)}
        className={`bg-[#0C75CA] py-3.5 px-4 flex flex-1 flex-row gap-2.5 rounded-[10px] shadow-[0_4px_4px_0-rgba(0,0,0,0.25)] items-center cursor-pointer ${
          isAudioEnd
            ? 'animate-[audioBlockOut_0.5s_ease-in-out]'
            : 'animate-[audioBlockIn_0.5s_ease-in-out]'
        } `}
      >
        <div className='relative w-[50px] h-[50px] rounded-full overflow-hidden'>
          {audioRedux?.image ? ( //xl: not handling if there is no image to fill the empty space, as confirm with mq, audio ann will always be accompanied by an avatar image
            <Image alt='avatar' src={audioRedux?.image} fill />
          ) : null}
          {/* this will only show if auto play disabled(safari) */}
          {!isAudioAnnPlaying && (
            <Image
              src={PlayBlackBg}
              alt='play button'
              className='opacity-90'
              fill
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById('audioAnnouncementBlock').play();
              }}
            />
          )}
        </div>
        <div
          className={`flex flex-col gap-[2px] items-start justify-around overflow-hidden ${
            isWeb() ? 'max-w-[200px]' : 'flex-1'
          }`}
        >
          <NewsTicker>
            <div className='text-white text-base font-bold'>
              {audioData?.title}
            </div>
          </NewsTicker>
          <div className='flex flex-row items-center justify-start gap-2'>
            {/* this will be hidden if auto play is diabled. */}
            {isAudioAnnPlaying && (
              <Image alt='audio' src={AudioGif} width={20} height={20} />
            )}
            <div className='text-white text-13 font-normal'>
              {audioData?.desc}
            </div>
          </div>
        </div>
        <Image
          alt='go'
          src={IconChevron}
          className='flex-initial w-[10px] h-[18px] rotate-180'
        />
      </div>
      <AudioComponent src={audioData?.mp3} onEnded={onAudioEnd} loop={1} />
    </>
  );
};
