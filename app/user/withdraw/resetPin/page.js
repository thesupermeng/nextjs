'use client';
import SuccessModal from '@/components/profileMenu/account/components/changePassword/components/successModal';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { OTP } from '@/componentsH5/OTP/page';
import { WithdrawPinModal } from '@/componentsH5/withdrawPinModal';
import useUser from '@/hook/user/useUser';
import { ActionType, getSMSOtp, setSecondaryPwd } from '@/services/user';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export default function Page() {
  const [pin, setPin] = useState('');
  const [reenterPin, setReenterPin] = useState('');
  const [successfullySetPwd, setSuccessfullySetPwd] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [reenter, setReenter] = useState(false);
  // const { otp } = useSelector((s) => s.user);
  const router = useRouter();
  const { user } = useUser();
  const { t } = useTranslation();

  const valOnChange = (val) => {
    setIsInvalid(false);
    reenter ? setReenterPin(val) : setPin(val);
    if (val.length == 6) {
      setReenter(true);
      if (val === pin) {
        // setUpPin(val);
        onRequestOtp();
      }
    }
  };

  const onRequestOtp = () => {
    getSMSOtp(
      user?.country_code,
      user?.mobile,
      ActionType.setSecondaryPassword
    ).then((d) => {
      console.log('$$smsotp', d);
      setShowOtp(true);
    });
  };

  const setUpPin = (otp) => {
    setSecondaryPwd({ otp: otp, secondary_password: pin }).then((d) => {
      if (d.code === 0) {
        setSuccessfullySetPwd(true);
      } else {
        setErrorMsg(d.msg);
      }
    });
  };
  return (
    <FullPageContent>
      <WithdrawPinModal
        label={t('resetPin')}
        val={reenter ? reenterPin : pin}
        valOnChange={valOnChange}
        title={reenter ? t('reEnterNewPin') : t('enterNewPin')}
        desc={t('enterYourNewPin')}
        isInvalid={isInvalid}
      />

      {isInvalid && (
        <p className='px-10 mt-3 text-[#DE173E] text-[15px]'>{errorMsg}</p>
      )}
      {/* todo h5 otp */}
      {showOtp && (
        <OTP
          countryCode={user?.country_code}
          phoneNum={user?.mobile}
          sendToTxt={`${user?.country_code} ${user?.mobile}`}
          onNext={(otp) => setUpPin(otp)}
          otpError={errorMsg}
        />
      )}

      {successfullySetPwd && (
        <SuccessModal
          message={t('pinResetSuccessfully')}
          setModalOpen={() => {
            router.push('/user/security');
          }}
        />
      )}
    </FullPageContent>
  );
}
