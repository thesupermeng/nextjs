import { FAV_SPORTTYPE_CODE, FB_MATCH_PLAY_TYPE } from '@/config/FB/FBConfig';
import { useFBStatistical } from '@/hook/FB/useFBStatistical';
import { FavouriteTypes, useFavourite } from '@/hook/games/useFavourite';
import useUser from '@/hook/user/useUser';
import { setTayaMatchPlayType } from '@/store/sportsTaya';
import { isWeb } from '@/util/common';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

const parseStats = (stats = []) => {
  const obj = {};
  stats.forEach((item) => {
    const total = item?.ssl?.reduce((sum, { c }) => {
      return sum + c;
    }, 0);
    obj[item.ty] = { ...item, total };
  });
  return obj;
};

export const TwCss_hightlightBottom =
  'after:absolute after:left-[50%] after:-bottom-[0.35rem] after:rounded-full after:bg-red-600 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:transition-all';
export default function HeaderMatchPlayType() {
  const dispatch = useDispatch();
  const { isLogin } = useUser();
  const { statistical } = useFBStatistical();
  const { matchPlayType } = useSelector((s) => s.sportsTaya);
  const { favSports } = useFavourite(FavouriteTypes.SPORT);
  const stats = useMemo(() => parseStats(statistical.sl), [statistical]);
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-initial gap-2 rounded-[6px] overflow-x-auto ${
        isWeb() ? 'bg-tayaGrey p-3 cursor-pointer' : 'gap-5 bg-transparent'
      } items-center justify-between`}
    >
      {FB_MATCH_PLAY_TYPE.filter((a) => !a.userOnly || isLogin).map((item) => {
        return (
          <div
            key={item.code || 'all'}
            onClick={() => {
              dispatch(setTayaMatchPlayType(item.code));
            }}
            className={`relative flex-1 text-center text-sm font-normal bg-transparent after:h-1 after:-bottom-1 pb-1 mb-1 common-transition ${TwCss_hightlightBottom} ${
              matchPlayType === item.code
                ? `text-white/100 after:scale-x-100`
                : `text-white/50 hover:after:scale-x-100`
            }`}
          >
            {t(item.text)}(
            {(item.code === FAV_SPORTTYPE_CODE
              ? favSports.length
              : stats[item.code]?.total) || 0}
            )
          </div>
        );
      })}
    </div>
  );
}
