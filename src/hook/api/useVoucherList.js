import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import { useEffect } from 'react';
import useSWR from 'swr';
export const useVoucherList = (filter = '') => {
  const { data, isLoading, mutate } = useSWR(
    filter !== '' ? [URL_USER.getVoucherList, filter] : null,
    ([url, filter]) => UserApi(url, { filter: filter }, { method: 'GET' })
  );

  const getVoucherList = (filter = '') => {
    return UserApi(
      URL_USER.getVoucherList,
      { filter: filter },
      { method: 'GET' }
    );
  };

  return {
    data: data?.data || [],
    isLoading,
    mutate,
    getVoucherList,
  };
};
