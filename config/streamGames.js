export const GAMES_ID = { DICES: 1, JACKPOT: 2 };

//hardcoded on FE
export const GAMES_TITLE = {
  [GAMES_ID.DICES]: 'rollAndWin',
};

//resp back from stream game results API
export const DICE_RESULT_API = {
  SMALL: 1,
  BIG: 2,
  TRIPLE: 3,
  ODD: 1,
  EVEN: 2,
};

//betoptions accepted by api
export const DICE_BET_OPTIONS = {
  SMALL: 1,
  BIG: 2,
  TRIPLE: 3,
  ODD: 4,
  EVEN: 5,
};

//hardcoded on FE
export const DICE_BET_TILES = [
  { betOption: DICE_BET_OPTIONS.SMALL, label: 'small', betOdds: 1.95 },
  { betOption: DICE_BET_OPTIONS.BIG, label: 'big', betOdds: 1.95 },
  {
    betOption: DICE_BET_OPTIONS.TRIPLE,
    label: 'triplesDice',
    betOdds: 31,
    css: 'col-span-2',
  },
];
