import { URL_STREAM_GAMES } from '@/config/url';
import { setGameList } from '@/store/streamGame';
import { UserApi } from '@/util/UserApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

const EmptyArray = [];
export const useStreamGameList = () => {
  const dispatch = useDispatch();
  const gameList = useSelector((s) => s.streamGame.gameList);
  const { data, mutate } = useSWR(
    !gameList ? URL_STREAM_GAMES.streamGameList : null,
    (url) => UserApi(url, {}, { method: 'GET' })
  );
  useEffect(() => {
    if (!gameList) {
      dispatch(setGameList(data?.data));
    }
  }, [gameList, data?.data]);

  return { gameList: gameList || EmptyArray };
};
