'use client';
import { WithdrawConfirm } from '@/components/profileMenu/topUpSlider/components/withdrawConfirm';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { WithdrawPinModal } from '@/componentsH5/withdrawPinModal';
import { sendWithdrawOrder } from '@/services/user';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export default function Page() {
  const [pin, setPin] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [withdrawSent, setWithdrawSent] = useState(false);
  const { selectedAcc, withdrawAmt } = useSelector((s) => s.withdraw);
  const { t } = useTranslation();

  const valOnChange = (val) => {
    setIsInvalid(false);
    setPin(val);
    if (val.length == 6) {
      sendOrder(val);
    }
  };

  const sendOrder = (val) => {
    sendWithdrawOrder({
      amount: withdrawAmt,
      account_binding_id: selectedAcc?.id,
      secondary_password: val,
    }).then((data) => {
      if (data.code === 0) {
        setWithdrawSent(true);
      } else {
        setIsInvalid(true);
        setErrorMsg(data?.msg);
      }
    });
  };

  return (
    <FullPageContent>
      <WithdrawPinModal
        label={t('withdraw')}
        val={pin}
        valOnChange={valOnChange}
        title={t('enterPin')}
        desc={t('pleaseEnterYourPinToProceedWithTheWithdrawal')}
        isForgotPin={true}
        isInvalid={isInvalid}
      />

      {isInvalid && (
        <p className='px-10 mt-3 text-[#DE173E] text-[15px]'>{errorMsg}</p>
      )}

      {withdrawSent && (
        <FullPageContent>
          <WithdrawConfirm />
        </FullPageContent>
      )}
    </FullPageContent>
  );
}
