import { LocalStorageKeys } from '@/config/common';
import { URL_GAMES } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import useUser from '../user/useUser';

export const useGameUrl = ({ game_id }) => {
  const { isLogin } = useUser();
  const [url, setUrl] = useState('');
  const [param, setParam] = useState({});
  const gameFullScreen = useSelector((s) => s.games.gameFullScreen);
  const isRealPlay = useSelector((s) => s.games.isRealPlay);
  useEffect(() => {
    if (!isRealPlay) {
      setUrl(URL_GAMES.dcFun);
    } else if (isRealPlay && isLogin) {
      setUrl(URL_GAMES.dcUser);
    } else {
      setUrl('');
    }
  }, [isRealPlay, isLogin]);
  useEffect(() => {
    if (!url) {
      setParam(null);
    } else {
      setParam({
        game_id,
        fullscreen: false && gameFullScreen,
        currency_id: 1,
      });
    }
  }, [game_id, url, gameFullScreen]);

  const getGameUrl = () => {
    let url = '';
    let param = {};
    if (!isRealPlay) {
      url = URL_GAMES.dcFun;
    } else if (isRealPlay && isLogin) {
      url = URL_GAMES.dcUser;
    } else {
      url = '';
    }
    if (url) {
      param = {
        game_id,
        fullscreen: false && gameFullScreen,
        currency_id: localStorage.getItem(LocalStorageKeys.CurrencyId) || 1,
      };
    } else {
      param = {};
    }

    // const { data } = useSWR(url && param ? [url, param] : null, ([url, p]) =>
    //   UserApi(url, p, {
    //     method: 'GET',
    //   })
    // );
    // return data?.data?.game_url;
    if (url) {
      return UserApi(url, param, { method: 'GET' });
    } else {
      return null;
    }
  };

  return {
    getGameUrl,
    // url: getGameUrl() || '',
    // mutateGameUrl: mutate,
  };
};
