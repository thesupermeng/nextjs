import { ActionType, getSMSOtp } from '@/services/user';
import { setOtpProp, setUserMobileInfo } from '@/store/user';
import { isWeb } from '@/util/common';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { BtnContinue } from './BtnContinue';
import { LoginContentMobile } from './LoginContentMobile';

export const SignupContent = ({ onNext, termChecked }) => {
  const dispatch = useDispatch();
  const [isMobileValid, setMobileValidated] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const { t } = useTranslation();

  const isError = false;
  const onSubmit = async () => {
    if (isMobileValid) {
      getSMSOtp(selectedCountry.code, phoneNum, ActionType.login).then((d) => {
        console.log('$$smsotp', d);
        dispatch(setUserMobileInfo({ selectedCountry, phoneNum }));

        if (isWeb()) {
          dispatch(
            setOtpProp({
              countryCode: selectedCountry.code,
              phoneNum,
              actionType: ActionType.login,
            })
          );
        } else {
          onNext?.();
        }
      });
    }
  };
  return (
    <div>
      <div className='text-base mt-5'>{t('pleaseEnterMobileNumber')}</div>
      <LoginContentMobile
        isError={isError}
        setPhoneNum={setPhoneNum}
        setMobileValidated={setMobileValidated}
        setSelectedCountry={setSelectedCountry}
      />
      <BtnContinue
        isDisabled={!termChecked || !isMobileValid || !selectedCountry}
        onClick={() => {
          onSubmit();
        }}
      />
    </div>
  );
};
