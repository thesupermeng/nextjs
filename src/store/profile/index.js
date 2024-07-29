import { createSlice } from '@reduxjs/toolkit';

export const setQtpSelected = (a) => Profile.actions.setQtpSelected(a);

export const selectOrderHistoryOption = (a) =>
  Profile.actions.selectOrderHistoryOption(a);

export const selectTransactionType = (a) =>
  Profile.actions.selectTransactionType(a);

export const selectProfileMenu = (a) => Profile.actions.selectProfileMenu(a);

export const selectPersonalInfo = (a) => Profile.actions.selectPersonalInfo(a);

export const setFiles = (a) => Profile.actions.setAvatarImg(a);

export const selectAvatar = (a) => Profile.actions.selectAvatar(a);

export const setMessageModalOpen = (a) =>
  Profile.actions.setMessageModalOpen(a);

export const setMessage = (a) => Profile.actions.setMessage(a);

export const setValidUsername = (a) => Profile.actions.setValidUsername(a);

export const setCroppedImg = (a) => Profile.actions.setCroppedImg(a);

export const Profile = createSlice({
  name: 'Profile',
  initialState: {
    qtpSelected: false,
    orderHistorySingleSelected: 0,
    transactionTypeSelected: 1,
    profileMenuSelected: 0,
    personalInfoSelected: true,
    files: [],
    avatarSelected: 0,
    messageModalOpen: false,
    message: '',
    validUsername: '',
    croppedImg: null
  },
  reducers: {
    setQtpSelected: (state, action) => {
      state.qtpSelected =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.qtpSelected;
    },
    selectOrderHistoryOption: (state, action) => {
      state.orderHistorySingleSelected =
        typeof action.payload === 'number' ? action.payload : 0;
    },
    selectTransactionType: (state, action) => {
      state.transactionTypeSelected =
        typeof action.payload === 'number' ? action.payload : 0;
    },
    selectProfileMenu: (state, action) => {
      state.profileMenuSelected =
        typeof action.payload === 'number' ? action.payload : 0;
    },
    selectPersonalInfo: (state, action) => {
      state.personalInfoSelected =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.personalInfoSelected;
    },
    setAvatarImg: (state, action) => {
      state.files = typeof action.payload === 'object' ? action.payload : [];
    },
    selectAvatar: (state, action) => {
      state.avatarSelected =
        typeof action.payload === 'number' ? action.payload : 0;
    },
    setMessageModalOpen: (state, action) => {
      state.messageModalOpen =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.messageModalOpen;
    },
    setMessage: (state, action) => {
      state.message = typeof action.payload === 'string' ? action.payload : '';
    },
    setValidUsername: (state, action) => {
      state.validUsername =
        typeof action.payload === 'string' ? action.payload : '';
    },
    setCroppedImg: (state, action) => {
      state.croppedImg = typeof action.payload === 'string' ? action.payload : '';
    }
  },
});
