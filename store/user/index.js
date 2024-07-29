import { createSlice } from '@reduxjs/toolkit'
export const setLoginToken = (d) => user.actions.setLoginToken(d)
export const setOtp = (d) => user.actions.setOtp(d)
export const setOtpProp = (d) => user.actions.setOtpProp(d)
export const updateOtpProp = (d) => user.actions.updateOtpProp(d)
export const setUserMobileInfo = (d) => user.actions.setUserMobileInfo(d)
export const setSecondaryPwd = (d) => user.actions.setSecondaryPwd(d)
export const setBalance = (d) => user.actions.setBalance(d)
export const setUserInfo = (d) => user.actions.setUserInfo(d)

export const user = createSlice({
  name: 'user',
  initialState: {
    otp: '',
    otpProp: {},
    loginToken: '',
    mobileInfo: null,
    secondaryPwd: '',
    balance: '',
    userInfo: null,
  },
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload
    },
    setOtp: (state, action) => {
      state.otp = action.payload
    },
    setOtpProp: (state, action) => {
      state.otpProp = action.payload
      state.otp = ''
    },
    updateOtpProp: (state, action) => {
      state.otpProp = { ...state.otpProp, ...action.payload }
    },
    setUserMobileInfo: (state, action) => {
      state.mobileInfo = action.payload
    },
    setSecondaryPwd: (state, action) => {
      state.secondaryPwd = action.payload
    },
    setBalance: (state, action) => {
      state.balance = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})
