import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from './user';
import { test } from './test';
import { matchDetail } from './matchDetail';
import { common } from './common';
import { videoPlayer } from './videoPlayer';
import { betCart } from './betCart';
import { Profile } from './profile';
import { sportsTaya } from './sportsTaya';
import { orders } from './orders';
import { chatRoom } from './chatroom';
import { streams } from './streams';
import { stats } from './stats';
import { withdraw } from './withdraw';
import { recharge } from './recharge';
import { promotion } from './promotion';
import { voucher } from './voucher';
import { deposit } from './deposit';
import { userGuide } from './userGuide';
import { hostRecommendation } from './hostRecommendation';
import { videoPlayerMisc } from './videoPlayerMisc';
import { livechat } from './livechat';
import { games } from './games';
import { streamGame } from './streamGame';
import {
  headerMenu,
} from './headerData';
import { currentScrollPosition, isScroll, isTop } from './scrollView';
import { yingshiUser } from '@/store/yingshiUser';
import { yingshiScreen } from '@/store/yingshiScreen';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['yingshiUser'], // specify the reducers you want to persist
  // blacklist: [], // specify the reducers you don't want to persist
};

const rootReducer = combineReducers({
  betCart: betCart.reducer,
  chatRoom: chatRoom.reducer,
  streams: streams.reducer,
  games: games.reducer,
  stats: stats.reducer,
  withdraw: withdraw.reducer,
  common: common.reducer,
  deposit: deposit.reducer,
  matchDetail: matchDetail.reducer,
  orders: orders.reducer,
  profile: Profile.reducer,
  promotion: promotion.reducer,
  recharge: recharge.reducer,
  sportsTaya: sportsTaya.reducer,
  test: test.reducer,
  user: user.reducer,
  userGuide: userGuide.reducer,
  videoPlayer: videoPlayer.reducer,
  voucher: voucher.reducer,
  hostRecommendation: hostRecommendation.reducer,
  videoPlayerMisc: videoPlayerMisc.reducer,
  streamGame: streamGame.reducer,
  livechat: livechat.reducer,
  headerMenu: headerMenu.reducer,
  isScroll: isScroll.reducer,
  isTop: isTop.reducer,
  currentScrollPosition: currentScrollPosition.reducer,
  yingshiUser: yingshiUser.reducer,
  yingshiScreen: yingshiScreen.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store)
