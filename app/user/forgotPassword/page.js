'use client';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { BtnContinue } from '@/componentsH5/loginLayout/BtnContinue';
import { LoginContentError } from '@/componentsH5/loginLayout/LoginContentError';
import { LoginContentMobile } from '@/componentsH5/loginLayout/LoginContentMobile';
import { OTP } from '@/componentsH5/OTP/page';

import { ActionType, getSMSOtp, loginWithOtp } from '@/services/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function ForgotPassword({ children }) {
  const router = useRouter();
  const [isMobileValid, setMobileValidated] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [mobileErrMsg, setMobileErrMsg] = useState('');
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const { t } = useTranslation();

  const onContinue = () => {
    if (isRecaptchaValid) {
      getSMSOtp(
        selectedCountry.code,
        phoneNum,
        ActionType.setPassword,
        true
      ).then((data) => {
        console.log('$$smsotp', data);
        if (data.code === 0) {
          setShowOtp(true);
        } else {
          setMobileErrMsg(data?.msg);
        }
      });
    }
  };

  const loginWithOtpAction = (otp) => {
    if (otp) {
      // send api
      const param = {
        country_code: selectedCountry.code,
        mobile: phoneNum,
        otp: otp,
      };
      loginWithOtp(param).then((data) => {
        if (data.code === 0) {
          if (data.data.setup_required === true) {
            // todo need setup
            // setModalNum(ProfileMenuConstantType.UsernameModal);
          } else {
            router.push('/user/resetPassword');
            // } else if (isForgotPass) {
            //   setModalNum(ProfileMenuConstantType.ForgotPassSetPassModal);
            // } else {
            //   setModalNum(ProfileMenuConstantType.CloseAll);
          }
        } else {
          setOtpError(data.msg);
        }
      });

      setShowOtp(false);
    } else {
      // simply close
      setShowOtp(false);
    }
  };

  return (
    <FullPageContent>
      <NavHeader label={'forgotPassword'} />
      <div className='p-8 flex flex-1 flex-col gap-[18px]'>
        <div className='text-[35px] font-bold text-white'>
          {t('resetPassword')}
        </div>
        <div className='text-[15px] font-normal text-white'>
          {t('pleaseEnterMobileNumberWhere')} {t('eastrich')}{' '}
          {t('canSendYouAVerificationCode')}
        </div>
        <LoginContentMobile
          isError={mobileErrMsg}
          setPhoneNum={setPhoneNum}
          setMobileValidated={setMobileValidated}
          setSelectedCountry={setSelectedCountry}
        />
        <LoginContentError errorMsg={mobileErrMsg} />
        <BtnContinue
          isDisabled={!isMobileValid || !selectedCountry || !isRecaptchaValid}
          onClick={onContinue}
        />
      </div>
      {/* todo h5 otp */}
      {showOtp && (
        <OTP
          countryCode={selectedCountry.code}
          phoneNum={phoneNum}
          sendToTxt={`${selectedCountry.code} ${phoneNum}`}
          onNext={(otp) => loginWithOtpAction(otp)}
          otpError={otpError}
        />
      )}
    </FullPageContent>
  );
}
