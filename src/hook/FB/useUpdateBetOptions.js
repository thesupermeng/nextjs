import { FB_Refresh_Interval } from '@/config/FB/FBConfig';
import { setJumpLineData } from '@/store/betCart';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';
import { URL_FB_APP } from '@/config/url';

export const useUpdateBetOptions = (isOpen, isSelectSeries) => {
  const dispatch = useDispatch();
  const { options } = useSelector((s) => s.betCart);
  const [param, setParam] = useState(null);
  const { setting } = useSelector((s) => s.betCart);
  const oddsType = setting.format;
  useEffect(() => {
    if (Object.keys(options).length > 0) {
      setParam({
        betMatchMarketList:
          Object.entries(options).map(([id, { matchId, op = {} }]) => {
            return {
              type: op?.ty,
              matchId,
              marketId: id,
              oddsType,
            };
          }) || [],
        isSelectSeries,
      });
    }
  }, [options, isSelectSeries]);
  const { data, isLoading } = useSWR(
    isOpen && param ? [URL_FB_APP.getJumpLine, param] : null,
    ([url, param]) => FBApi(url, param),
    { refreshInterval: FB_Refresh_Interval.UpdateBetOdds }
  );

  useEffect(() => {
    if (data?.data) {
      dispatch(setJumpLineData(parseJumplineData(data.data)));
    }
  }, [data]);
  return { data: data?.data || [], isLoading };
};

export const parseJumplineData = (jumpline = {}) => {
  const { bms, ...rest } = jumpline;
  const newBms = {};
  (bms || []).forEach((obj) => {
    newBms[obj.mid] = obj;
  });
  return {
    bms: newBms,
    ...rest,
  };
};

const sampleResp = {
  success: true,
  data: {
    bms: [
      {
        mid: 65696438,
        ss: -1,
      },
      {
        mid: 65700296,
        op: {
          na: 'Mozyr',
          nm: 'Mozyr 0',
          ty: 1,
          od: 1.84,
          li: '0',
        },
        smin: 0,
        smax: 0,
        au: 0,
        ss: 1,
        re: '2-4',
        ip: 1,
      },
    ],
    mon: 10,
    msl: 10,
  },
  code: 0,
};
