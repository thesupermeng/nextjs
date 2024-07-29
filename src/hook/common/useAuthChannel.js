import { AUTH_CHANNEL_ACTION, LocalStorageKeys } from '@/config/common';
import { updateLocalstorage } from '@/util/UserApi';
import { useEffect } from 'react';

export const authChannel = new BroadcastChannel('auth_channel');

export const useAuthChannel = () => {
  const fn = (e) => {
    // console.log('listen channel', e);
    const { type, token } = e.data;
    switch (type) {
      case AUTH_CHANNEL_ACTION.UPDATE_AUTHTOKEN:
        updateLocalstorage(LocalStorageKeys.AuthTokenHeader, token);
        authChannel.close();
        window.location.reload();
        break;
    }
  };
  useEffect(() => {
    try {
      authChannel.addEventListener('message', fn);
      return () => {
        authChannel.removeEventListener('message', fn);
      };
    } catch (e) {
      /* empty */
    }
  }, [authChannel, fn]);
};
