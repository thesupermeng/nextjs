'use client';
import SuccessModal from '@/components/profileMenu/account/components/changePassword/components/successModal';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { OTP } from '@/componentsH5/OTP/page';
import useUser from '@/hook/user/useUser';
import { ActionType, checkOtp, setSecondaryPwd } from '@/services/user';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [otpError, setOtpError] = useState('');
  const { otp, secondaryPwd } = useSelector((s) => s.user);
  const [successfullySetPwd, setSuccessfullySetPwd] = useState(false);
  const searchParams = useSearchParams();
  const reset = searchParams.get('reset');
  const { t } = useTranslation();

  const onContinueClick = (otp) => {
    checkOtp({ otp: otp, action: ActionType.setSecondaryPassword }).then(
      (data) => {
        if (data.code === 0) {
          reset ? router.push('/user/withdraw/resetPin') : setUpPin();
        } else {
          setOtpError(data.msg);
        }
      }
    );
  };

  const setUpPin = () => {
    setSecondaryPwd({ otp: otp, secondary_password: secondaryPwd }).then(
      (d) => {
        if (d.code === 0) {
          setSuccessfullySetPwd(true);
        } else {
          //TODO: failed error
        }
      }
    );
  };

  return (
    <>
      {/* todo h5 otp */}
      <OTP
        countryCode={user?.country_code}
        phoneNum={user?.mobile}
        sendToTxt={`${user?.country_code} ${user?.mobile}`}
        onNext={onContinueClick}
        otpError={otpError}
      />

      {successfullySetPwd && (
        <FullPageContent>
          <SuccessModal
            message={t('pinSetUpSuccessfully')}
            setModalOpen={() => {
              router.push('/user/withdraw');
            }}
          />
        </FullPageContent>
      )}
    </>
  );
}
