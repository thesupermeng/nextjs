import { InfoTriangular } from '@/asset/icons';
import useBetRules from '@/hook/FB/useBetRules';
import { isWeb } from '@/util/common';
import { formatCreditWholeNum } from '@/util/numbers';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import i18n from 'i18next';
import { useTranslation } from 'next-i18next';

export const ErrorType = {
  Expire: {
    txt: i18n.t('selectionExpired'),
    img: InfoTriangular,
    tw: 'bg-[#781427]',
  },
  OddChange: {
    txt: i18n.t('oddsChanges'),
    img: InfoTriangular,
    tw: 'bg-[#144E78]',
  },
  NoParley: {
    txt: i18n.t('theMatchDoesntSupportParlay'),
    img: InfoTriangular,
    tw: 'bg-[#454545]',
  },
  Min: {
    txt: (p) => `${i18n.t('minimumBetAmountIs')} ${p}`,
    img: InfoTriangular,
    tw: 'bg-[#781427]',
  },
  Max: {
    txt: (p) => `${i18n.t('maximumBetAmountIs')} ${p}`,
    img: InfoTriangular,
    tw: 'bg-[#781427]',
  },
  SameMatch: {
    txt: (p) => `${i18n.t('sameMatch')}`,
    img: InfoTriangular,
    tw: 'bg-[#454545]',
  },
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

export default function HandleError({
  jumpLine,
  isSeries,
  oddChange,
  amount,
  data,
}) {
  const { duplicateMatchIds } = useBetRules();
  const { isAcceptOddChange } = useSelector((s) => s.betCart);
  const { t } = useTranslation();
  const betErrorString = t('betError');

  return (
    <>
      {(jumpLine?.ss === -1 || jumpLine?.op?.od == -999) && (
        <BetError title={betErrorString} type={ErrorType.Expire} />
      )}
      {!isSeries && jumpLine?.smin > amount && (
        <BetError
          title={betErrorString}
          type={ErrorType.Min}
          data={jumpLine?.smin}
        />
      )}
      {!isSeries && jumpLine?.smax < amount && jumpLine?.smax != 0 && (
        <BetError
          title={betErrorString}
          type={ErrorType.Max}
          data={jumpLine?.smax}
        />
      )}
      {jumpLine?.au != 1 && isSeries && (
        <BetError title={betErrorString} type={ErrorType.NoParley} />
      )}
      {oddChange > 0 && !isAcceptOddChange && (
        <BetError title={betErrorString} type={ErrorType.OddChange} />
      )}
      {isSeries && duplicateMatchIds?.includes(data?.matchId) && (
        <BetError title={betErrorString} type={ErrorType.SameMatch} />
      )}
    </>
  );
}
export const HandleMinMax = ({ isSeries, jumpLine, amount }) => {
  return (
    <>
      {!isSeries &&
        ((jumpLine?.smin > amount && jumpLine?.smin != 0) ||
          (amount > jumpLine?.smax && jumpLine?.smax != 0)) && (
          <p className='text-tayaRed text-xs'>
            {jumpLine?.smin} - {formatCreditWholeNum(jumpLine?.smax)}
          </p>
        )}
    </>
  );
};
