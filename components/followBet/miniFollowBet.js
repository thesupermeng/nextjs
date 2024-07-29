import React, { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from '../fallbackImage';
import { Avatar } from '@/asset/icons';
import VisibilityDetector from './VisibilityDetector';
import { useFormattedData } from '@/hook/useFormattedData';
import { useSelectBet } from '@/hook/FB/useSelectBet';
import { isWeb } from '@/util/common';
import { FlytoBetSlip } from '../marketType/FlytoBetSlip';

export const MiniFollowBet = ({ bet, onVisible }) => {
  const message = bet?.message;
  const [currentState, setCurrentState] = useState('animate-in');
  const { opData, matchDetail, onUpdateAmount } = useFormattedData(message);
  const { onClickBetNow } = useSelectBet(matchDetail);
  const [showFlyAnimation, setShowFlyAnimation] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setCurrentState('animate-out');
      onVisible();
    }, 7500);
  }, []);

  return (
    <>
      <div
        className={`${currentState} flex gap-3 bg-[#00000080] rounded-[4px] item-center p-2 justify-center`}
      >
        <div className='flex gap-1'>
          <ImageWithFallback
            fallbackSrc={Avatar}
            src={message.avatar}
            alt='avatar'
            width={isWeb() ? 42 : 24}
            height={isWeb() ? 42 : 24}
            className={`${isWeb() ? 'w-10 h-10' : 'w-6 h-6'} rounded-full`}
          />
          <div className='flex flex-col'>
            <span
              className={`text-[#D8BA92] ${
                isWeb() ? 'text-[16px]' : 'text-[10px]'
              } font-bold`}
            >
              {message.mg_nm}
            </span>
            <span className={`${isWeb() ? 'text-sm' : 'text-[9px]'}`}>
              <span className=''>{message.op_na} </span>
              <span className='font-bold'>{message.op_nm} </span>
              <span>{message.op_od}</span>
            </span>
          </div>
        </div>

        <button
          ref={ref}
          onClick={(e) => {
            onUpdateAmount();
            onClickBetNow(e, message.mg_id, opData, setShowFlyAnimation);
          }}
          className={`bg-tayaRed rounded-md ${
            isWeb() ? 'text-sm px-5' : 'text-[9px] px-4'
          } font-semibold `}
        >
          Bet
        </button>
      </div>

      {showFlyAnimation && (
        <FlytoBetSlip
          onEnd={() => {
            setShowFlyAnimation(false);
          }}
          from={ref.current}
        />
      )}
    </>
  );
};

const followBetData = {
  room: 'stream:7560',
  message: {
    amount: 90,
    match_id: 939785,
    mg_id: 5429691,
    ty: 1,
    op_od: 1.14,
    op_nm: '-0/0.5',
    nm: 'Manchester City vs Manchester United',
    op_na: 'Manchester City',
    mg_nm: 'Handicap',
    sid: 1,
    ms: 3,
    lg_na: 'NBA',
    bt: 1710234440,
  },
  nickname: 'moises',
  avatar:
    'https://avatars.steamstatic.com/0026a214927e7d3b7c67c47cd807657600b5253c_full.jpg',
  user_id: -1,
  user_type: 2,
  type: -2,
  timestamp: 1710470162,
  datetime: '2024-03-15 02:36:02',
};
