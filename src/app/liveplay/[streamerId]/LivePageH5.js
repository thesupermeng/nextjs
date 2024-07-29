'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
  Field2D,
  Field2DGray,
  TeamIconIrrPlaceholder,
  VideoOff,
  VideoOn,
} from '@/asset/icons';
import { PlayBlackBg } from '@/asset/icons';
import { togglePlayPauseFn } from '@/components/videoPlayer/controlElements/PlayPause';
import AllBetTypes from '@/components/allBetTypes';
import Chatroom from '@/components/chatroom';
import { MatchInfo } from '@/components/matchInfo';
import StatPage from '@/components/namiMatchDetails';
import { VideoPlayerTop } from '@/componentsH5/videoPlayer/VideoPlayerTop';
import VideoPlayerWrapper from '@/components/videoPlayer/VideoPlayerWrapper';
import { VideoPlayerBottomH5Home } from '@/componentsH5/videoPlayer/VideoPlayerBottomH5Home';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { BasketballScore } from '@/componentsH5/basketballScore';
import TeamStatsSoccer from '@/componentsH5/teamStats';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { useLiveFullScreenStatus } from '@/hook/useFullScreenStatus';
import { useTapDebounce } from '@/hook/useTapDebounce';
import { togglePlayPause } from '@/store/videoPlayer';
import { LiveFooterH5, LiveFooterType } from './LiveFooterH5';
import { useNamiMatchDetail } from '@/hook/nami/useNamiMatchDetail';
import { useGenericLogs } from '@/hook/useGenericLogs';
import { ImageWithFallback } from '@/components/fallbackImage';
import { useScrollDetect } from '@/hook/useScrollDetect';
import { FB_MATCH_SPORTS_TYPE } from '@/config/FB/FBConfig';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { useScrollDirection } from '@/hook/useScrollDirection';
import { AnimationWrapperIndex } from '@/componentsH5/animationWrapper';
import { HostRecommendation } from '@/components/hostRecommendation/h5RecommendationSlider';
import { AudioBlock } from '@/components/audioBlock/AudioBlock';
import { LiveOrderHistoryTab } from '@/app/liveplay/[streamerId]/LiveOrderHistoryTab';
import { StreamGames } from '@/components/StreamGames';

export const LivePageH5 = ({ streamer }) => {
  const [showPlayer, setShowPlayer] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [focusTab, setFocusTab] = useState('');
  const { focusStream } = useFocusStream();
  const matchId = useSelector((s) => s.common.matchId);
  const { matchDetail } = useMatchDetail(matchId);
  const namiId = streamer?.live?.match?.nami_id;
  const namiMatchDetail = useNamiMatchDetail({ id: namiId }).matchDetail.data;
  const [isTapPlayer, onTapPlayer] = useTapDebounce();
  const isLiveFullScreen = useLiveFullScreenStatus();
  const dispatch = useDispatch();
  const { isPause } = useSelector((e) => e.videoPlayer);
  const isSoccerOrBasketBall = FB_MATCH_SPORTS_TYPE.includes(matchDetail.sid);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  useGenericLogs();
  const scrollPos = useScrollDetect(
    (focusTab === LiveFooterType.Bet || focusTab === LiveFooterType.Stats) &&
      '.detect-scroll',
    focusTab
  );
  const { scrollDirection, isAtTop } = useScrollDirection();
  useEffect(() => {
    if (!scrollPos?.clientHeight) {
      return;
    }
    setIsMiniPlayer((isMini) => {
      const {
        scrollTop: top,
        clientHeight: client,
        scrollheight: scroll,
      } = scrollPos;
      if (top < 5) {
        return false;
      } else {
        return true;
      }
    });
  }, [scrollPos?.scrollTop]);

  useEffect(() => {
    if (scrollDirection === 'down' && document.body.clientHeight > 1000) {
      setIsMiniPlayer(true);
    } else if (isAtTop) {
      setIsMiniPlayer(false);
    }
  }, [scrollDirection, isAtTop]);

  useEffect(() => {
    setIsMiniPlayer(false);
  }, [focusTab]);

  useEffect(() => {
    if (streamer?.live?.match_id) {
      setFocusTab(LiveFooterType.Bet);
    } else {
      setFocusTab(LiveFooterType.Chat);
    }
  }, [streamer?.live?.match_id]);

  return (
    <FullPageContent full={focusTab === LiveFooterType.Chat}>
      <NavHeader
        fixedPosition
        right={
          <div className='flex gap-2'>
            {/* {matchId ? ( */}
            <Image
              alt='video'
              src={showPlayer ? VideoOn : VideoOff}
              onClick={() => {
                setShowPlayer(!showPlayer);
                if (showAnimation) setShowAnimation(false);
              }}
            />
            {/* ) : null} */}

            {(matchDetail?.as?.[0] || namiMatchDetail?.mlive_2d_url) && (
              <Image
                alt='2D'
                src={showAnimation ? Field2D : Field2DGray}
                onClick={() => {
                  setShowAnimation(!showAnimation);
                  if (showPlayer) setShowPlayer(false);
                }}
              />
            )}
          </div>
        }
        betslip
        label={isSoccerOrBasketBall ? <HeaderScore data={matchDetail} /> : ''}
      />

      {/* <StreamerInfo /> */}

      {showPlayer ? (
        <FullPageContent
          full={isMiniPlayer}
          className='bg-transparent pointer-events-none z-20'
        >
          <div
            className={`pointer-events-auto ${
              isMiniPlayer
                ? 'relative h-0 items-start justify-start'
                : 'aspect-[16/9] items-center justify-center object-contain mb-1 mt-[4.3rem]'
            } relative flex flex-initial `}
          >
            <VideoPlayerWrapper
              isMini={isMiniPlayer}
              onClick={onTapPlayer}
              src={streamer?.live?.src}
              id={`h5liveVideo${streamer?.id}`}
            >
              {!isPause && (
                <Image
                  alt='PlayBlackBg'
                  src={PlayBlackBg}
                  className={`absolute cursor-pointer z-10 scale-[0.7]`}
                  onClick={(e) => {
                    e.preventDefault();
                    togglePlayPauseFn();
                    dispatch(togglePlayPause(isPause));
                  }}
                />
              )}

              {isTapPlayer && !isMiniPlayer && (
                <>
                  <VideoPlayerTop />
                  <VideoPlayerBottomH5Home stream={streamer?.live} hasControl />
                </>
              )}

              {isLiveFullScreen && (
                <>
                  {focusStream?.category_id === 1 ? (
                    <TeamStatsSoccer />
                  ) : (
                    <BasketballScore />
                  )}
                </>
              )}
            </VideoPlayerWrapper>
          </div>
        </FullPageContent>
      ) : null}

      {showAnimation ? <AnimationWrapperIndex isMini={isMiniPlayer} /> : null}

      <div
        style={{
          marginTop:
            !showAnimation && !showPlayer ? (matchId ? `5rem` : `3rem`) : 0,
        }}
      >
        {matchId && !showAnimation && !showPlayer && <MatchInfo />}
      </div>

      {focusTab ? (
        <>
          {focusTab === LiveFooterType.Games ? (
            <StreamGames isMini={isMiniPlayer} />
          ) : null}

          {focusTab === LiveFooterType.Bet ? (
            <>
              <HostRecommendation />
              <AllBetTypes isLiveRoom isMini={isMiniPlayer} />
            </>
          ) : null}
          {focusTab === LiveFooterType.Chat ? <Chatroom /> : null}
          {focusTab === LiveFooterType.OrderHistory ? (
            <LiveOrderHistoryTab isMini={isMiniPlayer} />
          ) : null}
          {focusTab === LiveFooterType.Stats ? (
            <StatPage isMini={isMiniPlayer} />
          ) : null}
          <div className='h-12'></div>
        </>
      ) : (
        <>
          {streamer?.live?.match_id ? (
            <AllBetTypes isLiveRoom isMini={isMiniPlayer} />
          ) : (
            <Chatroom />
          )}
        </>
      )}

      <LiveFooterH5 focusTab={focusTab} setFocusTab={setFocusTab} />
      <div className='fixed bottom-[80px] left-6 right-6'>
        <AudioBlock />
      </div>
    </FullPageContent>
  );
};

const HeaderScore = ({ data }) => {
  const homeTeamIcon = data?.ts?.[0]?.lurl;
  const homeTeamScore = data?.nsg?.filter(({ tyg }) => tyg === 5)?.[0]?.sc?.[0];
  const awayTeamIcon = data?.ts?.[1]?.lurl;
  const awayTeamScore = data?.nsg?.filter(({ tyg }) => tyg === 5)?.[0]?.sc?.[1];

  return (
    <div className='flex flex-1 justify-center items-center font-normal text-sm gap-1'>
      <ImageWithFallback
        alt='teamIcon'
        src={homeTeamIcon || TeamIconIrrPlaceholder}
        width={20}
        height={20}
        className='w-[20px] h-auto max-h-[20px]'
      />
      <div>{homeTeamScore ? homeTeamScore : 0}</div>
      <div> - </div>
      <div>{awayTeamScore ? awayTeamScore : 0}</div>
      <ImageWithFallback
        alt='teamIcon'
        src={awayTeamIcon || TeamIconIrrPlaceholder}
        width={20}
        height={20}
        className='w-[20px] h-auto max-h-[20px]'
      />
    </div>
  );
};
