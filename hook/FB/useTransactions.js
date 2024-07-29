import useSWR from 'swr';
import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useEffect, useState } from 'react';

export const useTransactions = (from, to) => {
  const [time, setTime] = useState({ from, to });
  useEffect(() => {
    setTime({ from, to });
  }, [from, to]);
  const { data, error, mutate, isLoading } = useSWR(
    time.from && time.to ? [URL_FB_APP.transactions, time] : null,
    ([url, time]) => FBApi(url, { beginTime: time.from, endTime: time.to })
  );
  return {
    mutate,
    listFB: data?.data || [],
  };
};
