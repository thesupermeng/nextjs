import { OpacityTick, PasswordEye, PasswordEye1, Tick } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import {
  checkPassword,
  finishSetup,
  logout,
  setPassword,
} from '@/services/user';
import { setMessage, setMessageModalOpen } from '@/store/profile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMenuConstantType } from '..';
import { LocalStorageKeys } from '@/config/common';

const SetPasswordModal = ({
  setModalNum,
  isForgotPass = false,
  otp = null,
  phoneNum = null,
  countryCode = null,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [upLowCase, setUpLowCase] = useState(false);
  const [digit, setDigit] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [noSpaceRepeat, setNoSpaceRepeat] = useState(false);

  const [pass, setPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordChecked, setIsPasswordChecked] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const { validUsername } = useSelector((s) => s.profile);

  const { t } = useTranslation();

  useEffect(() => {
    if (
      pass.length > 0 &&
      confirmPassword.length > 0 &&
      pass === confirmPassword &&
      validLength &&
      // upLowCase &&
      // digit &&
      // specialChar &&
      noSpaceRepeat
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [
    pass,
    confirmPassword,
    validLength,
    // upLowCase,
    // digit,
    // specialChar,
    noSpaceRepeat,
  ]);

  useEffect(() => {
    setIsPasswordChecked(true);
    setErrorMsg('');
  }, [pass, confirmPassword]);

  const passwordClick = () => {
    setShowPass(!showPass);
  };

  const confirmPasswordClick = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const passwordDebounce = (event) => {
    var lowercase = /[a-z]/g;
    var uppercase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var special = /[-#$.%&@!+=<>*]/g;
    //var duplicatePattern = /((\w)\2{2,})/g;
    var space = /[ ]/g;

    setPass(event.target.value);

    setTimeout(() => {
      if (event.target.value.length > 7) {
        setValidLength(true);
      } else {
        setValidLength(false);
      }

      if (
        event.target.value.match(uppercase) &&
        event.target.value.match(lowercase)
      ) {
        setUpLowCase(true);
      } else {
        setUpLowCase(false);
      }

      if (event.target.value.match(numbers)) {
        setDigit(true);
      } else {
        setDigit(false);
      }

      if (event.target.value.match(special)) {
        setSpecialChar(true);
      } else {
        setSpecialChar(false);
      }

      if (event.target.value.length > 0 && !event.target.value.match(space)) {
        setNoSpaceRepeat(true);
      } else {
        setNoSpaceRepeat(false);
      }
    }, 1000);
  };

  const confirmPasswordOnChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const continueOnClick = () => {
    if (isForgotPass) {
      const params = {
        password: pass,
        otp: otp,
      };

      setPassword(params).then((data) => {
        if (data.code === 0) {
          setModalNum(ProfileMenuConstantType.CloseAll);
          dispatch(setMessage(t('passwordChanged')));
          dispatch(setMessageModalOpen(true));
        }
      });
    } else {
      const params = {
        username: validUsername,
        password: pass,
        currency_id: sessionStorage.getItem(LocalStorageKeys.SiteCurrency),
      };

      finishSetup(params).then((data) => {
        if (data.code === 0) {
          setModalNum(ProfileMenuConstantType.CloseAll);
          dispatch(setMessage(t('thanksForSigningUp')));
          dispatch(setMessageModalOpen(true));
        }
      });
    }
  };

  return (
    <FullScreenModal>
      <div className='rounded-3xl flex-initial flex flex-col p-7 bg-[#121212]'>
        <div className='font-bold text-center text-xl'>{t('setPassword')}</div>
        <div className='font-medium text-center mt-1'>
          {t('createPassword')}
        </div>
        <div className='mt-5'>{t('enterYourPassword')}</div>
        <div
          className={`flex rounded-lg ${
            isPasswordChecked
              ? 'bg-tayaGrey text-errorRed'
              : 'bg-tayaRed/[.12] text-tayaRed'
          }  mt-3 h-11`}
        >
          <input
            type={showPass ? 'text' : 'password'}
            placeholder={t('password')}
            className={`bg-transparent w-11/12 h-full p-3 outline-none`}
            value={pass}
            onChange={passwordDebounce}
          />
          <div className='mt-auto mb-auto' onClick={passwordClick}>
            <Image alt='eye' src={showPass ? PasswordEye1 : PasswordEye} />
          </div>
        </div>
        <div
          className={`flex rounded-lg ${
            isPasswordChecked
              ? 'bg-tayaGrey text-errorRed'
              : 'bg-tayaRed/[.12] text-tayaRed'
          } mt-3 h-11`}
        >
          <input
            type={showConfirmPass ? 'text' : 'password'}
            placeholder={t('confirmPassword')}
            value={confirmPassword}
            onChange={confirmPasswordOnChange}
            className={`bg-transparent w-11/12 h-full p-3 outline-none`}
          />
          <div className='mt-auto mb-auto' onClick={confirmPasswordClick}>
            <Image
              alt='eye'
              src={showConfirmPass ? PasswordEye1 : PasswordEye}
            />
          </div>
        </div>
        {!isPasswordChecked && (
          <p className='text-[0.9375rem]text-tayaRed mt-2'>{errorMsg}</p>
        )}
        {passwordValid ? (
          <button
            onClick={continueOnClick}
            className='rounded-md h-11 w-full tayagradient mt-3'
          >
            {t('continue_')}
          </button>
        ) : (
          <button
            className='rounded-md h-11 w-full tayagradient opacity-50 mt-3'
            disabled
          >
            {t('continue_')}
          </button>
        )}
        <div>
          <div className='flex mt-3'>
            <Image alt='tick' src={validLength ? Tick : OpacityTick} />
            <div
              className={
                validLength ? 'text-sm ml-2' : 'text-sm ml-2 opacity-25'
              }
            >
              {t('passwordRules1')}
            </div>
          </div>
          {/* extra rules */}
          {/* <div className='flex mt-3'>
            <Image alt='ticks' src={upLowCase ? Tick : OpacityTick} />
            <div
              className={upLowCase ? 'text-sm ml-2' : 'text-sm ml-2 opacity-25'}
            >
              {t('passwordRules2')}
            </div>
          </div> */}
          {/* <div className='flex mt-3'>
            <Image alt='tick' src={digit ? Tick : OpacityTick} />
            <div className={digit ? 'text-sm ml-2' : 'text-sm ml-2 opacity-25'}>
              {t('passwordRules3')}
            </div>
          </div> */}
          <div className='flex mt-3'>
            <Image alt='tick' src={specialChar ? Tick : OpacityTick} />
            <div
              className={
                specialChar ? 'text-sm ml-2' : 'text-sm ml-2 opacity-25'
              }
            >
              {t('passwordRules4')}
            </div>
          </div>
          <div className='flex mt-3'>
            <Image alt='tick' src={noSpaceRepeat ? Tick : OpacityTick} />
            <div
              className={
                noSpaceRepeat ? 'text-sm ml-2' : 'text-sm ml-2 opacity-25'
              }
            >
              {t('passwordRules5')}
            </div>
          </div>
        </div>
      </div>
    </FullScreenModal>
  );
};

export default SetPasswordModal;
