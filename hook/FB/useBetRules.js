import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useBetRules() {
  const { options, jumpLine, stakesParley, stakes, isSeries } = useSelector(
    (s) => s.betCart
  );

  const [isValid, setIsValid] = useState(false);
  const [duplicate, setDuplicate] = useState([]);

  const checkMinMax = (jumpLine, amount) => {
    if (
      (jumpLine?.smin > amount && jumpLine?.smin != 0) ||
      (amount > jumpLine?.smax && jumpLine?.smax != 0)
    ) {
      return true;
    }
    return false;
  };

  const hasSameMatch = () => {
    const seenMatchIds = new Set();
    const duplicateMatchIds = new Set();

    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const matchId = options[key].matchId;

        if (seenMatchIds.has(matchId)) {
          duplicateMatchIds.add(matchId);
        } else {
          seenMatchIds.add(matchId);
        }
      }
    }
    setDuplicate(Array.from(duplicateMatchIds));
    return Array.from(duplicateMatchIds).length > 0;
  };

  const hasExpired = () => {
    let hasEx = false;

    for (const key in jumpLine?.bms) {
      if (jumpLine?.bms.hasOwnProperty(key) && jumpLine?.bms[key].ss === -1) {
        hasEx = true;
        break; // No need to continue checking once found
      }
    }

    return hasEx;
  };

  const hasExceedMinMax = () => {
    for (const key in stakes) {
      if (jumpLine?.bms?.hasOwnProperty(key)) {
        const jumpLineItem = jumpLine?.bms[key];
        if (jumpLineItem?.smin > stakes[key] && jumpLineItem?.smin > 0) {
          return true;
        } else if (jumpLineItem?.smax > 0 && jumpLineItem?.smax < stakes[key]) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  };

  const hasExceedMinMaxSeries = () => {
    const filteredStakesParley = Object.entries(stakesParley).filter(
      ([key, val]) => {
        return val.unitStake !== 0 && val.unitStake !== '';
      }
    );

    const isAllValid = filteredStakesParley.every(([key, val]) => {
      if (val.sos.mi > 0 && val.sos.mx > 0) {
        return val.unitStake >= val.sos.mi && val.unitStake <= val.sos.mx;
      }
      return true;
    });

    if (isAllValid && Object.entries(filteredStakesParley).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const hasSameMatches = isSeries ? hasSameMatch() : false;
    const hasEx = hasExpired();
    const hasExceed = isSeries ? hasExceedMinMaxSeries() : hasExceedMinMax();
    if (!hasSameMatches && !hasEx && !hasExceed) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [options, stakes, stakesParley, jumpLine, isSeries]);
  return { isValid: isValid, duplicateMatchIds: duplicate, checkMinMax };
}
