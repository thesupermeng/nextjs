import { LocalStorageKeys } from '@/config/common';
import { updateLocalstorage } from './UserApi';

const getHeader = (requestBody) => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const TayaToken = sessionStorage.getItem(LocalStorageKeys.TayaToken);
  return {
    'Content-Type': 'application/json; charset=utf-8',
    timestamp,
    ...(TayaToken ? { Authorization: TayaToken } : {}),
  };
};
export const FBApi = async (url, body = {}, options = {}) => {
  const currencyId = sessionStorage.getItem(LocalStorageKeys.FbCurrency);
  const serverUrl = localStorage.getItem(LocalStorageKeys.FBAPIUrl);
  if (!serverUrl) {
    throw 'no FB Url';
  }
  const requestBody = {
    currencyId: Number(currencyId),
    languageType: 'ENG',
    ...body,
  };
  const response = await fetch(serverUrl + url, {
    method: 'POST',
    headers: getHeader(requestBody),
    body: JSON.stringify(requestBody),
  })
    .then((d) => d.json())
    .catch((e) => {});
  if (response.code === 14010) {
    updateLocalstorage(LocalStorageKeys.TayaToken, undefined, true);
    window.dispatchEvent(new Event('sessionTimeOut'));
  }
  return response;
};
