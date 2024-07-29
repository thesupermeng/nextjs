import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserApi } from '@/util/UserApi';
import { URL_USER } from '@/config/url';
import useUser from '../user/useUser';
import { LocalStorageKeys } from '@/config/common';
import { useWindowListener } from '../useWindowListener';

export const useTayaToken = () => {
  const { isLogin } = useUser();
  const [TayaToken, setTayaToken] = useState('');
  const { data, error, mutate, isLoading } = useSWR(
    isLogin ? [URL_USER.getTayaToken] : null,
    ([url]) => UserApi(url, {}, { method: 'GET', saveTayaToken: true }),
    { revalidateOnFocus: false, refreshInterval: 15 * 60 * 1000 }
  );
  const updateTayaToken = useCallback(() => {
    const tayaToken = sessionStorage.getItem(LocalStorageKeys.TayaToken);
    if (!tayaToken) {
      mutate();
    }
    setTayaToken(sessionStorage.getItem(LocalStorageKeys.TayaToken));
  }, [mutate]);

  useEffect(() => {
    updateTayaToken();
  }, []);
  useWindowListener(`storage-${LocalStorageKeys.TayaToken}`, updateTayaToken);

  return {
    mutate,
    TayaToken,
  };
};
