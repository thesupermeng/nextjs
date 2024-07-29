'use client';
import {
  IconArrowDownRed,
  IconArrowUpGreen,
  IconArrowWhite,
  IconLockOdd,
} from '@/asset/icons';
import { addBetOption, delBetOption } from '@/store/betCart';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionName } from './util/parseMatchData';
import { isWeb } from '@/util/common';
import { AddBetFlyingEffectDuration, FlytoBetSlip } from './FlytoBetSlip';
import {
  hideRightBarContent,
  setQuickBetProps,
  showQuickBet,
  showRightBarContent,
} from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { usePathname, useRouter } from 'next/navigation';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { getLivePath } from '@/componentsH5/videoPlayer/VideoPlayerCenter';
import useUser from '@/hook/user/useUser';
// import IconRedDown from '';

export const TYPE_SectionTileMode = {
  Dark: 'bg-topMenu',
  primary: 'bg-[#242B3E]',
  Bright: 'bg-grey',
};

export const MarketContainer = ({ title, initExpand = true, children }) => {
  const [isExpand, setIsExpand] = useState(initExpand);
  const { betSlipExpand } = useSelector((s) => s.common);
  useEffect(() => {
    setIsExpand(betSlipExpand);
  }, [betSlipExpand]);
  return (
    <div className={`bg-tayaGrey rounded-xl ${isWeb() ? 'mb-7' : 'mx-3 mb-3'}`}>
      <div
        onClick={() => setIsExpand(!isExpand)}
        className={`flex items-center justify-between px-5 py-4 text-white cursor-pointer ${
          isWeb() ? '' : 'text-[15px]'
        }`}
      >
        {title}
        <Image
          className={`w-[18px] h-[18px] flex-initial transition-transform duration-500 ease-in-out ${
            isExpand ? 'rotate-180' : 'rotate-0'
          }`}
          src={IconArrowWhite}
          alt='expand'
          width={80}
          height={37}
          priority
        />
      </div>
      <div
        className={`px-5 pb-4 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpand ? 'max-h-[999999px]' : 'max-h-0 hidden'
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export const MarketTile = ({
  mode = 'primary',
  marketId = '',
  opData = {},
  matchData = {},
  name = null,
  odd = null,
  label = '',
  leagueName = '',
  ss,
  isSingle,
  isWebSportsPage = false,
}) => {
  const hoverCss =
    'hover:rounded-md hover:border-white/40 hover:bg-[#242B3E8E] cursor-pointer';
  const dispatch = useDispatch();
  const [preOdd, setPreOdd] = useState(odd);
  const [isLock, setIsLock] = useState(false);
  const [oddChange, setOddChange] = useState(0);
  const [selected, setSelected] = useState(false);
  const { options } = useSelector((s) => s.betCart);
  const [showFlyAnimation, setShowFlyAnimation] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname('');
  const { isLogin } = useUser();

  useEffect(() => {
    setIsLock(odd === -999 || odd === 0 || ss !== 1);
    setPreOdd(odd);

    let oddDifference = preOdd === null ? 0 : odd - preOdd;
    setOddChange(oddDifference);

    setTimeout(() => {
      resetOddChange();
    }, 5000);
  }, [odd]);

  const resetOddChange = () => {
    setOddChange(0);
  };
  const router = useRouter();
  const { focusStreamId } = useSelector((s) => s.streams);

  const clickToLivePage = useCallback(() => {
    if (focusStreamId) router.push(getLivePath(focusStreamId));
  }, [focusStreamId]);

  useEffect(() => {
    setSelected(opData?.ty && opData?.ty === options?.[marketId]?.op?.ty);
  }, [options?.[marketId], marketId, opData]);

  const onClick = useCallback(
    (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (pathname === '/home') {
        clickToLivePage();
        return;
      }
      if (mode === 'label' || isLock) {
        return;
      }
      if (matchData?.ms === 5 && !isWeb()) {
        //滚球
        if (!isLogin) {
          router.push('/user/login');
          return;
        }
        const betName = getOptionName(matchData, marketId);

        dispatch(showQuickBet(true));
        dispatch(
          setQuickBetProps({
            id: marketId,
            data: {
              op: opData,
              matchId: matchData?.id,
              betName,
              leagueName,
              nm: matchData?.nm,
            },
          })
        );
        return;
      }
      if (selected) {
        dispatch(delBetOption(marketId));
        setShowFlyAnimation(false);
      } else {
        setTimeout(() => {
          const betName = getOptionName(matchData, marketId);
          dispatch(
            addBetOption({
              id: marketId,
              data: {
                op: opData,
                matchId: matchData?.id,
                betName,
                leagueName,
              },
            })
          );
        }, AddBetFlyingEffectDuration);

        dispatch(hideRightBarContent('All'));
        dispatch(showRightBarContent(RightSidebarContantTypes.BetCart));
        setShowFlyAnimation(true);
      }
    },
    [marketId, matchData, selected, isLock, isLogin]
  );

  if (isLock) {
    return isWebSportsPage ? (
      <LockTile customCss='max-h-[30px]' />
    ) : (
      <LockTile />
    );
  }

  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        className={`flex-initial ${
          isWeb() ? (isWebSportsPage ? 'px-5 py-1' : 'px-5 py-2') : 'p-0.5'
        } rounded-md flex ${
          isWebSportsPage ? 'flex-row' : 'flex-col'
        } items-center ${
          selected && mode === 'primary'
            ? 'bg-[#de173e52]'
            : mode === 'primary' && !isLock
            ? hoverCss
            : ''
        } ${
          mode === 'primary'
            ? `bg-[#242B3E] 
          ${
            isWebSportsPage
              ? name
                ? 'justify-between'
                : 'justify-center'
              : 'justify-between'
          }`
            : 'justify-center'
        } border border-transparent`}
      >
        {mode === 'label' ? (
          <div className='flex items-center justify-self-center text-[#6F7076] text-sm font-bold leading-[1.125rem]'>
            {label}
          </div>
        ) : (
          <>
            {/* {oddChange} */}
            {name && (
              <div className='flex items-center flex-1'>
                <div
                  className={`flex-1 capitalize ${
                    isWebSportsPage ? '' : 'text-center'
                  } leading-4 font-normal ${
                    selected ? 'text-white' : 'text-[#96979B]'
                  } ${isWeb() ? 'text-[13px]' : 'text-[11px]'} ${
                    isSingle && oddChange
                      ? oddChange > 0
                        ? '!text-green-500 animate-pulse'
                        : '!text-tayaRed animate-pulse'
                      : ''
                  }`}
                >
                  {name}
                </div>
              </div>
            )}

            <div
              className={`flex flex-initial flex-row self-stretch place-content-center relative ${
                oddChange ? 'animate-pulse' : ''
              } `}
            >
              <div
                className={`font-bold text-center  ${
                  isWeb()
                    ? isWebSportsPage
                      ? 'self-center text-sm'
                      : 'text-sm'
                    : 'text-[11px]'
                }  ${
                  isSingle && oddChange
                    ? oddChange > 0
                      ? '!text-green-500'
                      : '!text-tayaRed'
                    : ''
                }`}
              >
                {odd}
              </div>

              {oddChange ? (
                <Image
                  alt='odd up'
                  src={oddChange > 0 ? IconArrowUpGreen : IconArrowDownRed}
                  className={`absolute top-1 ${
                    isWebSportsPage ? '-right-[15px]' : 'right-0'
                  }`}
                />
              ) : null}
            </div>
          </>
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

export const TeamLabel = ({ text }) => {
  return (
    <div
      className={`flex-1 py-[0.62rem] px-5 text-[#6F7076] bg-transparent ${
        isWeb() ? 'text-sm' : 'text-xs'
      } text-center leading-4 font-bold`}
    >
      {text}
    </div>
  );
};

export const LockTile = ({ customCss = '' }) => {
  return (
    <div
      className={`flex-1 ${
        isWeb()
          ? customCss.length > 0
            ? 'px-5 max-h-[30px]'
            : 'px-5 min-h-[50px]'
          : ''
      }  rounded-md flex items-center justify-center bg-[#222222] self-stretch ${customCss}`}
    >
      <Image
        alt='lock'
        src={IconLockOdd}
        className={`flex flex-initial py-1.5 opacity-20`}
        height={`${isWeb() && customCss.length > 0 ? '20' : ''}`}
      />
    </div>
  );
};
