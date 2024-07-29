import { FB_Refresh_Interval } from '@/config/FB/FBConfig';
import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setMatchSid } from '@/store/common';

export const useMatchDetail = (matchId) => {
  const { setting } = useSelector((s) => s.betCart);
  const dispatch = useDispatch();
  const oddsType = setting.format;
  const {
    data: matchDetail,
    error,
    mutate: mutateMatchDetail,
    isLoading,
  } = useSWR(
    matchId ? ['/v1/match/getMatchDetail', matchId, oddsType] : null,
    ([url, matchId, oddsType]) => FBApi(url, { matchId, oddsType }),
    { refreshInterval: FB_Refresh_Interval.MatchList }
  );

  useEffect(() => {
    dispatch(setMatchSid(matchDetail?.data?.sid));
  }, [matchDetail?.data]);
  const getMatchDetails = (matchId) => {
    return FBApi('/v1/match/getMatchDetail', { matchId, oddsType });
  };

  return {
    matchDetail: matchDetail?.data || [],
    mutateMatchList: mutateMatchDetail,
    isLoading,
    getMatchDetails,
  };
};
