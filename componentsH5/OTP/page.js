'use client';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { OTP_RESEND_INTERVAL } from '@/config/User/setting';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { getSMSOtp, loginWithOtp } from '@/services/user';
import { setOtp as setOtpAction } from '@/store/user';
import { useParams } from 'next/navigation';
import { FullPageContent } from '../FullPageContent';
// import { ProfileMenuConstantType } from '..';

export const OTP = ({
  countryCode,
  phoneNum,
  onNext = () => {},
  emitOtp = null,
  otpError,
  onResend = null,
  action,
  // isForgotPass = false,
}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [isExpired, setExpired] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [countdownSec, setCountdownSec] = useState(OTP_RESEND_INTERVAL);
  const [reqOtp, setReqOtp] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (reqOtp) {
      setExpired(false);

      let sec = OTP_RESEND_INTERVAL;
      setCountdownSec(sec);
      const interval = setInterval((value) => {
        if (sec > 0) {
          sec--;
          setCountdownSec(sec);
        }

        if (sec == 0) {
          setExpired(true);
          setReqOtp(false);
          clearInterval(interval);
        }

        //console.log(sec)
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [reqOtp]);

  const onRequestOtp = (event) => {
    getSMSOtp(countryCode, phoneNum, action).then((d) => {
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
      dispatch(setOtpAction(otp));
      onNext(otp);
    }
  };

  return (
    <FullPageContent>
      <NavHeader label={t('enterVerificationCode')} />
      {countryCode && phoneNum ? (
        <div className='flex-1 flex flex-col rounded-3xl bg-[#121212] p-5'>
          <div className='text-lg font-normal mt-10'>
            {t('enterThe6DigitsCodeToSentTo')}
          </div>
          <div className='text-lg mt-1 font-semibold text-tayaRed'>
            {countryCode} {phoneNum}
          </div>
          <OTPInput
            inputType='number'
            value={otp}
            onChange={otpOnChange}
            numInputs={6}
            containerStyle={'justify-center mt-2'}
            renderInput={(props) => (
              <input
                {...props}
                type='text'
                className={`rounded-md !w-12 h-12 px-3 py-2 mx-1 text-tayaRed ${
                  otp.length === 6 && isInvalid
                    ? 'bg-tayaRed/[.12]'
                    : 'bg-tayaGrey'
                }`}
              />
            )}
          />
          {otp.length === 6 && isInvalid && (
            <p className='text-[0.8125rem] text-tayaRed mt-2'>{errorMsg}</p>
          )}
          {otpError && (
            <p className='text-[0.8125rem] text-tayaRed mt-2'>{otpError}</p>
          )}
          {isExpired ? (
            <button
              onClick={() => {
                onResend?.() || onRequestOtp();
              }}
              className='block mx-auto w-80 mt-5 rounded-md h-11 tayagradient'
            >
              {t('resendOtp')}
            </button>
          ) : (
            <button
              className='block mx-auto w-80 mt-5 rounded-md h-11 tayagradient opacity-50'
              disabled
            >
              {t('resendOtp')} {countdownSec}s
            </button>
          )}
        </div>
      ) : (
        <div>{t('noCountryCodeOrPhoneNumber')}</div>
      )}
    </FullPageContent>
  );
};
