import { URL_GAMES } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';
import useUser from '../user/useUser';

export const FavouriteTypes = {
  GAME: 2,
  SPORT: 1,
};
const EmptyArray = [];
export const useFavourite = (type = FavouriteTypes.GAME) => {
  const { isLogin } = useUser();
  const { data, mutate } = useSWR(
    isLogin ? URL_GAMES.favourites : null,
    (url) => UserApi(url, { type }, { method: 'GET' }),
    { revalidateOnFocus: false }
  );
  const addFav = async (id, option = {}) => {
    return UserApi(
      URL_GAMES.favourite,
      type === FavouriteTypes.GAME
        ? { game_id: id, type, ...option }
        : { game_id: id, type, ...option },
      { method: 'POST' }
    ).then((res) => {
      setTimeout(() => mutate());
    });
  };
  const delFav = async (id) => {
    return UserApi(
      URL_GAMES.favourite,
      type === FavouriteTypes.GAME
        ? { game_id: id, type }
        : { game_id: id, type },
      { method: 'DELETE' }
    ).then((res) => {
      setTimeout(() => mutate());
    });
  };

  return {
    favGames: data?.data?.map((obj) => obj.id) || EmptyArray,
    favSports: data?.data || EmptyArray,
    addFav,
    delFav,
    mutateFavGames: mutate,
  };
};
