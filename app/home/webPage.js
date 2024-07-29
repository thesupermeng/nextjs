'use client';
import { IconArrowWhite } from '@/asset/icons';
import AllBetTypes from '@/components/allBetTypes';
import Chatroom from '@/components/chatroom';
import Footer from '@/components/Footer';
import { MatchInfo } from '@/components/matchInfo';
import { StreamerInfo } from '@/components/streamer/StreamerInfo';
import StreamerRow from '@/components/streamer/StreamerRow';
import LoadingSpinner from '@/components/videoPlayer/loading';
import VideoPlayerHomeWebControls from '@/components/videoPlayer/VideoPlayerHomeWebControls';
// import VideoPlayerTeamLabel from '@/components/videoPlayer/VideoPlayerTeamLabel';
import VideoPlayerWrapper from '@/components/videoPlayer/VideoPlayerWrapper';
import { getLivePath } from '@/componentsH5/videoPlayer/VideoPlayerCenter';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';
import { useKeyboardEvent } from '@/hook/useKeyboardEvent';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { useStreams } from '@/hook/user/useStreams';
import { hideRightBarContent } from '@/store/common';
import { setFocusStreamId } from '@/store/streams';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RightBetCartWidth } from '../page';
import { ImageWithFallback } from '@/components/fallbackImage';
import { LoadingPage } from '@/components/loading';

export const WebPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showRightSidebar } = useSelector((s) => s.common);
  const { focusStreamId } = useSelector((s) => s.streams);
  const [moveAni, setMoveAni] = useState('');
  const { streams } = useStreams();
  const { data: currentMatchData } = useCurrentMatchDetail();
  const { focusStream, focusStreamIndex } = useFocusStream({ autoFocus: true });

  useEffect(() => {
    dispatch(hideRightBarContent('All'));
    return () => dispatch(hideRightBarContent('All'));
  }, []);

  // when focus streamer ends live stream, toggle focus streamer to first streamer in list
  useEffect(() => {
    const currentStreamIds = streams.map((s) => s.streamer_id);
    if (!currentStreamIds.includes(focusStreamId) && currentStreamIds.length) {
      dispatch(setFocusStreamId(currentStreamIds[0]));
    }
  }, [streams]);

  const updateStreamId = useCallback(
    (delta) => {
      const newId = streams?.[focusStreamIndex + delta]?.streamer_id;
      if (!newId) {
        // newId does not exist
        return;
      }
      if (delta < 0) {
        setMoveAni('common-transition -translate-x-full');
      } else {
        setMoveAni('common-transition translate-x-full');
      }
      setTimeout(() => {
        setMoveAni('');
        newId && dispatch(setFocusStreamId(newId));
      }, 300);
    },
    [streams, focusStreamIndex, focusStream]
  );
  const keyboardHandler = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowRight':
          updateStreamId(1);
          break;
        case 'ArrowLeft':
          updateStreamId(-1);
          break;
      }
    },
    [streams, focusStreamIndex, focusStream]
  );
  useKeyboardEvent(keyboardHandler);
  const clickToLivePage = useCallback(() => {
    router.push(getLivePath(focusStream?.streamer_id));
  }, [focusStream]);

  return (
    <div className='flex flex-1 min-h-0 flex-row items-stretch'>
      <div className='flex flex-1'>
        <div className='flex flex-col flex-[1_0_0] overflow-y-auto'>
          <StreamerRow streams={streams} />
          <div className='flex flex-row items-center'>
            <NavArrow
              onClick={() => updateStreamId(-1)}
              tw='rotate-90'
              isShow={focusStreamIndex === 0}
            />
            <div className={`flex flex-1 relative overflow-hidden`}>
              <div
                className={`flex items-center justify-center w-full aspect-[16/9] ${moveAni}`}
              >
                <VideoPlayerWrapper
                  streamData={focusStream}
                  src={focusStream?.src}
                >
                  <LoadingSpinner />
                  {/* <VideoPlayerTeamLabel /> */}
                  <VideoPlayerHomeWebControls
                    streamData={focusStream}
                    onClick={clickToLivePage}
                  />
                </VideoPlayerWrapper>
                <PrevNextImg
                  key='imgPrev'
                  isPrev={true}
                  src={streams[focusStreamIndex - 1]?.room_image_url}
                />
                <PrevNextImg
                  key='imgNext'
                  isPrev={false}
                  src={streams[focusStreamIndex + 1]?.room_image_url}
                />
              </div>
            </div>
            <NavArrow
              onClick={() => updateStreamId(1)}
              tw='-rotate-90'
              isShow={focusStreamIndex === streams?.length - 1}
            />
          </div>
          <StreamerInfo />
          <Footer />
        </div>
      </div>
      {!showRightSidebar && (
        <>
          {focusStream?.match ? (
            currentMatchData?.id ? (
              currentMatchData?.ms !== 0 ? (
                <div
                  className={`flex-col ${RightBetCartWidth} self-stretch flex flex-initial overflow-y-auto relative `}
                >
                  <MatchInfo />
                  <AllBetTypes />
                </div>
              ) : (
                <div
                  onClick={() => clickToLivePage()}
                  className={`${RightBetCartWidth} pt-2 self-stretch flex-col flex flex-initial overflow-y-auto relative `}
                >
                  <RenderChatroom />
                </div>
              )
            ) : (
              <div className={` ${RightBetCartWidth}`}>
                <LoadingPage />
              </div>
            )
          ) : (
            <div
              onClick={() => clickToLivePage()}
              className={`${RightBetCartWidth} pt-2 self-stretch flex-col flex flex-initial overflow-y-auto relative `}
            >
              <RenderChatroom />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const RenderChatroom = () => {
  const { t } = useTranslation();
  return (
    <>
      <MatchInfo />
      <p className='ml-5 font-bold text-[16px] pb-1'>{t('chatRoom')}</p>
      <Chatroom />
    </>
  );
};

const NavArrow = ({ tw, isShow, onClick }) => {
  return (
    <Image
      alt='arrow'
      src={IconArrowWhite}
      width={16}
      height={16}
      className={`${tw} z-10 mx-2 w-4 h-4 ${
        isShow ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={onClick}
    ></Image>
  );
};

const PrevNextImg = ({ isPrev, src }) => {
  return src ? (
    <ImageWithFallback
      alt={isPrev ? 'prev' : 'next'}
      width={1600}
      height={900}
      className={`absolute w-full h-full object-fill ${
        isPrev ? 'right-full' : 'left-full'
      }`}
      src={src}
    />
  ) : null;
};
