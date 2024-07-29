import { BtnContinue } from '@/componentsH5/loginLayout/BtnContinue';
import { LoginContentMobile } from '@/componentsH5/loginLayout/LoginContentMobile';
import { LoginContentError } from '@/componentsH5/loginLayout/LoginContentError';
import { ActionType, getSMSOtp, loginWithOtp } from '@/services/user';
import { setProfileModal } from '@/store/common';
import { setOtp, setOtpProp } from '@/store/user';
import { isWeb } from '@/util/common';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import FullScreenModal from '../FullScreenModal';
import { ProfileModalType } from '.';
import { ModalCloseBtn } from './ModalCloseBtn';

export const ForgorPasswordModal = () => {
  const [isMobileValid, setMobileValidated] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [mobileErrMsg, setMobileErrMsg] = useState('');
  const otp = useSelector((s) => s.user.otp);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (otp) {
      // send api
      const param = {
        country_code: selectedCountry.code,
        mobile: phoneNum,
        otp: otp,
      };
      loginWithOtp(param).then((data) => {
        if (data.code === 0) {
          dispatch(setOtpProp({}));
          dispatch(setProfileModal(ProfileModalType.ResetPasswordModal));
          setTimeout(() => {
            dispatch(setOtp(otp));
          }, 100);
        }
      });
    }
  }, [otp, selectedCountry, phoneNum]);
  const onContinue = () => {
    getSMSOtp(
      selectedCountry.code,
      phoneNum,
      ActionType.setPassword,
      true
    ).then((data) => {
      console.log('$$smsotp', data);
      // setShowOtp(true);
      if (data.code === 0) {
        if (isWeb()) {
          dispatch(
            setOtpProp({
              countryCode: selectedCountry.code,
              phoneNum,
              actionType: ActionType.setPassword,
            })
          );
        }
      } else {
        setMobileErrMsg(data?.msg);
      }
    });
  };
  return (
    <FullScreenModal>
      <div className='relative flex w-[500px] flex-col items-stretch justify-center p-7 bg-[#121212] rounded-3xl'>
        <ModalCloseBtn />
        <div className='p-8 flex flex-1 flex-col gap-1'>
          <div className='text-[20px] font-bold text-white self-center'>
            {t('forgotPassword')}
          </div>
          <div className='text-base font-medium text-white self-center'>
            {t('resetPassword')}
          </div>
          <div className='text-[15px] font-normal text-white mt-6'>
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
            isDisabled={!isMobileValid || !selectedCountry}
            onClick={onContinue}
          />
        </div>
      </div>
    </FullScreenModal>
  );
};
