'use client';
import {
  IconArrowDownRed,
  IconArrowUpGreen,
  ImageQuickBetBg,
  TrashIcon,
} from '@/asset/icons';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { formatCredit } from '@/util/numbers';
import {
  OddChangeType,
  delBetOption,
  setAcceptOddChange,
  setHasOddChanges,
  updateStake,
} from '@/store/betCart';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { getMobileOperatingSystem, isWeb } from '@/util/common';
import {
  setActiveParlay,
  setKeyboardProps,
  showKeyboard,
} from '@/store/common';
import HandleError, { HandleMinMax } from './BetErrorType';
import useBetRules from '@/hook/FB/useBetRules';
import { convertTimeStampToDate } from '@/util/date';

export const BetOption = ({
  id,
  data,
  jumpLine = {},
  isQuickBet = false,
  selected = 0,
  setSelected = () => {},
  index,
  length,
  isSeries,
}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [oddChange, setOddChange] = useState(0);
  const [transform, setTransform] = useState(false);
  const { matchDetail } = useMatchDetail(data?.matchId);
  const { stakes, setting, options } = useSelector((s) => s.betCart);
  const inputRef = useRef(null);
  const { checkMinMax } = useBetRules();
  const { t } = useTranslation();

  useEffect(() => {
    setAmount(stakes[id]);
  }, [stakes, id]);

  useEffect(() => {
    if (jumpLine?.op?.od) {
      const changes = jumpLine?.op?.od - data?.op?.od;
      var type;
      if (changes < 0 && setting.rule !== '1') {
        type = OddChangeType.LOWER;
      } else if (changes > 0 && setting.rule === '3') {
        type = OddChangeType.HIGHER;
      } else {
        type = OddChangeType.NOCHANGE;
      }
      setOddChange(type);
    }
  }, [jumpLine?.op?.od]);

  useEffect(() => {
    if (oddChange > 0) {
      dispatch(setHasOddChanges(oddChange));
      dispatch(setAcceptOddChange(false));
    }
  }, [oddChange]);

  const onUpdateAmount = (amt) => {
    dispatch(updateStake({ id, data: amt }));
  };

  const onClickOpenMatch = () => {};

  const onDelete = useCallback(() => {
    setTransform(true);
    setTimeout(() => {
      dispatch(delBetOption(id));
      dispatch(updateStake({ id, data: 0 }));
    }, 300);
  }, [id]);

  const keyboardConfig = {
    id: id,
    amount: amount,
    setAmount: (e) => onUpdateAmount(e),
    currentIndex: selected,
    isSingleBet: true,
  };

  useEffect(() => {
    if (isQuickBet) {
      dispatch(showKeyboard(true));
      dispatch(setKeyboardProps(keyboardConfig));
    }
  }, [isQuickBet]);

  useEffect(() => {
    const handleClick = (selected, length) => {
      if (selected == index && length) {
        if (selected < length - 1) {
          setSelected(selected + 1);
        } else {
          dispatch(showKeyboard(false));
          dispatch(setActiveParlay(undefined));
        }

        if (amount > jumpLine?.smax && jumpLine?.smax != 0)
          dispatch(updateStake({ id: id, data: jumpLine?.smax }));
        else if ((amount < jumpLine?.smin && jumpLine?.smin != 0) || !amount)
          dispatch(updateStake({ id: id, data: jumpLine?.smin }));
      }
    };
    const buttonClickHandler = () => handleClick(selected, length);

    window?.addEventListener('buttonClick', buttonClickHandler);
    return () => {
      window?.removeEventListener('buttonClick', buttonClickHandler);
    };
  }, [selected, length, id, jumpLine, amount]);

  const triggerKeyboardOn = (e) => {
    e && e.stopPropagation();
    dispatch(showKeyboard(true));
    dispatch(setKeyboardProps(keyboardConfig));
    setSelected(index);
  };

  useEffect(() => {
    if (selected === index || isQuickBet) {
      dispatch(setKeyboardProps(keyboardConfig));
      inputRef.current?.focus();
      getMobileOperatingSystem() === 'iOS' && inputRef.current?.select();
    }
  }, [selected, amount, isQuickBet]);

  if (isQuickBet) {
    return (
      <div
        style={{
          backgroundImage: `url(${ImageQuickBetBg.src})`,
          backgroundSize: '100% 100%',
        }}
        className={`relative flex rounded-xl flex-col`}
      >
        <div className='flex flex-col flex-initial gap-2 p-4 pb-0rounded-t-[5px]'>
          <div className='flex flex-row flex-initial'>
            <div
              className={`flex flex-col flex-1 gap-1 text-sm text-[#AEAEAE]`}
            >
              <div className='font-normal text-white text-[13px]'>
                {jumpLine?.op?.na || jumpLine?.op?.nm}
              </div>
              <div
                className={`flex flex-col flex-1 gap-2 absolute right-5 text-right font-bold text-[17px]`}
              >
                {jumpLine?.op?.li && (
                  <div className='font-bold text-white'>{jumpLine?.op?.li}</div>
                )}
                <div className='font-bold text-white'>
                  {jumpLine?.op?.od && setting.format === 2
                    ? (jumpLine?.op?.od - 1.0).toFixed(2)
                    : jumpLine?.op?.od}
                </div>
                {oddChange > 0 && (
                  <div className={`flex-initial items-center animate-pulse`}>
                    <Image
                      alt='odd change'
                      src={
                        oddChange === 1 ? IconArrowUpGreen : IconArrowDownRed
                      }
                      className=''
                    />
                  </div>
                )}
              </div>
              <div className='flex items-center flex-1'>
                <div>{data?.betName}</div>
              </div>
              <div
                className='flex flex-row items-center flex-1'
                onClick={onClickOpenMatch}
              >
                <div>
                  {data?.leagueName ||
                    `${matchDetail?.ts?.[0]?.na} vs ${matchDetail?.ts?.[1]?.na}`}
                </div>
              </div>

              <div className='flex items-center flex-1'>
                {convertTimeStampToDate(matchDetail.bt)}
              </div>

              <div className='flex flex-wrap flex-1 items-center'>
                <input
                  ref={inputRef}
                  readOnly={isWeb() ? false : true}
                  name={`optionstakeinput-${id}`}
                  onClick={!isWeb() ? triggerKeyboardOn : undefined}
                  key={`optionstakeinput-${id}`}
                  placeholder={0}
                  className={
                    'flex-1 flex h-8 py-[2px] px-[10px] rounded-lg border bg-[#0E0F11] focus:outline-none focus:border-white ' +
                    'text-white text-base text-left font-semibold leading-[1.125rem] ' +
                    `${
                      checkMinMax(jumpLine, amount)
                        ? 'border !border-tayaRed'
                        : 'border-[#313131]'
                    }`
                  }
                  onChange={(e) => {
                    const amount = parseInt(e.target.value);
                    if (!isNaN(amount)) onUpdateAmount(amount);
                    else onUpdateAmount('');
                  }}
                  value={amount || ''}
                />

                <div className='flex flex-col flex-1 gap-1'>
                  <div
                    className={`flex-1 font-semibold text-white text-end ${
                      isWeb() ? '' : 'text-[11px]'
                    }`}
                  >
                    {t('estReturn')}
                  </div>
                  <div
                    className={`flex-1 text-[#FCC511] font-semibold text-end ${
                      isWeb() ? '' : 'text-xs'
                    }`}
                  >
                    {formatCredit(
                      (jumpLine?.op?.od - 1 || 0) * (amount || 0)
                    ) || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HandleError
            jumpLine={jumpLine}
            isSeries={isSeries}
            oddChange={oddChange}
            amount={amount}
            data={data}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`rounded-t-[5px] transition-transform duration-300 ease-in-out transform translate-x-0 ${
          transform && 'translate-x-full'
        }`}
      >
        <div className='flex flex-col flex-initial gap-2 p-4 pb-0 bg-tayaGrey rounded-t-[5px]'>
          <div className='flex flex-row flex-initial'>
            <div
              className={`flex flex-col flex-1 gap-1 ${
                isWeb() ? 'text-sm' : 'text-xs'
              }`}
            >
              <div
                className={`flex flex-row items-center flex-1 gap-1.5 ${
                  isWeb() ? 'text-sm' : 'text-[13px]'
                }`}
              >
                <Image
                  alt='delete'
                  src={TrashIcon}
                  className='w-3 h-3 mr-1 cursor-pointer'
                  onClick={onDelete}
                />
                <div
                  className={`font-normal text-white truncate ${
                    !isSeries && !isWeb() ? 'max-w-[115px]' : ''
                  }`}
                >
                  {jumpLine?.op?.na || jumpLine?.op?.nm}
                </div>
                {jumpLine?.op?.li && (
                  <div className='font-bold text-white'>{jumpLine?.op?.li}</div>
                )}
                <div className='font-bold text-white'>
                  {jumpLine?.op?.od && setting.format === 2
                    ? (jumpLine?.op?.od - 1.0).toFixed(2)
                    : jumpLine?.op?.od}
                </div>
                {oddChange > 0 && (
                  <div className={`flex-initial items-center animate-pulse`}>
                    <Image
                      alt='odd change'
                      src={
                        oddChange === 1 ? IconArrowUpGreen : IconArrowDownRed
                      }
                      className=''
                    />
                  </div>
                )}
              </div>
              <div className='flex items-center flex-1'>
                <div className='text-[#96979B] font-normal'>
                  {data?.betName}
                </div>
              </div>
              <div
                className='flex flex-row items-center flex-1'
                onClick={onClickOpenMatch}
              >
                <div className='text-[#96979B] font-normal'>
                  {data?.leagueName ||
                    `${matchDetail?.ts?.[0]?.na} vs ${matchDetail?.ts?.[1]?.na}`}
                </div>
              </div>
              <div className='flex items-center flex-1'>
                <div className='text-[#96979B] font-normal'>
                  {new Date(matchDetail.bt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className='flex flex-col items-end justify-start flex-initial gap-1'>
              <div className='flex flex-row flex-1 ml-1.5'>
                {!isSeries && (
                  <input
                    ref={inputRef}
                    id={id}
                    readOnly={isWeb() ? false : true}
                    name={`optionstakeinput-${id}`}
                    onClick={!isWeb() ? triggerKeyboardOn : undefined}
                    key={`optionstakeinput-${id}`}
                    placeholder={0}
                    className={
                      'w-[7rem] h-8 py-[2px] px-[10px] rounded-lg border bg-[#0E0F11] ' +
                      'text-white text-base text-right font-semibold leading-[1.125rem] focus:outline-0 focus:border-white ' +
                      `${
                        checkMinMax(jumpLine, amount)
                          ? 'border !border-tayaRed'
                          : 'border-[#313131]'
                      }`
                    }
                    onChange={(e) => {
                      const amount = parseInt(e.target.value);
                      if (!isNaN(amount)) onUpdateAmount(amount);
                      else onUpdateAmount('');
                    }}
                    value={amount || ''}
                  />
                )}
              </div>
              <HandleMinMax
                isSeries={isSeries}
                jumpLine={jumpLine}
                amount={amount}
              />

              {!isSeries && (
                <div className='flex flex-col flex-1 gap-1'>
                  <div
                    className={`flex-1 font-semibold text-white text-end ${
                      isWeb() ? '' : 'text-[11px]'
                    }`}
                  >
                    {t('estReturn')}
                  </div>
                  <div
                    className={`flex-1 text-[#FCC511] font-semibold text-end ${
                      isWeb() ? '' : 'text-xs'
                    }`}
                  >
                    {formatCredit((data?.op?.od - 1 || 0) * (amount || 0)) || 0}
                  </div>
                </div>
              )}
            </div>
          </div>

          <HandleError
            jumpLine={jumpLine}
            isSeries={isSeries}
            oddChange={oddChange}
            amount={amount}
            data={data}
          />
        </div>
        <div
          className='h-4 bg-transparent bg-repeat-x'
          style={{ backgroundImage: "url('/img/BetOptionBottom.svg')" }}
        ></div>
      </div>
    );
  }
};
