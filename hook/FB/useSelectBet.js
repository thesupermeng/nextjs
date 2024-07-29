import {
  hideRightBarContent,
  setQuickBetProps,
  showQuickBet,
  showRightBarContent,
} from '@/store/common';
import { isWeb } from '@/util/common';
import { useDispatch } from 'react-redux';
import { getOptionName } from '@/components/marketType/util/parseMatchData';
import { addBetOption } from '@/store/betCart';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { AddBetFlyingEffectDuration } from '@/components/marketType/FlytoBetSlip';
import { data } from 'autoprefixer';
import { usePathname } from 'next/navigation';

export const useSelectBet = (matchData) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const onSelectQuickBet = (data) => {
    dispatch(showQuickBet(true));
    dispatch(setQuickBetProps(data));
    return;
  };
  const addFlyingBet = (data, setShowFlyAnimation) => {
    setTimeout(() => {
      dispatch(addBetOption(data));
    }, AddBetFlyingEffectDuration);

    dispatch(hideRightBarContent('All'));
    dispatch(showRightBarContent(RightSidebarContantTypes.BetCart));
    setShowFlyAnimation(true);
  };
  const onClickBetNow = (
    e,
    marketId,
    opData,
    setShowFlyAnimation,
    leagueName
  ) => {
    if (pathname !== '/home') {
      e?.preventDefault();
      e?.stopPropagation();
    }

    const betName = getOptionName(matchData, marketId) || matchData?.type;
    const data = {
      id: marketId,
      data: {
        op: opData,
        matchId: matchData?.id,
        betName,
        leagueName,
        nm: matchData?.nm,
      },
    };

    // if ((matchData?.ms === 5 || matchData?.ms === 4) && !isWeb()) {
    if (!isWeb()) {
      onSelectQuickBet(data);
    }
    // }

    if (isWeb()) {
      addFlyingBet(data, setShowFlyAnimation);
    }
  };

  return { onClickBetNow, addFlyingBet, onSelectQuickBet };
};
