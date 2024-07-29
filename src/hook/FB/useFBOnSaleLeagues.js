import {
  FB_MATCH_SPORTS_TYPE,
  FB_Refresh_Interval,
} from '@/config/FB/FBConfig';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';

const url = '/v1/match/getOnSaleLeagues';

export const useFBOnSaleLeagues = () => {
  const { matchPlayType, sportsType } = useSelector((s) => s.sportsTaya);
  const [param, setParam] = useState({});
  useEffect(() => {
    const prop = { type: matchPlayType };
    if (sportsType) {
      prop.sportId = sportsType;
    } else {
      prop.sportIds = FB_MATCH_SPORTS_TYPE;
    }
    setParam(prop);
  }, [matchPlayType, sportsType]);

  const { data, isLoading } = useSWR(
    [url, param],
    ([url, param]) => FBApi(url, param),
    {
      refreshInterval: FB_Refresh_Interval.Leagues,
    }
  );
  // useEffect(() => {
  //   if (!data?.data) {
  //     return;
  //   }
  //   const filtered = {};
  //   filtered.sl = data.data.sl
  //     .map(({ ty, ssl }) => {
  //       if (PlayTypes.includes(ty)) {
  //         return { ty, ssl: ssl.filter(filterSid) };
  //       } else {
  //         // remove other than 3 4 2 7
  //         return null;
  //       }
  //     })
  //     .filter(Boolean);
  //   filtered.hls = data.data.hls.filter(filterSid);
  //   setStats(filtered);
  // }, [data?.data]);
  return {
    leagues: data?.data || [],
    isLoading,
  };
};
