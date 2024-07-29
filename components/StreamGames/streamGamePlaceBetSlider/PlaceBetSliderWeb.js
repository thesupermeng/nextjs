import { Button } from '@material-tailwind/react';
import { RightMenuLayout } from '../../rightMenuLayout';
import BetCartHeader from '../../betCart/BetCartHeader';
import { GameBetOptionCard } from '@/componentsH5/PlaceBetSlider/GameBetOptionCard';
import { isWeb } from '@/util/common';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { formatCredit } from '@/util/numbers';
import useUser from '@/hook/user/useUser';
import { IconArrowWhite, RedWallet } from '@/asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setStreamGameBetAmt } from '@/store/streamGame';
import { showRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';

export const PlaceBetSliderWeb = ({
  selectedBet,
  setSelectedBet,
  isBetExpired,
  onClickPlaceBet,
  min,
  max,
}) => {
  const betAmt = useSelector((s) => s.streamGame.betAmt);
  const { t } = useTranslation();
  const { user, isLogin } = useUser();
  const dispatch = useDispatch();
  return (
    <>
      <RightMenuLayout className='!bg-opacity-50 backdrop-blur-[1px]'>
        <div className='absolute h-2/3 bottom-0 inset-x-0 bg-[#0E0F11] px-2'>
          <BetCartHeader
            showSettingsIcon={false}
            onClose={() => {
              setSelectedBet(null);
            }}
          />
          <GameBetOptionCard selectedBet={selectedBet} min={min} max={max} />
          <div className='absolute bottom-0 inset-x-0 flex flex-col flex-initial p-4 rounded-t-xl bg-tayaGrey text-[13px]'>
            <Row
              left={
                <div className='flex gap-2'>
                  <Image src={RedWallet} alt='wallet' width={20} height={20} />
                  <p>{t('balance')}</p>
                </div>
              }
              right={
                <div
                  className='flex items-center cursor-pointer'
                  onClick={() =>
                    dispatch(
                      showRightBarContent(RightSidebarContantTypes.Deposit)
                    )
                  }
                >
                  ({formatCredit(user?.sum?.balance)})
                  <Image
                    alt='topup'
                    src={IconArrowWhite}
                    className='w-3 h-3 ml-2 -rotate-90'
                  />
                </div>
              }
            />
            <Row>
              <BetAmtQuickAdd
                balance={user?.sum?.balance}
                isLogin={isLogin}
                max={max}
              />
            </Row>
            <Row
              left={
                <div className={`flex-initial text-white`}>
                  <div>{t('estReturn')}</div>
                  <div
                    className={`text-[#FCC511] font-semibold text-base ${
                      isWeb() ? '' : 'text-sm'
                    }`}
                  >
                    {formatCredit(
                      (selectedBet.betOdds - 1 || 0) * (betAmt || 0)
                    ) || 0}
                  </div>
                </div>
              }
              right={
                <button
                  //to match up with H5 Betslider
                  disabled={
                    isBetExpired || betAmt < min || betAmt > max || !betAmt
                  }
                  onClick={onClickPlaceBet}
                  className={` flex rounded flex-1 text-white ${
                    isWeb() ? 'h-12' : 'h-10'
                  } items-center justify-center tayagradient disabled:opacity-75`}
                >
                  <div
                    className={`flex-initial text-base font-semibold text-center ${
                      isWeb() ? '' : '!text-[15px]'
                    }`}
                  >
                    {isBetExpired
                      ? t('selectionExpired')
                      : `${t('placeBet')} -
                    ${formatCredit(betAmt || 0)}`}
                  </div>
                </button>
              }
            />
          </div>
        </div>
      </RightMenuLayout>
    </>
  );
};

const BetAmtQuickAdd = ({ balance, isLogin, max }) => {
  const BetAmtQuickAdd = [10, 50, 100, 200];
  const betAmt = useSelector((s) => s.streamGame.betAmt);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {BetAmtQuickAdd.map((amt) => {
        return (
          <Button
            key={amt}
            onClick={() => {
              if (!betAmt) {
                dispatch(setStreamGameBetAmt(amt));
              } else {
                dispatch(setStreamGameBetAmt(Number(betAmt) + amt));
              }
            }}
          >
            <span className='text-tayaRed'>+{amt}</span>
          </Button>
        );
      })}
      <Button
        onClick={() =>
          dispatch(
            setStreamGameBetAmt(
              Number(isLogin ? (balance > max ? max : balance) : max)
            )
          )
        }
      >
        <span className='text-tayaRed'>{t('allIn')}</span>
      </Button>
    </>
  );
};

const Row = ({ twClass = '', left, right, children }) => {
  return (
    <div
      className={`flex flex-initial flex-row gap-4 items-center py-1 mb-[10px] justify-between ${twClass}`}
    >
      <>
        {left}
        {right}
        {children}
      </>
    </div>
  );
};
