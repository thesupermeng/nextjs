import { ActionType, loginWithOtp, loginWithPassword } from '@/services/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BtnContinue } from './BtnContinue';
import { LoginContentError } from './LoginContentError';
import { LoginContentForgotPassword } from './LoginContentForgotPassword';
import { LoginContentMobile } from './LoginContentMobile';
import { LoginContentPassword } from './LoginContentPassword';
import { LoginContentUsername } from './LoginContentUsername';
import { OTP } from '@/componentsH5/OTP/page';
import { isWeb } from '@/util/common';
import { useDispatch } from 'react-redux';
import { setOtpModal, setProfileModal } from '@/store/common';
import { setOtp, setOtpProp } from '@/store/user';
import { LoadingPage } from '@/components/loading';
import i18n from 'i18next';

const TABS_LIST = {
  username: i18n.t('username'),
  mobile: i18n.t('mobile'),
};

export const LoginContent = ({ onNext, termChecked }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TABS_LIST.username);
  const [apiCountryCode, setApiCountryCode] = useState('');
  const [apiMobile, setApiMobile] = useState('');

  const Tab = ({ text, action }) => {
    return (
      <div
        onClick={() => {
          setTab(text);
        }}
        className={`mr-2 text-base font-bold p-2.5 ${
          tab === text
            ? 'text-white after:block after:mx-auto after:rounded-full after:w-6 after:h-1 after:bg-tayaRed'
            : 'text-white/[.5]'
        }`}
      >
        {text}
      </div>
    );
  };

  const [countryCode, setCountryCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    setLoading(true);
    const param =
      tab === TABS_LIST.username
        ? {
            username: username,
            password: password,
          }
        : {
            country_code: countryCode.code,
            mobile: mobile,
            password: password,
          };

    loginWithPassword(param).then((d) => {
      setLoading(false);
      if (d?.data?.token) {
        // login success
        if (isWeb()) {
          dispatch(setProfileModal(null));
        } else {
          router.push('/');
        }
      } else if (d.code == 0) {
        // login success, but may need otp
        // todo, infuture handle d.code == 40003
        if (isWeb()) {
          dispatch(
            setOtpProp({
              ...param,
              countryCode: d?.data?.country_code,
              phoneNum: mobile || d?.data?.mobile,
              actionType: ActionType.login,
            })
          );
        } else {
          setShowOtp(true);
          setApiCountryCode(d?.data?.country_code);
          setApiMobile(d?.data?.mobile);
        }
        setErrMsg('');
      } else {
        // setIsLoginFailed(true);
        setErrMsg(d?.msg);
      }
    });
  };
  const continueOnClick = (otp) => {
    const param = {
      username: username,
      country_code: countryCode.code,
      mobile: mobile,
      otp: otp,
    };

    loginWithOtp(param).then((data) => {
      if (data.code === 0) {
        isWeb() ? onNext?.() : router.back();
      } else {
        setErrMsg(data?.msg);
      }
    });
  };

  return (
    <>
      <div className='flex flex-row justify-start'>
        <Tab text={TABS_LIST.username} />
        <Tab text={TABS_LIST.mobile} />
      </div>

      {tab === TABS_LIST.username && (
        <LoginContentUsername
          val={username}
          update={setUsername}
          isError={false}
        />
      )}
      {tab === TABS_LIST.mobile && (
        <LoginContentMobile
          isError={false}
          setMobileValidated={setIsValidMobile}
          setPhoneNum={setMobile}
          setSelectedCountry={setCountryCode}
        />
      )}
      <LoginContentPassword
        val={password}
        update={setPassword}
        isError={false}
      />
      <BtnContinue
        isDisabled={
          loading ||
          !termChecked ||
          !password ||
          (tab === TABS_LIST.username ? !username : !isValidMobile)
        }
        onClick={onContinue}
      />
      <LoginContentForgotPassword />
      <LoginContentError errorMsg={errMsg} />
      {showOtp && !isWeb() && (
        <OTP
          countryCode={apiCountryCode}
          phoneNum={apiMobile}
          sendToTxt={`${apiCountryCode} ${apiMobile}`}
          onNext={(otp) => continueOnClick(otp)}
          onResend={() => onContinue()}
          otpError={errMsg}
        />
      )}
    </>
  );
};
