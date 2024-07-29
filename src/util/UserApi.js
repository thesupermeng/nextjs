import { Agent, Brand } from '@/config/User/setting';
import md5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';
import { LocalStorageKeys } from '@/config/common';
import { URL_USER } from '@/config/url';

const ServerTimeOffset = { value: 0, set: false };
export const setServerTimeOffset = (offset) => {
  ServerTimeOffset.value = offset || 0;
  ServerTimeOffset.set = true;
};

const UserApiSetting = {};
export const SetUserApiSetting = (key, val) => {
  UserApiSetting[key] = val;
};
const addHeaderSignature = (
  params,
  timestamp,
  salt = process.env.NEXT_PUBLIC_USER_API_SALT,
  excludeInSignature
) => {
  const keys = [];

  if (!excludeInSignature) {
    for (const key of params.keys()) {
      if (typeof params.get(key) !== 'object') {
        // only non-file value are involved in computing signature
        keys.push(key);
      }
    }
  }

  const end = excludeInSignature
    ? `${timestamp}${salt}`
    : `${keys
        .sort()
        .map((k) => params.get(k))
        .join('')}${timestamp}${salt}`;

  return md5(end).toString();
};

const DeviceInfo = JSON.stringify({
  model: '',
  osVersion: '',
  platform: process.env.NEXT_PUBLIC_ENV === 'WEB' ? 'pc' : 'm',
  uuid: '',
  version: '',
});
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const UserURL = process.env.NEXT_PUBLIC_URL_USER_API;
const Platform = { WEB: 1, H5: 2 }[process.env.NEXT_PUBLIC_ENV || 'WEB'];

const getHeader = (
  requestBody,
  method = 'POST',
  isFormdata = false,
  excludeInSignature
) => {
  const Timestamp = Math.floor(
    (new Date().getTime() + ServerTimeOffset.value) / 1000
  );
  const authToken = localStorage.getItem(LocalStorageKeys.AuthTokenHeader);

  const obj = {
    Brand: Brand,
    Agent: UserApiSetting.Agent || undefined,
    Signature: addHeaderSignature(
      requestBody,
      Timestamp,
      process.env.NEXT_PUBLIC_USER_API_SALT,
      excludeInSignature
    ),
    'Access-Control-Allow-Origin': 'cors',
    'Device-Info': DeviceInfo,
    // 'Content-Type': isFormdata ? 'multipart/form-data' : 'application/json',
    Timestamp,
    Timezone: tz,
  };

  if (authToken) {
    obj.Authorization =
      'bearer ' + localStorage.getItem(LocalStorageKeys.AuthTokenHeader);
  }
  if (excludeInSignature) {
    obj['Content-Type'] = 'application/json';
  }
  return obj;
};

const parseObjToFormData = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, val]) => {
    formData.append(key, val);
  });
  return formData;
};
export const UserApi = async (url, body = {}, options = {}) => {
  const {
    method = 'POST',
    saveUserToken,
    saveFBToken,
    saveTayaToken,
    removeToken,
    isFormdata,
    excludeInSignature,
  } = options;

  await checkServerTime(url);
  const requestBody = excludeInSignature
    ? JSON.stringify(body)
    : isFormdata
    ? body
    : parseObjToFormData(body);

  if (!excludeInSignature) requestBody.append('platform', Platform);

  const requestUrl =
    method === 'GET'
      ? `${UserURL}${url}?${Object.entries({
          ...body,
          platform: Platform,
        })
          .map(([key, val]) => `${key}=${val}`)
          .join('&')}`
      : `${UserURL}${url}`;
  const requestOption = {
    method,
    headers: getHeader(requestBody, method, isFormdata, excludeInSignature),
  };

  if (method !== 'GET') {
    requestOption.body = requestBody;
  }
  // if (isFormdata) {
  //   requestOption.body = body;
  // } else {
  //   if (method === 'POST' || method === 'DELETE') {
  //     requestOption.body = JSON.stringify(requestBody);
  //   }
  // }
  let resData;
  try {
    const response = await fetch(requestUrl, requestOption)
      .then((d) => d.text())
      .catch((e) => {
        throw e;
      });
    resData = decryptURL(response);
  } catch (e) {
    resData = {
      code: 400,
      msg: 'Exception',
      error: e,
    };
  }
  if (resData.code === 401) {
    // token invalid
    // todo show invalid info
    updateLocalstorage(LocalStorageKeys.AuthTokenHeader, undefined);
    updateLocalstorage(LocalStorageKeys.TayaToken, undefined, true);
    updateLocalstorage(LocalStorageKeys.FBToken, undefined, true);
    window.dispatchEvent(new Event('sessionTimeOut'));
  } else if (resData.code === 0 || resData.code === 40003) {
    // handle token
    if (removeToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, undefined);
      updateLocalstorage(LocalStorageKeys.TayaToken, undefined, true);
      updateLocalstorage(LocalStorageKeys.FBToken, undefined, true);
    }
    if (saveUserToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, resData?.data?.token);
    }
    if (saveFBToken) {
      updateLocalstorage(LocalStorageKeys.FBToken, resData?.data?.token, true);
      updateLocalstorage(
        LocalStorageKeys.FBAPIUrl,
        resData?.data?.serverInfo?.apiServerAddress
      );
    }
    if (saveTayaToken) {
      updateLocalstorage(
        LocalStorageKeys.TayaToken,
        resData?.data?.token,
        true
      );
      updateLocalstorage(
        LocalStorageKeys.FBAPIUrl,
        resData?.data?.serverInfo?.apiServerAddress
      );
    }
  } else if (resData.code === 40005 || resData.code === 40001) {
    window.otpError = resData.msg;
    window.dispatchEvent(new Event('otpError'));
  }
  return resData;
};

const decryptURL = (src) => {
  var key = process.env.NEXT_PUBLIC_USER_DECRYPT_KEY;
  var base64data = CryptoJS.enc.Base64.parse(src);
  var encrypted = new CryptoJS.lib.WordArray.init(
    base64data.words.slice(4),
    base64data.sigBytes - 16
  );
  var iv = new CryptoJS.lib.WordArray.init(base64data.words.slice(0, 4));
  var cipher = CryptoJS.lib.CipherParams.create({ ciphertext: encrypted });
  var decrypted = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(key), {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

export const updateLocalstorage = (key, val, isSessionStorage = false) => {
  const storage = isSessionStorage ? sessionStorage : localStorage;
  if (storage.getItem(key) == val) {
    return;
  }
  if (val !== undefined) {
    storage.setItem(key, val);
  } else {
    storage.removeItem(key);
  }
  const toDispatch = () => {
    if (storage.getItem(key) == val) {
      window.dispatchEvent(new Event('storage-' + key));
    } else {
      return setTimeout(toDispatch);
    }
  };
  return toDispatch();
};

const checkServerTime = async (url) => {
  const timepass = async (res) => {
    if (
      url === URL_USER.getServerTime ||
      ServerTimeOffset.set ||
      url === URL_USER.getConfig
    ) {
      res();
    } else {
      setTimeout(() => {
        timepass(res);
      }, 10);
    }
  };
  return await new Promise(timepass);
};
