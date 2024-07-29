import { CancelLottie, DoneLottie, LoadingLottie } from '@/asset/lottie';
import { LottieAnimation } from '@/components/lottie';
import { Unit } from '@/config/User/setting';
import { GAMES_TITLE } from '@/config/streamGames';
import { isWeb } from '@/util/common';
import { convertTimeStampToDate } from '@/util/date';
import { formatCredit, formatCreditWholeNum } from '@/util/numbers';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export const PlaceBetRespModal = ({
  selectedBet,
  isError,
  isLoading,
  errMsg,
  placeBetResData,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-black/30 px-3 z-[999] ${
        isWeb() ? 'absolute' : 'fixed'
      } top-0 bottom-0 left-0 right-0 flex flex-1 items-center justify-center`}
    >
      {' '}
      <div className='min-w-[365px] p-3 flex flex-col flex-initial backdrop-blur-lg rounded-lg bg-[#191A1D] text-white text-lg font-semibold'>
        {isError ? (
          <BetErrorModal errMsg={errMsg} />
        ) : (
          <>
            <div className='flex flex-col items-center justify-center'>
              <LottieAnimation
                src={isLoading ? LoadingLottie : DoneLottie}
                isLoop={isLoading ? true : false}
                tw={`w-16 h-16`}
              />
              {isLoading ? (
                <p className=' opacity-90'>{t('confirming')}</p>
              ) : (
                <>
                  <div className=' opacity-90'>{t('betSuccessful')}</div>
                  <div className=' opacity-90'>{t('goodLuck')}</div>
                </>
              )}
            </div>
            <SuccessModalCard
              selectedBet={selectedBet}
              isLoading={isLoading}
              placeBetResData={placeBetResData}
            />
          </>
        )}
      </div>
    </div>
  );
};

const SuccessModalCard = ({
  selectedBet,
  category = 'miniGames',
  placeBetResData,
  isLoading,
}) => {
  const gameId = useSelector((s) => s.streamGame.gameId);
  const betAmt = useSelector((s) => s.streamGame.betAmt);
  const { t } = useTranslation();
  return (
    <div className='flex mt-3 gap-5 font-normal'>
      <div className='text-[11px] leading-3 text-[#AEAEAE] flex flex-col gap-1'>
        {/* invoice no */}
        {placeBetResData?.draw.id && (
          <p className='text-xs py-2'> #{placeBetResData.draw.id}</p>
        )}
        <div className='flex gap-2 text-white text-[13px]'>
          {/* betoption/tile label */}
          <p className=''>{t(selectedBet.label)}</p>
          {/* bet odds/stakes */}
          <p className='font-bold'>
            {formatCredit(selectedBet.betOdds, false)}
          </p>
        </div>
        <p>{t(category)}</p>
        <p>{t(GAMES_TITLE[gameId])}</p>
        {placeBetResData?.ts && (
          <p> {convertTimeStampToDate(placeBetResData?.ts * 1000)}</p>
        )}
      </div>

      <div className='flex flex-col text-right flex-1 items-end gap-1'>
        {!isLoading && (
          <p className='text-white bg-[#0E0F1180] rounded-sm px-2 text-[10px] leading-4'>
            {t('confirmed')}
          </p>
        )}
        <p className='text-[16px] leading-4 font-semibold py-2'>
          {formatCreditWholeNum(Number(betAmt))} {Unit}
        </p>

        {/* <span className='flex flex-col justify-end items-center flex-wrap whitespace-nowrap'> */}
        <p className='text-[11px] font-semibold leading-4'>{t('estReturn')}</p>
        <p className='text-sm text-[#FCC511]'>
          {formatCredit(selectedBet.betOdds * betAmt)}
        </p>
        {/* </span> */}
      </div>
    </div>
  );
};

const BetErrorModal = ({ errMsg = '' }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <LottieAnimation
        src={CancelLottie}
        // isLoop={isLoading ? true : false}
        tw={`w-16 h-16`}
      />
      <div className='text-center'>
        <p>
          {t('bet')} {t('failed')}
        </p>
        <p>{errMsg.msg || 'Please Try Again'}</p>
        {errMsg && <p>{errMsg.error}</p>}
      </div>
    </div>
  );
};
