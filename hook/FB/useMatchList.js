import { FB_Refresh_Interval } from '@/config/FB/FBConfig';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { FBApi } from '@/util/FB_Api';
import { useDispatch } from 'react-redux';
import { setTayaSportsPaging } from '@/store/sportsTaya';
import { URL, URL_FB_APP } from '@/config/url';
import { checkMissingMTY } from './utilTempToRecordMissingMTY';

const sampleResp = {
  success: true,
  data: {
    current: 1,
    size: 50,
    total: 5,
    records: [
      {
        nsg: [],
        mg: [],
        tms: 7,
        tps: ['h'],
        lg: {
          na: '越南甲级联赛',
          id: 10294,
          or: 1000,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/24edbdf32b4833f50a36e9984957de4c.jpeg',
          sid: 1,
          rid: 96,
          rnm: '越南',
          hot: false,
          slid: 102940000,
        },
        ts: [
          {
            na: '黄安嘉莱',
            id: 57601,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/d7227d7ffff4f306869c2a17799ece00.png',
          },
          {
            na: '河内',
            id: 57627,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/679578e1d97559b2bea42a60df9e9d50.png',
          },
        ],
        mc: {
          pe: 1010,
        },
        id: 830818,
        bt: 1685599200000,
        ms: 5,
        fid: 2,
        fmt: 100001,
        ne: 1,
        vs: {
          have: true,
        },
        as: [
          'https://animation.fb6pro.com/animation/index.html?matchId=39368779',
        ],
        sid: 1,
        smt: 2,
        ty: 2,
        nm: '黄安嘉莱 vs. 河内',
        sb: {},
      },
      {
        nsg: [
          {
            pe: 1000,
            tyg: 5,
            sc: [2, 0],
          },
          {
            pe: 1000,
            tyg: 7,
            sc: [4, 3],
          },
          {
            pe: 1000,
            tyg: 8,
            sc: [3, 3],
          },
          {
            pe: 1001,
            tyg: 5,
            sc: [2, 0],
          },
          {
            pe: 1001,
            tyg: 7,
            sc: [4, 3],
          },
          {
            pe: 1001,
            tyg: 8,
            sc: [3, 3],
          },
          {
            pe: 1002,
            tyg: 5,
            sc: [2, 0],
          },
          {
            pe: 1002,
            tyg: 7,
            sc: [4, 3],
          },
          {
            pe: 1002,
            tyg: 8,
            sc: [3, 3],
          },
          {
            pe: 1009,
            tyg: 5,
            sc: [2, 0],
          },
        ],
        mg: [],
        tms: 8,
        tps: [],
        lg: {
          na: '白俄罗斯超级联赛',
          id: 11305,
          or: 150,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/798a038cc27de8b29c61e5c9e0cf00f.png',
          sid: 1,
          rid: 28,
          rnm: '白俄罗斯',
          hot: true,
          slid: 113050000,
        },
        ts: [
          {
            na: '若基诺鱼雷',
            id: 55314,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/431ef72d58ec595f9fc8f5a995eea172.png',
          },
          {
            na: '明斯克迪纳摩',
            id: 55256,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/1a010961e2ebb700e43ffdd0f795f239.png',
          },
        ],
        mc: {
          s: 2167,
          pe: 1002,
          r: false,
          tp: 1,
        },
        id: 850839,
        bt: 1688657400000,
        ms: 5,
        fid: 2,
        fmt: 100001,
        ne: 0,
        vs: {
          have: true,
        },
        as: [
          'https://animation.fb6pro.com/animation/index.html?matchId=39576231',
        ],
        sid: 1,
        smt: 0,
        ty: 2,
        nm: '若基诺鱼雷 vs. 明斯克迪纳摩',
        sb: {},
      },
      {
        nsg: [
          {
            pe: 1000,
            tyg: 5,
            sc: [1, 0],
          },
          {
            pe: 1000,
            tyg: 7,
            sc: [0, 0],
          },
          {
            pe: 1000,
            tyg: 8,
            sc: [0, 0],
          },
          {
            pe: 1000,
            tyg: 6,
            sc: [0, 2],
          },
          {
            pe: 1001,
            tyg: 5,
            sc: [1, 0],
          },
          {
            pe: 1001,
            tyg: 7,
            sc: [0, 0],
          },
          {
            pe: 1001,
            tyg: 8,
            sc: [0, 0],
          },
          {
            pe: 1001,
            tyg: 6,
            sc: [0, 2],
          },
          {
            pe: 1002,
            tyg: 5,
            sc: [1, 0],
          },
          {
            pe: 1002,
            tyg: 7,
            sc: [0, 0],
          },
          {
            pe: 1002,
            tyg: 8,
            sc: [0, 0],
          },
          {
            pe: 1002,
            tyg: 6,
            sc: [0, 2],
          },
          {
            pe: 1007,
            tyg: 5,
            sc: [1, 0],
          },
          {
            pe: 1007,
            tyg: 6,
            sc: [0, 2],
          },
          {
            pe: 1008,
            tyg: 5,
            sc: [0, 0],
          },
          {
            pe: 1008,
            tyg: 6,
            sc: [0, 0],
          },
          {
            pe: 1009,
            tyg: 5,
            sc: [0, 0],
          },
          {
            pe: 1009,
            tyg: 6,
            sc: [0, 0],
          },
        ],
        mg: [
          {
            mty: 1007,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 3',
                    ty: 4,
                    od: -999,
                    li: '3',
                  },
                  {
                    na: '小',
                    nm: '小 3',
                    ty: 5,
                    od: -999,
                    li: '3',
                  },
                ],
                id: 3981725,
                ss: 1,
                au: 1,
                mbl: 2,
                li: '3',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 2.5/3',
                    ty: 4,
                    od: -999,
                    li: '2.5/3',
                  },
                  {
                    na: '小',
                    nm: '小 2.5/3',
                    ty: 5,
                    od: -999,
                    li: '2.5/3',
                  },
                ],
                id: 3981727,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '2.75',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 3.5/4',
                    ty: 4,
                    od: -999,
                    li: '3.5/4',
                  },
                  {
                    na: '小',
                    nm: '小 3.5/4',
                    ty: 5,
                    od: -999,
                    li: '3.5/4',
                  },
                ],
                id: 3981726,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '3.75',
              },
            ],
            tps: ['p', 'h'],
            nm: '大/小',
          },
        ],
        tms: 20,
        tps: ['h'],
        lg: {
          na: '澳大利亚新南威尔士州北部全国超级联赛',
          id: 10516,
          or: 1000,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/ac675f7693ed5c92cc6c25e9924ebc47.png',
          sid: 1,
          rid: 78,
          rnm: '澳大利亚',
          hot: false,
          slid: 105160000,
        },
        ts: [
          {
            na: '纽卡斯尔奥林匹克',
            id: 54630,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/9546291acc5872ace24b503719e2a788.png',
          },
          {
            na: '瓦伦蒂勒',
            id: 54629,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/6ff2a77248838a58246a576c69c3575d.png',
          },
        ],
        mc: {
          s: 1946,
          pe: 1002,
          r: false,
          tp: 1,
        },
        id: 850103,
        bt: 1688792400000,
        ms: 5,
        fid: 2,
        fmt: 100001,
        ne: 0,
        vs: {
          have: true,
        },
        as: [
          'https://animation.fb6pro.com/animation/index.html?matchId=39064185',
        ],
        sid: 1,
        smt: 0,
        ty: 2,
        nm: '纽卡斯尔奥林匹克 vs. 瓦伦蒂勒',
        sb: {},
      },
      {
        nsg: [],
        mg: [
          {
            mty: 1000,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '+0/0.5',
                    ty: 1,
                    od: 1.61,
                    li: '+0/0.5',
                  },
                  {
                    na: '天籁枚方',
                    nm: '-0/0.5',
                    ty: 2,
                    od: 1.46,
                    li: '-0/0.5',
                  },
                ],
                id: 4024946,
                ss: 0,
                au: 1,
                mbl: 2,
                li: '0.25',
              },
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '-0/0.5',
                    ty: 1,
                    od: 1.2,
                    li: '-0/0.5',
                  },
                  {
                    na: '天籁枚方',
                    nm: '+0/0.5',
                    ty: 2,
                    od: 2.14,
                    li: '+0/0.5',
                  },
                ],
                id: 4024068,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '-0.25',
              },
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '-0.5',
                    ty: 1,
                    od: 2.3,
                    li: '-0.5',
                  },
                  {
                    na: '天籁枚方',
                    nm: '+0.5',
                    ty: 2,
                    od: 1.15,
                    li: '+0.5',
                  },
                ],
                id: 4024943,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '-0.5',
              },
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '0',
                    ty: 1,
                    od: 2.3,
                    li: '0',
                  },
                  {
                    na: '天籁枚方',
                    nm: '0',
                    ty: 2,
                    od: 1.15,
                    li: '0',
                  },
                ],
                id: 4024944,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '0',
              },
            ],
            tps: ['p', 'h'],
            nm: '让球',
          },
          {
            mty: 1000,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '-0/0.5',
                    ty: 1,
                    od: 1.68,
                    li: '-0/0.5',
                  },
                  {
                    na: '天籁枚方',
                    nm: '+0/0.5',
                    ty: 2,
                    od: 2.28,
                    li: '+0/0.5',
                  },
                ],
                id: 4024929,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '-0.25',
              },
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '+0.5',
                    ty: 1,
                    od: 1.68,
                    li: '+0.5',
                  },
                  {
                    na: '天籁枚方',
                    nm: '-0.5',
                    ty: 2,
                    od: 2.28,
                    li: '-0.5',
                  },
                ],
                id: 4024997,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '0.5',
              },
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '0',
                    ty: 1,
                    od: 1.56,
                    li: '0',
                  },
                  {
                    na: '天籁枚方',
                    nm: '0',
                    ty: 2,
                    od: 2.51,
                    li: '0',
                  },
                ],
                id: 4024070,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '0',
              },
            ],
            tps: ['p', 'f', 'h'],
            nm: '让球-上半场',
          },
          {
            mty: 1007,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 2/2.5',
                    ty: 4,
                    od: 1.31,
                    li: '2/2.5',
                  },
                  {
                    na: '小',
                    nm: '小 2/2.5',
                    ty: 5,
                    od: 2.28,
                    li: '2/2.5',
                  },
                ],
                id: 4024940,
                ss: 0,
                au: 1,
                mbl: 2,
                li: '2.25',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 3',
                    ty: 4,
                    od: 1.3,
                    li: '3',
                  },
                  {
                    na: '小',
                    nm: '小 3',
                    ty: 5,
                    od: 2.32,
                    li: '3',
                  },
                ],
                id: 4024941,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '3',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 2.5/3',
                    ty: 4,
                    od: 1.2,
                    li: '2.5/3',
                  },
                  {
                    na: '小',
                    nm: '小 2.5/3',
                    ty: 5,
                    od: 2.72,
                    li: '2.5/3',
                  },
                ],
                id: 4024939,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '2.75',
              },
            ],
            tps: ['p', 'h'],
            nm: '大/小',
          },
          {
            mty: 1007,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 1',
                    ty: 4,
                    od: 1.78,
                    li: '1',
                  },
                  {
                    na: '小',
                    nm: '小 1',
                    ty: 5,
                    od: 2.11,
                    li: '1',
                  },
                ],
                id: 4024071,
                ss: 1,
                au: 1,
                mbl: 2,
                li: '1',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 0.5',
                    ty: 4,
                    od: 1.76,
                    li: '0.5',
                  },
                  {
                    na: '小',
                    nm: '小 0.5',
                    ty: 5,
                    od: 2.13,
                    li: '0.5',
                  },
                ],
                id: 4024937,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '0.5',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 1/1.5',
                    ty: 4,
                    od: 1.69,
                    li: '1/1.5',
                  },
                  {
                    na: '小',
                    nm: '小 1/1.5',
                    ty: 5,
                    od: 2.23,
                    li: '1/1.5',
                  },
                ],
                id: 4024936,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '1.25',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 1.5',
                    ty: 4,
                    od: 1.67,
                    li: '1.5',
                  },
                  {
                    na: '小',
                    nm: '小 1.5',
                    ty: 5,
                    od: 2.26,
                    li: '1.5',
                  },
                ],
                id: 4024938,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '1.5',
              },
            ],
            tps: ['p', 'f', 'h'],
            nm: '大/小-上半场',
          },
          {
            mty: 1005,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '丸安冈崎',
                    nm: '主',
                    ty: 1,
                    od: 1.19,
                  },
                  {
                    na: '和',
                    nm: '和',
                    ty: 3,
                    od: 4.5,
                  },
                  {
                    na: '天籁枚方',
                    nm: '客',
                    ty: 2,
                    od: 3.6,
                  },
                ],
                id: 4016457,
                ss: 0,
                au: 1,
              },
            ],
            tps: ['p', 'f'],
            nm: '独赢-上半场',
          },
          {
            mty: 1010,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 8.5',
                    ty: 4,
                    od: -999,
                    li: '8.5',
                  },
                  {
                    na: '小',
                    nm: '小 8.5',
                    ty: 5,
                    od: -999,
                    li: '8.5',
                  },
                ],
                id: 4023937,
                ss: 0,
                au: 1,
                mbl: 1,
                li: '8.5',
              },
            ],
            tps: ['p', 'c', 'h'],
            nm: '角球:大/小',
          },
          {
            mty: 1010,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 4.5',
                    ty: 4,
                    od: -999,
                    li: '4.5',
                  },
                  {
                    na: '小',
                    nm: '小 4.5',
                    ty: 5,
                    od: -999,
                    li: '4.5',
                  },
                ],
                id: 4023938,
                ss: 0,
                au: 1,
                mbl: 1,
                li: '4.5',
              },
            ],
            tps: ['p', 'c', 'f', 'h'],
            nm: '角球:大/小-上半场',
          },
        ],
        tms: 25,
        tps: ['c', 'h'],
        lg: {
          na: '日本足球联赛',
          id: 11709,
          or: 1000,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/a04260f0f8f112edff32c68059f7a1af.jpeg',
          sid: 1,
          rid: 58,
          rnm: '日本',
          hot: false,
          slid: 117090000,
        },
        ts: [
          {
            na: '丸安冈崎',
            id: 70120,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/d4703e94ef613335de56061ceb8102bd.png',
          },
          {
            na: '天籁枚方',
            id: 70115,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/56608fb13bdcc143286b4c5c4b40c76e.png',
          },
        ],
        mc: {
          s: 743,
          pe: 1002,
          r: false,
          tp: 1,
        },
        id: 855630,
        bt: 1689573600000,
        ms: 5,
        fid: 2,
        fmt: 100001,
        ne: 0,
        vs: {
          have: true,
        },
        as: [
          'https://animation.fb6pro.com/animation/index.html?matchId=42115109',
        ],
        sid: 1,
        smt: 0,
        ty: 2,
        nm: '丸安冈崎 vs. 天籁枚方',
        sb: {},
      },
      {
        nsg: [],
        mg: [
          {
            mty: 1000,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '-1',
                    ty: 1,
                    od: 1.7,
                    li: '-1',
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '+1',
                    ty: 2,
                    od: 1.39,
                    li: '+1',
                  },
                ],
                id: 4024691,
                ss: 0,
                au: 1,
                mbl: 2,
                li: '-1',
              },
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '-0.5',
                    ty: 1,
                    od: 1.37,
                    li: '-0.5',
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '+0.5',
                    ty: 2,
                    od: 1.73,
                    li: '+0.5',
                  },
                ],
                id: 4024690,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '-0.5',
              },
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '-1/1.5',
                    ty: 1,
                    od: 1.94,
                    li: '-1/1.5',
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '+1/1.5',
                    ty: 2,
                    od: 1.26,
                    li: '+1/1.5',
                  },
                ],
                id: 4024692,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '-1.25',
              },
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '-0/0.5',
                    ty: 1,
                    od: 1.24,
                    li: '-0/0.5',
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '+0/0.5',
                    ty: 2,
                    od: 2,
                    li: '+0/0.5',
                  },
                ],
                id: 4024693,
                ss: 1,
                au: 1,
                mbl: 5,
                li: '-0.25',
              },
            ],
            tps: ['p', 'h'],
            nm: '让球',
          },
          {
            mty: 1000,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '-0/0.5',
                    ty: 1,
                    od: 1.56,
                    li: '-0/0.5',
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '+0/0.5',
                    ty: 2,
                    od: 2.51,
                    li: '+0/0.5',
                  },
                ],
                id: 4024695,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '-0.25',
              },
            ],
            tps: ['p', 'f', 'h'],
            nm: '让球-上半场',
          },
          {
            mty: 1007,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 3.5',
                    ty: 4,
                    od: 2.26,
                    li: '3.5',
                  },
                  {
                    na: '小',
                    nm: '小 3.5',
                    ty: 5,
                    od: 1.31,
                    li: '3.5',
                  },
                ],
                id: 4024680,
                ss: 0,
                au: 1,
                mbl: 1,
                li: '3.5',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 4/4.5',
                    ty: 4,
                    od: 2.26,
                    li: '4/4.5',
                  },
                  {
                    na: '小',
                    nm: '小 4/4.5',
                    ty: 5,
                    od: 1.31,
                    li: '4/4.5',
                  },
                ],
                id: 4024681,
                ss: 0,
                au: 1,
                mbl: 2,
                li: '4.25',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 4',
                    ty: 4,
                    od: 1.2,
                    li: '4',
                  },
                  {
                    na: '小',
                    nm: '小 4',
                    ty: 5,
                    od: 2.72,
                    li: '4',
                  },
                ],
                id: 4024679,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '4',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 4.5',
                    ty: 4,
                    od: 1.2,
                    li: '4.5',
                  },
                  {
                    na: '小',
                    nm: '小 4.5',
                    ty: 5,
                    od: 2.72,
                    li: '4.5',
                  },
                ],
                id: 4027169,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '4.5',
              },
            ],
            tps: ['p', 'h'],
            nm: '大/小',
          },
          {
            mty: 1007,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 1/1.5',
                    ty: 4,
                    od: 1.78,
                    li: '1/1.5',
                  },
                  {
                    na: '小',
                    nm: '小 1/1.5',
                    ty: 5,
                    od: 2.11,
                    li: '1/1.5',
                  },
                ],
                id: 4024686,
                ss: 1,
                au: 1,
                mbl: 1,
                li: '1.25',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 1.5',
                    ty: 4,
                    od: 1.78,
                    li: '1.5',
                  },
                  {
                    na: '小',
                    nm: '小 1.5',
                    ty: 5,
                    od: 2.11,
                    li: '1.5',
                  },
                ],
                id: 4024684,
                ss: 1,
                au: 1,
                mbl: 2,
                li: '1.5',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 2',
                    ty: 4,
                    od: 1.75,
                    li: '2',
                  },
                  {
                    na: '小',
                    nm: '小 2',
                    ty: 5,
                    od: 2.14,
                    li: '2',
                  },
                ],
                id: 4024687,
                ss: 1,
                au: 1,
                mbl: 3,
                li: '2',
              },
              {
                op: [
                  {
                    na: '大',
                    nm: '大 2/2.5',
                    ty: 4,
                    od: 1.64,
                    li: '2/2.5',
                  },
                  {
                    na: '小',
                    nm: '小 2/2.5',
                    ty: 5,
                    od: 2.31,
                    li: '2/2.5',
                  },
                ],
                id: 4027260,
                ss: 1,
                au: 1,
                mbl: 4,
                li: '2.25',
              },
            ],
            tps: ['p', 'f', 'h'],
            nm: '大/小-上半场',
          },
          {
            mty: 1005,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '利勒斯特罗姆二队',
                    nm: '主',
                    ty: 1,
                    od: 1.2,
                  },
                  {
                    na: '和',
                    nm: '和',
                    ty: 3,
                    od: 1.2,
                  },
                  {
                    na: '斯塔贝克二队',
                    nm: '客',
                    ty: 2,
                    od: 2.3,
                  },
                ],
                id: 4016587,
                ss: 1,
                au: 1,
              },
            ],
            tps: ['p', 'f'],
            nm: '独赢-上半场',
          },
          {
            mty: 1010,
            pe: 1001,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 9.5',
                    ty: 4,
                    od: -999,
                    li: '9.5',
                  },
                  {
                    na: '小',
                    nm: '小 9.5',
                    ty: 5,
                    od: -999,
                    li: '9.5',
                  },
                ],
                id: 4027141,
                ss: 0,
                au: 1,
                mbl: 1,
                li: '9.5',
              },
            ],
            tps: ['p', 'c', 'h'],
            nm: '角球:大/小',
          },
          {
            mty: 1010,
            pe: 1002,
            mks: [
              {
                op: [
                  {
                    na: '大',
                    nm: '大 4.5',
                    ty: 4,
                    od: -999,
                    li: '4.5',
                  },
                  {
                    na: '小',
                    nm: '小 4.5',
                    ty: 5,
                    od: -999,
                    li: '4.5',
                  },
                ],
                id: 4027142,
                ss: 0,
                au: 1,
                mbl: 1,
                li: '4.5',
              },
            ],
            tps: ['p', 'c', 'f', 'h'],
            nm: '角球:大/小-上半场',
          },
        ],
        tms: 25,
        tps: ['c', 'h'],
        lg: {
          na: '挪威丙级联赛',
          id: 11477,
          or: 1000,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/6fabb8e2df6c8a8be83a93f7876eaa52.png',
          sid: 1,
          rid: 65,
          rnm: '挪威',
          hot: false,
          slid: 114770000,
        },
        ts: [
          {
            na: '利勒斯特罗姆二队',
            id: 53159,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/30fef628505b02b52cebf13149e7be4b.png',
          },
          {
            na: '斯塔贝克二队',
            id: 53269,
            lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/b3f20e0802fd88dfec8f87fb384f16fb.png',
          },
        ],
        mc: {
          s: 786,
          pe: 1002,
          r: false,
          tp: 1,
        },
        id: 854536,
        bt: 1689588000000,
        ms: 5,
        fid: 2,
        fmt: 100001,
        ne: 0,
        vs: {
          have: true,
        },
        as: [
          'https://animation.fb6pro.com/animation/index.html?matchId=38919425',
        ],
        sid: 1,
        smt: 0,
        ty: 2,
        nm: '利勒斯特罗姆二队 vs. 斯塔贝克二队',
        sb: {},
      },
    ],
    pageTotal: 1,
  },
  code: 0,
};
export const useFBMatchList = (p) => {
  const dispatch = useDispatch();
  const [param, setParam] = useState({});
  useEffect(() => {
    setParam({ ...p, isPC: process.env.NEXT_PUBLIC_ENV === 'WEB' });
  }, [p]);
  const {
    data,
    error,
    mutate: mutateMatchList,
    isLoading,
  } = useSWR(
    param.sportId ||
      param.sportIds ||
      param.leagueId ||
      param.leagueIds ||
      param.matchIds
      ? [URL_FB_APP.matchList, param]
      : null,
    ([url, param]) => FBApi(url, param),
    { refreshInterval: FB_Refresh_Interval.MatchList, revalidateOnFocus: false }
  );
  useEffect(() => {
    if (data?.data) {
      checkMissingMTY(data?.data?.records);
      dispatch(
        setTayaSportsPaging({
          current: data?.data?.current,
          total: data?.data?.total,
          pageTotal: data?.data?.pageTotal,
        })
      );
    }
  }, [data?.data?.total, data?.data?.pageTotal]);

  return { matchList: data?.data || [], mutateMatchList, isLoading };
};
