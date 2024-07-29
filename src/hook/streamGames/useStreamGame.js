import { URL_STREAM_GAMES } from '@/config/url';
import { UserApi } from '@/util/UserApi';
import useSWR from 'swr';
import { useFocusStream } from '../user/useFocusStream';
import { useSelector } from 'react-redux';

const EmptyObj = {};
const EmptyArr = [];

export const useStreamGame = () => {
  const { focusStream } = useFocusStream();
  const gameId = useSelector((s) => s.streamGame.gameId);

  const { data, isLoading, mutate } = useSWR(
    gameId && focusStream?.id
      ? [URL_STREAM_GAMES.streamGame, focusStream.id]
      : null,
    ([url, streamId]) =>
      UserApi(
        url,
        {
          game_id: gameId,
          stream_id: streamId,
          id_from: 0,
          limit: 10,
        },
        { method: 'GET' }
      )
  );

  return {
    streamGame: data?.data || EmptyObj,
    ongoing: { ...data?.data?.ongoing } || EmptyObj,
    results: data?.data?.results
      ? parseResults(data?.data?.result_count || 0, data?.data?.results)
      : EmptyArr,
    result_count: data?.data?.result_count || 0,
    mutateStreamGame: mutate,
    isLoading,
  };
};

const parseResults = (total, results) => {
  return results.map((result, idx) => {
    return { ...result, sequenceId: total - idx };
  });
};
