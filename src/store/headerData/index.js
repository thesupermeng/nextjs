import { createSlice } from '@reduxjs/toolkit';

export const setHeaderMenu = (d) => headerMenu.actions.setData(d);
export const resetHeaderMenu = () => headerMenu.actions.resetData();

export const headerMenu = createSlice({
  name: 'headerMenu',
  initialState: { headerMenu: [] },
  reducers: {
    resetData: (state) => {
      return {};
    },
    setData: (state, action) => {
      state.headerMenu = action.payload;
    },
  },
});


