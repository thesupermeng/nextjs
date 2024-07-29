import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useMultiplePassBet() {
  const { options, stakesParley, setting, jumpLine } = useSelector(
    (s) => s.betCart
  );
  const [param, setParam] = useState({});
  useEffect(() => {
    try {
      const betOptionList = Object.keys(options).map((marketId) => {
        const option = options[marketId].op;

        return {
          optionType: option.ty,
          oddsFormat: parseInt(setting.format),
          odds: option.od,
          marketId: parseInt(marketId),
        };
      });

      const betMultipleData = Object.keys(stakesParley)
        .map((marketId) => {
          const option = stakesParley[marketId];
          var totalPayment = 0;
          if (option.total !== 0) {
            totalPayment += option.sos.in * option.unitStake;
          }

          return {
            oddsChange: parseInt(setting.rule),
            unitStake: option.unitStake || 0,
            seriesValue: option.key,
          };
        })
        .filter((item) => item.unitStake !== 0);

      const multipleBetList = {
        betOptionList: betOptionList,
        betMultipleData: betMultipleData,
      };

      setParam(multipleBetList);
    } catch (e) {
      console.error('multiple param error', e);
    }
  }, [options, stakesParley, setting, jumpLine]);

  const placeBetMultiple = useCallback(async () => {
    return FBApi(URL_FB_APP.multiplePass, param).then((d) => {
      return d;
    });
  }, [param]);
  return { placeBetMultiple };
}
