import {
  DiceFaceFive,
  DiceFaceFour,
  DiceFaceOne,
  DiceFaceSix,
  DiceFaceThree,
  DiceFaceTwo,
  DiceResultEven,
  DiceResultOdd,
} from '@/asset/icons';
import Image from 'next/image';
import { getDiceNumberResultWithDesc, getDiceResultText } from './utils';
import { isWeb } from '@/util/common';
import { DICE_RESULT_API } from '@/config/streamGames';
import { useTranslation } from 'next-i18next';

const DICE_FACE = {
  1: DiceFaceOne,
  2: DiceFaceTwo,
  3: DiceFaceThree,
  4: DiceFaceFour,
  5: DiceFaceFive,
  6: DiceFaceSix,
};

const ODDEVEN = {
  [DICE_RESULT_API.ODD]: DiceResultOdd,
  [DICE_RESULT_API.EVEN]: DiceResultEven,
};
export const ExpandedDiceResults = ({ results }) => {
  return (
    <div className='h-fit'>
      <div className='flex-[1_0_1px] grid grid-cols-[auto_minmax(0,_1fr)_auto] grid-flow-row items-center gap-x-2 gap-y-2'>
        {results.map((result) => {
          return <ResultRow key={result.id} diceResult={result} />;
        })}
      </div>
    </div>
  );
};

const ResultRow = ({ diceResult }) => {
  return (
    <>
      <ResultText diceResult={diceResult} />
      <ResultDicesIcon diceResult={diceResult} />
    </>
  );
};

const ResultText = ({ diceResult }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* //todo translation */}
      <span className='flex flex-0 min-w-[5.5rem] text-[#6F7076] whitespace-nowrap'>
        Game {diceResult.sequenceId}:{' '}
      </span>
      <span
        className={`flex flex-0 text-left ${
          diceResult?.result?.big_small === DICE_RESULT_API.BIG
            ? 'text-[#04A009]'
            : diceResult?.result?.big_small === DICE_RESULT_API.SMALL
            ? 'text-[#DE173E]'
            : 'text-white'
        }`}
      >
        {t(getDiceResultText(diceResult?.result.big_small))}{' '}
        {getDiceNumberResultWithDesc(
          diceResult?.result.big_small,
          diceResult?.result.rolls
        )}
      </span>
    </>
  );
};

const ResultDicesIcon = ({ diceResult }) => {
  const icon4 = ODDEVEN[diceResult?.result?.odd_even] || null;
  return (
    <div className='flex flex-0 w-fit justify-end flex-row gap-1'>
      {diceResult?.result?.rolls.map((number, index) => {
        const icon = DICE_FACE[number] || null;
        return (
          <Image
            key={`${diceResult.id}${index}`}
            width={isWeb() ? 30 : 22}
            height={isWeb() ? 30 : 22}
            src={icon}
            alt={number}
          />
        );
      })}
      {diceResult?.result?.odd_even && (
        <Image
          width={isWeb() ? 30 : 22}
          height={isWeb() ? 30 : 22}
          src={icon4}
          alt={diceResult?.result?.odd_even}
        />
      )}
    </div>
  );
};
