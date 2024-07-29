import { createSlice } from '@reduxjs/toolkit';
export const setIsOpenStats = (d) => stats.actions.setIsOpenStats(d);

const initialState = {
  isOpenStats: false,
};
export const stats = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setIsOpenStats: (state, action) => {
      state.isOpenStats = action.payload;
    },
  },
});
