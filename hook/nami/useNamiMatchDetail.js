import useSWR from 'swr';
import Api from '@/util/namiApi';

export const useNamiMatchDetail = (param) => {
  const {
    data: matchDetail,
    error,
    mutate: mutateMatchDetail,
    isLoading,
  } = useSWR(
    param?.id ? ['live/v1/match_details', param] : null,
    ([url, param]) => Api.call(url, param, 'GET'),
    { refreshInterval: 60 * 1000 }
  );

  return {
    matchDetail: matchDetail || [],
    mutateMatchList: mutateMatchDetail,
    isLoading,
  };
};
