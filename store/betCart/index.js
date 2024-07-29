import { createSlice } from '@reduxjs/toolkit';

export const addBetOption = (d) => betCart.actions.addBetOption(d);
export const delBetOption = (id) => betCart.actions.delBetOption(id);
export const setAllBetOptions = (d) => betCart.actions.setAllBetOptions(d);
export const toggleSeries = (a) => betCart.actions.toggleSeries(a);
export const setJumpLineData = (a) => betCart.actions.setJumpLineData(a);
export const setStakesParley = (a) => betCart.actions.setStakesParley(a);
export const updateStake = (d) => betCart.actions.updateStake(d);
export const updateStakes = (d) => betCart.actions.updateStakes(d);
export const updateBetSetting = (d) => betCart.actions.updateSetting(d);
export const setHasOddChanges = (d) => betCart.actions.setHasOddChanges(d);
export const setAcceptOddChange = (d) => betCart.actions.setAcceptOddChange(d);
export const clearHasOddChange = (d) => betCart.actions.clearHasOddChange(d);
export const resetStakes = (d) => betCart.actions.resetStakes(d);
export const setCurrentFocusInput = (d) =>
  betCart.actions.setCurrentFocusInput(d);

export const initialState = {
  isSeries: false,
  options: {},
  stakes: { all: 0 },
  stakesParley: [],
  setting: {
    rule: '1',
    format: 1,
  },
  recentOrderIds: [],
  hasOddChange: [],
  isAcceptOddChange: false,
  currentFocusInput: null,
};
export const betCart = createSlice({
  name: 'betCart',
  initialState,
  reducers: {
    toggleSeries: (state, action) => {
      state.isSeries =
        typeof action.payload === 'boolean' ? action.payload : !state.isSeries;
    },
    addBetOption: (state, action) => {
      const { id, data } = action.payload;
      state.options[id] = data;
      return state;
    },
    delBetOption: (state, action) => {
      const id = action.payload;
      delete state.options[id];
      return state;
    },
    setAllBetOptions: (state, action) => {
      state.options = { ...action.payload };
      return state;
    },
    setJumpLineData: (state, action) => {
      state.jumpLine = action.payload;
    },
    updateStakes: (state, action) => {
      const { key } = action.payload;
      const itemIndex = state?.stakesParley?.findIndex(
        (item) => item.key === key
      );
      if (itemIndex !== -1) {
        state.stakesParley[itemIndex] = action.payload;
      } else {
        state.stakesParley.push(action.payload);
      }
      return state;
    },
    setStakesParley: (state, action) => {
      state.stakesParley = action.payload;
    },
    updateStake: (state, action) => {
      const { id, data } = action.payload;
      try {
        if (id !== 'all') {
          state.stakes[id] = data;
        } else {
          const newStakes = { all: data };
          Object.keys(state.options).forEach((id) => {
            newStakes[id] = data;
          });
          state.stakes = newStakes;
          // state.stakes = state.stakes.map((_) => data);
        }
      } catch (e) {}
      return state;
    },
    updateSetting: (state, action) => {
      const { name, value } = action.payload;
      state.setting[name] = value;
      return state;
    },
    setHasOddChanges: (state, action) => {
      const array = state.hasOddChange.concat(action.payload);
      state.hasOddChange = [...new Set(array)];
    },
    clearHasOddChange: (state, action) => {
      state.hasOddChange = action.payload;
    },
    setAcceptOddChange: (state, action) => {
      state.isAcceptOddChange = action.payload;
    },
    resetStakes: (state, action) => {
      state.stakes = { all: 0 };
    },
    setCurrentFocusInput: (state, action) => {
      state.currentFocusInput = action.payload;
    },
    // setRecentOrderIds: (state, action) => {
    //   if (Array.isArray(action.payload)) {
    //     state.recentOrderIds = action.payload.slice(0);
    //   }
    // },
  },
});

export const OddChangeType = {
  NOCHANGE: -1,
  HIGHER: 1,
  LOWER: 2,
};
