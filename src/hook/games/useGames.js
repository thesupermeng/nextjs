import {
  GameListRefreshInterval,
  GamesHeaderType,
} from '@/config/Games/gameConfig';
import { URL_GAMES } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import useUser from '../user/useUser';

//user: type 1: favourite, 2: recent

export const useGames = () => {
  const { isLogin } = useUser();
  const headerType = useSelector((s) => s.games.headerType);
  const [url, setUrl] = useState('');
  const [param, setParam] = useState({});
  useEffect(() => {
    if (headerType.key == GamesHeaderType.All.key) {
      setUrl(URL_GAMES.games);
      setParam({});
    } else if (headerType.key == GamesHeaderType.Featured.key) {
      setUrl(URL_GAMES.games);
      setParam({ is_featured: true });
    } else if (headerType.key == GamesHeaderType.Recent.key) {
      setUrl(URL_GAMES.recentGames);
      setParam({});
    } else if (headerType.key == GamesHeaderType.Favourite.key) {
      setUrl(URL_GAMES.favourites);
      setParam({ type: 2 });
    } else {
      setUrl(null);
      setParam({});
    }
  }, [isLogin, headerType]);
  const { data, isLoading } = useSWR(
    url ? [url, param] : null,
    ([url, p]) =>
      UserApi(url, p, {
        method: 'GET',
      })
    // { refreshInterval: GameListRefreshInterval }
  );
  const getGameInfo = useCallback(
    (id) => {
      return data?.data?.find((game) => game.id == id);
    },
    [data?.data]
  );
  return {
    games: data?.data || [],
    getGameInfo,
    // mutateGames: mutate,
    isLoading,
  };
};

/*
const samepleGames = {
  code: 0,
  data: [
    {
      id: 14,
      name: 'Chaos Crew',
      sub_game_id: 62,
      game_code: '201059',
      game_type: 'Slot',
      web_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EQGfsiCzsX9JmVEqkPgDNRcB-UnSFGq23v_bp_cye2HlPA?e=5EiLa0',
      app_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EQGfsiCzsX9JmVEqkPgDNRcB-UnSFGq23v_bp_cye2HlPA?e=5EiLa0',
    },
    {
      id: 11,
      name: 'Cash Pool',
      sub_game_id: 44,
      game_code: '201041',
      game_type: 'Scratchcard',
      web_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EVTaBSucKgJMlmfQSOZV0GUBq6q6wSWZUy2_h0694oTslQ?e=6JCEb4',
      app_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EVTaBSucKgJMlmfQSOZV0GUBq6q6wSWZUy2_h0694oTslQ?e=6JCEb4',
    },
    {
      id: 13,
      name: 'The Respinners',
      sub_game_id: 61,
      game_code: '201058',
      game_type: 'Slot',
      web_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EX44lscNztpKoCC0hUtY4zEBuGiM6wf6ledjI_5y3xiZrw?e=1GJkee',
      app_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EX44lscNztpKoCC0hUtY4zEBuGiM6wf6ledjI_5y3xiZrw?e=1GJkee',
    },
    {
      id: 15,
      name: 'Mines',
      sub_game_id: 90,
      game_code: '201149',
      game_type: 'InstantWin',
      web_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EdvH7lOz8cBFgtt3SicvY9wBBJ-VSY74sBqJgZ9wGsAk3w?e=fyQTcG',
      app_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EdvH7lOz8cBFgtt3SicvY9wBBJ-VSY74sBqJgZ9wGsAk3w?e=fyQTcG',
    },
    {
      id: 12,
      name: 'Cash Scratch',
      sub_game_id: 45,
      game_code: '201042',
      game_type: 'Scratchcard',
      web_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EbEgVLetzfBNoJXxU3O51FcBpOJVN7JVVEIitYRfhegANA?e=OcAApP',
      app_icon:
        'https://azuretechtw.sharepoint.com/:i:/s/Marketing/EbEgVLetzfBNoJXxU3O51FcBpOJVN7JVVEIitYRfhegANA?e=OcAApP',
      is_maintenance: true,
      maintenance_start: 1696118400,
      maintenance_end: 1730332800,
    },
  ],
  msg: '',
};
*/
