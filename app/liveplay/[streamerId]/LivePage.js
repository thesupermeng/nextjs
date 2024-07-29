'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { togglePlayPauseFn } from '@/components/videoPlayer/controlElements/PlayPause';
import BetCoinIcon from '@/components/betSlipBesidePlayer/BetCoinIcon';
import LoadingSpinner from '@/components/videoPlayer/loading';
import VideoPlayerWrapper from '@/components/videoPlayer/VideoPlayerWrapper';
import { VideoPlayerBottomH5Home } from '@/componentsH5/videoPlayer/VideoPlayerBottomH5Home';
import RightSideMenu, {
  RightSidebarContantTypes,
} from '@/components/rightSideMenu';
import { PlayBlackBg } from '@/asset/icons';
import { togglePlayPause } from '@/store/videoPlayer';

import PlayerTopBar from './PlayerTopBar';
import { showRightBarContent } from '@/store/common';
import { WebRecommendationSlider } from '@/components/hostRecommendation/webRecommendationSlider';
import { AudioBlock } from '@/components/audioBlock/AudioBlock';

export const LivePage = ({ streamer }) => {
  const dispatch = useDispatch();
  const { isPause } = useSelector((e) => e.videoPlayer);
  useEffect(() => {
    dispatch(showRightBarContent(RightSidebarContantTypes.BetSlipBesidePlayer));
  }, []);
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-row text-white bg-black z-10'>
      <div className='relative flex flex-1 group'>
        <VideoPlayerWrapper src={streamer?.live?.src}>
          {!isPause && (
            <Image
              alt='PlayBlackBg'
              src={PlayBlackBg}
              className={`absolute cursor-pointer z-10`}
              onClick={(e) => {
                e.preventDefault();
                togglePlayPauseFn();
                dispatch(togglePlayPause(isPause));
              }}
            />
          )}

          {/* below are all pos absolute */}
          <LoadingSpinner />

          <div className='hidden group-hover:flex z-40'>
            <BetCoinIcon />
            <PlayerTopBar />
            <VideoPlayerBottomH5Home stream={streamer?.live} hasControl />
          </div>
        </VideoPlayerWrapper>

        <div className='absolute bottom-[80px] right-10'>
          <AudioBlock />
        </div>
        <WebRecommendationSlider />
      </div>

      <RightSideMenu />
    </div>
  );
};
