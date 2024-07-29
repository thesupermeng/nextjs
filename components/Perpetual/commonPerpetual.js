// import { useFlvSupport } from '@/hook/useFlvSupport';
import CaptchaIframe from '../captcha/AjCaptcha';
import { SessionTimeOut } from '../FullScreenModal/SessionTimeOut';
import { useTayaToken } from '@/hook/FB/useTayaToken';
import { useAuthChannel } from '@/hook/common/useAuthChannel';
import { useVisibilityChange } from '@/hook/useVisibilityChange';
import { useSendLog } from '@/hook/useSendLog';
import { useEffect } from 'react';
import { GenericActionType } from '@/util/genericAction';
import Toast from '../toast';
import { getMobileOperatingSystem, syncServerTime } from '@/util/common';
import { updateLocalstorage } from '@/util/UserApi';
import { LocalStorageKeys } from '@/config/common';
import { useDispatch } from 'react-redux';
import { setIsApp } from '@/store/common';
import useGetConfig from '@/hook/user/useGetConfig';
import { Config } from '@/util/config';
import { MQTTContainer } from './MQTTContainer';

export const CommonPerpetual = () => {
  const { sendLogs } = useSendLog();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('authToken');
    const header = urlParams.get('header');
    if (authToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, authToken);
      dispatch(setIsApp(true));
    } else if (header) {
      dispatch(setIsApp(true));
    }
  }, []);

  useGetConfig();
  useTayaToken();
  useAuthChannel();
  useVisibilityChange();
  useEffect(() => {
    Config.platform =
      process.env.NEXT_PUBLIC_ENV === 'WEB' ? 'pc' : getMobileOperatingSystem();

    syncServerTime();
    sendLogs(GenericActionType.WEB_ACCESS);
    setTimeout(() => {
      document.getElementsByTagName('html')[0].classList.remove('notranslate');
    }, 2000);

    // remove console.log in prod
    try {
      if (
        typeof window.console != 'undefined' &&
        process.env.NEXT_PUBLIC_PROD
      ) {
        // window.console = {};
        window.console.log = function () {};
        window.console.debug = function () {};
        window.console.info = function () {};
        window.console.warn = function () {};
        window.console.error = function () {};
      }
    } catch (e) {
      /* empty */
    }
  }, []);

  return (
    <>
      <SessionTimeOut />
      <CaptchaIframe />
      <Toast />
      <MQTTContainer />

      {/* <InitializeConnection /> */}
    </>
  );
};
