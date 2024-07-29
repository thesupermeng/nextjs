import { createSlice } from '@reduxjs/toolkit';

export const setStreamGameBetAmt = (d) =>
  streamGame.actions.setStreamGameBetAmt(d);
export const setGameId = (d) => streamGame.actions.setGameId(d);
export const setGameList = (d) => streamGame.actions.setGameList(d);

const initialState = {
  gameId: 0,
  betAmt: 0,
  gameList: null,
};

export const streamGame = createSlice({
  name: 'streamGame',
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setStreamGameBetAmt: (state, action) => {
      state.betAmt = action.payload;
    },
    setGameList: (state, action) => {
      state.gameList = action.payload;
    },
  },
});
