import FullScreenModal from '@/components/FullScreenModal';
import { OTPComp } from '@/components/OTPComp/page';
import { ActionType, getSMSOtp, loginWithOtp } from '@/services/user';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ProfileMenuConstantType } from '..';
import { CrossWhite } from '@/asset/icons';
import Image from 'next/image';
import { LocalStorageKeys } from '@/config/common';

const OtpModal = ({
  setModalNum,
  countryCode = 0,
  phoneNum = 0,
  emitOtp = null,
  isForgotPass = false,
  username = '',
}) => {
  const [otp, setOtp] = useState('');
  const [isExpired, setExpired] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [countdownSec, setCountdownSec] = useState(180);
  const [reqOtp, setReqOtp] = useState(true);
  const { t } = useTranslation();

  const onRequestOtp = (event) => {
    getSMSOtp(countryCode, phoneNum, ActionType.login).then((d) => {
      console.log('$$smsotp', d);
      setExpired(false);
      setReqOtp(true);
    });
  };

  const otpOnChange = (otp) => {
    setOtp(otp);
    setIsInvalid(false);
    setErrorMsg('');

    if (emitOtp !== null) {
      emitOtp(otp);
    }

    if (otp.length == 6) {
      const param = {
        username: username,
        country_code: countryCode,
        mobile: username ? '' : phoneNum,
        otp: otp,
        currency_id: sessionStorage.getItem(LocalStorageKeys.SiteCurrency),
      };

      loginWithOtp(param).then((data) => {
        if (data.code === 0) {
          if (data.data.setup_required === true) {
            setModalNum(ProfileMenuConstantType.UsernameModal);
          } else if (isForgotPass) {
            setModalNum(ProfileMenuConstantType.ForgotPassSetPassModal);
          } else {
            setModalNum(ProfileMenuConstantType.CloseAll);
          }
        } else {
          setIsInvalid(true);
          setErrorMsg(data.msg);
        }
      });
    }
  };

  return (
    <FullScreenModal>
      <div className='relative flex-initial flex flex-col rounded-3xl bg-[#121212] p-7'>
        <Image
          alt='close'
          src={CrossWhite}
          className='cursor-pointer z-10 w-10 h-10 opacity-20 absolute top-[20px] right-[20px]  hover:opacity-100'
          onClick={() => setModalNum(ProfileMenuConstantType.CloseAll)}
        />
        <div className='text-xl  font-bold text-center'>
          {t('enterVerificationCode')}
        </div>
        <OTPComp
          countryCode={countryCode}
          phoneNum={phoneNum}
          onNext={(otp) => {
            otpOnChange(otp);
          }}
          onResend={() => {
            onRequestOtp();
          }}
          otpError={errorMsg}
        />
      </div>
    </FullScreenModal>
  );
};

export default OtpModal;
