import { createSlice } from '@reduxjs/toolkit';
import { common } from '../common';

export const setTopAnnContent = (d) =>
  videoPlayerMisc.actions.setTopAnnContent(d);
export const setBottomAnnContent = (d) =>
  videoPlayerMisc.actions.setBottomAnnContent(d);
export const setAudio = (d) => videoPlayerMisc.actions.setAudio(d);
export const setAudioEnd = (d) => videoPlayerMisc.actions.setAudioEnd(d);
export const setScrollTextSec = (d) =>
  videoPlayerMisc.actions.setScrollTextSec(d);
export const setIsAudioAnnPlaying = (d) =>
  videoPlayerMisc.actions.setIsAudioAnnPlaying(d);
export const setShowChatBullet = (d) =>
  videoPlayerMisc.actions.setShowChatBullet(d);

const initialState = {
  topOverlayAnnContent: {},
  bottomOverlayAnnContent: {},
  scrollTextSec: 20,
  audio: {},
  isAudioAnnPlaying: true,
  showChatBullet: true,
};
export const videoPlayerMisc = createSlice({
  name: 'videoPlayerMisc',
  initialState,
  reducers: {
    setTopAnnContent: (state, action) => {
      state.topOverlayAnnContent = action.payload;
    },
    setBottomAnnContent: (state, action) => {
      state.bottomOverlayAnnContent = action.payload;
    },
    setScrollTextSec: (state, action) => {
      state.scrollTextSec = action.payload;
    },
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setAudioEnd: (state) => {
      state.audio = { ended: Date.now() };
    },
    setIsAudioAnnPlaying: (state, action) => {
      state.isAudioAnnPlaying = action.payload;
    },
    setShowChatBullet: (state, action) => {
      state.showChatBullet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(common.actions.setMatchId, (state, action) => {
      state.showChatBullet = !!action.payload;
    });
  },
  //need to relook. state when no bet options still defaults chat bullets to true
});
