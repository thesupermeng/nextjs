import SocketAction from '@/components/socket/socketAction';
import { LocalStorageKeys } from '@/config/common';
import { URL_USER } from '@/config/url';
import { User_Refresh_Interval } from '@/config/User/setting';
import { filteredCountries } from '@/util/country';
import { updateLocalstorage, UserApi } from '@/util/UserApi';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export default function useGetConfig() {
  const { data, mutate } = useSWR(
    URL_USER.getConfig,
    (url) => UserApi(url, {}, { method: 'GET' }),
    {
      refreshInterval: User_Refresh_Interval.Config,
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (data?.data) {
      const { fb_url, socket, currency } = data.data;
      const curFBUrl = localStorage.getItem(LocalStorageKeys.FBAPIUrl);
      const newFBUrl = fb_url?.apiServerAddress;
      updateLocalstorage(
        LocalStorageKeys.FbCurrency,
        parseInt(currency?.fb_currency),
        true
      );
      updateLocalstorage(
        LocalStorageKeys.SiteCurrency,
        parseInt(currency?.site_currency),
        true
      );

      if (curFBUrl !== newFBUrl && newFBUrl) {
        updateLocalstorage(LocalStorageKeys.FBAPIUrl, newFBUrl);
      }
      if (socket) {
        SocketAction.createInstance({
          chat: { url: socket.chat_url, token: socket.chat_token },
          notify: { url: socket.notify_url, token: socket.notify_token },
          // notify: 'https://stgbl-notify.97kqb.com/',
          // gift: 'https://stgbl-gift.97kqb.com/',
        });
      }
    }
  }, [data?.data]);
  const countries = useMemo(() => {
    try {
      const countriesToShowArr = data.data.country_code.country_codes
        .split(',')
        .filter(Boolean);
      return filteredCountries(countriesToShowArr) || [];
    } catch {
      (e) => {
        return [];
      };
    }
  }, [data?.data?.country_code?.country_codes]);

  return {
    config: data?.data,
    countries: countries || [],
    isActive: data?.data?.first_app_login?.is_active == 'true',
    mutateConfig: mutate,
  };
}
//   socket: {
//     chat_token: 'abc012',
//     chat_url: 'https://chat.ctchat.live',
//     notify_token: 'abc012',
//     notify_url: 'https://notify.ctchat.live',
//   },
