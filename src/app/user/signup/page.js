'use client';
import { LoginLayout } from '@/componentsH5/loginLayout/LoginLayout';
import { OTP } from '@/componentsH5/OTP/page';
import { loginWithOtp } from '@/services/user';
import { setUserMobileInfo } from '@/store/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);
  const { mobileInfo } = useSelector((s) => s.user);
  useEffect(() => {
    dispatch(setUserMobileInfo(null));
  }, []);

  const onFinish = async (otp) => {
    const param = {
      country_code: mobileInfo?.selectedCountry?.code,
      mobile: mobileInfo?.phoneNum,
      otp,
    };

    loginWithOtp(param).then((data) => {
      if (data.code === 0) {
        if (data.data.setup_required === true) {
          router.push('/user/finish_setup');
        } else {
          router.back();
        }
      } else {
        //todo show login error
      }
    });
  };
  return (
    <>
      <LoginLayout
        type='signup'
        onNext={() => {
          setShowOtp(true);
        }}
      ></LoginLayout>

      {/* todo h5 otp */}
      {showOtp && mobileInfo && (
        <OTP
          countryCode={mobileInfo?.selectedCountry?.code}
          phoneNum={mobileInfo?.phoneNum}
          sendToTxt={`${mobileInfo?.selectedCountry.code} ${mobileInfo?.phoneNum}`}
          onNext={(otp) => onFinish(otp)}
          // otpError={otpError}
        />
      )}
    </>
  );
}
