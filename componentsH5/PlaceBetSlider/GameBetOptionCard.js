import { ImageQuickBetBg } from '@/asset/icons';
import { GAMES_TITLE } from '@/config/streamGames';
import { useStreamGame } from '@/hook/streamGames/useStreamGame';
import { setKeyboardProps, showKeyboard } from '@/store/common';
import { setStreamGameBetAmt } from '@/store/streamGame';
import { isWeb } from '@/util/common';
import { formatCredit } from '@/util/numbers';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { ErrorType } from '@/components/betCart/BetErrorType';

export const GameBetOptionCard = ({ selectedBet, min = 0, max = 0 }) => {
  const { ongoing } = useStreamGame();
  const { t } = useTranslation();
  const betAmt = useSelector((s) => s.streamGame.betAmt);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  //keyboard
  const keyboardConfig = {
    id: ongoing?.id || 0,
    amount: betAmt,
    setAmount: (e) => dispatch(setStreamGameBetAmt(e)),
    currentIndex: 0,
    isSingleBet: true,
  };

  useEffect(() => {
    dispatch(showKeyboard(true));
    dispatch(setKeyboardProps(keyboardConfig));
    inputRef.current?.focus();
  }, [betAmt]);

  const triggerKeyboardOn = (e) => {
    e && e.stopPropagation();
    dispatch(showKeyboard(true));
    dispatch(setKeyboardProps(keyboardConfig));
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ImageQuickBetBg.src})`,
          backgroundSize: '100% 100%',
        }}
        className={`relative flex rounded-xl flex-col`}
      >
        <div className='flex flex-col flex-initial gap-2 p-4 rounded-t-[5px]'>
          <div className='flex flex-row flex-initial'>
            <div
              className={`flex flex-col flex-1 gap-1 text-sm text-[#AEAEAE]`}
            >
              {/* Card Left Row1 */}
              <div className='flex flex-row justify-between'>
                <span className='font-normal text-white text-[13px]'>
                  {t(GAMES_TITLE[ongoing.game_id])}
                </span>
                <span className='font-bold text-[17px]'>
                  {selectedBet.betOdds}
                </span>
              </div>
              {/* Card Left Row2 */}
              <div className='flex items-center flex-1'>
                <div> {t(selectedBet.label)}</div>
              </div>
              {/* Card Left Row3 */}
              <div
                className='flex flex-row items-center flex-1'
                // onClick={onClickOpenMatch}
              >
                <div>{selectedBet.betOdds}</div>
              </div>
              {/* Card Left Row4 */}
              {t('miniGames')}
              <div className='flex flex-wrap flex-1 items-center'>
                {/* Card Left Row5 - input bet amt */}
                <input
                  ref={inputRef}
                  readOnly={isWeb() ? false : true}
                  // name={`optionstakeinput-${id}`}
                  onClick={!isWeb() ? triggerKeyboardOn : undefined}
                  // key={`optionstakeinput-${id}`}
                  placeholder={0}
                  className={`flex-1 flex h-8 py-[2px] px-[10px] rounded-lg border bg-[#0E0F11] focus:outline-none  text-white text-base text-left font-semibold leading-[1.125rem] ${
                    betAmt !== '' && (betAmt < min || betAmt > max)
                      ? 'border-tayaRed focus:border-tayaRed'
                      : 'focus:border-white'
                  }`}
                  onChange={(e) => {
                    dispatch(setStreamGameBetAmt(parseInt(e.target.value)));
                  }}
                  value={betAmt || ''}
                />

                {/* Card Right Row5 Possible Win --- USDT */}
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
                      (selectedBet.betOdds - 1 || 0) * (betAmt || 0)
                    ) || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {betAmt !== '' && betAmt < min && (
        <BetError type={ErrorType.Min} data={min} />
      )}
      {betAmt !== '' && betAmt > max && (
        <BetError type={ErrorType.Max} data={max} />
      )}
    </>
  );
};

const BetError = ({ type, data = null }) => {
  return (
    <div
      className={`${
        isWeb() ? 'text-[14px] h-[41px]' : 'text-[11px]'
      } flex flex-initial gap-1 p-2 px-3 rounded-[5px] items-center justify-start ${
        type.tw
      }`}
    >
      {type.img && <Image alt='img' src={type.img} />}
      <div>{typeof type.txt === 'function' ? type.txt(data) : type.txt}</div>
    </div>
  );
};
