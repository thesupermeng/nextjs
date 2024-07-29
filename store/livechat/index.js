import { createSlice } from '@reduxjs/toolkit';

export const addNewLiveChatMsg = (d) => livechat.actions.addNewLiveChat(d);
export const clearAllLiveMessage = () => livechat.actions.clearLiveChat();
export const togglePrivateRoom = (d) => livechat.actions.setPrivateRoom(d);

const MAX_CHAT_LIST_LENGTH = 20;

export const livechat = createSlice({
  name: 'livechat',
  initialState: {
    liveChatList: [],
    privateRoom: false,
    newMsgCount: 0,
  },
  reducers: {
    //livechat
    addNewLiveChat: (state, action) => {
      if (state.liveChatList.length >= MAX_CHAT_LIST_LENGTH) {
        // Clear the previous messages if the limit is exceeded
        const messagesToRemove =
          state.liveChatList.length - MAX_CHAT_LIST_LENGTH + 1;
        state.liveChatList.splice(1, messagesToRemove);
        state.newMsgCount = state.privateRoom ? 0 : MAX_CHAT_LIST_LENGTH;
      }

      state.liveChatList.push(action.payload);
      if (!state.privateRoom) {
        state.newMsgCount++;
      }
    },
    clearLiveChat: (state, _) => {
      state.liveChatList = [];
      state.newMsgCount = 0;
      return state;
    },
    //private room
    setPrivateRoom: (state, action) => {
      state.privateRoom = action.payload;
      state.newMsgCount = 0;
    },
  },
});
