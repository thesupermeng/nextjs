import md5 from 'crypto-js/md5';
import i18n from 'i18next';
import { Config } from './config';

const addHeaderSignature = (
  params,
  timestamp,
  salt = process.env.NEXT_PUBLIC_URL_NAMI_SALT
) => {
  const keys = Object.keys(params || {}).sort();
  const end = `${keys?.map((k) => params[k]).join('')}${timestamp}${salt}`;
  return md5(end).toString();
};

const baseUrl = process.env.NEXT_PUBLIC_URL_NAMI_API;
export default class Api {
  static call = async (url, data, method = 'POST') => {
    if (!data) {
      data = {};
    }

    data['device_type'] = Config.DeviceType;

    const sortedKeys = Object.keys(data).sort();
    const sortedData = {};
    sortedKeys.forEach((key) => {
      sortedData[key] = data[key];
    });

    const queryString = Object.keys(sortedData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(sortedData[key])}`
      )
      .join('&');

    const timestamp = Math.floor(new Date().getTime() / 1000);

    try {
      const response = await fetch(`${baseUrl}${url}?${queryString}`, {
        method: 'GET',
        headers: {
          Signature: process.env.NEXT_PUBLIC_URL_NAMI_SALT,
          Timestamp: timestamp,
          Locale: 'en-PH',
        },
      });

      const tmp = await response.json();

      const { code, data, msg } = tmp; // Extract data from the response

      if (response.status === 200) {
        if (code === 0) {
          return { success: true, data: data, message: msg };
        } else {
          return { success: false, data: data, message: msg };
        }
      } else {
        return { success: false, data: null, message: msg };
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.msg;

      if (status === 401) {
        return { success: false, data: null, message: msg ?? '' };
      } else {
        return {
          success: false,
          data: null,
          message: i18n.t('internalServerError'),
        };
      }
    }
  };
}
