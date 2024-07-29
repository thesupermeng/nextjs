import { OpacityTick, Tick } from '@/asset/icons';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BtnContinue } from '../loginLayout/BtnContinue';
import { LoginContentPassword } from '../loginLayout/LoginContentPassword';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { LoginContentError } from '../loginLayout/LoginContentError';

const lowercase = /[a-z]/g;
const uppercase = /[A-Z]/g;
const numbers = /[0-9]/g;
const special = /[-#$.%&@!+=<>*]/g;
//var duplicatePattern = /((\w)\2{2,})/g;
const space = /[ ]/g;

export const ResetPassword = ({ submitText, onSubmit, errorMsg = '' }) => {
  const [passwordValid, setPasswordValid] = useState(false);
  const [validatePasswordObj, setValidatePasswordObj] = useState({});

  const [pass, setPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordChecked, setIsPasswordChecked] = useState(true);
  const debouceCheckRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    setIsPasswordChecked(false);
    clearTimeout(debouceCheckRef.current);
    debouceCheckRef.current = setTimeout(() => {
      verifyPassword();
    }, 500);
  }, [pass, confirmPassword]);

  const verifyPassword = useCallback(() => {
    const validObj = {
      validLength: pass.length > 7,
      // upLowCase: pass.match(uppercase) && pass.match(lowercase),
      // digit: pass.match(numbers),
      // specialChar: pass.match(special),
      noSpaceRepeat: pass.length > 0 && !pass.match(space),
      match: pass === confirmPassword && pass.length > 0,
    };
    setValidatePasswordObj(validObj);
    setPasswordValid(!Object.values(validObj).some((v) => !v));

    setIsPasswordChecked(true);
  }, [pass, confirmPassword]);

  const PasswordRuleRow = ({ isValid, text }) => {
    return (
      <div className='flex'>
        <Image
          alt='tick'
          src={isValid ? Tick : OpacityTick}
          className='w-[18px] h-[18px]'
        />
        <div
          className={`text-[13px] font-normal ml-2 ${
            isValid ? '' : 'opacity-25'
          }`}
        >
          {text}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='text-white text-[15px] font-normal mb-2'>
        {t('enterYourPassword')}
      </div>
      <LoginContentPassword
        val={pass}
        placeholder={t('password')}
        update={(value) => {
          setPass(value);
        }}
        isError={false}
      />
      <LoginContentPassword
        val={confirmPassword}
        placeholder={t('confirmPassword')}
        update={(value) => {
          setConfirmPassword(value);
        }}
        isError={false}
      />
      <LoginContentError errorMsg={errorMsg} />
      <BtnContinue
        text={submitText || t('setPassword')}
        isDisabled={!isPasswordChecked || !passwordValid}
        onClick={() => {
          onSubmit(pass);
        }}
      />

      <div className='flex flex-col gap-3 my-3'>
        <PasswordRuleRow
          isValid={validatePasswordObj.validLength}
          text={t('passwordRules1')}
        />
        {/* extra rules */}
        {/* <PasswordRuleRow
          isValid={validatePasswordObj.upLowCase}
          text={t('passwordRules2')}
        />
        <PasswordRuleRow
          isValid={validatePasswordObj.digit}
          text={t('passwordRules3')}
        />
        <PasswordRuleRow
          isValid={validatePasswordObj.specialChar}
          text={t('passwordRules4')}
        /> */}
        <PasswordRuleRow
          isValid={validatePasswordObj.noSpaceRepeat}
          text={t('passwordRules5')}
        />
        <PasswordRuleRow
          isValid={validatePasswordObj.match}
          text={t('passwordRules6')}
        />
      </div>
    </div>
  );
};
