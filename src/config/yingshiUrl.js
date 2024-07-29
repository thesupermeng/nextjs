export const URL_YINGSHI_USER = {
  signInUp: 'users/v1/signinup',
  logout: 'users/v1/logout',
  userInfo: 'users/v1/me',
  countryList: 'country/v1/country',
  updateUser: 'users/v1/update',
  feedback: 'feedback/v2/submit',
  refreshAhaToken: 'users/v2/aha/refresh',
};

export const URL_YINGSHI_VOD = {
  homeGetNav: 'nav/v1/navItems?channelId=WEB',
  homeGetPages: 'page/v4.5/typepage',
  getVodDetails: 'vod/v1/info',
  playlistGetTopic: 'topic/v1/topic',
  topicListing: 'topic/v1/list',
  playlistGetTopicDetail: 'topic/v2/topic/detail',
  topTenList: 'topic/v1/topic/hot',
  searchingList: 'vod/v1/vod/list',
  searchingList2: 'vod/v1/vod/duanju/list',
  searchVod: 'vod/v1/search',
  searchingListSlim: 'vod/v1/vod/similar',
  filteringTypeList: 'type/v3/type',
  getXVodDetails: 'svod/v2/vod',
  getAdsSlot: 'ads/v1/slot',
  getAdsVideoSlot: 'ads/v2/slot',
  getAllAds: 'ads/v1/app',
  setAhaWithdrawalPin: 'users/v2/aha/setpin',
  getExtraInfo: 'vod/v1/episode/info',
};

export const URL_YINGSHI_PAYMENT = {
  getProducts: 'products/v3/nativeProducts',
  createPayOrder: 'finzf/v2/order',
  getTransactionDetail: 'finzf/v1/transactions',
};
