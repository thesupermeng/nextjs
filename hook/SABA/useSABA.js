import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useUser from '../user/useUser';

export const useSABA = () => {
  const [sabaUrl, setSABAURL] = useState('');
  const { isLogin } = useUser();
  const { data, error, mutate, isLoading } = useSWR(URL_USER.sabaURL, (url) =>
    UserApi(url, {}, { method: 'GET' })
  );
  useEffect(() => {
    // saba url are diff for login user and guest
    mutate();
  }, [isLogin]);
  useEffect(() => {
    if (data?.data) {
      setSABAURL(data.data);
    }
  }, [data]);
  return { sabaUrl, mutateSabaUrl: mutate };
};
