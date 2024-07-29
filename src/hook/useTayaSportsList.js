import { FAV_SPORTTYPE_CODE, FB_MATCH_SPORTS_TYPE } from '@/config/FB/FBConfig';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFBMatchList } from './FB/useMatchList';
import { FavouriteTypes, useFavourite } from './games/useFavourite';

export const useTayaSportsList = () => {
  const {
    paging: { current },
    matchPlayType,
    sportsType,
    filterLeagues,
    orderBy,
  } = useSelector((s) => s.sportsTaya);
  const { favSports } = useFavourite(FavouriteTypes.SPORT);
  const [param, setParam] = useState({});
  const { setting } = useSelector((s) => s.betCart);
  const oddsType = setting.format;
  useEffect(() => {
    // handle non favourites
    if (matchPlayType === FAV_SPORTTYPE_CODE) {
      return;
    }
    const prop = { current, type: matchPlayType, orderBy, oddsType };
    if (filterLeagues?.length) {
      prop.leagueIds = filterLeagues;
    } else if (sportsType) {
      prop.sportId = sportsType;
    } else {
      prop.sportIds = FB_MATCH_SPORTS_TYPE;
    }
    setParam(prop);
  }, [matchPlayType, sportsType, orderBy, current, filterLeagues, oddsType]);
  useEffect(() => {
    // handle favourites
    if (matchPlayType === FAV_SPORTTYPE_CODE) {
      setParam({
        matchIds: favSports
          .filter((a) => {
            return !sportsType || a.sport_id == sportsType;
          })
          .map((a) => a.game_id),
        oddsType
      });
    }
  }, [favSports, sportsType, matchPlayType, oddsType]);
  const { matchList, isLoading } = useFBMatchList(param);
  return { list: matchList?.records || [], isLoading };
};
