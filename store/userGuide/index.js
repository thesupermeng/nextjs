import { createSlice } from '@reduxjs/toolkit';

export const setUserGuideStep = (d) => userGuide.actions.setCurrentStep(d);
// export const appendSecPwd = (d) => userGuide.actions.appendSecPwd(d);
// export const setSelectedId = (d) => userGuide.actions.setSelectedId(d);
// export const setWithdrawAmt = (d) => userGuide.actions.setWithdrawAmt(d);

export const UserGuideStages = {
  Banner: 'Banner',
  HomeGuide: 'HomeGuide',
  DepositGuide: 'DepositGuide',
  Register: 'Register',
  Topup: 'Topup',
  Depositing: 'Depositing',
  DepositDone: 'DepositDone',
};

const initialState = {
  currentStep: '',
};
export const userGuide = createSlice({
  name: 'userGuide',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});
