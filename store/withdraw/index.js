import { createSlice } from '@reduxjs/toolkit'

export const setSelectedWithdrawAcc = (d) =>
  withdraw.actions.setSelectedWithdrawAcc(d)
export const appendSecPwd = (d) => withdraw.actions.appendSecPwd(d)
export const setSelectedId = (d) => withdraw.actions.setSelectedId(d)
export const setWithdrawAmt = (d) => withdraw.actions.setWithdrawAmt(d);

const initialState = {
  selectedAcc: {},
  selectedMethodId: 0,
  withdrawAmt: null,
}
export const withdraw = createSlice({
  name: 'selectedAcc',
  initialState,
  reducers: {
    setSelectedWithdrawAcc: (state, action) => {
      state.selectedAcc = action.payload
    },
    appendSecPwd: (state, action) => {
      state.selectedAcc.pwd = action.payload
    },
    setSelectedId: (state, action) => {
      state.selectedMethodId = action.payload
    },
    setWithdrawAmt: (state, action) => {
      state.withdrawAmt = action.payload;
    },
  },
})
