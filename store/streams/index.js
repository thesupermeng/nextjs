import { createSlice } from '@reduxjs/toolkit';
export const setFocusStreamId = (d) => streams.actions.setFocusStreamId(d);
export const setLiveCategory = (d) => streams.actions.setLiveCategory(d);

const initialState = {
  focusStreamId: null,
  category: null,
};
export const streams = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    setFocusStreamId: (state, action) => {
      state.focusStreamId = Number(action.payload);
    },
    setLiveCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
