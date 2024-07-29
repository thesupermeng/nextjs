export const BASE_URL = 'https://api.yingshi.tv/';

export const URL_FB_APP = {
  matchList: '/v1/match/getList',
  merchantDetail: '/v1/merchant/detail',
  getJumpLine: '/v1/order/batchBetMatchMarketOfJumpLine',
  singlePass: '/v1/order/bet/singlePass',
  multiplePass: '/v1/order/betMultiple',
  getOrderList: '/v1/order/new/bet/list',
  getStakeOrderStatus: '/v1/order/getStakeOrderStatus',
  cashOutPrice: '/v1/order/cashOut/price',
  cashOutBet: '/v1/order/cashOut/bet',
  cashOutByIds: '/v1/order/getCashOutsByIds',
  cashOutReserve: '/v1/order/cashOutReserve/bet',
  cashOutStatusInfoByIds: '/v1/order/reserve/cashOut/statusInfoByIds',
  cashOutReserveCancel: '/v1/order/cashOutReserve/cancel',
  // user
  userBase: '/v1/user/base',
  transactions: '/v1/user/transfer/playerStatistical',
};

export const URL_USER = {
  smsOtp: '/v1/sms_otp',
  getAnnouncements: '/v1/announcements',
  login_otp: '/v1/login_otp',
  login_password: '/v1/login_password',
  getFBToken: '/v1/user/fb/token',
  getTayaToken: '/v1/user/taya/token',
  getConfig: '/v1/config',
  getCategories: '/v1/categories',
  getStreams: '/v1/streams',
  getSteamer: '/v1/streamer',
  setPassword: '/v1/password',
  getUser: '/v1/user/me',
  logout: '/v1/user/logout',
  checkUsername: '/v1/user/check_username',
  finishSetup: '/v1/user/finish_setup',
  checkPassword: '/v1/user/check_password',
  followStreamer: '/v1/user/follow',
  followings: '/v1/user/followings',
  followingIds: '/v1/user/following_ids',
  getTopUpMethod: '/v1/topup-methods',
  getWithdrawMethod: '/v1/withdraw-methods',
  getTopUpOrder: '/v1/user/cash/top-up-orders',
  withdrawOrder: '/v1/user/cash/withdraw-orders',
  updateNickname: '/v1/user/nickname',
  updateProfilePic: '/v1/user/profile_pic',
  sabaURL: '/v1/saba/get_url',
  addSecondaryPwd: '/v1/user/secondary-password',
  withdrawAcc: '/v1/user/withdraw-accounts',
  checkOtp: '/v1/user/otp-check',
  getSilenceUntil: '/v1/user/silenced',
  getCounter: '/v1/user/counters',
  getNotifications: '/v1/user/notifications',
  markReadNotifications: '/v1/user/notification/mark_read',
  getTransactionHistory: '/v1/user/cash/orders',
  getOrderHistory: '/v1/user/orders',
  postFeedback: '/v1/user/feedback',
  getPromotionList: '/v1/promotion/list',
  getPromotionDetail: '/v1/promotion/details',
  postPromotionClaim: '/v1/user/promotion/claim',
  //voucher
  getVoucherList: '/v1/user/voucher/list',
  getApplicables: '/v1/user/voucher/applicables',
  postPreBinding: '/v1/user/voucher/pre-binding',
  getServerTime: '/ts',
  //achievement
  getAchievementList: '/v1/user/achievement/list',
  completeAchievement: '/v1/user/achievement/complete',
};

export const URL_GAMES = {
  games: '/v1/games',
  recentGames: '/v1/user/recent_games',
  providers: '/v1/vendors',
  dcFun: '/v1/dc/fun_play',
  dcUser: '/v1/user/dc/get_url',
  favourites: '/v1/user/favourites',
  favourite: '/v1/user/favourite',
};
export const URL_LOGS = {
  sendLog: '/log/v1/generic',
};
//tbd
export const URL = {
  token: '/newSports/api/token/get',
};

export const URL_ROUTE = {
  download: '/download',
};

export const URL_STREAM_GAMES = {
  streamGame: '/v1/stream_game',
  streamGameList: '/v1/stream_games',
  placeOrder: '/v1/user/stream_game/place_order',
};
