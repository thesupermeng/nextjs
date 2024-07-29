export const checkMissingMTY = (list = []) => {
  const mtys = list.map((match) => {
    match?.mg.map((mtyObj) => {
      const a = isMissingMty(mtyObj.mty);
      return;
    });
  });
  return;
};

const isMissingMty = (mty) => {
  if (
    [
      3033, 3032, 3031, 3030, 3029, 3028, 3026, 3021, 3017, 3007, 3006, 3001,
    ].includes(mty)
  ) {
    //basketball remaining  3033 3032 3031 3030 3029 3028 3026 3021 3017 07 06 01
    return true;
  } else if ([mty >= 1000 && mty <= 1999]) {
    //football remaining  47 54 57 58 60 65 66 70 80 86 87 88 90 98 1112 1113 1118 1119 1120 1121 ->1129 1140->1149 1150->1159 1160->1169 1170->1179 1180->1189
    const lats2digits = mty % 100;
    if (mty > 1000 && mty < 1099) {
      // pattern 10##
      if (
        [47, 54, 57, 58, 60, 65, 66, 70, 80, 86, 87, 88, 90, 98].includes(
          lats2digits
        )
      ) {
        return true;
      }
    } else if (mty > 1100 && mty < 1199) {
      //pattern 11##
      if ([12, 13].includes(lats2digits)) {
        return true;
      } else if (lats2digits > 17 && lats2digits < 30) {
        return true;
      } else if (lats2digits > 39 && lats2digits < 90) {
        return true;
      }
    }
  }
  return false;
};
