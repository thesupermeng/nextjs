import { URL_GAMES } from '@/config/url';
import { setGamesAllProviders, setGamesProviders } from '@/store/games';
import { UserApi } from '@/util/UserApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

export const useGameProviders = () => {
  const dispatch = useDispatch();
  const allProviders = useSelector((s) => s.games.allProviders);
  const { data, mutate } = useSWR(
    allProviders.length > 0 ? null : URL_GAMES.providers,
    (url) =>
      UserApi(url, { type: 2 }, { method: 'GET' }).then(
        (data) => {
          dispatch(setGamesProviders(data?.data?.map((obj) => obj.id) || []));
          return data;
        },
        { refreshInterval: 0, revalidateOnFocus: false }
      )
  );
  useEffect(() => {
    if (data?.data?.length > 0) {
      dispatch(setGamesAllProviders(data?.data || []));
      dispatch(setGamesProviders(data?.data.map((a) => a.id) || []));
    }
  }, [data?.data]);
  return { providers: allProviders || [], mutateProvider: mutate };
};
