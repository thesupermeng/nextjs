import {createSlice} from '@reduxjs/toolkit';

export const setYingshiUserInfo = (d) => yingshiUser.actions.setUserInfo(d)
export const setYingshiUserToken = (d) => yingshiUser.actions.setToken(d)
export const setYingshiUserLoginParam = (d) => yingshiUser.actions.setLoginParam(d)
export const setAhaToken = (d) => yingshiUser.actions.setAhaToken(d)
export const setRefreshCd = (d) => yingshiUser.actions.setRefreshCd(d)

export const yingshiUser = createSlice( {
    name: 'yingshiUser',
    initialState: {
        /**
         *     userToken: string;
         *     userId: string;
         *     userName: string;
         *     userReferralCode: string;
         *     userEmail: string;
         *     userPhoneNumber: string;
         *     userMemberExpired: string;
         *     userReferrerName: string;
         *     userEndDaysCount: number;
         *     userTotalInvite: number;
         *     userAccumulateRewardDay: number;
         *     userAllowUpdateReferral: boolean;
         *     userInvitedUserList: any;
         *     userUpline: any;
         *     userCurrentTimestamp: string;
         *     userAccumulateVipRewardDay: number;
         *     userPaidVipList: any;
         */
        userInfo: null,
        token: null,
        loginParam: null,
        ahaToken: null, 
        refreshCd: null
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setToken: (state, action) => {
            localStorage.setItem('AuthTokenHeader' ,action.payload)
            state.token = action.payload;
        },
        setLoginParam: (state, action) => {
            state.loginParam = action.payload;
        },
        setAhaToken: (state, action) => {
            localStorage.setItem('AuthToken',action.payload)
            localStorage.setItem('AhaToken',action.payload)
            state.ahaToken = action.payload;
        },
        setRefreshCd: (state, action) => {
            state.refreshCd = action.payload;
        }
    }
})
