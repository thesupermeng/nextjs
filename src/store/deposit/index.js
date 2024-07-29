import { createSlice } from '@reduxjs/toolkit';

export const setDepositAmt = (d) => deposit.actions.setDepositAmt(d);

const initialState = {
  depositAmt: null
};
export const deposit = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    setDepositAmt: (state, action) => {
      state.depositAmt = action.payload;
    },
  },
});