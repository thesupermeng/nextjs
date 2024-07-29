import React, { useEffect, useRef, useState } from 'react';
import StatPage from '../namiMatchDetails';
import Chatroom from '../chatroom';
import AllBetTypes from '../allBetTypes';
import { useStreamer } from '@/hook/user/useStreamer';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { LiveOrderHistoryTab } from '../../app/liveplay/[streamerId]/LiveOrderHistoryTab';
import useUser from '@/hook/user/useUser';
import { StreamGames } from '../StreamGames';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';

export default function BetTab() {
  const [selected, setSelected] = useState(0);
  const { streamer } = useStreamer();
  const id = streamer?.live?.match?.nami_id;
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('bet');
  const matchId = useSelector((s) => s.common.matchId);
  const { matchDetail } = useMatchDetail(matchId);
  const { chatList } = useSelector((s) => s.chatRoom);
  const { gameList } = useStreamGameList();
  // newMessageCount displays the number of new messages displayed in the LiveFooterH5
  const [newMessageCount, setNewMessageCount] = useState(0);
  const { t } = useTranslation();
  const currentMatchId = useRef(null);
  const { isLogin } = useUser();

  useEffect(() => {
    if (selected !== 0) setNewMessageCount((c) => c + 1);
  }, [chatList]);
  useEffect(() => {
    if (selected === 0) setNewMessageCount(0);
  }, [selected]);

  useEffect(() => {
    if (param) setSelected(1);
  }, [param]);

  // todo init initial tab
  const tabs = [
    {
      label: t('chat'),
      children: <Chatroom />,
    },
  ];

  useEffect(() => {
    if (currentMatchId.current !== matchId) {
      currentMatchId.current = matchId;
      if (matchDetail?.ms !== 0 && matchDetail?.ms) {
        setSelected(1);
      }
    }
  }, [matchDetail]);
  if (gameList?.length > 0) {
    tabs.push({
      label: t('miniGames'),
      children: <StreamGames />,
    });
  }
  // Check if id is defined
  if (matchDetail?.ms !== 0 && matchDetail?.ms) {
    tabs.push({
      label: t('bets'),
      children: <AllBetTypes />,
    });
  }
  if (typeof id !== 'undefined') {
    tabs.push({
      label: t('stats'),
      children: <StatPage />,
    });
  }
  if (isLogin) {
    tabs.push({
      label: t('Order History'),
      children: <LiveOrderHistoryTab />,
    });
  }

  return (
    <>
      <div className=' flex flex-initial px-5 gap-10 text-base text-white text-opacity-50 border-b-[0.5px] border-[#121212]'>
        {tabs.map((t, index) => {
          return (
            <div
              key={index}
              className={`relative flex-col hover:text-white cursor-pointer whitespace-nowrap ${
                selected === index && 'text-[#DE173D] flex'
              }`}
              onClick={() => setSelected(index)}
            >
              {t.label}
              {selected === index && (
                <div className=' h-1 rounded-t-lg bg-[#DE173D] mt-3'></div>
              )}
              {index === 0 && selected !== 0 && newMessageCount > 0 && (
                <div
                  className={`absolute top-[-8px] -right-5 bg-tayaRed rounded-full h-5 ${
                    newMessageCount < 100 ? 'w-5' : 'w-[26px]'
                  } flex justify-center items-center text-[10px] text-white font-medium`}
                >
                  {newMessageCount < 100 ? `${newMessageCount}` : '99+'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {tabs.map((t, index) => {
        return index === selected ? (
          <div key={index} className={`flex flex-1 flex-col`}>
            {t.children}
          </div>
        ) : (
          <div key={index}></div>
        );
      })}
    </>
  );
}
