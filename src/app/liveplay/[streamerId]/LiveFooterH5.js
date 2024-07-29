import {
  CoinIconLive,
  CommentIcon,
  DocuWithMagGlassIcon,
  DicesIconWithBackground,
  StatsData,
} from '@/asset/icons';
import SendChat from '@/components/chatroom/sendChat';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import useUser from '@/hook/user/useUser';
import { useStreamer } from '@/hook/user/useStreamer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useScrollDirection } from '@/hook/useScrollDirection';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';

const IconSizeTw = 'flex-initial w-[43px] h-[43px]';

export const LiveFooterType = {
  Bet: 1,
  Chat: 2,
  Stats: 3,
  OrderHistory: 4,
  Games: 5,
};

export const LiveFooterH5 = ({ focusTab, setFocusTab }) => {
  const [focusInput, setFocusInput] = useState(false);
  const { isLogin } = useUser();
  const router = useRouter();
  const matchId = useSelector((s) => s.common.matchId);
  const { matchDetail, isLoading } = useMatchDetail(matchId);
  const { streamer } = useStreamer();
  const { gameList } = useStreamGameList();
  const namiId = streamer?.live?.match?.nami_id;
  const { chatList } = useSelector((s) => s.chatRoom);
  const { scrollDirection } = useScrollDirection();

  const [initialized, setInitialized] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  // newMessageCount displays the number of new messages displayed in the LiveFooterH5

  useEffect(() => {
    setInitialized(true);
  }, []);
  useEffect(() => {
    if (focusTab !== LiveFooterType.Chat && initialized) {
      setNewMessageCount((c) => c + 1);
    }
  }, [chatList]);
  useEffect(() => {
    if (
      !isLoading &&
      !(matchDetail?.ms !== 0 && matchDetail?.id) &&
      focusTab === LiveFooterType.Bet
    ) {
      setFocusTab(LiveFooterType.Chat);
    }
  }, [matchDetail, isLoading, focusTab]);

  return (
    <div
      className={`${
        scrollDirection === 'down' && focusTab !== LiveFooterType.Chat
          ? 'translate-y-full'
          : ''
      } common-transition  fixed bottom-0 w-full h-16 bg-black/100 z-10 flex flex-row items-center justify-around`}
    >
      {/* CHAT */}
      <div
        className={`relative self-stretch items-center flex justify-center common-transition ${
          focusTab === LiveFooterType.Chat ? 'flex-[4]' : 'flex-1'
        }`}
      >
        {focusTab === LiveFooterType.Chat && (
          <div className={`absolute left-0 right-0 flex-none px-3`}>
            <SendChat
              onFocus={(f) => {
                if (!isLogin) {
                  router.push('/user/login');
                } else {
                  setFocusInput(true);
                }
              }}
              onBlur={() => {
                setFocusInput(false);
              }}
            />
          </div>
        )}
        {focusTab !== LiveFooterType.Chat && (
          <div className='relative'>
            <Image
              alt='icon'
              src={CommentIcon}
              className={`mx-auto flex items-center justify-center self-center ${IconSizeTw}`}
              onClick={() => {
                setNewMessageCount(0);
                setFocusTab(LiveFooterType.Chat);
              }}
            />
            {newMessageCount > 0 && (
              <div
                className={`absolute -top-1 -right-1 ${
                  newMessageCount < 100 ? 'w-[21px]' : 'w-[26px]'
                } h-[21px] bg-tayaRed rounded-full flex justify-center items-center text-[10px] font-extrabold`}
              >
                {newMessageCount < 100 ? `${newMessageCount}` : '99+'}
              </div>
            )}
          </div>
        )}
      </div>
      {/* BETS */}
      {matchDetail?.ms !== 0 && matchDetail?.ms && (
        <div
          className={`flex relative common-transition justify-center ${
            focusInput ? 'flex-initial w-0' : 'flex-1'
          }`}
        >
          <Image
            alt='icon'
            src={CoinIconLive}
            className={`${IconSizeTw}`}
            onClick={() => setFocusTab(LiveFooterType.Bet)}
          />
          <HighlightCircle display={focusTab === LiveFooterType.Bet} />
        </div>
      )}

      {/* GAMES */}
      {gameList?.length > 0 ? (
        <div
          className={`flex relative common-transition justify-center ${
            focusInput ? 'flex-initial w-0' : 'flex-1'
          }`}
        >
          <Image
            alt='icon'
            src={DicesIconWithBackground}
            className={`${IconSizeTw}`}
            onClick={() => setFocusTab(LiveFooterType.Games)}
          />
          <HighlightCircle display={focusTab === LiveFooterType.Games} />
        </div>
      ) : null}

      {/* Bet history */}
      {isLogin && (
        <div
          className={`flex relative common-transition justify-center ${
            focusInput ? 'flex-initial w-0' : 'flex-1'
          }`}
        >
          <Image
            alt='icon'
            src={StatsData}
            className={`${IconSizeTw}`}
            onClick={() => setFocusTab(LiveFooterType.OrderHistory)}
          />
          <HighlightCircle display={focusTab === LiveFooterType.OrderHistory} />
        </div>
      )}

      {/* STATS */}
      {typeof namiId !== 'undefined' && (
        <div
          className={`flex relative common-transition justify-center ${
            focusInput ? 'flex-initial w-0' : 'flex-1'
          }`}
        >
          <Image
            alt='icon'
            src={DocuWithMagGlassIcon}
            className={`${IconSizeTw}`}
            onClick={() => setFocusTab(LiveFooterType.Stats)}
          />
          <HighlightCircle display={focusTab === LiveFooterType.Stats} />
        </div>
      )}
    </div>
  );
};

const HighlightCircle = ({ display }) => {
  return display ? (
    <div
      className={`${IconSizeTw} border border-white bg-transparent absolute inset-0 rounded-full mx-auto`}
    />
  ) : null;
};
