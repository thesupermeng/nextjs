import { AUTH_CHANNEL_ACTION, LocalStorageKeys } from '@/config/common';
import { URL_USER } from '@/config/url';
import { User_Refresh_Interval } from '@/config/User/setting';
import { SetUserApiSetting, updateLocalstorage, UserApi } from '@/util/UserApi';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { authChannel } from '../common/useAuthChannel';
import { Config } from '@/util/config';

export default function useUser() {
  const [isLogin, setIsLogin] = useState('');
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const savedToken = localStorage.getItem(LocalStorageKeys.AuthTokenHeader);
    setIsLogin(savedToken);
    const handleAuthToken = () => {
      const token = localStorage.getItem(LocalStorageKeys.AuthTokenHeader);
      setIsLogin(token);
      authChannel.postMessage({
        type: AUTH_CHANNEL_ACTION.UPDATE_AUTHTOKEN,
        token: token || undefined,
      });
    };
    window.addEventListener(
      `storage-${LocalStorageKeys.AuthTokenHeader}`,
      handleAuthToken
    );
    return () => {
      window.removeEventListener(
        `storage-${LocalStorageKeys.AuthTokenHeader}`,
        handleAuthToken
      );
    };
  }, []);
  const { data, mutate } = useSWR(
    isLogin ? URL_USER.getUser : null,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      refreshInterval: User_Refresh_Interval.User,
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    updateLocalstorage(LocalStorageKeys.CurrencyId, data?.data?.currency_id);
    if (data?.data) {
      dispatch(setUserInfo(data?.data));
    }

    SetUserApiSetting('Agent', data?.data?.agent || '');
  }, [data]);
  const updateProfilePic = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return UserApi(URL_USER.updateProfilePic, formData, {
      isFormdata: true,
    }).then((res) => {
      mutate();
    });
  };
  const getUserId = useCallback(() => {
    if (!data?.data?.id) {
      return sessionStorage.getItem('uuid');
    } else {
      return !data?.data?.id;
    }
  }, [data?.data?.id]);

  useEffect(() => {
    Config.isLogin = isLogin && data?.data?.setup_required === false;
    if (isLogin) {
      setUserId(data?.data?.id);
    } else {
      setUserId(getUserId());
    }
  }, [isLogin, data]);

  return {
    user: data?.data,
    userId: userId,
    isLogin: isLogin && data?.data?.setup_required === false,
    mutateUser: mutate,
    updateProfilePic,
    getUserId,
  };
}
// const user = {
//   id: 19,
//   country_code: '+65',
//   mobile: '90470367',
//   username: 'abc',
//   email: 'taur57@redfin.tech',
//   nickname: 'Santino Mejia',
//   avatar:
//     'https://static.zbstg.co/img/user/19/avatar/19-avatar-20230920035254-gPhufu.jpg',
//   bio: '',
//   currency_id: 1,
//   signature: '1f0e3dad99908345f7439f8ffabdffc4',
//   following_count: 0,
//   setup_required: false,
//   kyc_required: false,
//   sum: {
//     balance: 998580,
//     wagering_requirement: 1000585,
//     withdrawable: 0,
//   },
// };
