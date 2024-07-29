import { Agent, Brand } from '@/config/User/setting';
import md5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';
import { LocalStorageKeys } from '@/config/common';
import { BASE_URL, URL_USER } from '@/config/url';

let ipAddress = '';

const fetchWithTimeout = async (url, options, timeout = 3000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const getIPAddress = async () => {
  if (ipAddress != '') {
    return ipAddress;
  }

  try {
    if (sessionStorage?.getItem('ipAddress') != undefined) {
      return sessionStorage.getItem('ipAddress');
    }
  } catch (e) {
    console.log('session storage not defined');
  }


  let response;
  let response2;
  try {
    response = await fetchWithTimeout('https://api.3qi.live/v1/geolocation');
    response = await response.json();
    response = response.data;

    response2 = await fetchWithTimeout(`https://pro.ip-api.com/json/${response.ip_address}?key=UmUotUAIUEZgdp0`);
    response2 = await response2.json();
  
    response.country_code = response2.countryCode;


    if (!response || !response.ip_address) {
      // got error, use default ip address
      console.log('got error, use default ip address');
      return '219.75.27.16';
    }

    ipAddress = response.ip_address;
    sessionStorage.setItem('ipAddress', ipAddress);
    return ipAddress;
  } catch (e) {
    console.log('got error, use default ip address');
    return '219.75.27.16';
  }
};

export const getIPAddress2 = async () => {
  let response;
  let response2;
  if (sessionStorage.getItem('userLocation') != undefined) {
    return JSON.parse(sessionStorage.getItem('userLocation')); ;
  }

  response = await fetchWithTimeout('https://api.3qi.live/v1/geolocation');
  response = await response.json();
  response = response.data;

  response2 = await fetchWithTimeout(`https://pro.ip-api.com/json/${response.ip_address}?key=UmUotUAIUEZgdp0`);
  response2 = await response2.json();

  response.country_code = response2.countryCode;


  try {
    if (!response || !response.ip_address) {
      // got error, use default ip address
      console.log('got error, use default ip address 2');
      return '219.75.27.16';
    }
  } catch (e) {
    console.log('got error, use default ip address 2');
    return '219.75.27.16';
  }


  let superLinkObl = 'https://apps.apple.com/cn/app/id6474402534';

  if(response.country_code != 'CN' && response.country_code != 'TW' && response.country_code != 'HK' && response.country_code != 'MY' && response.country_code != 'SG')
    {
      superLinkObl = await getSuperLink();
    }
  //  = await getSuperLink();

  response.link_jump = superLinkObl;

  if (superLinkObl == undefined || superLinkObl == 'undefined') {
    response.link_jump = 'https://apps.apple.com/cn/app/id6474402534';
  }

  sessionStorage.setItem('userLocation', JSON.stringify(response));
  return response;
};

export const getSuperLink = async () => {
  const response = await fetch('https://api.ziqoixtv.com/api/mdm/link/d6td3171')
    .then((d) => d.json())
    .catch((e) => {
      return 'https://apps.apple.com/cn/app/id6474402534';
    });
  return response.link_jump;
};

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

const getQuery = async (url) => {
  const queryParameters =
    'appName=Shayu&platform=WEB&channelId=WEB&ip=' + (await getIPAddress());

  if (url.includes('?')) {
    return '&' + queryParameters;
  } else {
    return '?' + queryParameters;
  }
};

const getHeader = async (requestBody, method = 'POST', token = '') => {
  // config.headers['Authorization'] = `Bearer ${this.bearerToken}`;
  // config.headers['Device-Id'] = "";
  // config.headers['Platform-OS'] = "WEB";
  // config.headers['App-Channel'] = "WEB";
  // config.headers['App-Name'] = "WEB";
  // config.headers['IP-Address'] = "165.21.14.226";
  // config.headers['App-Version'] = "";

  const obj = {
    'Content-Type': 'application/json',
    'Device-Id': 'application/json',
    'Platform-OS': 'WEB',
    'App-Channel': 'WEB',
    'App-Name': 'WEB',
    'IP-Address': await getIPAddress(),
    'App-Version': '',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  };

  return obj;
};

export const YingshiApi = async (url, body = {}, options = {}) => {
  const {
    method = 'POST',
    saveUserToken,
    saveAhaToken,
    saveFBToken,
    saveTayaToken,
    removeToken,
    isFormdata,
    excludeInSignature,
    returnFullResponse,
    noToken,
    extraOptions,
  } = options;

  const requestBody = JSON.stringify(body);
  const requestOption = {
    method,
    headers: await getHeader(
      requestBody,
      method,
      getLocalstorage(LocalStorageKeys.AuthTokenHeader)
    ),
    ...extraOptions,
  };

  let getParams = '';
  let resData;
  url = BASE_URL + url;

  if (method !== 'GET') {
    url = url + (await getQuery(url));
    requestOption.body = requestBody;
  } else {
    getParams = objectToGetParams(body);

    if (body.class) {
      getParams = getParams.replace(
        encodeURIComponent(body.class),
        decodeURIComponent(body.class)
      );
    }
    if (getParams != '') {
      url += '?' + getParams;
    }
  }

  try {
    const response = await fetch(url, requestOption)
      .then((d) => d.json())
      .catch((e) => {
        console.log('ERROR');
        throw e;
      });
    resData = response;
  } catch (e) {
    resData = {
      code: 400,
      msg: 'Exception',
      error: e,
    };
  }
  if (resData.code === 401) {
    return;
  } else if (resData.code === 0 || resData.code === 201) {
    if (saveUserToken) {
      updateLocalstorage(
        LocalStorageKeys.AuthTokenHeader,
        resData.data.access_token
      );
    }
    if (saveAhaToken) {
      updateLocalstorage(LocalStorageKeys.AhaToken, resData.data.aha_token);
      localStorage.setItem('AuthToken', resData.data.aha_token);
    }
    if (removeToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, undefined);
      updateLocalstorage(LocalStorageKeys.AhaToken, undefined);
    }
  }

  if (returnFullResponse) {
    return resData;
  }
  return resData.data;
};

export const YingshiApi2 = async (url, body = {}, options = {}) => {
  const {
    method = 'POST',
    saveUserToken,
    saveAhaToken,
    saveFBToken,
    saveTayaToken,
    removeToken,
    isFormdata,
    excludeInSignature,
    returnFullResponse,
  } = options;

  const requestBody = JSON.stringify(body);
  const requestOption = {
    method,
    headers: await getHeader(
      requestBody,
      method,
      getLocalstorage(LocalStorageKeys.AuthTokenHeader)
    ),
  };

  let getParams = '';
  let resData;
  url = BASE_URL + url;

  if (method !== 'GET') {
    requestOption.body = requestBody;
  } else {
    getParams = objectToGetParams(body);

    if (body.class) {
      getParams = getParams.replace(
        encodeURIComponent(body.class),
        decodeURIComponent(body.class)
      );
    }
    if (getParams != '') {
      url += '?' + getParams;
    }
  }

  const response = await fetch(url, requestOption);

  resData = response.json();

  if (resData.code === 401) {
    return;
  } else if (resData.code === 0 || resData.code === 201) {
    if (saveUserToken) {
      updateLocalstorage(
        LocalStorageKeys.AuthTokenHeader,
        resData.data.access_token
      );
    }
    if (saveAhaToken) {
      updateLocalstorage(LocalStorageKeys.AhaToken, resData.data.aha_token);
      localStorage.setItem('AuthToken', resData.data.aha_token);
    }
    if (removeToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, undefined);
      updateLocalstorage(LocalStorageKeys.AhaToken, undefined);
    }
  }
  if (returnFullResponse) {
    return resData;
  }
  return resData;
};

const objectToGetParams = (paramsObject) => {
  const searchParams = new URLSearchParams();
  for (const key in paramsObject) {
    if (paramsObject.hasOwnProperty(key)) {
      searchParams.append(key, paramsObject[key]);
    }
  }
  return searchParams.toString();
};

// const decryptURL = (src) => {
//   var key = process.env.NEXT_PUBLIC_USER_DECRYPT_KEY;
//   var base64data = CryptoJS.enc.Base64.parse(src);
//   var encrypted = new CryptoJS.lib.WordArray.init(
//     base64data.words.slice(4),
//     base64data.sigBytes - 16
//   );
//   var iv = new CryptoJS.lib.WordArray.init(base64data.words.slice(0, 4));
//   var cipher = CryptoJS.lib.CipherParams.create({ ciphertext: encrypted });
//   var decrypted = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(key), {
//     iv: iv,
//     mode: CryptoJS.mode.CFB,
//     padding: CryptoJS.pad.NoPadding,
//   });
//   return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
// };

export const getLocalstorage = (key, isSessionStorage = false) => {
  const isServerSide = typeof window === 'undefined';

  if (isServerSide) {
    const { cookies } = require('next/headers');
    return cookies().get(key)?.value;
  }

  const storage = isSessionStorage ? sessionStorage : localStorage;
  return storage.getItem(key);
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

// const checkServerTime = async (url) => {
//   const timepass = async (res) => {
//     if (
//       url === URL_USER.getServerTime ||
//       ServerTimeOffset.set ||
//       url === URL_USER.getConfig
//     ) {
//       res();
//     } else {
//       setTimeout(() => {
//         timepass(res);
//       }, 10);
//     }
//   };
//   return await new Promise(timepass);
// };
