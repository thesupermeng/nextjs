'use client';

import { AnchorContent, sample } from '../anchorList/AnchorContent';
import { OutrightAnchor } from './OutrightAnchor';
import { OutrightRow } from './OutrightRow';

export const TayaSportOutRightH5 = ({ list }) => {
  return (
    <AnchorContent
      list={list}
      anchorExtractor={(obj) => obj.lg.na[0]}
      anchor={(anchor) => <OutrightAnchor anchor={anchor} />}
      section={(data) => <OutrightRow data={data} />}
    />
  );
};

const h5outright = {
  success: true,
  data: {
    current: 1,
    size: 1,
    total: 1,
    records: [
      {
        nsg: [],
        mg: [],
        tms: 13,
        tps: [],
        lg: {
          na: 'Greece A1 Basketball League',
          id: 11385,
          or: 9999,
          lurl: 'https://newsports-static-image.s3.ap-northeast-1.amazonaws.com/data/e6d6fbecd24205125ec4e9af4fa02a70.png',
          sid: 3,
          rid: 23,
          rnm: 'Greece',
          hot: false,
          slid: 113850000,
        },
        ts: [],
        mc: {
          pe: 3001,
          r: false,
        },
        id: 863167,
        bt: 1718409600000,
        ms: 4,
        ne: 0,
        vs: {
          have: false,
        },
        sid: 3,
        ty: 1,
        ye: '23/24',
        nm: 'Greece A1 Basketball League 23/24',
        sb: {},
      },
    ],
    pageTotal: 1,
  },
  code: 0,
};
