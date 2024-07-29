import { createSlice } from '@reduxjs/toolkit';

export const setIsScroll = (d) => isScroll.actions.setIsScroll(d);
export const resetIsScroll = () => isScroll.actions.resetIsScroll();

export const setIsTop = (d) => isTop.actions.setIsTop(d);
export const resetIsTop = () => isTop.actions.resetIsTop();

export const setCurrentScrollPosition = (d) =>
  currentScrollPosition.actions.setCurrentScrollPosition(d);
export const resetCurrentScrollPosition = () =>
  currentScrollPosition.actions.resetCurrentScrollPosition();

export const isScroll = createSlice({
  name: 'isScroll',
  initialState: { res: false },
  reducers: {
    resetIsScroll: (state) => {
      return {};
    },
    setIsScroll: (state, action) => {
      state.res = action.payload;
    },
  },
});

export const isTop = createSlice({
  name: 'isTop',
  initialState: { res: true },
  reducers: {
    resetIsTop: (state) => {
      return {};
    },
    setIsTop: (state, action) => {
      state.res = action.payload;
    },
  },
});

export const currentScrollPosition = createSlice({
  name: 'currentScrollPosition',
  initialState: { res: 0 },
  reducers: {
    resetCurrentScrollPosition: (state) => {
      return {};
    },
    setCurrentScrollPosition: (state, action) => {
      state.res = action.payload;
    },
  },
});
