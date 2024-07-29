import React, { useEffect, useRef, useState } from 'react';
import { PrivateMsgRow } from './privateMsgRow';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorType, PrivateMsgType } from '@/util/liveChatConst';
import { CustomCard } from './customCard';
import { addNewLiveChatMsg, clearAllLiveMessage } from '@/store/livechat';
import useGetConfig from '@/hook/user/useGetConfig';
import useUser from '@/hook/user/useUser';
import { RecommendBetCard } from './recommendBetCard';
import { FlytoBetSlip } from '../marketType/FlytoBetSlip';
import AudioPlayer from '../audioPlayer';

export const MsgContainer = () => {
  const { privateRoom, liveChatList } = useSelector((s) => s.livechat);

  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { config } = useGetConfig();
  const { isLogin } = useUser();
  const [showFlyAnimation, setShowFlyAnimation] = useState(false);
  const ref = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const isReachBottom = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;

      scrollContainer.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    goToBottom();
  }, [privateRoom]);

  useEffect(() => {
    if (isReachBottom.current) {
      goToBottom();
    } else {
      // setShowNewMsg(true);
    }
  }, [scrollHeight]);

  const checkOnScroll = () => {
    const bottom =
      parseFloat(scrollRef.current.scrollHeight) -
        parseFloat(scrollRef.current.clientHeight) <=
      parseFloat(scrollRef.current.scrollTop) + 50;

    if (bottom) {
      isReachBottom.current = true;
    } else {
      isReachBottom.current = false;
    }
  };
  useEffect(() => {
    if (scrollRef.current) setScrollHeight(scrollRef.current.scrollHeight);
    !privateRoom && setIsPlaying(true);
  }, [liveChatList]);

  //init welcome msg
  useEffect(() => {
    if (config?.private_chat) {
      const msg = isLogin
        ? config?.private_chat?.login_welcome
        : config?.private_chat?.non_login_welcome;

      dispatch(clearAllLiveMessage());

      dispatch(
        addNewLiveChatMsg({
          data: msg,
          timestamp: new Date(),
          authorType: AuthorType.Agent,
          type: PrivateMsgType.Text,
        })
      );
    }
  }, [config, isLogin]);

  return (
    <div
      className='flex flex-col gap-2 px-3 mt-3 flex-[1_0_0] overflow-y-auto mb-2'
      ref={scrollRef}
      onScroll={checkOnScroll}
    >
      {liveChatList?.map((livechat, index) => {
        switch (livechat?.type) {
          case PrivateMsgType.Text:
            return (
              <PrivateMsgRow
                key={`${index}${livechat?.timestamp}`}
                chatInfo={livechat}
              />
            );
          case PrivateMsgType.BetRecommendation:
            return (
              <div
                className='w-4/5'
                key={`${index}${livechat?.timestamp}`}
                ref={ref}
              >
                <RecommendBetCard
                  chatInfo={livechat}
                  setShowFlyAnimation={setShowFlyAnimation}
                />
              </div>
            );
          case PrivateMsgType.Deposit:
          case PrivateMsgType.Promotion:
          case PrivateMsgType.Register:
          case PrivateMsgType.Image:
          case PrivateMsgType.Video:
            return (
              <CustomCard
                chatInfo={livechat}
                key={`${index}${livechat?.timestamp}`}
              />
            );
          default:
            return null;
        }
      })}

      {showFlyAnimation && (
        <FlytoBetSlip
          onEnd={() => {
            setShowFlyAnimation(false);
          }}
          from={ref.current}
        />
      )}

      <AudioPlayer
        src={'/audio/newMsg.mp3'}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
    </div>
  );
};

const eg = {
  type: 1,
  recommended_details: {
    match_id: 950235,
    mg_id: 5433803,
    ty: 5,
    op_od: 1.47,
    op_nm: 'u 248.5',
    nm: 'Utah Jazz vs. Boston Celtics',
    op_na: 'Under',
    mg_nm: 'Over/under',
    sid: 3,
    ms: 5,
    lg_na: 'NBA',
    bt: 1710291600000,
  },
};
