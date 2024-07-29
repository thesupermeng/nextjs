'use client';
import AllBetTypes from '@/components/allBetTypes';
import Chatroom from '@/components/chatroom';
import { LoadingPage } from '@/components/loading';
import { StreamerIconRound } from '@/components/streamer/StreamerIconRound';
import VideoPlayerWrapper from '@/components/videoPlayer/VideoPlayerWrapper';
import LabelHeader from '@/componentsH5/headerH5/LabelHeader';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { VideoPlayerBottomH5Home } from '@/componentsH5/videoPlayer/VideoPlayerBottomH5Home';
import {
  getLivePath,
  VideoPlayerCenter,
} from '@/componentsH5/videoPlayer/VideoPlayerCenter';
import { VideoPlayerTop } from '@/componentsH5/videoPlayer/VideoPlayerTop';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';
import { useTapDebounce } from '@/hook/useTapDebounce';
import { useFocusStream } from '@/hook/user/useFocusStream';
import useGetCategories from '@/hook/user/useGetCategories';
import { useStreams } from '@/hook/user/useStreams';
import { setFocusStreamId } from '@/store/streams';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { register } from 'swiper/element/bundle';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

register();

const MAX_DISPLAY_VIDEO_COUNT = 10;
export const H5Page = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const streamerIconsRef = useRef();
  const { streams, isLoading } = useStreams();
  const { focusStream, focusStreamIndex } = useFocusStream({ autoFocus: true });
  const [isFirst, setIsFirst] = useState(focusStreamIndex);
  const [isTapPlayer, onTapPlayer] = useTapDebounce();
  const { categoryIcons } = useGetCategories();
  const { data: currentMatchData } = useCurrentMatchDetail();
  const { t } = useTranslation();
  const { checkOffset } = useOffsetPosition();

  useEffect(() => {
    if (isFirst && focusStreamIndex && swiperRef.current) {
      swiperRef.current?.swiper.slideTo(focusStreamIndex, 200);
      streamerIconsRef.current?.children[focusStreamIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
      setIsFirst(false);
    }
  }, [isFirst, focusStreamIndex, swiperRef.current]);

  useEffect(() => {
    swiperRef.current?.removeEventListner?.('slidechange');
    swiperRef.current?.addEventListener?.('slidechange', (e) => {
      const newIdx = swiperRef.current?.swiper.activeIndex;
      dispatch(setFocusStreamId(streams[newIdx]?.streamer_id));
    });
  }, [streams, swiperRef.current]);

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(focusStreamIndex, 200);
    streamerIconsRef.current?.children[focusStreamIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [streamerIconsRef.current, focusStreamIndex]);

  // check if focusStreamId in redux state is in the list of current live streamers
  // if not in the list, set focusStreamId to the id of the first streamer in list
  // useEffect(() => {
  //   const currentStreamIds = streams.map((s) => s.streamer_id);
  //   if (!currentStreamIds.includes(focusStream) && currentStreamIds.length) {
  //     dispatch(setFocusStreamId(currentStreamIds[0]));
  //   }
  // }, [streams]);

  const router = useRouter();
  const gotoLiveRoom = (id) => {
    router.push(getLivePath(id));
  };

  if (isLoading) {
    return <LoadingPage full />;
  }

  return (
    <FullPageContent>
      <LabelHeader label={t('discover')} />
      <div
        className={`flex flex-col flex-1 z-10`}
        style={{ marginTop: `${checkOffset(6)}rem` }}
      >
        <div className={`flex flex-initial overflow-x-hidden`}>
          <div
            ref={streamerIconsRef}
            className='flex flex-1 flex-row gap-4 items-center overflow-x-auto w-full px-5'
          >
            {streams.slice(0, MAX_DISPLAY_VIDEO_COUNT).map((stream, idx) => {
              return (
                <StreamerIconRound
                  liveIcon={categoryIcons?.[stream.category_id]}
                  key={stream.streamer_id}
                  img={stream.streamer?.avatar}
                  isFocus={stream.streamer_id === focusStream?.streamer_id}
                  onClick={() => {
                    dispatch(setFocusStreamId(stream.streamer_id));
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className={`flex-1 bg-[#121212]`}>
          <swiper-container
            ref={swiperRef}
            style={{ height: '100%' }}
            // virtual='true'
            // add-slides-before={1}
            // add-slides-after={1}
            slides-per-view='1'
          >
            {streams.slice(0, MAX_DISPLAY_VIDEO_COUNT).map((stream, idx) => {
              return (
                <swiper-slide key={stream?.streamer_id || stream?.src || idx}>
                  <div className='h-full flex flex-1 flex-col justify-center'>
                    <div className='flex flex-initial items-center justify-center aspect-[16/9] w-full overflow-hidden'>
                      {stream.streamer_id === focusStream?.streamer_id ? (
                        <VideoPlayerWrapper
                          onClick={onTapPlayer}
                          streamData={stream}
                          src={stream?.src}
                          id={`h5homeVideo${stream.streamer_id}`}
                        >
                          {isTapPlayer && (
                            <>
                              <VideoPlayerTop />
                              <VideoPlayerCenter id={stream?.streamer_id} />
                              <VideoPlayerBottomH5Home stream={stream} />
                            </>
                          )}
                        </VideoPlayerWrapper>
                      ) : null}
                    </div>

                    {stream?.match ? (
                      currentMatchData?.id ? (
                        currentMatchData?.ms !== 0 ? (
                          <div className='flex flex-1 relative'>
                            <AllBetTypes />
                          </div>
                        ) : (
                          <Chatroom
                            onClick={() => gotoLiveRoom(stream?.streamer_id)}
                          />
                        )
                      ) : (
                        <LoadingPage />
                      )
                    ) : (
                      <Chatroom
                        onClick={() => gotoLiveRoom(stream?.streamer_id)}
                      />
                    )}
                  </div>
                </swiper-slide>
              );
            })}
          </swiper-container>
        </div>
      </div>
      <NavFooter />
    </FullPageContent>
  );
};
