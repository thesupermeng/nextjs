import { createSlice } from '@reduxjs/toolkit';

export const setSelectedVoucher = (d) => voucher.actions.setSelectedVoucher(d);
export const setVoucherDetails = (d) => voucher.actions.setVoucherDetails(d);

const initialState = {
  selectedVoucher: null,
  voucherDetails: null,
};
export const voucher = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setSelectedVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    setVoucherDetails: (state, action) => {
      state.voucherDetails = action.payload;
    },
  },
});
