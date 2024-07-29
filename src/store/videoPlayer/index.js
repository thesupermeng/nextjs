import { createSlice } from '@reduxjs/toolkit';

export const setUrl = (d) => videoPlayer.actions.setUrl(d);
export const toggleFullscreen = (d) => videoPlayer.actions.toggleFullscreen(d);
export const toggleVideoLoading = (d) => videoPlayer.actions.toggleLoading(d);
export const toggleTempMute = (d) => videoPlayer.actions.toggleTempMute(d);
export const toggleMute = (d) => videoPlayer.actions.toggleMute(d);
export const togglePlayPause = (d) => videoPlayer.actions.togglePlayPause(d);
// export const toggleShowThumbnail = (d) =>
//   videoPlayer.actions.toggleShowThumbnail(d);
export const toggleError = (d) => videoPlayer.actions.toggleError(d);

const initialState = {
  isFull: false,
  isLoading: false,
  muted: false,
  tempMuted: false,
  url: '',
  isPause: true,
  showThumbnail: true,
  isError: false,
};
export const videoPlayer = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    resetData: (state) => {
      return {};
    },
    setUrl: (state, action) => {
      state = { ...state, url: action.payload };
      return state;
    },
    toggleFullscreen: (state, action) => {
      state.isFull =
        typeof action.payload === 'boolean' ? action.payload : !state.isFull;
    },
    toggleLoading: (state, action) => {
      state.isLoading =
        typeof action.payload === 'boolean' ? action.payload : !state.isLoading;
    },
    toggleMute: (state, action) => {
      state.muted =
        typeof action.payload === 'boolean' ? action.payload : !state.muted;
    },
    toggleTempMute: (state, action) => {
      state.tempMuted =
        typeof action.payload === 'boolean' ? action.payload : !state.tempMuted;
    },
    togglePlayPause: (state, action) => {
      state.isPause = !action.payload;
    },
    // toggleShowThumbnail: (state, action) => {
    //   state.showThumbnail = action.payload;
    // },
    toggleError: (state, action) => {
      state.isError =
        typeof action.payload === 'boolean' ? action.payload : !state.isError;
    },
  },
});
