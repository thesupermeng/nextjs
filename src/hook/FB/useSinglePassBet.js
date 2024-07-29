import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMatchDetail } from './useMatchDetail';
import useUser from '../user/useUser';

export default function useSinglePassBet() {
  const { options, stakes, setting, jumpLine } = useSelector((s) => s.betCart);
  const quickBetProps = useSelector((s) => s.common.quickBetProps);
  const quickBetStake = useSelector((s) => s.common.quickBetStake);
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);

  const [param, setParam] = useState({});
  const [paramQuickBet, setParamQuickBet] = useState({});
  const { getMatchDetails } = useMatchDetail();
  const { mutateUser } = useUser();

  useEffect(() => {
    try {
      const singleBetListQuickBet = {
        oddsChange: setting.rule,
        unitStake: stakes[quickBetProps?.id?.toString()],
        betOptionList: [
          {
            optionType: quickBetProps?.data?.op?.ty,
            oddsFormat: setting.format,
            odds: jumpLine?.bms?.[quickBetProps?.id]?.op?.od,
            marketId: quickBetProps?.id?.toString() || 0,
          },
        ],
      };
      setParamQuickBet({ singleBetList: [singleBetListQuickBet] });

      const singleBetList = Object.keys(options).map((marketId) => {
        return {
          oddsChange: setting.rule,
          unitStake: stakes[marketId] || stakes.all || 0,
          betOptionList: [
            {
              optionType: jumpLine?.bms?.[marketId]?.op?.ty,
              oddsFormat: setting.format,
              odds: jumpLine?.bms?.[marketId]?.op?.od,
              marketId,
            },
          ],
          ...(selectedVoucher && {
            relatedId: selectedVoucher?.id?.toString(),
          }),
        };
      });

      setParam({ singleBetList });
    } catch (e) {
      console.error('singlebet param error', e);
    }
  }, [
    options,
    stakes,
    setting,
    jumpLine,
    quickBetProps,
    quickBetStake,
    selectedVoucher,
  ]);

  const betSinglePass = async (param) => {
    return FBApi(URL_FB_APP.singlePass, param).then((d) => {
      mutateUser();
      return d;
    });
  };
  const placeBet = useCallback(async () => {
    return betSinglePass(param);
  }, [param]);

  const placeQuickBet = useCallback(async () => {
    return betSinglePass(paramQuickBet);
  }, [paramQuickBet]);

  const getBetDetails = async () => {
    const singleBetList = await Promise.all(
      Object.keys(options).map(async (marketId) => {
        const data = await getMatchDetails(options[marketId].matchId);
        return {
          optionType: jumpLine?.bms?.[marketId]?.op?.ty,
          oddsFormat: setting.format,
          odds: jumpLine?.bms?.[marketId]?.op?.od,
          marketId: parseInt(marketId),
          stake: stakes[marketId],
          sportId: data.data.sid, // 1: soccer 3: basketball
          matchStatus: data.data.ms,
          isOutright: false,
          isParlay: false,
          matchId: options[marketId].matchId,
        };
      })
    );

    return singleBetList[0];
  };

  return { placeBet, placeQuickBet, getBetDetails };
}
/*
const sampleParam = {
  singleBetList: [
    {
      oddsChange: 1,
      unitStake: 10,
      betOptionList: [
        {
          optionType: 4,
          oddsFormat: 1,
          odds: 1.98,
          marketId: 320389,
        },
      ],
    },
    {
      oddsChange: 1,
      unitStake: 10,
      betOptionList: [
        {
          optionType: 1,
          oddsFormat: 1,
          odds: 1.9,
          marketId: 320335,
        },
      ],
    },
  ],
};
*/

// const sampleReturn = {
//   success: true,
//   data: [
//     {
//       id: '993472803120349252',
//       st: 0,
//       ops: [
//         {
//           mid: '4195411',
//           od: '1.66',
//           of: 1,
//           bod: '1.66',
//         },
//       ],
//     },
//     {
//       id: '993472803120349764',
//       st: 0,
//       ops: [
//         {
//           mid: '4197751',
//           od: '1.7',
//           of: 1,
//           bod: '1.70',
//         },
//       ],
//     },
//   ],
//   code: 0,
// };
