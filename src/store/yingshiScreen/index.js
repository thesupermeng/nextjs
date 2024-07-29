import {createSlice} from '@reduxjs/toolkit';

export const setShowLogin = (d) => yingshiScreen.actions.setShowLogin(d)
export const setShowLoginSuccess = (d) => yingshiScreen.actions.setShowLoginSuccess(d)
export const setShowPayment = (d) => yingshiScreen.actions.setShowPayment(d)
export const setShowPaymentPending = (d) => yingshiScreen.actions.setShowPaymentPending(d)
export const setShowPinSuccess = (d) => yingshiScreen.actions.setShowPinSuccess(d)
export const setShowWithdrawalSuccess = (d) => yingshiScreen.actions.setShowWithdrawalSuccess(d)
export const setIsSessionExpired = (d) => yingshiScreen.actions.setIsSessionExpired(d)
export const setIsUserChina = (d) => yingshiScreen.actions.setIsUserChina(d)


export const yingshiScreen = createSlice({
  name: 'yingshiScreen',
  initialState: {
    isShowLogin: false,
    isShowLoginSuccess: false,
    isShowPayment: false,
    isShowPaymentPending: false,
    isShowPinSuccess: false,
    isShowWithdrawalSuccess: '',
    isSessionExpired:false,
    isUserChina:false,
  },
  reducers: {
    setShowLogin: (state, action) => {
      state.isShowLogin = action.payload;
    },
    setShowLoginSuccess: (state, action) => {
      state.isShowLoginSuccess = action.payload;
    },
    setShowPayment: (state, action) => {
      state.isShowPayment = action.payload;
    },
    setShowPaymentPending: (state, action) => {
      state.isShowPaymentPending = action.payload;
    },
    setShowPinSuccess: (state, action) => {
      state.isShowPinSuccess = action.payload;
    },
    setShowWithdrawalSuccess: (state, action) => {
      state.isShowWithdrawalSuccess = action.payload;
    },
    setIsSessionExpired: (state, action) => {
      state.isSessionExpired = action.payload;
    },
    setIsUserChina: (state, action) => {
      // console.log('setIsUserChina')
      // console.log(action.payload  )
      state.isUserChina = action.payload;
    },
  }

})
