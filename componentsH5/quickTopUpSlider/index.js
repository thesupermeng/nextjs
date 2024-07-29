import AbsoluteModal from '@/components/profileMenu/topUpSlider/components/absoluteModal/absoluteModal';
import { BalanceHeader } from '@/components/profileMenu/topUpSlider/components/balanceHeader';
import { QuickSelector } from '@/components/profileMenu/topUpSlider/components/quickSelector';
import TopUpMethod from '@/components/profileMenu/topUpSlider/components/topUpMethod';
import React from 'react';
import { useTranslation } from 'next-i18next';
import CustomTopUpAmt from '@/components/profileMenu/topUpSlider/components/customTopUpAmt';

export const QuickTopUpSlider = ({
  topUpAmount,
  setTopUpAmt,
  topUpMinAmount,
}) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col flex-1'>
      <div className='flex flex-col  overflow-y-auto flex-[1_0_0] mt-3 px-3 gap-3'>
        <BalanceHeader />
        <CustomTopUpAmt selectedAmt={topUpAmount} setTopUpAmt={setTopUpAmt} />
        <QuickSelector
          topUpAmount={topUpAmount}
          setTopUpAmt={setTopUpAmt}
          topUpMinAmount={topUpMinAmount}
        />
        <TopUpMethod />
      </div>
      {topUpMinAmount && (
        <div className='bg-[#144E78] px-3 text-xs py-3'>
          {topUpMinAmount}{' '}
          {t('isTheTopUpAmountRequiredToProceedWithYourBetting')}
        </div>
      )}
      <AbsoluteModal
        amount={topUpAmount}
        profileMenuSelected={1}
        isDisabled={topUpAmount <= 0}
      />
    </div>
  );
};
