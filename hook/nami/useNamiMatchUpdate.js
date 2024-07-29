import useSWR from 'swr';
import Api from '@/util/namiApi';

export const useNamiMatchUpdate = (param) => {
  const {
    data: matchUpdate,
    error,
    mutate: mutateMatchUpdate,
    isLoading,
  } = useSWR(['live/v1/match_updates', param], ([url, param]) =>
    Api.call(url, param, 'GET')
  );

  return {
    matchUpdate: matchUpdate || [],
    mutateMatchUpdate: mutateMatchUpdate,
    isLoading,
  };
};
