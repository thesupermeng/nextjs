import { createSlice } from '@reduxjs/toolkit';

export const setSelectedPromotionId = (d) => promotion.actions.setSelectedPromotionId(d);

export const promotion = createSlice({
  name: 'promotion',
  initialState: { selectedPromotionId: '' },
  reducers: {
    resetData: (state) => {
      return {};
    },
    setSelectedPromotionId: (state, action) => {
      state.selectedPromotionId = action.payload;
    },
  },
});
