import { AnimationWrapper } from '@/components/animationWrapper';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { useNamiMatchDetail } from '@/hook/nami/useNamiMatchDetail';
import { useStreamer } from '@/hook/user/useStreamer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDraggable from 'use-draggable-hook';
import { FullPageContent } from '../FullPageContent';

const MiniPlayerWidth = 305;
const MiniPlayerHeight = 190;
export const AnimationWrapperIndex = ({ isMini = false }) => {
  const { streamer } = useStreamer();
  const matchId = useSelector((s) => s.common.matchId);
  const { matchDetail } = useMatchDetail(matchId);
  const namiId = streamer?.live?.match?.nami_id;
  const namiMatchDetail = useNamiMatchDetail({ id: namiId }).matchDetail.data;
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    setScreenWidth(document.documentElement.clientWidth);
    setScreenHeight(document.documentElement.clientHeight);
  }, []);

  const { target: playerContainerRef, setPosition } = useDraggable({
    stepSize: 10,
    maxDistance: {
      x: {
        max: screenWidth - MiniPlayerWidth,
        min: 0,
      },
      y: { max: screenHeight - MiniPlayerHeight, min: 50 },
    },
    setCSS: isMini,
  });
  useEffect(() => {
    try {
      if (!isMini) {
        playerContainerRef.current.style.transform = '';
      } else {
        setPosition([0, 60]);
      }
    } catch (e) {}
  }, [isMini, setPosition]);
  return (
    <FullPageContent
      full={isMini}
      className='bg-transparent pointer-events-none z-20'
    >
      <div
        style={
          isMini ? { width: MiniPlayerWidth, height: MiniPlayerHeight } : {}
        }
        ref={playerContainerRef}
        className={`pointer-events-auto aspect-[16/9] 
        ${isMini ? 'bg-black rounded-xl overflow-hidden' : ' mt-32'}
           `}
      >
        <AnimationWrapper
          isMini={isMini}
          url={
            matchDetail?.as?.[0]
              ? matchDetail?.as
              : [namiMatchDetail?.mlive_2d_url]
          }
        ></AnimationWrapper>
      </div>
    </FullPageContent>
  );
};
