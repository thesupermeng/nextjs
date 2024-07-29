import { URL_USER } from '@/config/url';
import { UserApi, setServerTimeOffset } from './UserApi';

export const isWeb = () => {
  return process.env.NEXT_PUBLIC_ENV === 'WEB';
};

export function getMobileOperatingSystem() {
  const userAgent = navigator?.userAgent || navigator?.vendor || window?.opera;

  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}

export const syncServerTime = async () => {
  try {
    const UserURL = process.env.NEXT_PUBLIC_URL_USER_API;
    const t0 = new Date();
    const st = await fetch(`${UserURL}${URL_USER.getServerTime}`).then((a) =>
      a.json()
    );
    const ts = st.data * 1000;
    const t1 = new Date();
    const timeOffset = ts - (t1.getTime() + t0.getTime()) / 2;
    setServerTimeOffset(timeOffset);
  } catch (e) {}
};
