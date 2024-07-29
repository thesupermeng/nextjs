import { createSlice } from '@reduxjs/toolkit';

export const setHostRecommendationList = (d) =>
  hostRecommendation.actions.setHostRecommendationList(d);

const initialState = {
  hostRecommendationList: [],
};
export const hostRecommendation = createSlice({
  name: 'hostRecommendation',
  initialState,
  reducers: {
    setHostRecommendationList: (state, action) => {
      state.hostRecommendationList = action.payload;
    },
  },
});
