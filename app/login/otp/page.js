'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Stopwatch } from '@/asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  loginEmail,
  loginRequestEmailOtp,
  loginRequestSmsOtp,
  loginSms,
} from '@/services/yingshiUser';
import {
  setAhaToken,
  setYingshiUserLoginParam,
  setYingshiUserToken,
  setYingshiUserInfo
} from '@/store/yingshiUser';
import { useLoginSuccessOpen } from '@/hook/yingshiScreenState/useLoginSuccessOpen';
import {trackLoginSignUp} from '@/util/universalEvent';

const totalCountdownTime = 60; // seconds

export default function OTP() {
  const router = useRouter();

  //redux
  const dispatch = useDispatch();
  const getLoginParam = (s) => s.yingshiUser.loginParam;
  const loginParam = useSelector(getLoginParam);

  // refs
  const timerRef = useRef(null);
  const inputRefs = useRef([]);
  const otpRef = useRef(new Array(6).fill(''));

  // state
  const [countdownTimer, setCountdownTimer] = useState(totalCountdownTime);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, setOpenLoginSuccess] = useLoginSuccessOpen();

  //computed
  const minutes = Math.floor(countdownTimer / 60);
  const seconds = countdownTimer % 60;

  const handleResendOTP = () => {
    setCountdownTimer(totalCountdownTime);
    if (loginParam.loginMode === 'sms') {
      loginRequestSmsOtp(loginParam);
    } else {
      loginRequestEmailOtp(loginParam);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdownTimer((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (inputRefs.current.length !== 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!loginParam) router.push('/');
  });

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = ''; // Discard non-numeric input
      return;
    }

    setErrorMessage('');
    let newArr = [...otpRef.current];
    newArr[index] = value;
    otpRef.current = newArr;

    if (value && index < inputRefs.current.length - 1) {
      if (value !== '') {
        inputRefs.current[index + 1].focus();
      }
    } else if (value && index === inputRefs.current.length - 1) {
      if (value !== '') {
        if (loginParam.loginMode === 'sms') {
          loginSms({ ...loginParam, otp: otpRef.current.join('') }).then(
            (res) => {
              if (res.code === -1) {
                setErrorMessage(res.message);
                return;
              }

              dispatch(
                setYingshiUserLoginParam({ ...loginParam, success: true })
              );
              dispatch(setYingshiUserInfo(res.data.user))
              dispatch(setYingshiUserToken(res.data.access_token));
              dispatch(setAhaToken(res.data.aha_token));
              localStorage.setItem('AuthToken', res.data.aha_token);
              trackLoginSignUp(res.data.user);
              
              ;
              if (res.code === 0) {
                router.back();
                setOpenLoginSuccess(true);
                setTimeout(() => {
                  setOpenLoginSuccess(false);
                }, 2000);
              }
              if (res.code === 201) {
                router.back();
                setOpenLoginSuccess(true);
                setTimeout(() => {
                  setOpenLoginSuccess(false);
                }, 2000);
              }
            }
          );
        } else {
          loginEmail({ ...loginParam, otp: otpRef.current.join('') }).then(
            (res) => {
              if (res.code === -1) {
                setErrorMessage(res.message);
                return;
              }

              dispatch(
                setYingshiUserLoginParam({ ...loginParam, success: true })
              );
              dispatch(setYingshiUserInfo(res.data.user))
              dispatch(setYingshiUserToken(res.data.access_token));
              dispatch(setAhaToken(res.data.aha_token));
              localStorage.setItem('AuthToken', res.data.aha_token);
              trackLoginSignUp(res.data.user);

              if (res.code === 0) {
                router.back();
                setOpenLoginSuccess(true);
                setTimeout(() => {
                  setOpenLoginSuccess(false);
                }, 2000);
              }
              if (res.code === 201) {
                router.back();
                setOpenLoginSuccess(true);
                setTimeout(() => {
                  setOpenLoginSuccess(false);
                }, 2000);
              }
            }
          );
        }
      }
    }
  };

  return (
    <>
      {loginParam && loginParam.loginMode && (
        <div className={'w-screen flex flex-col align-center absolute'}>
          {loginParam.loginMode === 'email' && (
            <>
              <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
                输入邮箱验证码
              </p>
              <p className={'text-center text-[14px]'}>
                验证码已发送至{' '}
                <span className={'text-[#FAC33D]'}>{loginParam.email}</span>
              </p>
              <p className={'text-center text-[14px] mb-[26px]'}>
                如果没有收到邮件，请检查垃圾邮箱
              </p>
            </>
          )}
          {loginParam.loginMode === 'sms' && (
            <>
              <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
                输入OTP验证码
              </p>
              <p className={'text-center text-[14px] mb-[26px]'}>
                验证码已发送至{' '}
                <span className={'text-[#FAC33D]'}>
                  +{loginParam.phoneNumber}
                </span>
              </p>
            </>
          )}
          <div className='otp-container'>
            <div className='otp-inputs'>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <OtpInput
                  key={index}
                  onKeyPress={(e) => handleBackspace(e, index)}
                  onChange={(e) => handleChange(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  isError={!!errorMessage}
                />
              ))}
            </div>
          </div>

          {errorMessage && (
            <p className={'text-[#FF1010] text-[13px] px-[36px] pt-2'}>
              {errorMessage}
            </p>
          )}
          <div className={'flex my-12 justify-center'}>
            {countdownTimer === 0 && (
              <button
                className={'text-[17px] font-semibold text-[#FAC33D]'}
                onClick={handleResendOTP}
              >
                重新发送验证码
              </button>
            )}
            {countdownTimer !== 0 && (
              <div className={'flex gap-[3px] justify-center items-center'}>
                <Image
                  src={Stopwatch}
                  width={26}
                  height={26}
                  alt={'timer icon'}
                />
                <span className={'text-[#9C9C9C] font-semibold w-[50px]'}>
                  {minutes.toString().padStart(2, '0')}:
                  {seconds.toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const OtpInput = forwardRef(function OtpInput(
  { onKeyPress, onChange, isError },
  ref
) {
  return (
    <input
      onKeyDown={onKeyPress}
      onChange={onChange}
      ref={ref}
      className={`otp-input ${isError ? 'error' : ''}`}
      maxLength={1}
      type={'tel'}
      inputMode='numeric'
      pattern='[0-9]*'
    />
  );
});
