import BottomSheet from '@/componentsH5/bottomSheet';
import { QuickBetSlider } from '@/componentsH5/quickBet';
import { QuickTopUpSlider } from '@/componentsH5/quickTopUpSlider';
import { showQuickBet, showQuickTopUp } from '@/store/common';
import { selectProfileMenu } from '@/store/profile';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ErLivechat } from '../privateMsgRoom';
import { togglePrivateRoom } from '@/store/livechat';

export const BottomPerpetual = () => {
  const dispatch = useDispatch();
  const { quickTopUp } = useSelector((e) => e.common);
  const { t } = useTranslation();
  const quickBet = useSelector((s) => s.common.quickBet);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const privateRoom = useSelector((s) => s.livechat.privateRoom);
  useEffect(() => {
    quickTopUp && dispatch(selectProfileMenu(1));
  }, [quickTopUp]);
  return (
    <>
      <BottomSheet
        isOpen={quickBet}
        toggleSheet={() => dispatch(showQuickBet(!quickBet))}
        title={t('quickBet')}
        className='!h-[580px] !p-0 !pt-3 '
      >
        <QuickBetSlider />
      </BottomSheet>
      <BottomSheet
        isOpen={quickTopUp}
        toggleSheet={() => dispatch(showQuickTopUp(!quickTopUp))}
        title={t('topUp')}
        className='!h-[550px] !pt-4 !p-0'
      >
        <QuickTopUpSlider
          topUpAmount={topUpAmount}
          setTopUpAmt={setTopUpAmount}
          // topUpMinAmount={topUpMinAmount}
        />
      </BottomSheet>

      <BottomSheet
        toggleSheet={() => dispatch(togglePrivateRoom(!privateRoom))}
        isOpen={privateRoom}
        className='!h-[550px] !pt-4 !p-0 bg-[#0E0F11]'
      >
        <ErLivechat />
      </BottomSheet>
    </>
  );
};
