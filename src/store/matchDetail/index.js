import { createSlice } from '@reduxjs/toolkit';

export const setMatchDetail = (d) => matchDetail.actions.setData(d);
export const resetMatchDetail = () => matchDetail.actions.resetData();

export const matchDetail = createSlice({
  name: 'matchDetail',
  initialState: {},
  reducers: {
    resetData: (state) => {
      return {};
    },
    setData: (state, action) => {
      const { id } = action.payload;
      state = { ...state, [id]: action.payload };
      return state;
    },
  },
});
