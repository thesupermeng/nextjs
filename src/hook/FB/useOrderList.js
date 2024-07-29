import useSWR from 'swr';
import { URL_FB_APP } from '@/config/url';
import { FBApi } from '@/util/FB_Api';
import { useEffect, useState } from 'react';
import { FB_Refresh_Interval } from '@/config/FB/FBConfig';

export const useOrderList = (
  isSettled,
  startTime = null,
  endTime = null,
  current = 1
) => {
  const { data, error, mutate, isLoading } = useSWR(
    [URL_FB_APP.getOrderList, isSettled, startTime, endTime],
    ([url, isSettled, startTime, endTime, current]) =>
      FBApi(url, {
        isSettled,
        startTime,
        endTime,
        current: current,
        size: 99999,
      }),
    {
      refreshInterval: isSettled ? 0 : FB_Refresh_Interval.MatchList,
    }
  );

  return {
    mutate,
    list: data?.data || [],
  };
};
const sampleResp = {
  success: true,
  data: {
    current: 1,
    size: 2,
    total: 2,
    totalType: 0,
    records: [
      {
        ops: [
          {
            sid: 1,
            mid: 859866,
            mn: 'Daegu FC vs. Gangwon FC',
            ln: 'South Korea K-League 1',
            bt: 1693564200000,
            pe: 1001,
            mty: 1005,
            on: 'Daegu FC',
            onm: 'Daegu FC',
            ip: false,
            te: [
              {
                na: 'Daegu FC',
                id: 57153,
              },
              {
                na: 'Gangwon FC',
                id: 57154,
              },
            ],
            bo: '1.70',
            of: 1,
            re: '',
            mrid: 4197751,
            ty: 1,
            od: 1.7,
            mgn: '1x2',
            mtp: 2,
            ms: 4,
            scs: [],
            mc: {
              pe: 1001,
              r: false,
            },
          },
        ],
        id: '993340742204129860',
        sert: 0,
        bn: 1,
        al: 1,
        sat: 100,
        st: 4,
        oc: 1,
        cte: 1693448082273,
        mt: 1693448083029,
        us: 100,
        bt: '1x1*1',
        ab: false,
        ic: 1,
        sv: 1,
        lwa: 70,
        mla: 170,
        mwa: 70,
        cid: 13,
        exr: 0.12845,
        co: 1,
      },
      {
        ops: [
          {
            sid: 1,
            mid: 859865,
            mn: 'Daejeon Hana Citizen FC vs. Suwon FC',
            ln: 'South Korea K-League 1',
            bt: 1693562400000,
            pe: 1001,
            mty: 1005,
            on: 'Daejeon Hana Citizen FC',
            onm: 'Daejeon Hana Citizen FC',
            ip: false,
            te: [
              {
                na: 'Daejeon Hana Citizen FC',
                id: 58249,
              },
              {
                na: 'Suwon FC',
                id: 57590,
              },
            ],
            bo: '1.66',
            of: 1,
            re: '',
            mrid: 4195411,
            ty: 1,
            od: 1.66,
            mgn: '1x2',
            mtp: 2,
            ms: 4,
            scs: [],
            mc: {
              pe: 1001,
              r: false,
            },
          },
        ],
        id: '993340742204129348',
        sert: 0,
        bn: 1,
        al: 1,
        sat: 100,
        st: 4,
        oc: 1,
        cte: 1693448082264,
        mt: 1693448082780,
        us: 100,
        bt: '1x1*1',
        ab: false,
        ic: 1,
        sv: 1,
        lwa: 66,
        mla: 166,
        mwa: 66,
        cid: 13,
        exr: 0.12845,
        co: 1,
      },
    ],
    sts: [
      {
        cid: 13,
        ct: 2,
        sa: 200,
      },
    ],
  },
  code: 0,
};
