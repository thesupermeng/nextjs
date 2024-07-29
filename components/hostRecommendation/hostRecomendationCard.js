import { Button } from '@/componentsH5/button';
import { useSelectBet } from '@/hook/FB/useSelectBet';
import React, { useEffect, useRef, useState } from 'react';
import { LockTile } from '../marketType/MarketContainer';
import { FlytoBetSlip } from '../marketType/FlytoBetSlip';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { IconArrowDownRed, IconArrowUpGreen } from '@/asset/icons';

export const HostRecomendationCard = ({
  currentMatchData,
  mg,
  recommendation,
}) => {
  const [isLock, setIsLock] = useState(false);
  const [showFlyAnimation, setShowFlyAnimation] = useState(false);
  const { onClickBetNow } = useSelectBet(currentMatchData);
  const [opData, setOpData] = useState(null);
  const [mgData, setMg] = useState(null);
  const ref = useRef(null);
  const [oddChange, setOddChange] = useState(null);
  const prevOddRef = useRef(null);

  useEffect(() => {
    if (mg && recommendation) {
      const mgRecommendation = mg.find(
        (item) =>
          item.mty === recommendation.mty && item.pe === recommendation.pe
      );

      if (mgRecommendation) {
        setMg(mgRecommendation);

        const market = mgRecommendation.mks.find(
          (e) => e.id === recommendation.id
        );
        if (market) {
          const item = market.op.find((e) => e.ty === recommendation.ty);
          setIsLock(market.ss !== 1 || item?.bod === -999 || item?.bod === 0);
          setOpData(item);
        }
      }
    }
  }, [mg, recommendation]);

  useEffect(() => {
    if (prevOddRef.current) {
      const diff = opData?.od - prevOddRef.current;
      setOddChange(diff);
    }

    prevOddRef.current = opData?.od;
    if (oddChange) {
      setTimeout(() => {
        setOddChange(null);
      }, 5000);
    }
  }, [opData]);

  return (
    <>
      <div
        className={`${
          isWeb() ? 'bg-tayaGrey/70 ' : 'bg-tayaGrey '
        } rounded-md p-3 min-w-[160px] flex flex-col justify-between `}
        ref={ref}
      >
        <div className='flex flex-col'>
          <p className='text-[#D8BA92] font-semibold'>{mgData?.nm}</p>
          <p>{opData?.na}</p>
          <span className='flex gap-2'>
            <span>{opData?.nm}</span>
            <span
              className={`font-bold ${
                oddChange
                  ? oddChange > 0
                    ? 'text-green-500 animate-pulse'
                    : 'text-tayaRed animate-pulse'
                  : 'text-white'
              }`}
            >
              {' '}
              {opData?.od}
            </span>
            {oddChange ? (
              <Image
                alt='odd up'
                src={oddChange > 0 ? IconArrowUpGreen : IconArrowDownRed}
                className='animate-pulse'
              />
            ) : null}
          </span>
        </div>

        {isLock ? (
          <LockTile customCss='!h-6' lockCss='!h-7' />
        ) : (
          <Button
            className='w-full !px-0 !m-0 bg-transparent'
            buttonColor={`${isWeb() ? '!m-0 !my-1' : '!h-6'}`}
            onClick={(e) => {
              onClickBetNow(e, recommendation?.id, opData, (e) =>
                setShowFlyAnimation(true)
              );
            }}
          >
            Bet Now
          </Button>
        )}
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
