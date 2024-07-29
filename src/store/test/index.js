import { createSlice } from '@reduxjs/toolkit';

export const testInc = (q) => test.actions.inc(q);

export const test = createSlice({
  name: 'test',
  initialState: {
    count: 0,
  },
  reducers: {
    inc: (state, action) => {
      state.count += action.payload;
    },
  },
});
