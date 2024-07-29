'use client';
import FullScreenModal from '@/components/FullScreenModal';
import { OTPComp } from '@/components/OTPComp/page';
import { WithdrawModalType } from '@/components/profileMenu';
import useUser from '@/hook/user/useUser';
import { ActionType, checkOtp, setSecondaryPwd } from '@/services/user';
import { setWithdrawModal } from '@/store/common';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

export default function VerifyOtp({ isSetPin = false }) {
  const dispatch = useDispatch();
  const { secondaryPwd } = useSelector((s) => s.user);
  const { user } = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();

  const onContinueClick = (otp) => {
    checkOtp({ otp: otp, action: ActionType.setSecondaryPassword }).then(
      (data) => {
        if (data.code === 0) {
          setUpPin(otp);
        } else {
          setErrorMsg(data.msg);
        }
      }
    );
  };

  const setUpPin = (otp) => {
    setSecondaryPwd({ otp: otp, secondary_password: secondaryPwd }).then(
      (d) => {
        if (d.code === 0) {
          dispatch(
            setWithdrawModal(WithdrawModalType.SuccessfullySetUpPinModal)
          );
        } else {
          //TODO: failed error
        }
      }
    );
  };

  const otpOnChange = (otp) => {
    if (otp.length >= 6) {
      if (isSetPin) {
        onContinueClick(otp);
      } else {
        dispatch(setWithdrawModal(WithdrawModalType.ResetPinModal));
      }
    }
  };

  return (
    <FullScreenModal>
      <div className='flex-initial flex flex-col rounded-3xl bg-[#121212] p-7'>
        <div className='text-xl  font-bold text-center'>
          {t('enterVerificationCode')}
        </div>
        <OTPComp
          countryCode={user?.country_code}
          phoneNum={user?.mobile}
          onNext={(otp) => {
            otpOnChange(otp);
          }}
          action={ActionType.setSecondaryPassword}
          otpError={errorMsg}
        />
      </div>
    </FullScreenModal>
  );
}
