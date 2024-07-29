import { createSlice } from '@reduxjs/toolkit';

export const setOrderStatus = (d) => orders.actions.setOrderStatus(d);
export const setOrderIdsToCheck = (d) => orders.actions.setOrderIdsToCheck(d);

const initialState = {
  checkingOids: [],
  status: {},
};
export const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderIdsToCheck: (state, action) => {
      state.checkingOids = action.payload;
      return state;
    },
    setOrderStatus: (state, action) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(({ st, oid }) => {
          state.status[oid] = st;
        });
      }
      return state;
    },
  },
});

const sampleOrderStatus = [
  {
    st: 4,
    oid: '536208284512682040',
  },
  {
    st: 4,
    oid: '536208104191164472',
  },
];
