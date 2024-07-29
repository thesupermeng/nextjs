import { useStreamGame } from '@/hook/streamGames/useStreamGame';
import { useMQTT } from '@/hook/useMQTT';
import { useFocusStream } from '@/hook/user/useFocusStream';
import { usePrivateMessage } from '@/hook/usePrivateMessage';
import useUser from '@/hook/user/useUser';
import { useEffect, useState } from 'react';

export const csGuestTopic = 'er/cs/guest';
export const csUserTopic = 'er/cs/user';

export const MQTTContainer = () => {
  const { focusStream } = useFocusStream();
  const { mutateStreamGame } = useStreamGame();
  const { handleGuestPrivateMsg, handleUserPrivateMsg } = usePrivateMessage();
  const [topicsWithHandler, setTopicsWithHandler] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    setTopicsWithHandler({
      [`er/stream_game/${focusStream?.id}`]: mutateStreamGame,
      [`${csGuestTopic}/${userId}`]: handleGuestPrivateMsg,
      [`${csUserTopic}/${userId}`]: handleUserPrivateMsg,
    });
  }, [
    focusStream?.id,
    mutateStreamGame,
    userId,
    handleGuestPrivateMsg,
    handleUserPrivateMsg,
  ]);
  useMQTT(topicsWithHandler);
  return null;
};
