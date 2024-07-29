import { StarHollow, StarWhite } from '@/asset/icons';
import { useFavourite } from '@/hook/games/useFavourite';
import useUser from '@/hook/user/useUser';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const GameFav = ({ id }) => {
  const { isLogin } = useUser();
  const { favGames, addFav, delFav } = useFavourite();
  const [isFav, setIsFav] = useState();
  useEffect(() => {
    setIsFav(favGames.includes(parseInt(id)));
  }, [favGames]);
  return isLogin ? (
    <Image
      className='cursor-pointer'
      onClick={(e) => {
        e.stopPropagation();
        return isFav ? delFav(id) : addFav(id);
      }}
      alt='fav'
      src={isFav ? StarWhite : StarHollow}
    />
  ) : null;
};
