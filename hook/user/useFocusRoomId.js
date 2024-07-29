import { useStreamer } from './useStreamer';

export const useFocusRoomId = () => {
  const { streamer } = useStreamer();
  return { roomId: streamer?.live?.id, streamerId: streamer?.id };
};
