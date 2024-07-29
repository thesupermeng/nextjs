'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { setOtp as setOtpAction, setOtpProp } from '@/store/user';
import { CrossWhite } from '@/asset/icons';
import Image from 'next/image';
import { OTPContent } from './OtpContent';
import FullScreenModal from '../FullScreenModal';
import { useWindowListener } from '@/hook/useWindowListener';

export const OTPModal = () => {
  const { countryCode, phoneNum, actionType } = useSelector(
    (s) => s.user.otpProp
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  useWindowListener('otpError', () => {
    setOtpErrorMessage(window.otpError);
  });

  useEffect(() => {
    if (!phoneNum) {
      setOtpErrorMessage('');
    }
  }, [phoneNum]);

  if (!phoneNum) {
    return null;
  }
  return (
    <>
      <FullScreenModal>
        <div className='relative flex-initial flex flex-col rounded-3xl bg-[#121212] p-7'>
          <Image
            alt='close'
            src={CrossWhite}
            className='cursor-pointer z-10 w-10 h-10 opacity-20 absolute top-[20px] right-[20px]  hover:opacity-100'
            onClick={() => dispatch(setOtpProp({}))}
          />
          <div className='text-xl  font-bold text-center'>
            {t('enterVerificationCode')}
          </div>
          <OTPContent
            countryCode={countryCode}
            phoneNum={phoneNum}
            otpError={otpErrorMessage}
            actionType={actionType}
          />
        </div>
      </FullScreenModal>
    </>
  );
};
