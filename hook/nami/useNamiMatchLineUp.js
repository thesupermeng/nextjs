import useSWR from 'swr';
import Api from '@/util/namiApi';

export const useNamiMatchLineUp = (param) => {
  const {
    data: matchLineup,
    error,
    mutate: mutateMatchLineUp,
    isLoading,
  } = useSWR(['live/v1/match_lineup', param], ([url, param]) =>
    Api.call(url, param, 'GET')
  );

  return {
    matchLineup: matchLineup || [],
    mutateMatchLineUp: mutateMatchLineUp,
    isLoading,
  };
};
