'use client';
import SuccessModal from '@/components/profileMenu/account/components/changePassword/components/successModal';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { OTP } from '@/componentsH5/OTP/page';
import { WithdrawPinModal } from '@/componentsH5/withdrawPinModal';
import useUser from '@/hook/user/useUser';
import { ActionType, getSMSOtp, setSecondaryPwd } from '@/services/user';
// import { setSecondaryPwd } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export default function Page() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [successfullySetPwd, setSuccessfullySetPwd] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  // const { user } = useSelector((s) => s.user);
  const { user } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const onRequestOtp = useCallback(() => {
    getSMSOtp(
      user?.country_code,
      user?.mobile,
      ActionType.setSecondaryPassword
    ).then((d) => {
      console.log('$$smsotp', d);
      if (d.code === 0) {
        setShowOtp(true);
      } else {
        setIsInvalid(true);
        setErrorMsg(d.msg);
      }
    });
  }, [user]);

  const valOnChange = (val) => {
    setIsInvalid(false);

    if (!isConfirm) {
      setPin(val);
      if (val.length == 6) {
        setConfirm(true);
      }
    } else {
      setConfirmPin(val);
      if (val.length == 6) {
        if (pin === val) {
          onRequestOtp();
        } else {
          setIsInvalid(true);
        }
      }
    }
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
        label={t('setUpPin')}
        val={isConfirm ? confirmPin : pin}
        valOnChange={valOnChange}
        title={isConfirm ? t('confirmPin') : t('setUpPin')}
        desc={
          isConfirm
            ? t('pleaseReenterYourPinToConfirmAndProceed')
            : t('enterYourPinToSecureAccountAndAuthorizeWithdrawals')
        }
        isInvalid={isInvalid}
      />

      {isInvalid && (
        <p className='px-10 mt-3 text-[#DE173E] text-[15px]'>
          {errorMsg ? errorMsg : t('pinsDoNotMatch')}
        </p>
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
        <FullPageContent>
          <SuccessModal
            message={t('pinSetUpSuccessfully')}
            setModalOpen={() => {
              router.back();
            }}
          />
        </FullPageContent>
      )}
    </FullPageContent>
  );
}
