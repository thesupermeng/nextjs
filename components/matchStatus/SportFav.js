import { StarHollow, StarWhite } from '@/asset/icons';
import { FavouriteTypes, useFavourite } from '@/hook/games/useFavourite';
import useUser from '@/hook/user/useUser';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const SportFav = ({ id, sport_id }) => {
  const { isLogin } = useUser();
  const { favSports, addFav, delFav } = useFavourite(FavouriteTypes.SPORT);
  const [isFav, setIsFav] = useState();
  useEffect(() => {
    setIsFav(favSports.map((a) => a.game_id).includes(id));
  }, [favSports]);
  return isLogin ? (
    <Image
      className='cursor-pointer'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        isFav ? delFav(id) : addFav(id, { sport_id });
      }}
      alt='fav'
      src={isFav ? StarWhite : StarHollow}
    />
  ) : null;
};
