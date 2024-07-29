import { createSlice } from '@reduxjs/toolkit'
export const setRechargeInfo = (d) => recharge.actions.setRechargeInfo(d)

const initialState = {
  rechargeInfo: {},
}
export const recharge = createSlice({
  name: 'rechargeInfo',
  initialState,
  reducers: {
    setRechargeInfo: (state, action) => {
      state.rechargeInfo = action.payload
    },
  },
})
