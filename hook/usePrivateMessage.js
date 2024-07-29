import { addNewLiveChatMsg } from '@/store/livechat';
import { AuthorType, PrivateMsgType } from '@/util/liveChatConst';
import { useDispatch } from 'react-redux';
import useUser from './user/useUser';
import { useCallback } from 'react';

export const usePrivateMessage = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const handleUserPrivateMsg = useCallback(
    (topic, message) => {
      user && handleMsg(topic, message);
    },
    [user]
  );

  const handleGuestPrivateMsg = useCallback(
    (topic, message) => {
      !user && handleMsg(topic, message);
    },
    [user]
  );

  const handleMsg = useCallback((topic, message) => {
    try {
      const data = JSON.parse(message?.toString());
      if (data) {
        dispatch(
          addNewLiveChatMsg({
            data: data?.data,
            timestamp: new Date(),
            authorType: AuthorType.Agent,
            type: data?.type,
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  return { handleUserPrivateMsg, handleGuestPrivateMsg };
};
