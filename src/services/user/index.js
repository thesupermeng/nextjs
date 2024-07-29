import { URL_STREAM_GAMES, URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';

export const ActionType = {
  login: 'login',
  deleteUser: 'delete_user',
  setPassword: 'set_password',
  setSecondaryPassword: 'set_secondary_password',
};

export const getSMSOtp = async (
  country_code,
  mobile,
  action,
  check_user = false
) => {
  window.dispatchEvent(new Event('showCaptcha'));
  return new Promise((resolve, reject) => {
    const handleCaptchJson = () => {
      resolve(
        UserApi(URL_USER.smsOtp, {
          country_code,
          mobile,
          point_json: window.captchaJson.point_json,
          token: window.captchaJson.token,
          check_user,
          action: action,
          //login -> POST /login_otp
          // delete_user -> DELETE /me
          // set_password -> POST /password
          // set_secondary_password -> PUT /secondary-password
        })
      );
    };
    window.captchaJson = {};
    window.addEventListener('captchaJson', handleCaptchJson, { once: true });
  });
};

export const loginWithOtp = async (param) => {
  return UserApi(URL_USER.login_otp, param, { saveUserToken: true });
};

export const loginWithPassword = async (param) => {
  return UserApi(URL_USER.login_password, param, { saveUserToken: true });
};

export const setPassword = async (param) => {
  return UserApi(URL_USER.setPassword, param);
};

// export const getUser = async () => {
//   return UserApi(URL_USER.getUser, {}, { method: 'GET' });
// };

export const logout = async () => {
  return UserApi(URL_USER.logout, {}, { method: 'DELETE', removeToken: true });
};

export const deleteAccount = async (otp) => {
  return UserApi(
    URL_USER.getUser,
    { otp },
    { method: 'DELETE', removeToken: true }
  );
};

export const getTayaToken = async () => {
  return UserApi(
    URL_USER.getTayaToken,
    {},
    { method: 'GET', saveTayaToken: true }
  );
};
export const getFBToken = async () => {
  return UserApi(URL_USER.getFBToken, {}, { method: 'GET', saveFBToken: true });
  // const sample = {
  //   code: 0,
  //   data: {
  //     token:
  //       'tt_74WV6xU0ynSekNGRFjNCITwbZ7Sibu3L.5377509b7d2350941f93804215e13aa2',
  //     serverInfo: {
  //       apiServerAddress: 'https://app.server.st-newsports.com',
  //       h5Address: 'https://h5.st-newsports.com',
  //       pcAddress: 'https://pc.st-newsports.com',
  //       pushServerAddress: 'wss://sptph.server.st-newsports.com',
  //       virtualAddress: 'https://virapp.server.st-newsports.com',
  //     },
  //     themeBgColor: '#05259D',
  //     themeFgColor: '#4C6FFF',
  //   },
  //   msg: '',
  // };
};

export const checkUsername = async (username) => {
  return UserApi(
    URL_USER.checkUsername,
    { username: username },
    { method: 'GET' }
  );
};

export const checkPassword = async (password) => {
  return UserApi(
    URL_USER.checkPassword,
    { password: password },
    { method: 'POST' }
  );
};

export const finishSetup = async (params) => {
  return UserApi(URL_USER.finishSetup, params);
};

export const sendWithdrawOrder = async (params) => {
  return UserApi(URL_USER.withdrawOrder, params);
};
// export const getTopUpMethod = async () => {
//   return UserApi(URL_USER.getTopUpMethod, {}, { method: 'GET' });
// };
// export const getWithdrawMethod = async () => {
//   return UserApi(URL_USER.getWithdrawMethod, {}, { method: 'GET' });
// };
export const getTopUpOrder = async (params) => {
  return UserApi(URL_USER.getTopUpOrder, params);
};
export const addWithdrawAcc = async (params) => {
  return UserApi(URL_USER.withdrawAcc, params);
};
export const delWithdrawAcc = async (params) => {
  return UserApi(URL_USER.withdrawAcc, params, { method: 'DELETE' });
};
// export const getWithdrawAcc = async (params) => {
//   return UserApi(URL_USER.withdrawAcc, params, { method: 'GET' });
// };
export const setSecondaryPwd = async (params) => {
  return UserApi(URL_USER.addSecondaryPwd, params, { method: 'PUT' });
};
export const checkOtp = async (params) => {
  return UserApi(URL_USER.checkOtp, params, { method: 'GET' });
};
export const getSilenceUntil = async (id) => {
  return UserApi(
    URL_USER.getSilenceUntil,
    { streamer_id: id },
    { method: 'GET' }
  );
};
export const updateNickname = async (params) => {
  return UserApi(URL_USER.updateNickname, params);
};
export const updateProfilePic = async (params) => {
  const formData = new FormData();
  return UserApi(URL_USER.updateProfilePic, formData, { isFormdata: true });
};
export const getCounter = async () => {
  return UserApi(URL_USER.getCounter, {}, { method: 'GET' });
};
export const getNotifications = async (params) => {
  return UserApi(URL_USER.getNotifications, params, { method: 'GET' });
};
export const getTransactionHistory = async (params) => {
  return UserApi(URL_USER.getTransactionHistory, params, { method: 'GET' });
};
export const getOrderHistory = async (params) => {
  return UserApi(URL_USER.getOrderHistory, params, { method: 'GET' });
};
export const markReadNotification = async (params) => {
  return UserApi(URL_USER.markReadNotifications, params, { method: 'PUT' });
};

export const postGameBetOrder = async (drawId, betOption, betAmt) => {
  return UserApi(
    URL_STREAM_GAMES.placeOrder,
    { draw_id: drawId, selection: betOption, amount: betAmt },
    { method: 'POST' }
  );
};
