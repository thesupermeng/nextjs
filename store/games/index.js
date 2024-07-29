import { GamesHeaderType, GamesHeaderTypes } from '@/config/Games/gameConfig';
import { createSlice } from '@reduxjs/toolkit';

export const setGameTypeHeader = (d) => games.actions.setGameTypeHeader(d);
export const setGamesProviders = (d) => games.actions.setGamesProviders(d);
export const setGamesAllProviders = (d) =>
  games.actions.setGamesAllProviders(d);
export const setGameIsRealPlay = (d) => games.actions.setGameIsRealPlay(d);
export const setGameFullScreen = (d) => games.actions.setGameFullScreen(d);
export const setIsPopUp = (d) => games.actions.setIsPopUp(d);

const initialState = {
  headerType: GamesHeaderType.All,
  selectedProviders: [],
  allProviders: [],
  isRealPlay: false,
  gameFullScreen: false,
  isPopUp: false,
};
export const games = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGameTypeHeader: (state, action) => {
      state.headerType = action.payload;
      return state;
    },
    setGamesProviders: (state, action) => {
      state.selectedProviders = action.payload;
    },
    setGamesAllProviders: (state, action) => {
      state.allProviders = action.payload;
    },
    setGameIsRealPlay: (state, action) => {
      state.isRealPlay = action.payload;
    },
    setGameFullScreen: (state, action) => {
      state.gameFullScreen = action.payload;
    },
    setIsPopUp: (state, action) => {
      state.isPopUp = action.payload;
    },
  },
});
