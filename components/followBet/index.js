import React, { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { VerticalLine } from '../verticalLine';
import { Button } from '@/componentsH5/button';
import { useSelectBet } from '@/hook/FB/useSelectBet';
import { useFormattedData } from '@/hook/useFormattedData';
import { FlytoBetSlip } from '../marketType/FlytoBetSlip';
import { ImageWithFallback } from '../fallbackImage';
import { Avatar, CirclePlaceholder } from '@/asset/icons';
import { formatCredit, formatCreditWholeNum } from '@/util/numbers';

export const FollowBet = ({ msg }) => {
  const { t } = useTranslation();
  const message = msg?.message;
  const { opData, matchDetail, onUpdateAmount } = useFormattedData(message);
  const { onClickBetNow } = useSelectBet(matchDetail);
  const [showFlyAnimation, setShowFlyAnimation] = useState(false);
  const ref = useRef(null);

  return (
    <div className='bg-[#C991551A] w-full p-3 rounded-xl'>
      <div className='flex w-full justify-between'>
        <div className='flex gap-2 items-start justify-start'>
          <ImageWithFallback
            src={msg?.avatar}
            alt='placeholder'
            width={30}
            height={30}
            className='w-[30px] h-[30px] rounded-full'
            fallbackSrc={Avatar}
          />
          <div className='flex flex-col font-semibold'>
            <p className='text-md leading-tight'>{msg?.nickname}</p>
            <span className='gap-2 flex items-center'>
              <span className='text-[11px]'>{t('stake')} </span>
              <span className='text-15'>
                {formatCreditWholeNum(message?.amount, true)}
              </span>
            </span>
          </div>
        </div>

        <div className='flex flex-col text-right'>
          <p className='text-xs font-semibold'>{t('estReturn')}</p>
          <p className='text-[#FCC511] font-bold text-17'>
            {formatCredit(message?.amount * (message?.op_od - 1))}
          </p>
        </div>
      </div>

      <div className='mt-3'>
        <p className='text-[#D8BA92] text-sm'>{message?.mg_nm}</p>
        <span className='text-sm'>
          <span>{message?.op_na} </span>
          <span>{message?.op_nm} </span>
          <span>{message?.op_od}</span>
        </span>
      </div>

      <VerticalLine className='border-[#FFFFFF0D] my-3' />
      <Button
        onClick={(e) => {
          onUpdateAmount();
          onClickBetNow(e, message?.mg_id, opData, setShowFlyAnimation);
        }}
        className='!m-0 !p-0 bg-transparent'
        buttonColor='!m-1'
      >
        {t('followBet')} - {formatCreditWholeNum(message?.amount, true)}
      </Button>

      {showFlyAnimation && (
        <FlytoBetSlip
          onEnd={() => {
            setShowFlyAnimation(false);
          }}
          from={ref.current}
        />
      )}
    </div>
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
