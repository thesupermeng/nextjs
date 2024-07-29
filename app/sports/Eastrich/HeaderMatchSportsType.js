import {
  BasketBallGrey,
  BasketBallWhite,
  Filter,
  SoccerBallGrey,
  SoccerBallWhite,
  SportsAllGrey,
  SportsAllWhite,
} from '@/asset/icons';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { FAV_SPORTTYPE_CODE } from '@/config/FB/FBConfig';
import { useFBStatistical } from '@/hook/FB/useFBStatistical';
import { FavouriteTypes, useFavourite } from '@/hook/games/useFavourite';
import { setTayaSportsType } from '@/store/sportsTaya';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

const SPORTS_DATA = [
  {
    text: i18n.t('all'),
    icon: SportsAllGrey,
    iconActive: SportsAllWhite,
    code: null,
  },
  {
    text: i18n.t('football'),
    icon: SoccerBallGrey,
    iconActive: SoccerBallWhite,
    code: 1,
  },
  {
    text: i18n.t('basketball'),
    icon: BasketBallGrey,
    iconActive: BasketBallWhite,
    code: 3,
  },
];

const parseStats = (stats = [], type) => {
  const obj = { all: 0 };
  stats.forEach(({ ssl, ty }) => {
    if (ty !== type) {
      return;
    }
    ssl.forEach(({ sid, c }) => {
      obj[sid] = c;
      obj.all += c;
    });
  });
  return obj;
};

const parseFav = (favSports) => {
  const obj = { all: favSports.length };
  favSports.forEach(({ sport_id }) => {
    obj[sport_id] = (obj[sport_id] || 0) + 1;
  });
  return obj;
};

const SportBlock = ({ data, count, onClick }) => {
  const { icon, iconActive, text, code } = data || {};
  const { sportsType } = useSelector((s) => s.sportsTaya);
  return (
    <div
      onClick={() => onClick(code)}
      className={`group flex flex-row flex-initial min-w-[70px] text-center text-sm rounded-lg font-semibold gap-1 p-3 bg-tayaGrey ${
        sportsType === code
          ? 'text-white/100 tayagradient'
          : 'text-white/50 hover:text-white/100'
      }`}
    >
      {sportsType === code ? (
        <Image alt={text} src={iconActive} className='hover:text-white/100' />
      ) : (
        <>
          <Image
            alt={text}
            src={icon}
            className='block group-hover:hidden hover:text-[#7B7B7B]'
          />
          <Image
            alt={text}
            src={iconActive}
            className='hidden group-hover:block group-hover:text-white/100'
          />
        </>
      )}
      <div>
        {text} ({count})
      </div>
    </div>
  );
};

const SportBlockH5 = ({ data, count, onClick }) => {
  const { icon, iconActive, text, code } = data || {};
  const { sportsType } = useSelector((s) => s.sportsTaya);
  return (
    <div
      onClick={() => onClick(code)}
      className={`shrink-0 flex flex-row flex-initial text-center rounded-lg gap-1 py-1.5 px-2.5 common-transition ${
        sportsType === code
          ? 'text-white/100 tayagradient'
          : 'text-white/50 bg-tayaGrey'
      }`}
    >
      <Image
        alt={text}
        src={sportsType === code ? iconActive : icon}
        className=''
      />
      <div
        className={`text-[11px] ${
          sportsType === code ? 'font-medium' : 'font-normal'
        } `}
      >
        {text} ({count})
      </div>
    </div>
  );
};

export default function HeaderMatchSportsType() {
  const dispatch = useDispatch();
  const { statistical } = useFBStatistical();
  const { matchPlayType, filterLeagues } = useSelector((s) => s.sportsTaya);
  const { favSports } = useFavourite(FavouriteTypes.SPORT);
  const stats = useMemo(() => {
    return matchPlayType === FAV_SPORTTYPE_CODE
      ? parseFav(favSports)
      : parseStats(statistical?.sl, matchPlayType);
  }, [statistical, matchPlayType, matchPlayType]);
  const favStats = parseFav(favSports);
  const onClick = useCallback((code) => {
    dispatch(setTayaSportsType(code));
  }, []);

  return (
    <div
      className={`flex flex-row items-center justify-start flex-initial ${
        isWeb() ? 'cursor-pointer gap-4 mt-2' : 'overflow-visible'
      } py-3 rounded-2xl`}
    >
      <WEBOnly>
        {SPORTS_DATA.map((item) => {
          return (
            <SportBlock
              key={item.code || 'all'}
              data={item}
              count={stats[item.code || 'all'] || 0}
              onClick={onClick}
            />
          );
        })}
      </WEBOnly>

      <H5Only>
        <>
          <div className='flex-row flex items-center gap-3 overflow-x-auto'>
            {SPORTS_DATA.map((item) => {
              return (
                <SportBlockH5
                  key={item.code || 'all'}
                  data={item}
                  count={stats[item.code || 'all'] || 0}
                  onClick={onClick}
                />
              );
            })}
          </div>

          {matchPlayType === 7 && (
            <Link href={'/sports/Eastrich/SportsFilter'}>
              <div
                className={`relative rounded-md bg-tayaGrey px-2 py-1 flex flex-1 flex-col justify-between items-center`}
              >
                <Image alt='filter' src={Filter} width={16} />
                {filterLeagues.length ? (
                  <div className='absolute flex items-center justify-center w-6 h-6 rounded-full -top-3 -right-3 bg-tayaRed'>
                    <div className='text-xs font-bold'>
                      {filterLeagues.length}
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          )}
        </>
      </H5Only>
    </div>
  );
}
