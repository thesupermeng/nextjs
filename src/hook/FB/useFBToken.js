import { FB_Refresh_Interval } from '@/config/FB/FBConfig';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserApi } from '@/util/UserApi';
import { URL_USER } from '@/config/url';
import { useSelector } from 'react-redux';
import useUser from '../user/useUser';
import useGetConfig from '../user/useGetConfig';
import { LocalStorageKeys } from '@/config/common';
import { useWindowListener } from '../useWindowListener';

export const useFBToken = () => {
  const { isLogin } = useUser();
  const { config } = useGetConfig();
  const [FBToken, setFBToken] = useState('');
  useWindowListener(`storage-${LocalStorageKeys.FBToken}`, () => {
    setFBToken(sessionStorage.getItem(LocalStorageKeys.FBToken));
  });
  const { data, error, mutate, isLoading } = useSWR(
    isLogin ? [URL_USER.getFBToken] : null,
    ([url]) => UserApi(url, {}, { method: 'GET', saveFBToken: true }),
    { refreshInterval: 15 * 60 * 1000 }
  );
  return {
    mutate,
    FBToken,
    serverInfo: {
      apiServerAddress:
        data?.data?.serverInfo?.apiServerAddress ||
        config?.fb_url?.apiServerAddress,
      h5Address: data?.data?.serverInfo?.h5Address || config?.fb_url?.h5Address,
      pcAddress: data?.data?.serverInfo?.pcAddress || config?.fb_url?.pcAddress,
      pushServerAddress:
        data?.data?.serverInfo?.pushServerAddress ||
        config?.fb_url?.pushServerAddress,
      virtualAddress:
        data?.data?.serverInfo?.virtualAddress ||
        config?.fb_url?.virtualAddress,
    },
    //  || {
    //   apiServerAddress: 'https://app.server.st-newsports.com',
    //   h5Address: 'https://h5.st-newsports.com',
    //   pcAddress: 'https://pc.st-newsports.com',
    //   pushServerAddress: 'wss://sptph.server.st-newsports.com',
    //   virtualAddress: 'https://virapp.server.st-newsports.com',
    // },
  };
};

// const data = {
//   fb_url: {
//     apiServerAddress: 'https://app.server.st-newsports.com',
//     h5Address: 'https://h5.st-newsports.com',
//     pcAddress: 'https://pc.st-newsports.com',
//     pushServerAddress: 'wss://sptph.server.st-newsports.com',
//     virtualAddress: 'https://virapp.server.st-newsports.com',
//   },
// };
