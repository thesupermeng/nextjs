import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { LoginFooter } from '@/componentsH5/loginLayout/LoginFooter';
import { LoginContent } from '@/componentsH5/loginLayout/LoginContent';
import FullScreenModal from '../FullScreenModal';
import { setProfileModal, setShowToast } from '@/store/common';
import { ProfileModalType } from '.';
import { SignupContent } from '@/componentsH5/loginLayout/SignUpContent';
import useUser from '@/hook/user/useUser';
import { loginWithOtp } from '@/services/user';
import { setOtpProp } from '@/store/user';
import { ModalCloseBtn } from './ModalCloseBtn';
import useGetConfig from '@/hook/user/useGetConfig';

//in use
const SignupLoginModal = ({ type }) => {
  const [termChecked, setTermChecked] = useState(false);
  const { config } = useGetConfig();
  const { t } = useTranslation();

  useEffect(() => {
    if (config?.toggle?.['t&c'] === 'false') {
      setTermChecked(true);
    }
  }, [config]);

  const otp = useSelector((s) => s.user.otp);
  const { username, countryCode, phoneNum } = useSelector(
    (s) => s.user.otpProp
  );
  const dispatch = useDispatch();
  const { isLogin } = useUser();
  const subTitle =
    type === 'login' ? t('loginWithPassword') : t('loginRegister');

  useEffect(() => {
    if (otp) {
      const param = username
        ? {
            username: username,
            otp: otp,
          }
        : {
            country_code: countryCode,
            mobile: phoneNum,
            otp,
          };
      loginWithOtp(param).then((data) => {
        if (data.code === 0) {
          if (data.data.setup_required === true) {
            dispatch(setProfileModal(ProfileModalType.FinishSetupModal));
          } else {
            dispatch(setProfileModal(null));
          }
          dispatch(setOtpProp({}));
        }
      });
    }
  }, [otp, username, countryCode, phoneNum]);
  if (isLogin) {
    return null;
  }
  return (
    <FullScreenModal>
      <div className='relative flex flex-col items-stretch justify-center p-7 bg-[#121212] rounded-3xl overflow-visible'>
        <ModalCloseBtn />
        <div className='relative flex justify-center'>
          <div className=''>
            <div className='text-xl font-bold'>
              {t('welcomeTo')} {t('eastrich')}
            </div>
            <div className='text-base text-center font-medium'>{subTitle}</div>
          </div>
        </div>
        {type === 'login' && <LoginContent termChecked={termChecked} />}
        {type === 'signup' && <SignupContent termChecked={termChecked} />}
        <LoginFooter
          type={type}
          onClickType={() => {
            dispatch(
              setProfileModal(
                type == 'login'
                  ? ProfileModalType.SignUpModal
                  : ProfileModalType.LoginModal
              )
            );
          }}
          onTermsCheck={setTermChecked}
        />
      </div>
    </FullScreenModal>
  );
};

export default SignupLoginModal;
