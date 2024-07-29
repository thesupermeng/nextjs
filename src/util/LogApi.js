import { Config } from './config';

export const getDeviceInfoObject = async () => {
  const checkConfig = async (res) => {
    if (Config.platform && Config.isLogin !== false && Config.isLogin !== '') {
      res(
        JSON.stringify({
          platform: `${
            Config.platform === 'iOS' || Config.platform === 'Android'
              ? 'm-'
              : ''
          }${Config.platform}`,
          channel: Config.channel,
          userId: Config.userId !== '' ? parseInt(Config.userId) : 0,
          countryCode: Config.countryCode,
        })
      );
    } else {
      setTimeout(() => {
        checkConfig(res);
      }, 10);
    }
  };
  return await new Promise(checkConfig);
};

const LogURL = process.env.NEXT_PUBLIC_URL_LOG_API;

const parseObjToFormData = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, val]) => {
    formData.append(key, val);
  });
  return formData;
};
export const LogApi = async (url, body = {}, options = {}) => {
  const { method = 'POST', isFormdata } = options;
  const requestBody = isFormdata ? body : parseObjToFormData(body);
  const DeviceInfo = await getDeviceInfoObject();

  const requestUrl =
    method === 'GET'
      ? `${LogURL}${url}?${Object.entries({ ...body })
          .map(([key, val]) => `${key}=${val}`)
          .join('&')}`
      : `${LogURL}${url}`;
  const requestOption = {
    method,
    headers: {
      'Access-Control-Allow-Origin': 'cors',
      DeviceInfo: DeviceInfo,
    },
  };

  if (method !== 'GET') {
    requestOption.body = requestBody;
  }
  let resData;
  try {
    resData = await fetch(requestUrl, requestOption)
      .then((d) => d.text())
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    resData = {
      code: 400,
      msg: 'Exception',
      error: e,
    };
  }
  return resData;
};
