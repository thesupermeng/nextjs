import { WithdrawTab } from '@/components/profileMenu/topUpSlider';
import { createSlice } from '@reduxjs/toolkit';

export const setMatchId = (d) => common.actions.setMatchId(d);
export const setMatchSid = (d) => common.actions.setMatchSid(d);
export const setFlvSupport = (d) => common.actions.setFlvSupport(d);
export const toggleBetSlipExpand = (d) => common.actions.toggleBetSlipExpand(d);
export const showRightBarContent = (d) => common.actions.showRightBarContent(d);
export const hideRightBarContent = (d) => common.actions.hideRightBarContent(d);
export const showKeyboard = (d) => common.actions.showKeyboard(d);
export const setKeyboardProps = (d) => common.actions.setKeyboardProps(d);
export const setActiveParlay = (d) => common.actions.setActiveParlay(d);

export const setWithdrawTab = (d) => common.actions.setWithdrawTab(d);
export const setWithdrawModal = (d) => common.actions.setWithdrawModal(d);
export const setProfileModal = (d) => common.actions.setProfileModal(d);
export const showTopUpRedirect = (d) => common.actions.showTopUpRedirect(d);
export const setShowErrorModal = (d) => common.actions.setShowErrorModal(d);
export const setErrorModalProps = (d) => common.actions.setErrorModalProps(d);
export const setShowSuccessfulModal = (d) =>
  common.actions.setShowSuccessfulModal(d);
export const setSuccessModalProps = (d) =>
  common.actions.setSuccessModalProps(d);
export const showQuickBet = (d) => common.actions.showQuickBet(d);
export const setQuickBetProps = (d) => common.actions.setQuickBetProps(d);
export const setQuickBetStake = (d) => common.actions.setQuickBetStake(d);
export const showQuickTopUp = (d) => common.actions.showQuickTopUp(d);
export const setIsLeftSideBarExpanded = (d) =>
  common.actions.setIsLeftSideBarExpanded(d);
export const setShowToast = (d) => common.actions.setShowToast(d);
export const setIsApp = (d) => common.actions.setIsApp(d);
// export const resetMatchDetail = () => matchDetail.actions.resetData();

const initialState = {
  matchId: '',
  matchSid: '',
  betSlipExpand: true,
  showRightSidebar: false,
  rightBarContent: {},
  isShowLoginPanel: false,
  isShowKeyboard: {},
  keyboardProps: {},
  activeParlay: undefined,
  isFlvSupported: 0,
  withdrawTab: WithdrawTab.TOP_UP,
  withdrawModal: null,
  profileModal: null,
  topUpRedirect: false,
  errorModal: false,
  errorModalProps: {},
  successModal: false,
  successModalProps: {},
  quickBet: false,
  quickBetProps: {},
  quickBetStake: '',
  quickTopUp: false,
  isLeftSideBarExpanded: false,
  toastMsg: '',
  isApp: false, // prop in favour of iframe content used by app
};
export const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    resetData: (state) => {
      return {};
    },
    setFlvSupport: (state, action) => {
      state = { ...state, isFlvSupported: action.payload };
      return state;
    },
    setMatchId: (state, action) => {
      state = { ...state, matchId: action.payload };
      return state;
    },
    setMatchSid: (state, action) => {
      state = { ...state, matchSid: action.payload };
      return state;
    },
    toggleBetSlipExpand: (state, action) => {
      state.betSlipExpand =
        typeof action.payload === 'boolean'
          ? action.payload
          : !state.betSlipExpand;
    },
    showRightBarContent: (state, action) => {
      const type = action.payload;
      state.rightBarContent[type] = true;
      state.showRightSidebar = true;
    },
    hideRightBarContent: (state, action) => {
      const type = action.payload;
      if (type === 'All') {
        state.rightBarContent = {};
        state.showRightSidebar = false;
      } else {
        state.rightBarContent[type] = false;
        state.showRightSidebar = Object.values(state.rightBarContent).some(
          (a) => a
        );
      }
    },
    showKeyboard: (state, action) => {
      state.isShowKeyboard = action.payload;
    },
    setKeyboardProps: (state, action) => {
      state.keyboardProps = action.payload;
    },
    setActiveParlay: (state, action) => {
      state.activeParlay = action.payload;
    },
    setWithdrawTab: (state, action) => {
      state.withdrawTab = action.payload;
    },
    setWithdrawModal: (state, action) => {
      state.withdrawModal = action.payload;
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload;
    },
    showTopUpRedirect: (state, action) => {
      state.topUpRedirect = action.payload;
    },
    setShowErrorModal: (state, action) => {
      state.errorModal = action.payload;
    },
    setErrorModalProps: (state, action) => {
      state.errorModalProps = action.payload;
    },
    setShowSuccessfulModal: (state, action) => {
      state.successModal = action.payload;
    },
    setSuccessModalProps: (state, action) => {
      state.successModalProps = action.payload;
    },
    showQuickBet: (state, action) => {
      state.quickBet = action.payload;
    },
    setQuickBetProps: (state, action) => {
      state.quickBetProps = action.payload;
    },
    setQuickBetStake: (state, action) => {
      state.quickBetStake = action.payload;
    },
    showQuickTopUp: (state, action) => {
      state.quickTopUp = action.payload;
    },
    setIsLeftSideBarExpanded: (state, action) => {
      state.isLeftSideBarExpanded = action.payload;
    },
    setShowToast: (state, action) => {
      state.toastMsg = action.payload;
    },
    setIsApp: (state, action) => {
      state.isApp = action.payload;
    },
  },
});
