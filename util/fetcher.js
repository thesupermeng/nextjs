import {LocalStorageKeys} from '@/config/common';
import { BASE_URL } from '@/config/url';
import {getLocalstorage, updateLocalstorage} from '@/util/YingshiApi';

let ipAddress = ''

const fetchWithTimeout = async (url, options, timeout = 3000) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    console.log("querying: " + url)
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    console.log("suspended querying: " + url)
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const getIPAddress = async () => {
  if (ipAddress != '' || sessionStorage.getItem('ipAddress') != undefined) {
    return sessionStorage.getItem('ipAddress') ||  ipAddress;
  }
  const response = await fetchWithTimeout('https://pro.ip-api.com/json?key=UmUotUAIUEZgdp0').then((d) => d.json())
    .catch((e) => {
      // console.log('IP ADDRESS ERROR!!!')
      // throw e;

      // got error, use default ip address
      ipAddress = '219.75.27.16'
    });

  if (!response || !response.ip_address) {
    // got error, use default ip address
    return '219.75.27.16'
  }

  ipAddress = response.ip_address;
  return ipAddress;
}

const getQuery = async (url) => {
  const queryParameters = 'appName=Shayu&platform=WEB&channelId=WEB&ip=' + await getIPAddress();

  if (url.includes('?')) {
    return '&' + queryParameters;
  } else {
    return '?' + queryParameters;
  }
}

const getHeader = async (
  requestBody,
  method = 'POST',
  token = '',
) => {
  return {
    'Content-Type': 'application/json',
    'Device-Id': 'application/json',
    'Platform-OS': 'WEB',
    'App-Channel': 'WEB',
    'App-Name': 'WEB',
    'IP-Address': await getIPAddress(),
    'App-Version': '',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  };
};

const objectToGetParams = (paramsObject) => {
  const searchParams = new URLSearchParams();
  for (const key in paramsObject) {
    // eslint-disable-next-line no-prototype-builtins
    if (paramsObject.hasOwnProperty(key)) {
      searchParams.append(key, paramsObject[key]);
    }
  }
  return searchParams.toString();
};

export default async function fetcher(url, body = {}, options = {}) {
  const {
    method = 'POST',
    saveUserToken,
    saveAhaToken,
    removeToken,
    returnFullResponse,
  } = options;

  const requestBody = JSON.stringify(body);
  const requestOption = {
    method,
    headers: await getHeader(requestBody, method, getLocalstorage(LocalStorageKeys.AuthTokenHeader)),
  };

  let getParams = '';
  let resData;
  url = BASE_URL + url

  if (method !== 'GET') {
    url = url + await getQuery(url);
    requestOption.body = requestBody;
  } else {
    getParams = objectToGetParams(body);

    if (body.class) {
      getParams = getParams.replace(encodeURIComponent(body.class), decodeURIComponent(body.class));
    }

    if (getParams !== '') {
      url += '?' + getParams;
    }
  }

  try {
    const response = await fetch(url, requestOption)
      .then((d) => d.json())
      .catch((e) => {
        console.log('ERROR')
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
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, resData.data.access_token)
    }
    if (saveAhaToken) {
      updateLocalstorage(LocalStorageKeys.AhaToken, resData.data.aha_token)
      localStorage.setItem('AuthToken', resData.data.aha_token)
    }
    if (removeToken) {
      updateLocalstorage(LocalStorageKeys.AuthTokenHeader, undefined);
      updateLocalstorage(LocalStorageKeys.AhaToken, undefined);
    }
  }

  if (returnFullResponse) {
    return resData
  }

  return resData.data;
}