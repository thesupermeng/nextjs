import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useQuickBetRules() {
  const { jumpLine, setting } = useSelector((s) => s.betCart);
  const quickBetProps = useSelector((s) => s.common.quickBetProps);
  const [isValid, setIsValid] = useState(false);

  const thisJumpLine = jumpLine?.bms?.[quickBetProps?.id];
  const OddRules = {
    DontAcceptAny: '0',
    AcceptHigher: '1',
    AcceptAny: '2',
  };

  const hasExpired = () => {
    return !(thisJumpLine?.ss === 1);
  };
  const oddChange = () => {
    const newOdd = thisJumpLine?.op?.od;
    const oldOdd = quickBetProps?.data?.op?.od;

    switch (setting?.rule) {
      case OddRules.DontAcceptAny:
        return newOdd !== oldOdd;
      case OddRules.AcceptHigher:
        return oldOdd > newOdd;
      case OddRules.AcceptAny:
        return false;
    }
  };

  useEffect(() => {
    const hasEx = hasExpired();
    const hasOddChange = oddChange();
    if (!hasEx && !hasOddChange) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [jumpLine, quickBetProps, setting]);
  return {
    isValid: isValid,
    hasExpired: hasExpired(),
    hasOddChange: oddChange(),
  };
}
