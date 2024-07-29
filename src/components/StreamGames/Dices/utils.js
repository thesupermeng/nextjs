import { DICE_RESULT_API } from '@/config/streamGames';

export const calculateDiceNumberResult = (big_small = 0, arr) => {
  //this will return the dice number if all 3 number is the same
  //return the total sum of the 3 number if its not triple
  if (big_small === DICE_RESULT_API.TRIPLE) {
    return Number(arr[0]);
  } else {
    if (arr.length !== 3) {
      return 0;
    } else {
      return Number(arr[0]) + Number(arr[1]) + Number(arr[2]);
    }
  }
};

export const getDiceNumberResultWithDesc = (big_small = 0, arr = [0, 0, 0]) => {
  if (big_small === DICE_RESULT_API.TRIPLE) {
    return `(Number: ${arr[0]})`;
  } else {
    if (arr.length !== 3) {
      return 0;
    } else {
      return `(Total: ${arr[0] + arr[1] + arr[2]})`;
    }
  }
};

export const getDiceResultAbrvText = (big_small) => {
  const text = {
    [DICE_RESULT_API.SMALL]: 's',
    [DICE_RESULT_API.BIG]: 'b',
    [DICE_RESULT_API.TRIPLE]: 'tri',
  };
  return text[big_small];
};

export const getDiceResultText = (big_small) => {
  const text = {
    [DICE_RESULT_API.SMALL]: 'resultSmall',
    [DICE_RESULT_API.BIG]: 'resultBig',
    [DICE_RESULT_API.TRIPLE]: 'triple',
  };
  return text[big_small];
};
