'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Stopwatch } from '@/asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useLoginSuccessOpen } from '@/hook/yingshiScreenState/useLoginSuccessOpen';
import PinHeader from './../../components/pinHeader';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { YingshiApi, YingshiApi2 } from '@/util/YingshiApi';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { setUserInfo } from '@/store/user';
import {
  setShowLogin,
  setShowLoginSuccess,
  setShowPinSuccess,
} from '@/store/yingshiScreen';
// import { setsEqual } from 'chart.js/dist/helpers/helpers.core';
const totalCountdownTime = 60; // seconds

function formatPhoneNumber(phone) {
  const phoneStr = phone.toString();
  let formattedPhone;

  if (phoneStr.startsWith('+')) {
    const countryCode = phoneStr.slice(1, 4);
    const part1 = phoneStr.slice(4, 7);
    const part2 = phoneStr.slice(7, 11);
    formattedPhone = `+${countryCode} ${part1} ${part2}`;
  } else {
    const countryCode = phoneStr.slice(0, 3);
    const part1 = phoneStr.slice(3, 6);
    const part2 = phoneStr.slice(6, 10);
    formattedPhone = `+${countryCode} ${part1} ${part2}`;
  }

  return formattedPhone;
}

export default function OTP() {
  const router = useRouter();

  const [firstPin, setFirstPin] = useState('');
  const [secondPin, setSecondPin] = useState('');
  const [userContact, setUserContact] = useState('');

  // const [otp, setOtp] = useState('')

  let otpValue = '';
  //redux
  const dispatch = useDispatch();
  // const getLoginParam = (s) => s.yingshiUser.loginParam
  // const loginParam = useSelector(getLoginParam)
  const { userInfo } = useYingshiUser();

  const [resetMode, setResetMode] = useState(null); // setpin | resetpin | otp

  useEffect(() => {
    if (userInfo.aha_withdrawal_pin == 0) {
      setResetMode('setpin');
    } else {
      setResetMode('resetpin');
    }
  }, []);

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

    YingshiApi2(
      URL_YINGSHI_VOD.setAhaWithdrawalPin,
      {
        pin: firstPin,
        otp: '',
      },
      { method: 'POST' }
    );
  };

  const resetCountDownHandler = () => {
    setResetMode('otp');
    setCountdownTimer(totalCountdownTime);
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

  // useEffect(() => {
  //     if (!loginParam) router.push('/')
  // })

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const setUserPin = async () => {
    try {
      let res = await YingshiApi2(
        URL_YINGSHI_VOD.setAhaWithdrawalPin,
        {
          pin: firstPin,
          otp: otpValue,
        },
        { method: 'POST' }
      );

      if (
        res.message == '验证码已发送，请稍后再试，验证码请求限制为每分钟一次'
      ) {
        setErrorMessage('验证码已发送，请稍后再试，验证码请求限制为每分钟一次');
        return;
      }

      if (resetMode == 'otp' && res.message == 'Invalid OTP') {
        setErrorMessage('验证码不正确');
        return;
      }

      if (resetMode == 'otp' && res.message == '成功') {
        setErrorMessage('');
        // success change pin

        sessionStorage.setItem('loginMsg', '安全PIN码设置成功');
        let userInfoTemp = { ...userInfo };
        userInfoTemp.aha_withdrawal_pin = firstPin;

        dispatch(setUserInfo({ ...userInfoTemp }));

        dispatch(setShowPinSuccess(true));

        setTimeout(() => {
          dispatch(setShowPinSuccess(false));
        }, 2100);

        router.back();
        // router.replace(`/myprofile`);
      }
    } catch (err) {
      if (resetMode == 'otp') {
        setErrorMessage('验证码不正确');
      }
    }
  };

  const resetInput = () => {
    otpRef.current = new Array(6).fill('');
    inputRefs.current.forEach((input) => {
      input.value = '';
    });
    inputRefs.current[0].focus();
  };
  //      loginEmail({...loginParam, otp: otpRef.current.join('')})

  //  YingshiApi(URL_YINGSHI_VOD.homeGetNav, {}, { method: 'GET' });

  const handleChange = (value, index) => {
    const temp = value.target.value;
    if (!/^\d*$/.test(temp)) {
      value.target.value = '';
    }

    setErrorMessage('');
    let newArr = [...otpRef.current];
    newArr[index] = value.target.value;
    otpRef.current = newArr;

    if (value && index < inputRefs.current.length - 1) {
      if (value.target.value !== '') {
        inputRefs.current[index + 1].focus();
      }
    } else if (value && index === inputRefs.current.length - 1) {
      //to do chatGPT
      // reset otpRef

      if (value.target.value !== '' || secondPin == '') {
        if (firstPin == '') {
          let temp = otpRef.current.join('');
          setFirstPin(temp);
          resetInput();
          return;
        }

        let temp2 = otpRef.current.join('');

        if (firstPin != temp2 && resetMode != 'otp') {
          setErrorMessage('PIN码不一致');
          return;
        }
        // can remove
        if (resetMode != 'otp') {
          setSecondPin(temp2);
        }

        setErrorMessage('');

        if (resetMode != 'otp') {
          resetInput();
          resetCountDownHandler();
        } else {
          // setOtp(temp2)
          otpValue = temp2;
        }

        setUserPin();
        //      loginEmail({...loginParam, otp: otpRef.current.join('')})

        //  YingshiApi(URL_YINGSHI_VOD.homeGetNav, {}, { method: 'GET' });
      }
    }
  };

  return (
    // full width and full height

    <>
      <div className='mobile'>
        <PinHeader topicName={'安全PIN码'} />

        <div style={{ height: '52px' }}></div>
      </div>

      {(resetMode == 'setpin' || resetMode == 'resetpin') && (
        <div
          style={{ marginTop: '52px' }}
          className={'w-screen flex flex-col align-center '}
        >
          {resetMode == 'setpin' && (
            <>
              {firstPin == '' && (
                <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
                  设置安全PIN码
                </p>
              )}
              {firstPin != '' && (
                <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
                  确认安全PIN码
                </p>
              )}
              <p className={'text-center text-[14px] mb-[26px] text-secondary'}>
                请输入6位数字的安全PIN码, 以保障您的交易安全
              </p>
            </>
          )}
          {resetMode == 'resetpin' && (
            <>
              <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
                修改安全PIN码
              </p>
              <p className={'text-center text-[14px] mb-[26px] text-secondary'}>
                请输入6位数字的安全PIN码, 以保障您的交易安全
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
        </div>
      )}

      {/* otp here  */}
      {resetMode == 'otp' && (
        <div
          style={{ marginTop: '52px' }}
          className={'w-screen flex flex-col align-center '}
        >
          <p className={'text-center text-[22px] mb-[13px] mt-[40px]'}>
            输入OTP验证码
          </p>
          <p className={'text-center text-[14px]'}>
            验证码已发送至
            <span className={'text-[#FAC33D]'}>
              &nbsp;
              {userInfo.user_email && userInfo.user_email}
              {userInfo.user_phone !== 0 &&
                userInfo.user_phone !== '0' &&
                userInfo.user_email === '' && (
                  <> +{userInfo.user_phone} </>
                )}
            </span>
          </p>
          <p className={'text-center text-[14px] mb-[26px]'}>&nbsp;</p>

          <div className='otp-container'>
            <div className='otp-inputs'>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <OtpInputNum
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
            {countdownTimer == 0 && (
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
      type={'password'}
      pattern='[0-9]*'
      inputmode='numeric'
    />
  );
});

const OtpInputNum = forwardRef(function OtpInput(
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
    />
  );
});
