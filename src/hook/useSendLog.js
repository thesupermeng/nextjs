import { URL_LOGS } from '@/config/url';
import { LogApi } from '@/util/LogApi';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '@/util/config';

export const useSendLog = () => {
  const userInfo = useSelector((s) => s.user.userInfo);
  const ref = useRef(userInfo);

  const getUUID = useCallback(() => {
    try {
      const uuid = window?.sessionStorage.getItem('uuid') || uuidv4();
      sessionStorage.setItem('uuid', uuid);
      return uuid;
    } catch (e) {
      return '';
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      ref.current = userInfo;
      Config.userId = userInfo?.id;
      Config.countryCode = userInfo?.country_code;
    }
  }, [userInfo]);

  const sendLogs = async (action, streamId, extra) => {
    if (extra?.totalTime === 0) return;
    return LogApi(URL_LOGS.sendLog, {
      id: streamId ?? 0,
      action: action,
      extra: JSON.stringify({
        sessionId: getUUID(),
        ...extra,
      }),
    }).then((res) => {
      return res;
    });
  };

  return { sendLogs };
};
