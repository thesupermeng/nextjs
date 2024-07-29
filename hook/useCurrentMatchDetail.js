'use client';
import { useSelector } from 'react-redux';
import { useMatchDetail } from './FB/useMatchDetail';

export const useCurrentMatchDetail = () => {
  const { matchId } = useSelector((s) => s.common);
  const { matchDetail, isLoading } = useMatchDetail(matchId);

  return { data: matchDetail, isLoading };
};
