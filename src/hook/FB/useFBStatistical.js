import {
  FB_MATCH_PLAY_TYPE,
  FB_MATCH_SPORTS_TYPE,
  FB_Refresh_Interval,
} from '@/config/FB/FBConfig';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';

const url = '/v1/match/statistical';
const PlayTypes = FB_MATCH_PLAY_TYPE.map(({ code }) => code);

const filterSid = ({ sid }) => FB_MATCH_SPORTS_TYPE.includes(sid);
export const useFBStatistical = () => {
  const [stats, setStats] = useState({ sl: [], hls: [] });
  const { data, isLoading } = useSWR(url, (url) => FBApi(url, {}), {
    refreshInterval: FB_Refresh_Interval.Statistical,
  });
  useEffect(() => {
    if (!data?.data) {
      return;
    }
    const filtered = {};
    filtered.sl = data.data.sl
      .map(({ ty, ssl }) => {
        if (PlayTypes.includes(ty)) {
          return { ty, ssl: ssl.filter(filterSid) };
        } else {
          // remove other than 3 4 2 7
          return null;
        }
      })
      .filter(Boolean);
    filtered.hls = data.data.hls.filter(filterSid);
    setStats(filtered);
  }, [data?.data]);
  return {
    statistical: stats,
    isLoading,
  };
};

const sample = {
  success: true,
  data: {
    tc: 1687,
    sl: [
      {
        ty: 5,
        des: '竞彩',
        tc: 0,
        ssl: [
          {
            sid: 1,
            c: 0,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 0,
          },
          {
            sid: 4,
            c: 0,
          },
          {
            sid: 5,
            c: 0,
          },
          {
            sid: 6,
            c: 0,
          },
          {
            sid: 7,
            c: 0,
          },
          {
            sid: 8,
            c: 0,
          },
          {
            sid: 13,
            c: 0,
          },
          {
            sid: 14,
            c: 0,
          },
          {
            sid: 15,
            c: 0,
          },
          {
            sid: 16,
            c: 0,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 0,
          },
          {
            sid: 177,
            c: 0,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 6,
        des: '今日+滚球',
        tc: 37,
        ssl: [
          {
            sid: 1,
            c: 6,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 5,
          },
          {
            sid: 4,
            c: 0,
          },
          {
            sid: 5,
            c: 5,
          },
          {
            sid: 6,
            c: 1,
          },
          {
            sid: 7,
            c: 4,
          },
          {
            sid: 8,
            c: 0,
          },
          {
            sid: 13,
            c: 1,
          },
          {
            sid: 14,
            c: 1,
          },
          {
            sid: 15,
            c: 4,
          },
          {
            sid: 16,
            c: 0,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 0,
          },
          {
            sid: 177,
            c: 10,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 2,
        des: '串关',
        tc: 1543,
        ssl: [
          {
            sid: 1,
            c: 1242,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 53,
          },
          {
            sid: 4,
            c: 0,
          },
          {
            sid: 5,
            c: 34,
          },
          {
            sid: 6,
            c: 22,
          },
          {
            sid: 7,
            c: 15,
          },
          {
            sid: 8,
            c: 0,
          },
          {
            sid: 13,
            c: 9,
          },
          {
            sid: 14,
            c: 1,
          },
          {
            sid: 15,
            c: 100,
          },
          {
            sid: 16,
            c: 25,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 42,
          },
          {
            sid: 177,
            c: 0,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 0,
        des: '全部',
        tc: 1687,
        ssl: [
          {
            sid: 1,
            c: 1311,
          },
          {
            sid: 2,
            c: 2,
          },
          {
            sid: 3,
            c: 70,
          },
          {
            sid: 4,
            c: 7,
          },
          {
            sid: 5,
            c: 47,
          },
          {
            sid: 6,
            c: 37,
          },
          {
            sid: 7,
            c: 17,
          },
          {
            sid: 8,
            c: 2,
          },
          {
            sid: 12,
            c: 0,
          },
          {
            sid: 13,
            c: 9,
          },
          {
            sid: 14,
            c: 1,
          },
          {
            sid: 15,
            c: 100,
          },
          {
            sid: 16,
            c: 27,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 1,
          },
          {
            sid: 93,
            c: 4,
          },
          {
            sid: 94,
            c: 0,
          },
          {
            sid: 95,
            c: 0,
          },
          {
            sid: 100,
            c: 0,
          },
          {
            sid: 101,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 42,
          },
          {
            sid: 177,
            c: 10,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 4,
        des: '早盘',
        tc: 1549,
        ssl: [
          {
            sid: 1,
            c: 1244,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 52,
          },
          {
            sid: 4,
            c: 2,
          },
          {
            sid: 5,
            c: 34,
          },
          {
            sid: 6,
            c: 34,
          },
          {
            sid: 7,
            c: 11,
          },
          {
            sid: 8,
            c: 1,
          },
          {
            sid: 13,
            c: 8,
          },
          {
            sid: 14,
            c: 0,
          },
          {
            sid: 15,
            c: 96,
          },
          {
            sid: 16,
            c: 25,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 42,
          },
          {
            sid: 177,
            c: 0,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 1,
        des: '滚球',
        tc: 30,
        ssl: [
          {
            sid: 1,
            c: 4,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 5,
          },
          {
            sid: 4,
            c: 0,
          },
          {
            sid: 5,
            c: 5,
          },
          {
            sid: 6,
            c: 1,
          },
          {
            sid: 7,
            c: 4,
          },
          {
            sid: 8,
            c: 0,
          },
          {
            sid: 13,
            c: 1,
          },
          {
            sid: 14,
            c: 1,
          },
          {
            sid: 15,
            c: 4,
          },
          {
            sid: 16,
            c: 0,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 0,
          },
          {
            sid: 177,
            c: 5,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 7,
        des: '冠军赛事',
        tc: 101,
        ssl: [
          {
            sid: 1,
            c: 61,
          },
          {
            sid: 2,
            c: 2,
          },
          {
            sid: 3,
            c: 13,
          },
          {
            sid: 4,
            c: 5,
          },
          {
            sid: 100,
            c: 0,
          },
          {
            sid: 5,
            c: 8,
          },
          {
            sid: 101,
            c: 0,
          },
          {
            sid: 6,
            c: 2,
          },
          {
            sid: 7,
            c: 2,
          },
          {
            sid: 8,
            c: 1,
          },
          {
            sid: 12,
            c: 0,
          },
          {
            sid: 13,
            c: 0,
          },
          {
            sid: 14,
            c: 0,
          },
          {
            sid: 15,
            c: 0,
          },
          {
            sid: 47,
            c: 0,
          },
          {
            sid: 16,
            c: 2,
          },
          {
            sid: 177,
            c: 0,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 1,
          },
          {
            sid: 93,
            c: 4,
          },
          {
            sid: 94,
            c: 0,
          },
          {
            sid: 95,
            c: 0,
          },
        ],
      },
      {
        ty: 8,
        des: '非冠军赛事',
        tc: 1586,
        ssl: [
          {
            sid: 1,
            c: 1250,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 57,
          },
          {
            sid: 4,
            c: 2,
          },
          {
            sid: 5,
            c: 39,
          },
          {
            sid: 6,
            c: 35,
          },
          {
            sid: 7,
            c: 15,
          },
          {
            sid: 8,
            c: 1,
          },
          {
            sid: 13,
            c: 9,
          },
          {
            sid: 14,
            c: 1,
          },
          {
            sid: 15,
            c: 100,
          },
          {
            sid: 16,
            c: 25,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 42,
          },
          {
            sid: 177,
            c: 10,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
      {
        ty: 3,
        des: '今日',
        tc: 7,
        ssl: [
          {
            sid: 1,
            c: 2,
          },
          {
            sid: 2,
            c: 0,
          },
          {
            sid: 3,
            c: 0,
          },
          {
            sid: 4,
            c: 0,
          },
          {
            sid: 5,
            c: 0,
          },
          {
            sid: 6,
            c: 0,
          },
          {
            sid: 7,
            c: 0,
          },
          {
            sid: 8,
            c: 0,
          },
          {
            sid: 13,
            c: 0,
          },
          {
            sid: 14,
            c: 0,
          },
          {
            sid: 15,
            c: 0,
          },
          {
            sid: 16,
            c: 0,
          },
          {
            sid: 18,
            c: 0,
          },
          {
            sid: 19,
            c: 0,
          },
          {
            sid: 24,
            c: 0,
          },
          {
            sid: 92,
            c: 0,
          },
          {
            sid: 1001,
            c: 0,
          },
          {
            sid: 47,
            c: 0,
          },
          {
            sid: 177,
            c: 5,
          },
          {
            sid: 178,
            c: 0,
          },
          {
            sid: 51,
            c: 0,
          },
          {
            sid: 1020,
            c: 0,
          },
          {
            sid: 1021,
            c: 0,
          },
          {
            sid: 1022,
            c: 0,
          },
          {
            sid: 1023,
            c: 0,
          },
        ],
      },
    ],
    ht: 389,
    hls: [
      {
        id: 11140,
        mt: 6,
        na: 'UEFA Champions League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/1a023bd4e288fcceb6ee2d39eb4c54e8.png',
        sid: 1,
      },
      {
        id: 12227,
        mt: 21,
        na: 'UEFA Euro Qualifiers',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/32238de0ea1a5dd9cdc7cf10a500561f.jpg',
        sid: 1,
      },
      {
        id: 11018,
        mt: 20,
        na: 'Italy Serie A',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/dd317bc61252b327a1d03a979f161321.png',
        sid: 1,
      },
      {
        id: 11062,
        mt: 20,
        na: 'England Premier League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/c2d952772317c94e92df7738d846acef.png',
        sid: 1,
      },
      {
        id: 10815,
        mt: 20,
        na: 'Spain LaLiga',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/411f717650726181524171feb943a3db.png',
        sid: 1,
      },
      {
        id: 10807,
        mt: 18,
        na: 'Germany Bundesliga',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/c0e1d6399440b7b740cef4b664c8cf0e.png',
        sid: 1,
      },
      {
        id: 10706,
        mt: 9,
        na: 'Japan J.League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/fc15ad4a69dc35a9d72985a5115388f7.png',
        sid: 1,
      },
      {
        id: 10403,
        mt: 8,
        na: 'Chinese Super League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/f8d2d9c0b0a91cc4e5c81599d192c6c2.png',
        sid: 1,
      },
      {
        id: 10864,
        mt: 7,
        na: 'AFC Champions League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/8f1145683142436f78aa0f25213771b6.png',
        sid: 1,
      },
      {
        id: 10640,
        mt: 6,
        na: 'South Korea K-League 1',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/bf707468bd8f3278128cb4beda5bfd2e.png',
        sid: 1,
      },
      {
        id: 10552,
        mt: 4,
        na: 'Japan Emperor Cup',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/77e827ac8d7a61cc7c65586f251423ab.png',
        sid: 1,
      },
      {
        id: 10661,
        mt: 10,
        na: 'UEFA Europa League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/1f0c6bc1ed9e527a441da13811d6f009.png',
        sid: 1,
      },
      {
        id: 10862,
        mt: 24,
        na: 'England League Cup',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/fb9d1cf9158caf1e94f3288c23ecf8eb.png',
        sid: 1,
      },
      {
        id: 10983,
        mt: 18,
        na: 'France Ligue 1',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/9aeb33a857aa7469998179045473c1a.png',
        sid: 1,
      },
      {
        id: 11460,
        mt: 18,
        na: 'Germany 2. Bundesliga',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/6e010f34d64c7f801c1d662b8cd68d6e.png',
        sid: 1,
      },
      {
        id: 11024,
        mt: 28,
        na: 'USA Major League Soccer',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/1f83eedb544951a67156a8e868697979.png',
        sid: 1,
      },
      {
        id: 10580,
        mt: 20,
        na: 'Brazil Serie A',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/1ca143bc6949de8a8c45e9cc8ac361bd.png',
        sid: 1,
      },
      {
        id: 11861,
        mt: 23,
        na: 'Mexico Liga MX',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/5ff93790baaf1dddd934681971a69a75.png',
        sid: 1,
      },
      {
        id: 10712,
        mt: 22,
        na: 'Japan J.League 2',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/ae5a06a279027fb1e73d5e9868914f37.png',
        sid: 1,
      },
      {
        id: 11044,
        mt: 14,
        na: 'Argentina Copa Liga Profesional',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/a45a493a771456b53b742aed9a6cc707.png',
        sid: 1,
      },
      {
        id: 11030,
        mt: 24,
        na: 'England Championship League',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/f847883e4fd177386abd031d22a5abe9.png',
        sid: 1,
      },
      {
        id: 10528,
        mt: 14,
        na: 'Netherlands Eredivisie',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/bfb28521541b55e4fa6eadfaa1405cd8.png',
        sid: 1,
      },
      {
        id: 10489,
        mt: 4,
        na: 'Norway Eliteserien',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/365e4bb868cc0370959caa752ddb1c52.png',
        sid: 1,
      },
      {
        id: 10785,
        mt: 16,
        na: 'Sweden Allsvenskan',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/cd0a80bdd820300a881ff9001aeb0c9.png',
        sid: 1,
      },
      {
        id: 11274,
        mt: 15,
        na: 'NBA',
        lurl: 'https://ns-static.s3.ap-northeast-1.amazonaws.com/data/a6978a33316b3b1db95ab584ff1b7e4d.png',
        sid: 3,
      },
    ],
  },
  code: 0,
};
