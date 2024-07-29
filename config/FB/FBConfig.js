import i18n from 'i18next';

export const FB_Refresh_Interval = {
  MatchList: 2000, //every 2 secs};
  Stake_Order_Status: 1 * 1000, // every 10 sec, recommend 5-10 sec
  UpdateBetOdds: 2000, // every 2 secs, recommend 1-3 sec
  // todo: reset above update rate to 3sec
  Statistical: 60 * 1000, // every 1 mins
  Leagues: 60 * 1000, // every 1 mins
};

export const FAV_SPORTTYPE_CODE = 100;

export const FB_MATCH_PLAY_TYPE = [
  { text: 'favourite', code: FAV_SPORTTYPE_CODE, userOnly: true },
  { text: 'live', code: 1 },
  { text: 'today', code: 3 },
  { text: 'early', code: 4 },
  { text: 'parlay', code: 2 },
  { text: 'outright', code: 7 },
];

export const FB_MATCH_SPORTS_TYPE = [1, 3];
