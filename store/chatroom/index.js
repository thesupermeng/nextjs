import { createSlice } from '@reduxjs/toolkit';

export const addNewMessage = (d) => chatRoom.actions.addNewChat(d);
export const deleteMessageById = (d) => chatRoom.actions.deleteMessageById(d);
export const clearAllMessage = () => chatRoom.actions.clearChat();
export const updateSilentTime = (d) => chatRoom.actions.updateSilentTime(d);

export const addFollowBetList = (d) => chatRoom.actions.addFollowBetList(d);
export const clearAllFollowList = () => chatRoom.actions.clearFollowList();
export const removeFollowBetList = (d) =>
  chatRoom.actions.removeFollowBetList(d);
export const updateShowingState = (d) => chatRoom.actions.updateShowingState(d);

export const chatRoom = createSlice({
  name: 'chatRoom',
  initialState: { chatList: [], silentTill: 0, followBetList: [] },
  reducers: {
    addNewChat: (state, action) => {
      state.chatList.push(action.payload.message);
    },
    clearChat: (state, _) => {
      state.chatList = [];
      return state;
    },
    deleteMessageById: (state, action) => {
      state.chatList = state.chatList.filter(
        (msg) => msg._id != action.payload
      );
    },
    updateSilentTime: (state, action) => {
      state.silentTill = action.payload;
    },
    addFollowBetList: (state, action) => {
      const newFollowBet = {
        ...action.payload,
        ts: new Date().getTime(),
      };
      state.followBetList.push(newFollowBet);
    },
    removeFollowBetList: (state, action) => {
      const index = state.followBetList.findIndex(
        (e) => e?.ts === action.payload
      );
      if (index > -1) {
        state.followBetList.splice(index, 1);
      }
    },
    clearFollowList: (state, _) => {
      state.followBetList = [];
      return state;
    },
    updateShowingState: (state, action) => {
      const index = state.followBetList.findIndex(
        (e) => e?.ts === action.payload
      );
      if (index > -1) {
        state.followBetList[index].status = 'showing';
      }
    },
    // setChatHistory: (state, action) => (state = action.payload.message),
    // updateChatHistory: (state, action) => [...action.payload.message, ...state],
    // removeChat: (state, action) => {
    //   const { userId, timestamp, message } = action.payload;
    //   return state.filter(
    //     (item) =>
    //       !(
    //         item.user_id === userId &&
    //         item.timestamp === timestamp &&
    //         item.message === message
    //       )
    //   );
    // },
  },
});
