import { createSlice } from '@reduxjs/toolkit';

// export const setsportsTaya = (d) => sportsTaya.actions.setData(d);
export const setTayaMatchPlayType = (d) =>
  sportsTaya.actions.setTayaMatchPlayType(d);
export const setTayaSportsType = (d) => sportsTaya.actions.setTayaSportsType(d);
export const setTayaSportsOrderBy = (d) => sportsTaya.actions.setOrderBy(d);
export const setFilterLeagues = (d) => sportsTaya.actions.setFilterLeagues(d);
export const setTayaSportsPaging = (d) => sportsTaya.actions.setPaging(d);
export const setAnimationUrl = (d) => sportsTaya.actions.setAnimationUrl(d);

export const FBMatchListOrderBy = {
  League: 1,
  Date: 0,
};
const initialState = {
  matchPlayType: 3,
  sportsType: null,
  orderBy: FBMatchListOrderBy.League,
  filterLeagues: [],
  paging: { current: 1, pageTotal: 0, total: 0 },
  animationUrl: { url: '', title: '' },
};
export const sportsTaya = createSlice({
  name: 'sportsTaya',
  initialState,
  reducers: {
    resetData: (state) => {
      return {};
    },
    setTayaMatchPlayType: (state, action) => {
      state.matchPlayType = action.payload;
      state.filterLeagues = [];
    },
    setTayaSportsType: (state, action) => {
      state.sportsType = action.payload;
      state.filterLeagues = [];
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setFilterLeagues: (state, action) => {
      state.filterLeagues = action.payload;
    },
    setPaging: (state, action) => {
      state.paging = action.payload;
    },
    setAnimationUrl: (state, action) => {
      state.animationUrl = action.payload;
    },
  },
});
