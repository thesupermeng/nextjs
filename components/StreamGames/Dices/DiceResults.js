import { isWeb } from '@/util/common';
import { calculateDiceNumberResult, getDiceResultAbrvText } from './utils';
import BottomSheet from '@/componentsH5/bottomSheet';
import { ExpandedDiceResults } from './ExpandedDiceResults';
import { useState } from 'react';
import { DICE_RESULT_API } from '@/config/streamGames';
import { useTranslation } from 'next-i18next';

export const DiceResults = ({ results }) => {
  const [showDiceHistory, setShowDiceHistory] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className={`${isWeb() ? 'px-1 mb-4' : 'px-3'} pb-4`}>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-[17px]'>{t('latestGameResults')}</p>
          {!isWeb() && (
            <span
              className='opacity-80 text-[14px]'
              onClick={() => setShowDiceHistory(true)}
            >
              {t('seeAll')}
            </span>
          )}
          {/* //todo translation */}
        </div>
        {!isWeb() ? (
          <div className='flex flex-row gap-2 py-4'>
            {results.slice(0, 7).map((result, index) => {
              return <SimpleResultIcon key={index} diceResult={result} />;
            })}
          </div>
        ) : (
          <ExpandedDiceResults results={results} />
        )}
      </div>
      {!isWeb() && (
        <BottomSheet
          isOpen={showDiceHistory}
          toggleSheet={() => setShowDiceHistory(false)}
          title={t('latestGameResults')}
          className='!h-[500px]'
        >
          <ExpandedDiceResults results={results} />
        </BottomSheet>
      )}
    </>
  );
};

const SimpleResultIcon = ({ diceResult }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center text-[12px] ${
        diceResult?.result?.big_small === DICE_RESULT_API.SMALL
          ? 'bg-[#DE173E]'
          : diceResult?.result?.big_small === DICE_RESULT_API.BIG
          ? 'bg-[#04A009]'
          : diceResult?.result?.big_small === DICE_RESULT_API.TRIPLE
          ? 'bg-white text-black'
          : ''
      }`}
    >
      {t(getDiceResultAbrvText(diceResult?.result.big_small))}
      <span>
        (
        {calculateDiceNumberResult(
          diceResult?.result.big_small,
          diceResult?.result.rolls
        )}
        )
      </span>
    </div>
  );
};
