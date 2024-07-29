import { useCallback, useRef, useState } from 'react';
import { AnchorList, parseAnchoredList } from './AnchorList';
import { findFirstVisibleChild } from './util';

export const AnchorContent = ({
  list = [],
  anchorExtractor = (a) => a,
  anchor = (a) => <div>{JSON.stringify(a)}</div>,
  section = (a) => <div>{JSON.stringify(a)}</div>,
}) => {
  const [curAnchor, setCurAnchor] = useState('');
  const contentRef = useRef(null);
  const anchoredList = parseAnchoredList(anchorExtractor, list || sample);
  const onClickAnchor = useCallback((a) => {
    setCurAnchor(a);
    const target = contentRef.current.querySelector(`[data-anchor="${a}"]`);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  });

  const onScrollContent = (e) => {
    const newFocus = findFirstVisibleChild(contentRef.current);
    setCurAnchor(newFocus);
  };
  return (
    <div className='flex flex-1 h-full relative'>
      <div
        ref={contentRef}
        className='flex flex-col flex-[1_0_0] overflow-y-auto'
        onScroll={onScrollContent}
      >
        {anchoredList.map(({ anchor: a, data }, idx) => {
          return (
            <div key={a}>
              <div data-anchor={a}>{anchor(a)}</div>
              {section(data)}
            </div>
          );
        })}
      </div>
      <AnchorList
        list={anchoredList.map((a) => a.anchor)}
        highlightAnchor={curAnchor}
        onClick={onClickAnchor}
      />
    </div>
  );
};

export const sample = [
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'France',
                ty: 8,
                od: 5,
              },
            ],
            id: 21552228,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'England',
                ty: 8,
                od: 5.5,
              },
            ],
            id: 21552240,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Germany',
                ty: 8,
                od: 8,
              },
            ],
            id: 21552210,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spain',
                ty: 8,
                od: 9,
              },
            ],
            id: 21552195,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portugal',
                ty: 8,
                od: 10,
              },
            ],
            id: 21552227,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Netherlands',
                ty: 8,
                od: 15,
              },
            ],
            id: 21552196,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Italy',
                ty: 8,
                od: 16,
              },
            ],
            id: 21552226,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Belgium',
                ty: 8,
                od: 17,
              },
            ],
            id: 21552214,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Denmark',
                ty: 8,
                od: 26,
              },
            ],
            id: 21552199,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Croatia',
                ty: 8,
                od: 26,
              },
            ],
            id: 21552231,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Switzerland',
                ty: 8,
                od: 51,
              },
            ],
            id: 21552245,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Czech Republic',
                ty: 8,
                od: 71,
              },
            ],
            id: 21552246,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria',
                ty: 8,
                od: 71,
              },
            ],
            id: 21552217,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Turkey',
                ty: 8,
                od: 71,
              },
            ],
            id: 21552221,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serbia',
                ty: 8,
                od: 71,
              },
            ],
            id: 21552208,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ukraine',
                ty: 8,
                od: 81,
              },
            ],
            id: 21552238,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Poland',
                ty: 8,
                od: 81,
              },
            ],
            id: 21552224,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sweden',
                ty: 8,
                od: 81,
              },
            ],
            id: 21552247,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Scotland',
                ty: 8,
                od: 101,
              },
            ],
            id: 21552202,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norway',
                ty: 8,
                od: 101,
              },
            ],
            id: 21552220,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hungary',
                ty: 8,
                od: 101,
              },
            ],
            id: 21552205,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romania',
                ty: 8,
                od: 151,
              },
            ],
            id: 21552206,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wales',
                ty: 8,
                od: 151,
              },
            ],
            id: 21552198,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greece',
                ty: 8,
                od: 201,
              },
            ],
            id: 21552207,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Finland',
                ty: 8,
                od: 201,
              },
            ],
            id: 21552215,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovenia',
                ty: 8,
                od: 201,
              },
            ],
            id: 21552211,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovakia',
                ty: 8,
                od: 201,
              },
            ],
            id: 21552197,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bosnia and Herzegovina',
                ty: 8,
                od: 201,
              },
            ],
            id: 21552222,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Iceland',
                ty: 8,
                od: 301,
              },
            ],
            id: 21552194,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Israel',
                ty: 8,
                od: 301,
              },
            ],
            id: 21552219,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montenegro',
                ty: 8,
                od: 301,
              },
            ],
            id: 21552218,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'North Macedonia',
                ty: 8,
                od: 501,
              },
            ],
            id: 21552201,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bulgaria',
                ty: 8,
                od: 1001,
              },
            ],
            id: 21552209,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cyprus',
                ty: 8,
                od: 1001,
              },
            ],
            id: 21552229,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Northern Ireland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 21552242,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ireland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 21552244,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 36,
    tps: [],
    lg: {
      na: 'UEFA Euro',
      id: 11582,
      or: 1,
      lurl: 'https://static.fastbs55.com/data/62835a5cf36962cb6bf7edb43279be1e.png',
      sid: 1,
      rid: 309,
      rnm: 'Europe',
      hot: false,
      slid: 115820000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 623559,
    bt: 1720983600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2024',
    nm: 'UEFA Euro 2024',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1988,
        mks: [
          {
            op: [
              {
                nm: 'Spain',
                ty: 8,
                od: 1.29,
              },
            ],
            id: 38921834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Scotland',
                ty: 8,
                od: 3.11,
              },
            ],
            id: 38921831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norway',
                ty: 8,
                od: 146,
              },
            ],
            id: 38921830,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Winner',
      },
      {
        mty: 1980,
        mks: [
          {
            op: [
              {
                nm: 'Scotland',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923394,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spain',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923395,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norway',
                ty: 8,
                od: 6.65,
              },
            ],
            id: 38923396,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Georgia',
                ty: 8,
                od: 43,
              },
            ],
            id: 38923393,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Top 2',
      },
      {
        mty: 1987,
        mks: [
          {
            op: [
              {
                nm: 'France',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 38921839,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Netherlands',
                ty: 8,
                od: 5.3,
              },
            ],
            id: 38921843,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greece',
                ty: 8,
                od: 116,
              },
            ],
            id: 38921847,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Winner',
      },
      {
        mty: 1979,
        mks: [
          {
            op: [
              {
                nm: 'France',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923436,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Netherlands',
                ty: 8,
                od: 1.02,
              },
            ],
            id: 38923434,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greece',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 38923433,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ireland',
                ty: 8,
                od: 50,
              },
            ],
            id: 38923435,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Top 2',
      },
      {
        mty: 1986,
        mks: [
          {
            op: [
              {
                nm: 'England',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 38921856,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Italy',
                ty: 8,
                od: 7.6,
              },
            ],
            id: 38921859,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ukraine',
                ty: 8,
                od: 32,
              },
            ],
            id: 38921863,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'North Macedonia',
                ty: 8,
                od: 451,
              },
            ],
            id: 38921865,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Winner',
      },
      {
        mty: 1978,
        mks: [
          {
            op: [
              {
                nm: 'England',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923613,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Italy',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 38923615,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ukraine',
                ty: 8,
                od: 4.68,
              },
            ],
            id: 38923614,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'North Macedonia',
                ty: 8,
                od: 51,
              },
            ],
            id: 38923616,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Top 2',
      },
      {
        mty: 1985,
        mks: [
          {
            op: [
              {
                nm: 'Croatia',
                ty: 8,
                od: 1.3,
              },
            ],
            id: 38921853,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Turkey',
                ty: 8,
                od: 4.45,
              },
            ],
            id: 38921844,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wales',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 38921840,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Armenia',
                ty: 8,
                od: 24,
              },
            ],
            id: 38921848,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Winner',
      },
      {
        mty: 1977,
        mks: [
          {
            op: [
              {
                nm: 'Croatia',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923711,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Turkey',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 38923709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wales',
                ty: 8,
                od: 3.68,
              },
            ],
            id: 38923710,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Armenia',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 38923708,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Top 2',
      },
      {
        mty: 1984,
        mks: [
          {
            op: [
              {
                nm: 'Czech Republic',
                ty: 8,
                od: 1.79,
              },
            ],
            id: 38921852,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Albania',
                ty: 8,
                od: 3,
              },
            ],
            id: 38921846,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Poland',
                ty: 8,
                od: 5.1,
              },
            ],
            id: 38921845,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Moldova',
                ty: 8,
                od: 90,
              },
            ],
            id: 38921849,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Winner',
      },
      {
        mty: 1976,
        mks: [
          {
            op: [
              {
                nm: 'Czech Republic',
                ty: 8,
                od: 1.22,
              },
            ],
            id: 38923860,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Albania',
                ty: 8,
                od: 1.47,
              },
            ],
            id: 38923864,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Poland',
                ty: 8,
                od: 1.53,
              },
            ],
            id: 38923862,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Moldova',
                ty: 8,
                od: 18.5,
              },
            ],
            id: 38923861,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Top 2',
      },
      {
        mty: 1983,
        mks: [
          {
            op: [
              {
                nm: 'Belgium',
                ty: 8,
                od: 1.29,
              },
            ],
            id: 38921842,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 38921838,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Winner',
      },
      {
        mty: 1975,
        mks: [
          {
            op: [
              {
                nm: 'Austria',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923877,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sweden',
                ty: 8,
                od: 9,
              },
            ],
            id: 38923878,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Belgium',
                ty: 8,
                od: -999,
              },
            ],
            id: 38923876,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Top 2',
      },
      {
        mty: 1982,
        mks: [
          {
            op: [
              {
                nm: 'Hungary',
                ty: 8,
                od: 1.54,
              },
            ],
            id: 38921870,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serbia',
                ty: 8,
                od: 2.4,
              },
            ],
            id: 38921867,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montenegro',
                ty: 8,
                od: 23,
              },
            ],
            id: 38921868,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Winner',
      },
      {
        mty: 1974,
        mks: [
          {
            op: [
              {
                nm: 'Hungary',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 38923893,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serbia',
                ty: 8,
                od: 1.07,
              },
            ],
            id: 38923892,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montenegro',
                ty: 8,
                od: 3.5,
              },
            ],
            id: 38923895,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bulgaria',
                ty: 8,
                od: 101,
              },
            ],
            id: 38923891,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lithuania',
                ty: 8,
                od: 151,
              },
            ],
            id: 38923894,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Top 2',
      },
      {
        mty: 1981,
        mks: [
          {
            op: [
              {
                nm: 'Denmark',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 38921864,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovenia',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 38921855,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Finland',
                ty: 8,
                od: 10.8,
              },
            ],
            id: 38921857,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kazakhstan',
                ty: 8,
                od: 50,
              },
            ],
            id: 38921858,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Winner',
      },
      {
        mty: 1973,
        mks: [
          {
            op: [
              {
                nm: 'Denmark',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 38923939,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovenia',
                ty: 8,
                od: 1.78,
              },
            ],
            id: 38923937,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Finland',
                ty: 8,
                od: 2,
              },
            ],
            id: 38923936,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kazakhstan',
                ty: 8,
                od: 14,
              },
            ],
            id: 38923941,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Top 2',
      },
      {
        mty: 1968,
        mks: [
          {
            op: [
              {
                nm: 'Switzerland',
                ty: 8,
                od: 1.19,
              },
            ],
            id: 42829886,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romania',
                ty: 8,
                od: 5.5,
              },
            ],
            id: 42829888,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Israel',
                ty: 8,
                od: 12.5,
              },
            ],
            id: 42829884,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group I Winner',
      },
      {
        mty: 1966,
        mks: [
          {
            op: [
              {
                nm: 'Switzerland',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 42829857,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romania',
                ty: 8,
                od: 1.28,
              },
            ],
            id: 42829855,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Israel',
                ty: 8,
                od: 3.09,
              },
            ],
            id: 42829858,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kosovo',
                ty: 8,
                od: 24,
              },
            ],
            id: 42829860,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Belarus',
                ty: 8,
                od: 61,
              },
            ],
            id: 42829859,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group I Top 2',
      },
      {
        mty: 1967,
        mks: [
          {
            op: [
              {
                nm: 'Slovakia',
                ty: 8,
                od: 21,
              },
            ],
            id: 42829897,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Iceland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42829895,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luxembourg',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42829894,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bosnia and Herzegovina',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42829892,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portugal',
                ty: 8,
                od: -999,
              },
            ],
            id: 42829893,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group J Winner',
      },
      {
        mty: 1965,
        mks: [
          {
            op: [
              {
                nm: 'Portugal',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 42829868,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovakia',
                ty: 8,
                od: 1.12,
              },
            ],
            id: 42829867,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luxembourg',
                ty: 8,
                od: 11.7,
              },
            ],
            id: 42829866,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bosnia and Herzegovina',
                ty: 8,
                od: 11.7,
              },
            ],
            id: 42829864,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Iceland',
                ty: 8,
                od: 22,
              },
            ],
            id: 42829863,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group J Top 2',
      },
    ],
    tms: 77,
    tps: [],
    lg: {
      na: 'UEFA Euro Qualifiers',
      id: 12227,
      or: 2,
      lurl: 'https://static.fastbs55.com/data/32238de0ea1a5dd9cdc7cf10a500561f.jpg',
      sid: 1,
      rid: 309,
      rnm: 'Europe',
      hot: false,
      slid: 122270000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 964810,
    bt: 1700595900000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2024',
    nm: 'UEFA Euro Qualifiers 2024',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'France',
                ty: 8,
                od: 7.35,
              },
            ],
            id: 42024743,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brazil',
                ty: 8,
                od: 7.5,
              },
            ],
            id: 42024737,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'England',
                ty: 8,
                od: 8.75,
              },
            ],
            id: 42024763,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Argentina',
                ty: 8,
                od: 10.7,
              },
            ],
            id: 42024714,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spain',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 42024747,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Germany',
                ty: 8,
                od: 12.8,
              },
            ],
            id: 42024757,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portugal',
                ty: 8,
                od: 16.2,
              },
            ],
            id: 42024751,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Netherlands',
                ty: 8,
                od: 20,
              },
            ],
            id: 42024727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Italy',
                ty: 8,
                od: 24,
              },
            ],
            id: 42024725,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Belgium',
                ty: 8,
                od: 39,
              },
            ],
            id: 42024729,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'USA',
                ty: 8,
                od: 40,
              },
            ],
            id: 42024730,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Uruguay',
                ty: 8,
                od: 48,
              },
            ],
            id: 42024728,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mexico',
                ty: 8,
                od: 60,
              },
            ],
            id: 42024773,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Croatia',
                ty: 8,
                od: 76,
              },
            ],
            id: 42024755,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Denmark',
                ty: 8,
                od: 78,
              },
            ],
            id: 42024718,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Morocco',
                ty: 8,
                od: 79,
              },
            ],
            id: 42024731,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norway',
                ty: 8,
                od: 81,
              },
            ],
            id: 42024774,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Japan',
                ty: 8,
                od: 95,
              },
            ],
            id: 42024769,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Switzerland',
                ty: 8,
                od: 100,
              },
            ],
            id: 42024739,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Canada',
                ty: 8,
                od: 116,
              },
            ],
            id: 42024713,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serbia',
                ty: 8,
                od: 121,
              },
            ],
            id: 42024720,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chile',
                ty: 8,
                od: 126,
              },
            ],
            id: 42024748,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sweden',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024762,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colombia',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024719,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ecuador',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024715,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Egypt',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024712,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Republic of Korea',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024760,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Senegal',
                ty: 8,
                od: 151,
              },
            ],
            id: 42024765,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ukraine',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024752,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Czech Republic',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024733,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Poland',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024742,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Turkey',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024711,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Algeria',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024753,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nigeria',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024735,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ghana',
                ty: 8,
                od: 201,
              },
            ],
            id: 42024766,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria',
                ty: 8,
                od: 251,
              },
            ],
            id: 42024741,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovakia',
                ty: 8,
                od: 251,
              },
            ],
            id: 42024710,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paraguay',
                ty: 8,
                od: 251,
              },
            ],
            id: 42024717,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slovenia',
                ty: 8,
                od: 301,
              },
            ],
            id: 42024758,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tunisia',
                ty: 8,
                od: 301,
              },
            ],
            id: 42024732,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cameroon',
                ty: 8,
                od: 301,
              },
            ],
            id: 42024724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Georgia',
                ty: 8,
                od: 351,
              },
            ],
            id: 42024738,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Israel',
                ty: 8,
                od: 351,
              },
            ],
            id: 42024771,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Scotland',
                ty: 8,
                od: 401,
              },
            ],
            id: 42024740,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wales',
                ty: 8,
                od: 401,
              },
            ],
            id: 42024759,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Peru',
                ty: 8,
                od: 401,
              },
            ],
            id: 42024770,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romania',
                ty: 8,
                od: 451,
              },
            ],
            id: 42024746,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greece',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024716,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bolivia',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024721,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Venezuela',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hungary',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024734,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Iran',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024749,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Australia',
                ty: 8,
                od: 551,
              },
            ],
            id: 42024764,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'South Africa',
                ty: 8,
                od: 601,
              },
            ],
            id: 42024761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'China',
                ty: 8,
                od: 601,
              },
            ],
            id: 42024745,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panama',
                ty: 8,
                od: 901,
              },
            ],
            id: 42024768,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bulgaria',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024708,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Iceland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428417,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Finland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Northern Ireland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024767,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'San Marino',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428418,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ireland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024722,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Honduras',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024707,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jamaica',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024756,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Albania',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428419,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Costa Rica',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024754,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'DR Congo',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024736,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New Zealand',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024772,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saudi Arabia',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024750,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Qatar',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024723,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bahrain',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428420,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'United Arab Emirates',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42024726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Palestine',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428421,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bangladesh',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42428422,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 74,
    tps: [],
    lg: {
      na: 'World Cup',
      id: 17663,
      or: 3,
      lurl: 'https://static.fastbs55.com/data/79c1d2a20ce3d107f604a9683b196301.png',
      sid: 1,
      rid: 106,
      rnm: 'International',
      hot: false,
      slid: 176630000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1122398,
    bt: 1783090800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2026',
    nm: 'World Cup 2026',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.35,
              },
            ],
            id: 56207452,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 7.4,
              },
            ],
            id: 56207459,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 9,
              },
            ],
            id: 56207462,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 26,
              },
            ],
            id: 56207450,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 36,
              },
            ],
            id: 56207456,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 50,
              },
            ],
            id: 56207451,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 80,
              },
            ],
            id: 56207460,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 56207449,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 56207457,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 251,
              },
            ],
            id: 56998524,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 56207463,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56998525,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207464,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207458,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207455,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207454,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56998527,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207461,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56207453,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 1001,
              },
            ],
            id: 56998526,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1997,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 57716674,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 2.32,
              },
            ],
            id: 57716681,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 2.58,
              },
            ],
            id: 57716679,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 7,
              },
            ],
            id: 57716683,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 8.65,
              },
            ],
            id: 57716680,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 9.05,
              },
            ],
            id: 57716690,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 11.7,
              },
            ],
            id: 57716675,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 19,
              },
            ],
            id: 57716678,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 51,
              },
            ],
            id: 57716682,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 106,
              },
            ],
            id: 57716676,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 401,
              },
            ],
            id: 57716693,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 451,
              },
            ],
            id: 57716686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 57716684,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 57716685,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 601,
              },
            ],
            id: 57716688,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57716691,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top 2 Finish',
      },
      {
        mty: 1995,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 56999421,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 1.22,
              },
            ],
            id: 56999428,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 1.32,
              },
            ],
            id: 56999426,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 2.71,
              },
            ],
            id: 56999427,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 2.71,
              },
            ],
            id: 56999430,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 3.06,
              },
            ],
            id: 56999437,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 3.35,
              },
            ],
            id: 56999422,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 5.4,
              },
            ],
            id: 56999425,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 7.7,
              },
            ],
            id: 56999429,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 24,
              },
            ],
            id: 56999423,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 83,
              },
            ],
            id: 56999440,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 106,
              },
            ],
            id: 56999433,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 141,
              },
            ],
            id: 56999431,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 146,
              },
            ],
            id: 56999435,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 56999432,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 301,
              },
            ],
            id: 56999436,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 301,
              },
            ],
            id: 56999438,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 701,
              },
            ],
            id: 56999424,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top 4 Finish',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Erling Braut Haaland',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 58239505,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mohamed Salah',
                ty: 8,
                od: 17.3,
              },
            ],
            id: 58239475,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Son Heung Min',
                ty: 8,
                od: 28,
              },
            ],
            id: 58239481,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Darwin Nunez',
                ty: 8,
                od: 54,
              },
            ],
            id: 58239511,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Evan Ferguson',
                ty: 8,
                od: 55,
              },
            ],
            id: 58239515,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marcus Rashford',
                ty: 8,
                od: 65,
              },
            ],
            id: 58239482,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alexander Isak',
                ty: 8,
                od: 65,
              },
            ],
            id: 58239513,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ollie Watkins',
                ty: 8,
                od: 80,
              },
            ],
            id: 58239484,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Julian Alvarez',
                ty: 8,
                od: 80,
              },
            ],
            id: 58239510,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bukayo Saka',
                ty: 8,
                od: 81,
              },
            ],
            id: 58239504,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Callum Wilson',
                ty: 8,
                od: 101,
              },
            ],
            id: 58239473,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gabriel Jesus',
                ty: 8,
                od: 101,
              },
            ],
            id: 58239486,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Raheem Sterling',
                ty: 8,
                od: 121,
              },
            ],
            id: 58239471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Richarlison de Andrade',
                ty: 8,
                od: 121,
              },
            ],
            id: 58239490,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nicolas Jackson',
                ty: 8,
                od: 121,
              },
            ],
            id: 62337288,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Diogo Jota',
                ty: 8,
                od: 151,
              },
            ],
            id: 58239489,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Phil Foden',
                ty: 8,
                od: 151,
              },
            ],
            id: 58239492,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bryan Mbeumo',
                ty: 8,
                od: 151,
              },
            ],
            id: 58239502,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luis Diaz',
                ty: 8,
                od: 151,
              },
            ],
            id: 58239509,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kai Havertz',
                ty: 8,
                od: 201,
              },
            ],
            id: 60318379,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Taiwo Awoniyi',
                ty: 8,
                od: 201,
              },
            ],
            id: 62723999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Odsonne Edouard',
                ty: 8,
                od: 201,
              },
            ],
            id: 58239512,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cody Gakpo',
                ty: 8,
                od: 201,
              },
            ],
            id: 58239514,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Danny Welbeck',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239468,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Michail Antonio',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239470,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dominic Calvert Lewin',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239485,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jarrod Bowen',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gabriel Martinelli',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239499,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bruno Fernandes',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239503,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yoane Wissa',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239506,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Martin Odegaard',
                ty: 8,
                od: 301,
              },
            ],
            id: 58239508,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brennan Johnson',
                ty: 8,
                od: 301,
              },
            ],
            id: 62723998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dominic Solanke',
                ty: 8,
                od: 351,
              },
            ],
            id: 58239478,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Miguel Almiron',
                ty: 8,
                od: 351,
              },
            ],
            id: 58239498,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Christopher Nkunku',
                ty: 8,
                od: 351,
              },
            ],
            id: 59651749,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlton Morris',
                ty: 8,
                od: 401,
              },
            ],
            id: 58239476,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Solly March',
                ty: 8,
                od: 401,
              },
            ],
            id: 58239487,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eberechi Eze',
                ty: 8,
                od: 401,
              },
            ],
            id: 58239496,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'James Maddison',
                ty: 8,
                od: 401,
              },
            ],
            id: 62723995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joao Pedro',
                ty: 8,
                od: 401,
              },
            ],
            id: 62723996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mykhailo Mudryk',
                ty: 8,
                od: 401,
              },
            ],
            id: 62724000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pascal Gross',
                ty: 8,
                od: 451,
              },
            ],
            id: 58239488,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Raul Jimenez',
                ty: 8,
                od: 751,
              },
            ],
            id: 58239493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Said Benrahma',
                ty: 8,
                od: 751,
              },
            ],
            id: 58239495,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mason Mount',
                ty: 8,
                od: 751,
              },
            ],
            id: 58239497,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joelinton',
                ty: 8,
                od: 751,
              },
            ],
            id: 58239500,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jack Grealish',
                ty: 8,
                od: 801,
              },
            ],
            id: 58239483,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Armando Broja',
                ty: 8,
                od: 801,
              },
            ],
            id: 62723997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jay Rodriguez',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58239469,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kevin De Bruyne',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58239472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Anthony Martial',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58239480,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oliver Mcburnie',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58239494,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dwight McNeil',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58239501,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 57338548,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 1.27,
              },
            ],
            id: 57338543,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 3.31,
              },
            ],
            id: 57338533,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 3.45,
              },
            ],
            id: 57338545,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 4.11,
              },
            ],
            id: 57338541,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 4.11,
              },
            ],
            id: 57338547,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 6.75,
              },
            ],
            id: 57338544,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 7.35,
              },
            ],
            id: 57338540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 14.6,
              },
            ],
            id: 57338542,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 18.7,
              },
            ],
            id: 57338549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 30,
              },
            ],
            id: 57338532,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 61,
              },
            ],
            id: 57338534,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 136,
              },
            ],
            id: 57338538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 301,
              },
            ],
            id: 57338531,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 301,
              },
            ],
            id: 57338536,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 57338546,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 551,
              },
            ],
            id: 57338539,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57338530,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57338535,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57338537,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
      {
        mty: 1970,
        mks: [
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 2.09,
              },
            ],
            id: 57716564,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 2.94,
              },
            ],
            id: 57716559,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 57716561,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 17.3,
              },
            ],
            id: 57716549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 17.6,
              },
            ],
            id: 57716557,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 19.7,
              },
            ],
            id: 57716563,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 40,
              },
            ],
            id: 57716560,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 58,
              },
            ],
            id: 57716556,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 116,
              },
            ],
            id: 57716558,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 57716565,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 251,
              },
            ],
            id: 57716548,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 57716550,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 801,
              },
            ],
            id: 57716554,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57716547,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57716552,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57716555,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57716562,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.13,
              },
            ],
            id: 58611266,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 3.11,
              },
            ],
            id: 58611267,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Luton Town',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.28,
              },
            ],
            id: 58611735,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.35,
              },
            ],
            id: 58611736,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Sheffield United FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4,
              },
            ],
            id: 58611879,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 58611880,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Burnley FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.35,
              },
            ],
            id: 58612299,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 58612300,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - AFC Bournemouth',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.35,
              },
            ],
            id: 58612800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: -999,
              },
            ],
            id: 58612801,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Nottingham Forest',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 10,
              },
            ],
            id: 58613658,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: -999,
              },
            ],
            id: 58613659,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Fulham FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 3.05,
              },
            ],
            id: 58613965,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 58613966,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Everton FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 3.45,
              },
            ],
            id: 58614163,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.16,
              },
            ],
            id: 58614164,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Wolverhampton Wanderers FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 24,
              },
            ],
            id: 58614447,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 58614448,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Crystal Palace',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 22,
              },
            ],
            id: 58614677,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 58614678,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - Brentford FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 30,
              },
            ],
            id: 58614907,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 58614908,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - To Be Relegated - West Ham United',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 13.1,
              },
            ],
            id: 57940415,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 22,
              },
            ],
            id: 57940414,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: -999,
              },
            ],
            id: 57940413,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - Top Midlands Club',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 57939918,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 4.91,
              },
            ],
            id: 57939917,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 6.95,
              },
            ],
            id: 57939919,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - Top Newcomer',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 1.87,
              },
            ],
            id: 58141534,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 1.95,
              },
            ],
            id: 58141542,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 11,
              },
            ],
            id: 58141535,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 35,
              },
            ],
            id: 58141532,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 126,
              },
            ],
            id: 58141538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 126,
              },
            ],
            id: 58141545,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 58141536,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 201,
              },
            ],
            id: 58141540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58141533,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58141537,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58141541,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 501,
              },
            ],
            id: 58141543,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58141539,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58141544,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - Winner Without The Big Six (Man City, Liverpool, Tottenham, Chelsea, Arsenal and Man Utd)',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 2.58,
              },
            ],
            id: 57935058,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 2.66,
              },
            ],
            id: 57935056,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 9.25,
              },
            ],
            id: 57935060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 10.3,
              },
            ],
            id: 57935057,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 57935067,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 16.6,
              },
            ],
            id: 57935052,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 25,
              },
            ],
            id: 57935055,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 40,
              },
            ],
            id: 57935059,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 146,
              },
            ],
            id: 57935053,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 57935070,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 401,
              },
            ],
            id: 57935063,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 451,
              },
            ],
            id: 57935065,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 57935061,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 57935054,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 651,
              },
            ],
            id: 57935062,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 701,
              },
            ],
            id: 57935068,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 951,
              },
            ],
            id: 57935066,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57935064,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57935069,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League - w/o Manchester City - Winner',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Ederson Moraes',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 58718362,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alisson Becker',
                ty: 8,
                od: 6.2,
              },
            ],
            id: 58718365,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nick Pope',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 58718366,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'David Raya',
                ty: 8,
                od: 19.9,
              },
            ],
            id: 58718367,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Robert Sanchez',
                ty: 8,
                od: 24,
              },
            ],
            id: 58718371,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aaron Ramsdale',
                ty: 8,
                od: 30,
              },
            ],
            id: 58718364,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Damian Martinez',
                ty: 8,
                od: 40,
              },
            ],
            id: 58718369,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bernd Leno',
                ty: 8,
                od: 76,
              },
            ],
            id: 58718373,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sam Johnstone',
                ty: 8,
                od: 76,
              },
            ],
            id: 58718375,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jason Steele',
                ty: 8,
                od: 95,
              },
            ],
            id: 58718370,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jose Sa',
                ty: 8,
                od: 116,
              },
            ],
            id: 58718372,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alphonse Areola',
                ty: 8,
                od: 116,
              },
            ],
            id: 58718374,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jordan Pickford',
                ty: 8,
                od: 146,
              },
            ],
            id: 58718361,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arijanet Muric',
                ty: 8,
                od: 601,
              },
            ],
            id: 58718376,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wes Foderingham',
                ty: 8,
                od: 601,
              },
            ],
            id: 58718377,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'England Premier League  - Best Goalkeeper (Golden Glove)',
      },
    ],
    tms: 220,
    tps: [],
    lg: {
      na: 'England Premier League',
      id: 11062,
      or: 4,
      lurl: 'https://static.fastbs55.com/data/c2d952772317c94e92df7738d846acef.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: true,
      slid: 110620000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1389904,
    bt: 1716130800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England Premier League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 2.05,
              },
            ],
            id: 58300490,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 4.05,
              },
            ],
            id: 58300487,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Juventus',
                ty: 8,
                od: 5.6,
              },
            ],
            id: 58300489,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 7.05,
              },
            ],
            id: 58300486,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 35,
              },
            ],
            id: 58300488,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 42,
              },
            ],
            id: 58300477,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 67,
              },
            ],
            id: 58300491,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 67,
              },
            ],
            id: 58300480,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sassuolo Calcio',
                ty: 8,
                od: 351,
              },
            ],
            id: 58300493,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bologna FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58300483,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Torino FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58300492,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Genoa CFC',
                ty: 8,
                od: 501,
              },
            ],
            id: 58300496,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Monza',
                ty: 8,
                od: 501,
              },
            ],
            id: 58300495,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Udinese Calcio',
                ty: 8,
                od: 751,
              },
            ],
            id: 58300484,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Lecce',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300494,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Empoli FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300478,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cagliari Calcio',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300482,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Salernitana',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300479,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hellas Verona',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300481,
            ss: 0,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Frosinone Calcio',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58300485,
            ss: 0,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Italy Serie A',
      id: 11018,
      or: 5,
      lurl: 'https://static.fastbs55.com/data/dd317bc61252b327a1d03a979f161321.png',
      sid: 1,
      rid: 29,
      rnm: 'Italia',
      hot: true,
      slid: 110180000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1440270,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Italy Serie A 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 57082764,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 12,
              },
            ],
            id: 57082761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 12,
              },
            ],
            id: 57082763,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 15,
              },
            ],
            id: 57082753,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFB Stuttgart',
                ty: 8,
                od: 201,
              },
            ],
            id: 57641404,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL Wolfsburg',
                ty: 8,
                od: 201,
              },
            ],
            id: 57082752,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSG Hoffenheim',
                ty: 8,
                od: 201,
              },
            ],
            id: 57082757,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 251,
              },
            ],
            id: 57082760,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 251,
              },
            ],
            id: 57082759,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 251,
              },
            ],
            id: 57082754,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Koln',
                ty: 8,
                od: 601,
              },
            ],
            id: 57082766,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Werder Bremen',
                ty: 8,
                od: 601,
              },
            ],
            id: 57082758,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Monchengladbach',
                ty: 8,
                od: 601,
              },
            ],
            id: 57082767,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FSV Mainz',
                ty: 8,
                od: 601,
              },
            ],
            id: 57082765,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFL Bochum',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57082755,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Darmstadt 98',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57082756,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Augsburg',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57082762,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Heidenheim 1846',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57082768,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1995,
        mks: [
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 59205765,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 59205754,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 59205756,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFB Stuttgart',
                ty: 8,
                od: 8.55,
              },
            ],
            id: 59205752,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL Wolfsburg',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 59205758,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 10.3,
              },
            ],
            id: 59205750,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 59205753,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 12.6,
              },
            ],
            id: 59205764,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSG Hoffenheim',
                ty: 8,
                od: 15,
              },
            ],
            id: 59205761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Werder Bremen',
                ty: 8,
                od: 58,
              },
            ],
            id: 59205757,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Monchengladbach',
                ty: 8,
                od: 58,
              },
            ],
            id: 59205759,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Koln',
                ty: 8,
                od: 116,
              },
            ],
            id: 59205751,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FSV Mainz',
                ty: 8,
                od: 116,
              },
            ],
            id: 59205760,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Augsburg',
                ty: 8,
                od: 146,
              },
            ],
            id: 59205763,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFL Bochum',
                ty: 8,
                od: 151,
              },
            ],
            id: 59205755,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Heidenheim 1846',
                ty: 8,
                od: 201,
              },
            ],
            id: 59205766,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Darmstadt 98',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59205762,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top 4 Finish',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Harry Edward Kane',
                ty: 8,
                od: 1.3,
              },
            ],
            id: 67153454,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sehrou Guirassy',
                ty: 8,
                od: 8.1,
              },
            ],
            id: 67153430,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Victor Okoh Boniface',
                ty: 8,
                od: 22,
              },
            ],
            id: 67153450,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leroy Sane',
                ty: 8,
                od: 60,
              },
            ],
            id: 67153423,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Andrej Kramaric',
                ty: 8,
                od: 60,
              },
            ],
            id: 67153426,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Donyell Malen',
                ty: 8,
                od: 60,
              },
            ],
            id: 67153438,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Xavi Simons',
                ty: 8,
                od: 60,
              },
            ],
            id: 67153447,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lois Openda',
                ty: 8,
                od: 60,
              },
            ],
            id: 67153449,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marco Reus',
                ty: 8,
                od: 74,
              },
            ],
            id: 67153421,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Niclas Fuellkrug',
                ty: 8,
                od: 74,
              },
            ],
            id: 67153422,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Timo Werner',
                ty: 8,
                od: 74,
              },
            ],
            id: 67153425,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sebastian Haller',
                ty: 8,
                od: 74,
              },
            ],
            id: 67153429,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Benjamin Sesko',
                ty: 8,
                od: 74,
              },
            ],
            id: 67153448,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kingsley Coman',
                ty: 8,
                od: 91,
              },
            ],
            id: 67153424,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serge Gnabry',
                ty: 8,
                od: 91,
              },
            ],
            id: 67153428,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tomas Cvancara',
                ty: 8,
                od: 91,
              },
            ],
            id: 67153445,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Patrik Schick',
                ty: 8,
                od: 116,
              },
            ],
            id: 67153433,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jamal Musiala',
                ty: 8,
                od: 116,
              },
            ],
            id: 67153435,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim Adeyemi',
                ty: 8,
                od: 116,
              },
            ],
            id: 67153437,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eric Maxim Choupo-Moting',
                ty: 8,
                od: 141,
              },
            ],
            id: 67153419,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marvin Ducksch',
                ty: 8,
                od: 141,
              },
            ],
            id: 67153432,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Youssoufa Moukoko',
                ty: 8,
                od: 141,
              },
            ],
            id: 67153439,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Thomas Muller',
                ty: 8,
                od: 151,
              },
            ],
            id: 67153420,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Michael Gregoritsch',
                ty: 8,
                od: 151,
              },
            ],
            id: 67153427,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vincenzo Grifo',
                ty: 8,
                od: 151,
              },
            ],
            id: 67153434,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Florian Wirtz',
                ty: 8,
                od: 151,
              },
            ],
            id: 67153436,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Deniz Undav',
                ty: 8,
                od: 151,
              },
            ],
            id: 67153451,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alassane Plea',
                ty: 8,
                od: 251,
              },
            ],
            id: 67153431,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nathan Ngoumou',
                ty: 8,
                od: 251,
              },
            ],
            id: 67153446,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim Onisiwo',
                ty: 8,
                od: 451,
              },
            ],
            id: 67153441,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheraldo Becker',
                ty: 8,
                od: 451,
              },
            ],
            id: 67153442,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Felix Nmecha',
                ty: 8,
                od: 451,
              },
            ],
            id: 67153444,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ludovic Ajorque',
                ty: 8,
                od: 451,
              },
            ],
            id: 67153453,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marvin Pieringer',
                ty: 8,
                od: 901,
              },
            ],
            id: 67153443,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 63467694,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 2.75,
              },
            ],
            id: 63467685,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 63467683,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFB Stuttgart',
                ty: 8,
                od: 43,
              },
            ],
            id: 63467681,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL Wolfsburg',
                ty: 8,
                od: 55,
              },
            ],
            id: 63467687,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 70,
              },
            ],
            id: 63467679,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 87,
              },
            ],
            id: 63467682,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 87,
              },
            ],
            id: 63467693,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSG Hoffenheim',
                ty: 8,
                od: 106,
              },
            ],
            id: 63467690,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Werder Bremen',
                ty: 8,
                od: 251,
              },
            ],
            id: 63467686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Monchengladbach',
                ty: 8,
                od: 251,
              },
            ],
            id: 63467688,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FSV Mainz',
                ty: 8,
                od: 251,
              },
            ],
            id: 63467689,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Koln',
                ty: 8,
                od: 501,
              },
            ],
            id: 63467680,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Augsburg',
                ty: 8,
                od: 501,
              },
            ],
            id: 63467692,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFL Bochum',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63467684,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Darmstadt 98',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63467691,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Heidenheim 1846',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63467695,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Germany Bundesliga - Without Bayern Munich - Winner',
      },
    ],
    tms: 86,
    tps: [],
    lg: {
      na: 'Germany Bundesliga',
      id: 10807,
      or: 6,
      lurl: 'https://static.fastbs55.com/data/c0e1d6399440b7b740cef4b664c8cf0e.png',
      sid: 1,
      rid: 87,
      rnm: 'Germany',
      hot: true,
      slid: 108070000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1416416,
    bt: 1716039000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Germany Bundesliga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 1.85,
              },
            ],
            id: 58584043,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 2.3,
              },
            ],
            id: 58584046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 10.5,
              },
            ],
            id: 58584047,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Girona FC',
                ty: 8,
                od: 68,
              },
            ],
            id: 58584056,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Athletic Bilbao',
                ty: 8,
                od: 101,
              },
            ],
            id: 58584045,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 201,
              },
            ],
            id: 58584053,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 251,
              },
            ],
            id: 58584049,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Valencia CF',
                ty: 8,
                od: 251,
              },
            ],
            id: 58584059,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 301,
              },
            ],
            id: 58584048,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 301,
              },
            ],
            id: 58584054,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Osasuna',
                ty: 8,
                od: 501,
              },
            ],
            id: 58584055,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rayo Vallecano',
                ty: 8,
                od: 501,
              },
            ],
            id: 58584044,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celta Vigo',
                ty: 8,
                od: 501,
              },
            ],
            id: 58584050,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'UD Las Palmas',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Deportivo Alaves',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58848948,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RCD Mallorca',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584061,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Getafe CF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584051,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cadiz CF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584052,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'UD Almeria',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584058,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Granada CF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58584057,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Spain LaLiga',
      id: 10815,
      or: 7,
      lurl: 'https://static.fastbs55.com/data/411f717650726181524171feb943a3db.png',
      sid: 1,
      rid: 74,
      rnm: 'Spain',
      hot: true,
      slid: 108150000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1444133,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Spain LaLiga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 58302727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 13,
              },
            ],
            id: 58302720,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Monaco FC',
                ty: 8,
                od: 19,
              },
            ],
            id: 58302728,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'OGC Nice',
                ty: 8,
                od: 20,
              },
            ],
            id: 58302725,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 38,
              },
            ],
            id: 58302716,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 76,
              },
            ],
            id: 58302712,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 151,
              },
            ],
            id: 58302714,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Strasbourg Alsace',
                ty: 8,
                od: 151,
              },
            ],
            id: 58302713,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Lyonnais',
                ty: 8,
                od: 151,
              },
            ],
            id: 58302721,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Brest 29',
                ty: 8,
                od: 251,
              },
            ],
            id: 58302718,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Reims',
                ty: 8,
                od: 251,
              },
            ],
            id: 58302723,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 351,
              },
            ],
            id: 58302715,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montpellier HSC',
                ty: 8,
                od: 551,
              },
            ],
            id: 58302724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nantes',
                ty: 8,
                od: 601,
              },
            ],
            id: 58302722,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lorient',
                ty: 8,
                od: 651,
              },
            ],
            id: 58302711,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Clermont Foot',
                ty: 8,
                od: 651,
              },
            ],
            id: 58302726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Metz',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58302719,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Le Havre AC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58302717,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Kylian Mbappe',
                ty: 8,
                od: 1.48,
              },
            ],
            id: 63436707,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wissam Ben Yedder',
                ty: 8,
                od: 22,
              },
            ],
            id: 63436705,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jonathan David',
                ty: 8,
                od: 22,
              },
            ],
            id: 63436720,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alexandre Lacazette',
                ty: 8,
                od: 73,
              },
            ],
            id: 63436703,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Terem Moffi',
                ty: 8,
                od: 73,
              },
            ],
            id: 63436722,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Elye Wahi',
                ty: 8,
                od: 73,
              },
            ],
            id: 63436734,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marco Asensio',
                ty: 8,
                od: 73,
              },
            ],
            id: 63436747,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Habib Diallo',
                ty: 8,
                od: 87,
              },
            ],
            id: 63436709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Martin Terrier',
                ty: 8,
                od: 87,
              },
            ],
            id: 63436716,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Amine Gouiri',
                ty: 8,
                od: 87,
              },
            ],
            id: 63436718,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arnaud Kalimuendo',
                ty: 8,
                od: 87,
              },
            ],
            id: 63436741,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mohamed Bayo',
                ty: 8,
                od: 111,
              },
            ],
            id: 63436724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gaetan Laborde',
                ty: 8,
                od: 116,
              },
            ],
            id: 63436708,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Florian Sotoca',
                ty: 8,
                od: 116,
              },
            ],
            id: 63436713,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Myron Boadu',
                ty: 8,
                od: 116,
              },
            ],
            id: 63436723,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pierre Emerick Aubameyang',
                ty: 8,
                od: 116,
              },
            ],
            id: 63436742,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Takumi Minamino',
                ty: 8,
                od: 141,
              },
            ],
            id: 63436729,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hugo Ekitike',
                ty: 8,
                od: 141,
              },
            ],
            id: 63436730,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bamba Dieng',
                ty: 8,
                od: 141,
              },
            ],
            id: 63436736,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Edon Zhegrova',
                ty: 8,
                od: 141,
              },
            ],
            id: 63436737,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lee Kang In',
                ty: 8,
                od: 141,
              },
            ],
            id: 63436746,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wesley Said',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436717,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rayan Cherki',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436721,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romain Faivre',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jeffinho',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436738,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eliesse Ben Seghir',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436739,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ibrahima Kone',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436743,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Zakaria Aboukhlal',
                ty: 8,
                od: 151,
              },
            ],
            id: 63436749,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dimitri Payet',
                ty: 8,
                od: 251,
              },
            ],
            id: 63436704,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Remy Cabella',
                ty: 8,
                od: 251,
              },
            ],
            id: 63436706,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aleksandr Golovin',
                ty: 8,
                od: 251,
              },
            ],
            id: 63436715,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jeremie Boga',
                ty: 8,
                od: 251,
              },
            ],
            id: 63436744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Steve Mounie',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436710,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grejohn Kyei',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436714,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Teji Savanier',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mostafa Mohamed',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436732,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Emanuel Emegha',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436740,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Enzo Le Fee',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436745,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fabian Ruiz',
                ty: 8,
                od: 351,
              },
            ],
            id: 63436748,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Junya Ito',
                ty: 8,
                od: 451,
              },
            ],
            id: 63436735,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Clermont Foot',
                ty: 8,
                od: 1.4,
              },
            ],
            id: 60773166,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Metz',
                ty: 8,
                od: 2,
              },
            ],
            id: 60773152,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Le Havre AC',
                ty: 8,
                od: 2,
              },
            ],
            id: 60773163,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lorient',
                ty: 8,
                od: 2.85,
              },
            ],
            id: 60773160,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montpellier HSC',
                ty: 8,
                od: 3.27,
              },
            ],
            id: 60773161,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nantes',
                ty: 8,
                od: 3.92,
              },
            ],
            id: 60773154,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Brest 29',
                ty: 8,
                od: 4.85,
              },
            ],
            id: 60773164,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 9.25,
              },
            ],
            id: 60773150,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Reims',
                ty: 8,
                od: 12.9,
              },
            ],
            id: 60773165,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 16,
              },
            ],
            id: 60773151,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Lyonnais',
                ty: 8,
                od: 19.3,
              },
            ],
            id: 60773155,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Strasbourg Alsace',
                ty: 8,
                od: 19.6,
              },
            ],
            id: 60773153,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 76,
              },
            ],
            id: 60773158,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 116,
              },
            ],
            id: 60773149,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'OGC Nice',
                ty: 8,
                od: 301,
              },
            ],
            id: 60773162,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 351,
              },
            ],
            id: 60773157,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Monaco FC',
                ty: 8,
                od: 351,
              },
            ],
            id: 60773159,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773156,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 3.45,
              },
            ],
            id: 60581001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Monaco FC',
                ty: 8,
                od: 4.54,
              },
            ],
            id: 60581003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'OGC Nice',
                ty: 8,
                od: 4.81,
              },
            ],
            id: 60581006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 60580994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 60581002,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 20,
              },
            ],
            id: 60580996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Reims',
                ty: 8,
                od: 32,
              },
            ],
            id: 60581009,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Strasbourg Alsace',
                ty: 8,
                od: 41,
              },
            ],
            id: 60580998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Lyonnais',
                ty: 8,
                od: 60,
              },
            ],
            id: 60581000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 68,
              },
            ],
            id: 60580995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Brest 29',
                ty: 8,
                od: 141,
              },
            ],
            id: 60581008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montpellier HSC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60581005,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nantes',
                ty: 8,
                od: 201,
              },
            ],
            id: 60580999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Metz',
                ty: 8,
                od: 501,
              },
            ],
            id: 60580997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lorient',
                ty: 8,
                od: 501,
              },
            ],
            id: 60581004,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Clermont Foot',
                ty: 8,
                od: 701,
              },
            ],
            id: 60581010,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Le Havre AC',
                ty: 8,
                od: 751,
              },
            ],
            id: 60581007,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'France Ligue 1 - Without Paris Saint Germain - Winner',
      },
    ],
    tms: 93,
    tps: [],
    lg: {
      na: 'France Ligue 1',
      id: 10983,
      or: 8,
      lurl: 'https://static.fastbs55.com/data/9aeb33a857aa7469998179045473c1a.png',
      sid: 1,
      rid: 44,
      rnm: 'France',
      hot: true,
      slid: 109830000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1440843,
    bt: 1716055200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'France Ligue 1 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 2.99,
              },
            ],
            id: 58143041,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 6.1,
              },
            ],
            id: 58143047,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 9,
              },
            ],
            id: 58143043,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 9.35,
              },
            ],
            id: 58143058,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 11,
              },
            ],
            id: 58143067,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 15.2,
              },
            ],
            id: 58143057,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 28,
              },
            ],
            id: 58143059,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 30,
              },
            ],
            id: 58143037,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 31,
              },
            ],
            id: 58143042,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 36,
              },
            ],
            id: 58143045,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 38,
              },
            ],
            id: 58143040,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 56,
              },
            ],
            id: 58143060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 57,
              },
            ],
            id: 58143056,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 73,
              },
            ],
            id: 58143055,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 100,
              },
            ],
            id: 58143048,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 106,
              },
            ],
            id: 58143049,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 111,
              },
            ],
            id: 58143046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 116,
              },
            ],
            id: 58143064,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 116,
              },
            ],
            id: 58143066,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 151,
              },
            ],
            id: 58143061,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 151,
              },
            ],
            id: 58143051,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 151,
              },
            ],
            id: 58143068,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 151,
              },
            ],
            id: 58143038,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 201,
              },
            ],
            id: 58143039,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 251,
              },
            ],
            id: 58168709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 301,
              },
            ],
            id: 58143044,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 601,
              },
            ],
            id: 58143065,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 601,
              },
            ],
            id: 58143062,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 601,
              },
            ],
            id: 58143053,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 651,
              },
            ],
            id: 67627027,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 801,
              },
            ],
            id: 58168719,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 951,
              },
            ],
            id: 58168710,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Erling Braut Haaland',
                ty: 8,
                od: 3.54,
              },
            ],
            id: 67634227,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Harry Kane',
                ty: 8,
                od: 5.8,
              },
            ],
            id: 67634217,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kylian Mbappe',
                ty: 8,
                od: 6.7,
              },
            ],
            id: 67634220,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Robert Lewandowski',
                ty: 8,
                od: 16.4,
              },
            ],
            id: 67634213,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joao Felix',
                ty: 8,
                od: 27,
              },
            ],
            id: 70349833,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Julian Alvarez',
                ty: 8,
                od: 30,
              },
            ],
            id: 67634231,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gabriel Jesus',
                ty: 8,
                od: 35,
              },
            ],
            id: 67634221,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jude Bellingham',
                ty: 8,
                od: 44,
              },
            ],
            id: 67634229,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Goncalo Ramos',
                ty: 8,
                od: 47,
              },
            ],
            id: 67634232,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Victor Osimhen',
                ty: 8,
                od: 52,
              },
            ],
            id: 67634226,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bukayo Saka',
                ty: 8,
                od: 55,
              },
            ],
            id: 70002534,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vinicius Junior',
                ty: 8,
                od: 58,
              },
            ],
            id: 67634230,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marcus Rashford',
                ty: 8,
                od: 65,
              },
            ],
            id: 68204720,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serge Gnabry',
                ty: 8,
                od: 73,
              },
            ],
            id: 69992572,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Martin Odegaard',
                ty: 8,
                od: 73,
              },
            ],
            id: 70002542,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bruno Fernandes',
                ty: 8,
                od: 83,
              },
            ],
            id: 69992570,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rasmus Winther Hojlund',
                ty: 8,
                od: 83,
              },
            ],
            id: 70002544,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lautaro Martinez',
                ty: 8,
                od: 87,
              },
            ],
            id: 67634224,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rodrygo Silva de Goes',
                ty: 8,
                od: 91,
              },
            ],
            id: 67634228,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jose Luis Sanmartin Mato',
                ty: 8,
                od: 101,
              },
            ],
            id: 70002547,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olivier Giroud',
                ty: 8,
                od: 111,
              },
            ],
            id: 67634214,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jamal Musiala',
                ty: 8,
                od: 111,
              },
            ],
            id: 69992577,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Antoine Griezmann',
                ty: 8,
                od: 116,
              },
            ],
            id: 67634215,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ciro Immobile',
                ty: 8,
                od: 116,
              },
            ],
            id: 69995804,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marco Asensio',
                ty: 8,
                od: 116,
              },
            ],
            id: 69995806,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alexander Isak',
                ty: 8,
                od: 121,
              },
            ],
            id: 70002533,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rafael Leao',
                ty: 8,
                od: 131,
              },
            ],
            id: 69992574,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eddie Nketiah',
                ty: 8,
                od: 131,
              },
            ],
            id: 70002540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Thomas Muller',
                ty: 8,
                od: 136,
              },
            ],
            id: 69992564,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leroy Sane',
                ty: 8,
                od: 136,
              },
            ],
            id: 69992567,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lois Openda',
                ty: 8,
                od: 136,
              },
            ],
            id: 69992826,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Callum Wilson',
                ty: 8,
                od: 136,
              },
            ],
            id: 70002538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Memphis Depay',
                ty: 8,
                od: 141,
              },
            ],
            id: 67634218,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sebastien Haller',
                ty: 8,
                od: 141,
              },
            ],
            id: 69992571,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kai Havertz',
                ty: 8,
                od: 141,
              },
            ],
            id: 67634225,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mehdi Taremi',
                ty: 8,
                od: 141,
              },
            ],
            id: 69992580,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gabriel Martinelli',
                ty: 8,
                od: 141,
              },
            ],
            id: 70002539,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Phil Foden',
                ty: 8,
                od: 146,
              },
            ],
            id: 69992573,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eric Maxim Choupo-Moting',
                ty: 8,
                od: 151,
              },
            ],
            id: 69992566,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ousmane Dembele',
                ty: 8,
                od: 151,
              },
            ],
            id: 69995805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ilkay Gundogan',
                ty: 8,
                od: 151,
              },
            ],
            id: 69992569,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Timo Werner',
                ty: 8,
                od: 151,
              },
            ],
            id: 67634222,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marcus Thuram',
                ty: 8,
                od: 151,
              },
            ],
            id: 69995808,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jack Grealish',
                ty: 8,
                od: 151,
              },
            ],
            id: 69992576,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim Adeyemi',
                ty: 8,
                od: 151,
              },
            ],
            id: 69992578,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Noah Okafor',
                ty: 8,
                od: 151,
              },
            ],
            id: 70002535,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Benjamin Sesko',
                ty: 8,
                od: 151,
              },
            ],
            id: 69992579,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Khvicha Kvaratskhelia',
                ty: 8,
                od: 151,
              },
            ],
            id: 67634233,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jeremy Doku',
                ty: 8,
                od: 151,
              },
            ],
            id: 70002545,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marko Arnautovic',
                ty: 8,
                od: 201,
              },
            ],
            id: 70002530,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mauro Icardi',
                ty: 8,
                od: 201,
              },
            ],
            id: 69992568,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arthur Mendonca Cabral',
                ty: 8,
                od: 201,
              },
            ],
            id: 70002532,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Youssef En-Nesyri',
                ty: 8,
                od: 201,
              },
            ],
            id: 69992575,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sepe Elye Wahi',
                ty: 8,
                od: 201,
              },
            ],
            id: 70002543,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Santiago Gimenez',
                ty: 8,
                od: 251,
              },
            ],
            id: 70002541,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luuk de Jong',
                ty: 8,
                od: 301,
              },
            ],
            id: 69992565,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Abel Ruiz',
                ty: 8,
                od: 301,
              },
            ],
            id: 70002546,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wilfried Zaha',
                ty: 8,
                od: 351,
              },
            ],
            id: 70002531,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joelinton Cassio Apolinario de Lira',
                ty: 8,
                od: 351,
              },
            ],
            id: 69995807,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kyogo Furuhashi',
                ty: 8,
                od: 351,
              },
            ],
            id: 70002536,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Daizen Maeda',
                ty: 8,
                od: 351,
              },
            ],
            id: 70002537,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
      {
        mty: 1988,
        mks: [
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 1.23,
              },
            ],
            id: 67626695,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 4.5,
              },
            ],
            id: 67626696,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 19.2,
              },
            ],
            id: 67626694,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 59,
              },
            ],
            id: 67626697,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Winner',
      },
      {
        mty: 1980,
        mks: [
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67637670,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 1.37,
              },
            ],
            id: 67637671,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 4.28,
              },
            ],
            id: 67637669,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 8.05,
              },
            ],
            id: 67637672,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Top 2',
      },
      {
        mty: 1987,
        mks: [
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 1.28,
              },
            ],
            id: 67627239,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 7.9,
              },
            ],
            id: 67627242,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 8.55,
              },
            ],
            id: 67627241,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 13.4,
              },
            ],
            id: 67627240,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Winner',
      },
      {
        mty: 1979,
        mks: [
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 67637744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 67637746,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 67637747,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 3.33,
              },
            ],
            id: 67637745,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Top 2',
      },
      {
        mty: 1986,
        mks: [
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 1.49,
              },
            ],
            id: 67627439,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 2.81,
              },
            ],
            id: 67627441,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 23,
              },
            ],
            id: 67627442,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 30,
              },
            ],
            id: 67627440,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Winner',
      },
      {
        mty: 1978,
        mks: [
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 1.02,
              },
            ],
            id: 67637910,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 67637912,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 5.6,
              },
            ],
            id: 67637913,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 67637911,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Top 2',
      },
      {
        mty: 1985,
        mks: [
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 1.86,
              },
            ],
            id: 67627912,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 5.25,
              },
            ],
            id: 67627914,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 5.25,
              },
            ],
            id: 67627915,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 5.3,
              },
            ],
            id: 67627913,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Winner',
      },
      {
        mty: 1977,
        mks: [
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 1.18,
              },
            ],
            id: 67638050,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 2.33,
              },
            ],
            id: 67638052,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 67638051,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 2.42,
              },
            ],
            id: 67638053,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Top 2',
      },
      {
        mty: 1984,
        mks: [
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 1.6,
              },
            ],
            id: 67628064,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 4.68,
              },
            ],
            id: 67628061,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 4.95,
              },
            ],
            id: 67628063,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 16.1,
              },
            ],
            id: 67628062,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Winner',
      },
      {
        mty: 1976,
        mks: [
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 1.19,
              },
            ],
            id: 67638270,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 1.8,
              },
            ],
            id: 67638267,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 1.8,
              },
            ],
            id: 67638269,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 6.3,
              },
            ],
            id: 67638268,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Top 2',
      },
      {
        mty: 1983,
        mks: [
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 1.66,
              },
            ],
            id: 67628113,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 4,
              },
            ],
            id: 67628115,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 6.9,
              },
            ],
            id: 67628112,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 67628114,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Winner',
      },
      {
        mty: 1975,
        mks: [
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 1.19,
              },
            ],
            id: 67638338,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 1.72,
              },
            ],
            id: 67638340,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 2.85,
              },
            ],
            id: 67638337,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 67638339,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Top 2',
      },
      {
        mty: 1982,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 67628340,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 7.65,
              },
            ],
            id: 67628341,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 121,
              },
            ],
            id: 67628338,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 141,
              },
            ],
            id: 67628339,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Winner',
      },
      {
        mty: 1974,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67638429,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 1.08,
              },
            ],
            id: 67638430,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 67638427,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 67638428,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Top 2',
      },
      {
        mty: 1981,
        mks: [
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 1.26,
              },
            ],
            id: 67628368,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 4.04,
              },
            ],
            id: 67628370,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 32,
              },
            ],
            id: 67628369,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 34,
              },
            ],
            id: 67628371,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Winner',
      },
      {
        mty: 1973,
        mks: [
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67638725,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 1.09,
              },
            ],
            id: 67638727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 10.9,
              },
            ],
            id: 67638726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 10.9,
              },
            ],
            id: 67638728,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Top 2',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'England',
                ty: 8,
                od: 1.87,
              },
            ],
            id: 67642697,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spain',
                ty: 8,
                od: 4.16,
              },
            ],
            id: 67642695,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Germany',
                ty: 8,
                od: 4.95,
              },
            ],
            id: 67642699,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Italy',
                ty: 8,
                od: 10.1,
              },
            ],
            id: 67642698,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'France',
                ty: 8,
                od: 14.3,
              },
            ],
            id: 67642692,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portugal',
                ty: 8,
                od: 40,
              },
            ],
            id: 67642702,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Netherlands',
                ty: 8,
                od: 80,
              },
            ],
            id: 67642693,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria',
                ty: 8,
                od: 201,
              },
            ],
            id: 67642706,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Turkey',
                ty: 8,
                od: 251,
              },
            ],
            id: 67642703,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Scotland',
                ty: 8,
                od: 451,
              },
            ],
            id: 67642696,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Serbia',
                ty: 8,
                od: 501,
              },
            ],
            id: 67642705,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ukraine',
                ty: 8,
                od: 551,
              },
            ],
            id: 67642694,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Belgium',
                ty: 8,
                od: 601,
              },
            ],
            id: 67642701,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Switzerland',
                ty: 8,
                od: 701,
              },
            ],
            id: 67642704,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Denmark',
                ty: 8,
                od: 901,
              },
            ],
            id: 67642700,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Winning Nation',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67645835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 14.4,
              },
            ],
            id: 67645836,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group A - Bayern Munich',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.39,
              },
            ],
            id: 67645906,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.63,
              },
            ],
            id: 67645907,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group A - Manchester United FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 67646068,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 67646069,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group A - FC Copenhagen',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 3.75,
              },
            ],
            id: 67648206,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 67648207,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group A - Galatasaray SK',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 67648340,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 8.4,
              },
            ],
            id: 67648341,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group B - Arsenal FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.29,
              },
            ],
            id: 67648375,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 67648376,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group B - Sevilla FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 3.05,
              },
            ],
            id: 67651538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.31,
              },
            ],
            id: 67651539,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group B - PSV Eindhoven',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.15,
              },
            ],
            id: 67651598,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.57,
              },
            ],
            id: 67651599,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group B - RC Lens',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.02,
              },
            ],
            id: 67651709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 67651710,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group C - Real Madrid',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.12,
              },
            ],
            id: 67652140,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 5,
              },
            ],
            id: 67652141,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group C - SSC Napoli',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.62,
              },
            ],
            id: 67652529,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 67652530,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group C - Union Berlin',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 14.4,
              },
            ],
            id: 67652540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67652541,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group C - SC Braga',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 67652549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 4.04,
              },
            ],
            id: 67652550,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group D - Inter Milan',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.32,
              },
            ],
            id: 67652692,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.48,
              },
            ],
            id: 67652693,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group D - SL Benfica',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.22,
              },
            ],
            id: 67653143,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 67653144,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group D - Real Sociedad',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.19,
              },
            ],
            id: 67653277,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 67653278,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group D - FC Salzburg',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 67653312,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 4.04,
              },
            ],
            id: 67653313,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group E - Atletico Madrid',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.69,
              },
            ],
            id: 67653323,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.97,
              },
            ],
            id: 67653324,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group E - Lazio',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.57,
              },
            ],
            id: 67653542,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.27,
              },
            ],
            id: 67653543,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group E - Feyenoord',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 6.75,
              },
            ],
            id: 67653597,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 67653598,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group E - Celtic Glasgow',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 67655775,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 4.3,
              },
            ],
            id: 67655776,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group F - Paris Saint Germain',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.63,
              },
            ],
            id: 67655811,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.11,
              },
            ],
            id: 67655812,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group F - Newcastle United FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.71,
              },
            ],
            id: 67655854,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.38,
              },
            ],
            id: 67655855,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group F - AC Milan',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.88,
              },
            ],
            id: 67655914,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.35,
              },
            ],
            id: 67655915,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group F - Borussia Dortmund',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67655930,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 22,
              },
            ],
            id: 67655931,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group G - Manchester City FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 67655973,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 7.75,
              },
            ],
            id: 67655974,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group G - RB Leipzig',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 12.6,
              },
            ],
            id: 67656049,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67656050,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group G - FK Crvena Zvezda Belgrade',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 12.6,
              },
            ],
            id: 67656122,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67656123,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group G - Young Boys Bern',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67656147,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 12.6,
              },
            ],
            id: 67656148,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group H - FC Barcelona',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 67656163,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 6.7,
              },
            ],
            id: 67656164,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group H - FC Porto',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 10.6,
              },
            ],
            id: 67656173,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67656174,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group H - FC Shakhtar Donetsk',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 10.6,
              },
            ],
            id: 67656210,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67656211,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Qualify from Group H - Royal Antwerp FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 2,
              },
            ],
            id: 67658786,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 3.41,
              },
            ],
            id: 67658765,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 4.45,
              },
            ],
            id: 67658762,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 5.35,
              },
            ],
            id: 67658759,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 6,
              },
            ],
            id: 67658763,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 6.7,
              },
            ],
            id: 67658768,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 10.1,
              },
            ],
            id: 67658777,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 67658787,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 12.2,
              },
            ],
            id: 67658766,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 12.5,
              },
            ],
            id: 67658776,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 13.2,
              },
            ],
            id: 67658784,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 21,
              },
            ],
            id: 67658764,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 21,
              },
            ],
            id: 67658780,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 21,
              },
            ],
            id: 67658788,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 25,
              },
            ],
            id: 67658770,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 26,
              },
            ],
            id: 67658773,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 33,
              },
            ],
            id: 67658783,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 35,
              },
            ],
            id: 67658761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 40,
              },
            ],
            id: 67658779,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 44,
              },
            ],
            id: 67658775,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 51,
              },
            ],
            id: 67658790,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 52,
              },
            ],
            id: 67658769,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 52,
              },
            ],
            id: 67658778,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 71,
              },
            ],
            id: 67658760,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 71,
              },
            ],
            id: 67658782,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 83,
              },
            ],
            id: 67658785,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 100,
              },
            ],
            id: 67658774,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 126,
              },
            ],
            id: 67658772,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 151,
              },
            ],
            id: 67658767,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 67658789,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 201,
              },
            ],
            id: 67658781,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 251,
              },
            ],
            id: 67658771,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - To Reach the Final',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Group G',
                ty: 8,
                od: 2.83,
              },
            ],
            id: 67639994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group A',
                ty: 8,
                od: 4.87,
              },
            ],
            id: 67639988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group C',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 67639990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group B',
                ty: 8,
                od: 7.75,
              },
            ],
            id: 67639989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group F',
                ty: 8,
                od: 7.75,
              },
            ],
            id: 67639993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group H',
                ty: 8,
                od: 9.3,
              },
            ],
            id: 67639995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group D',
                ty: 8,
                od: 14.6,
              },
            ],
            id: 67639991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Group E',
                ty: 8,
                od: 21,
              },
            ],
            id: 67639992,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Winning Group',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1.3,
              },
            ],
            id: 67645428,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 3.75,
              },
            ],
            id: 67645425,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 12.2,
              },
            ],
            id: 67645426,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 12.2,
              },
            ],
            id: 67645427,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Top English Team',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.16,
              },
            ],
            id: 68423360,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.18,
              },
            ],
            id: 68423359,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Both Teams Of Final Game From England Premier League',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 1.45,
              },
            ],
            id: 68312324,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 3.7,
              },
            ],
            id: 68312322,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 5.6,
              },
            ],
            id: 68312323,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 15.1,
              },
            ],
            id: 68312325,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group A - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 2.7,
              },
            ],
            id: 68312451,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 3.2,
              },
            ],
            id: 68312450,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 3.83,
              },
            ],
            id: 68312448,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 3.83,
              },
            ],
            id: 68312449,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group B - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 1.51,
              },
            ],
            id: 68312510,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 2.58,
              },
            ],
            id: 68312508,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 68312511,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 21,
              },
            ],
            id: 68312509,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group C - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 2.75,
              },
            ],
            id: 68312654,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 2.75,
              },
            ],
            id: 68312657,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 3.91,
              },
            ],
            id: 68312656,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 4.5,
              },
            ],
            id: 68312655,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group D - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 68312979,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 2.75,
              },
            ],
            id: 68312982,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 3,
              },
            ],
            id: 68312981,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 68312980,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group E - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 2.62,
              },
            ],
            id: 68313106,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 2.75,
              },
            ],
            id: 68313104,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 3.33,
              },
            ],
            id: 68313103,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 6.55,
              },
            ],
            id: 68313105,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group F - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68313416,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 7.25,
              },
            ],
            id: 68313415,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 83,
              },
            ],
            id: 68313413,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 83,
              },
            ],
            id: 68313414,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group G - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 1.57,
              },
            ],
            id: 68313542,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 3,
              },
            ],
            id: 68313540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 7.75,
              },
            ],
            id: 68313543,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 9.75,
              },
            ],
            id: 68313541,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group H - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 68308621,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Galatasaray SK',
                ty: 8,
                od: 3.83,
              },
            ],
            id: 68308618,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 31,
              },
            ],
            id: 68308620,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 501,
              },
            ],
            id: 68308619,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group A - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'PSV Eindhoven',
                ty: 8,
                od: 2.04,
              },
            ],
            id: 68308834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 2.54,
              },
            ],
            id: 68308835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 3.25,
              },
            ],
            id: 68308836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 68308833,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group B - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'SC Braga',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 68309015,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 3.16,
              },
            ],
            id: 68309017,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 83,
              },
            ],
            id: 68309016,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 401,
              },
            ],
            id: 68309014,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group C - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 1.95,
              },
            ],
            id: 68309058,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SL Benfica',
                ty: 8,
                od: 2.54,
              },
            ],
            id: 68309059,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 4.16,
              },
            ],
            id: 68309060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 17,
              },
            ],
            id: 68309057,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group D - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 1.19,
              },
            ],
            id: 68309610,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feyenoord',
                ty: 8,
                od: 4.95,
              },
            ],
            id: 68309611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 7,
              },
            ],
            id: 68309609,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 51,
              },
            ],
            id: 68309612,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group E - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 1.44,
              },
            ],
            id: 68309891,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 3.45,
              },
            ],
            id: 68309889,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 5.35,
              },
            ],
            id: 68309892,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 35,
              },
            ],
            id: 68309890,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group F - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FK Crvena Zvezda Belgrade',
                ty: 8,
                od: 1.64,
              },
            ],
            id: 68310074,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Young Boys Bern',
                ty: 8,
                od: 1.7,
              },
            ],
            id: 68310075,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 951,
              },
            ],
            id: 68310077,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 68310076,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group G - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Shakhtar Donetsk',
                ty: 8,
                od: 1.53,
              },
            ],
            id: 68310198,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal Antwerp FC',
                ty: 8,
                od: 2,
              },
            ],
            id: 68310200,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Porto',
                ty: 8,
                od: 24,
              },
            ],
            id: 68310199,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 251,
              },
            ],
            id: 68310197,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - Group H - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.09,
              },
            ],
            id: 68311405,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 3.5,
              },
            ],
            id: 68311404,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Champions League - First Time Winner',
      },
    ],
    tms: 348,
    tps: [],
    lg: {
      na: 'UEFA Champions League',
      id: 11140,
      or: 9,
      lurl: 'https://static.fastbs55.com/data/1a023bd4e288fcceb6ee2d39eb4c54e8.png',
      sid: 1,
      rid: 309,
      rnm: 'Europe',
      hot: true,
      slid: 111400000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1437101,
    bt: 1717268400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'UEFA Champions League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 4.59,
              },
            ],
            id: 67624123,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 6.75,
              },
            ],
            id: 67624100,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 9.7,
              },
            ],
            id: 67624114,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AZ Alkmaar',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 67624116,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 67624111,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Club Brugge',
                ty: 8,
                od: 18.5,
              },
            ],
            id: 67624103,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fenerbahce',
                ty: 8,
                od: 20,
              },
            ],
            id: 67624113,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Besiktas JK',
                ty: 8,
                od: 22,
              },
            ],
            id: 67624102,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KAA Gent',
                ty: 8,
                od: 30,
              },
            ],
            id: 67624124,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624109,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PAOK Thessaloniki',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624110,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624125,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KRC Genk',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624107,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624119,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFC Ludogorets 1945 Razgrad',
                ty: 8,
                od: 33,
              },
            ],
            id: 67624112,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624101,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Astana',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624120,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624118,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Legia Warszawa',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624126,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624097,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 121,
              },
            ],
            id: 67624127,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Tel Aviv FC',
                ty: 8,
                od: 141,
              },
            ],
            id: 67624104,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lugano',
                ty: 8,
                od: 146,
              },
            ],
            id: 67624122,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 151,
              },
            ],
            id: 67624108,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Cukaricki Belgrade',
                ty: 8,
                od: 151,
              },
            ],
            id: 67624096,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olimpija Ljubljana',
                ty: 8,
                od: 151,
              },
            ],
            id: 67624106,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HJK Helsinki',
                ty: 8,
                od: 151,
              },
            ],
            id: 67624098,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Zorya Lugansk',
                ty: 8,
                od: 151,
              },
            ],
            id: 67624121,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Breidablik Kopavogur',
                ty: 8,
                od: 201,
              },
            ],
            id: 67624115,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KI Klaksvik',
                ty: 8,
                od: 351,
              },
            ],
            id: 67624117,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HSK Zrinjski Mostar',
                ty: 8,
                od: 351,
              },
            ],
            id: 67624099,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KF Ballkani',
                ty: 8,
                od: 351,
              },
            ],
            id: 67624105,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1988,
        mks: [
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 67685336,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 10.1,
              },
            ],
            id: 67685335,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olimpija Ljubljana',
                ty: 8,
                od: 29,
              },
            ],
            id: 67685334,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KI Klaksvik',
                ty: 8,
                od: 58,
              },
            ],
            id: 67685333,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Winner',
      },
      {
        mty: 1980,
        mks: [
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68320593,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 1.34,
              },
            ],
            id: 68320592,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olimpija Ljubljana',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 68320591,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KI Klaksvik',
                ty: 8,
                od: 7.4,
              },
            ],
            id: 68320590,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Top 2',
      },
      {
        mty: 1987,
        mks: [
          {
            op: [
              {
                nm: 'KAA Gent',
                ty: 8,
                od: 1.51,
              },
            ],
            id: 67685387,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Tel Aviv FC',
                ty: 8,
                od: 3,
              },
            ],
            id: 67685388,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Zorya Lugansk',
                ty: 8,
                od: 12,
              },
            ],
            id: 67685389,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Breidablik Kopavogur',
                ty: 8,
                od: 37,
              },
            ],
            id: 67685386,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Winner',
      },
      {
        mty: 1979,
        mks: [
          {
            op: [
              {
                nm: 'Maccabi Tel Aviv FC',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 68320781,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Zorya Lugansk',
                ty: 8,
                od: 4.81,
              },
            ],
            id: 68320782,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Breidablik Kopavogur',
                ty: 8,
                od: 15.1,
              },
            ],
            id: 68320779,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KAA Gent',
                ty: 8,
                od: -999,
              },
            ],
            id: 68320780,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Top 2',
      },
      {
        mty: 1986,
        mks: [
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 1.79,
              },
            ],
            id: 67685464,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 2.22,
              },
            ],
            id: 67685462,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Astana',
                ty: 8,
                od: 19.6,
              },
            ],
            id: 67685463,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KF Ballkani',
                ty: 8,
                od: 23,
              },
            ],
            id: 67685465,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Winner',
      },
      {
        mty: 1978,
        mks: [
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68320957,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68320955,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Astana',
                ty: 8,
                od: 7.9,
              },
            ],
            id: 68320956,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KF Ballkani',
                ty: 8,
                od: 10,
              },
            ],
            id: 68320958,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Top 2',
      },
      {
        mty: 1985,
        mks: [
          {
            op: [
              {
                nm: 'Besiktas JK',
                ty: 8,
                od: 2,
              },
            ],
            id: 67685496,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Club Brugge',
                ty: 8,
                od: 2.86,
              },
            ],
            id: 67685494,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 4.59,
              },
            ],
            id: 67685493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lugano',
                ty: 8,
                od: 26,
              },
            ],
            id: 67685495,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Winner',
      },
      {
        mty: 1977,
        mks: [
          {
            op: [
              {
                nm: 'Besiktas JK',
                ty: 8,
                od: 1.11,
              },
            ],
            id: 68321046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Club Brugge',
                ty: 8,
                od: 1.37,
              },
            ],
            id: 68321044,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 2.04,
              },
            ],
            id: 68321043,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lugano',
                ty: 8,
                od: 11.2,
              },
            ],
            id: 68321045,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Top 2',
      },
      {
        mty: 1984,
        mks: [
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 1.46,
              },
            ],
            id: 67685522,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Legia Warszawa',
                ty: 8,
                od: 5.35,
              },
            ],
            id: 67685521,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AZ Alkmaar',
                ty: 8,
                od: 5.35,
              },
            ],
            id: 67685523,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HSK Zrinjski Mostar',
                ty: 8,
                od: 22,
              },
            ],
            id: 67685524,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Winner',
      },
      {
        mty: 1976,
        mks: [
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 68321263,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Legia Warszawa',
                ty: 8,
                od: 1.83,
              },
            ],
            id: 68321262,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AZ Alkmaar',
                ty: 8,
                od: 1.83,
              },
            ],
            id: 68321264,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HSK Zrinjski Mostar',
                ty: 8,
                od: 7.7,
              },
            ],
            id: 68321265,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Top 2',
      },
      {
        mty: 1983,
        mks: [
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 1.31,
              },
            ],
            id: 67685612,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KRC Genk',
                ty: 8,
                od: 5.5,
              },
            ],
            id: 67685610,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 6.7,
              },
            ],
            id: 67685611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Cukaricki Belgrade',
                ty: 8,
                od: 95,
              },
            ],
            id: 67685609,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Winner',
      },
      {
        mty: 1975,
        mks: [
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68321493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KRC Genk',
                ty: 8,
                od: 1.61,
              },
            ],
            id: 68321491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 1.92,
              },
            ],
            id: 68321492,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Cukaricki Belgrade',
                ty: 8,
                od: 34,
              },
            ],
            id: 68321490,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Top 2',
      },
      {
        mty: 1982,
        mks: [
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 1.21,
              },
            ],
            id: 67685674,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PAOK Thessaloniki',
                ty: 8,
                od: 4.27,
              },
            ],
            id: 67685672,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 67685671,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HJK Helsinki',
                ty: 8,
                od: 61,
              },
            ],
            id: 67685673,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Winner',
      },
      {
        mty: 1974,
        mks: [
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68321672,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PAOK Thessaloniki',
                ty: 8,
                od: 1.02,
              },
            ],
            id: 68321670,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 9.2,
              },
            ],
            id: 68321669,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HJK Helsinki',
                ty: 8,
                od: 15.3,
              },
            ],
            id: 68321671,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Top 2',
      },
      {
        mty: 1981,
        mks: [
          {
            op: [
              {
                nm: 'Fenerbahce',
                ty: 8,
                od: 1.25,
              },
            ],
            id: 67685721,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFC Ludogorets 1945 Razgrad',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 67685720,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 7.9,
              },
            ],
            id: 67685722,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 59,
              },
            ],
            id: 67685719,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Winner',
      },
      {
        mty: 1973,
        mks: [
          {
            op: [
              {
                nm: 'PFC Ludogorets 1945 Razgrad',
                ty: 8,
                od: 1.64,
              },
            ],
            id: 68321896,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 2.27,
              },
            ],
            id: 68321898,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 15.6,
              },
            ],
            id: 68321895,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fenerbahce',
                ty: 8,
                od: -999,
              },
            ],
            id: 68321897,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Top 2',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68355345,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 14.1,
              },
            ],
            id: 68355346,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group A - Lille OSC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.35,
              },
            ],
            id: 68355377,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.73,
              },
            ],
            id: 68355378,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group A - SK Slovan Bratislava',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 68355746,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.04,
              },
            ],
            id: 68355745,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group A - Olimpija Ljubljana',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68355836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.55,
              },
            ],
            id: 68355835,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group A - KI Klaksvik',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68356109,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 20,
              },
            ],
            id: 68356110,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group B - KAA Gent',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 68356141,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 3.97,
              },
            ],
            id: 68356142,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group B - Maccabi Tel Aviv FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.12,
              },
            ],
            id: 68356304,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.72,
              },
            ],
            id: 68356303,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group B - FC Zorya Lugansk',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 31,
              },
            ],
            id: 68356321,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: -999,
              },
            ],
            id: 68356322,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group B - Breidablik Kopavogur',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68356657,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 68356658,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group C - FC Viktoria Plzen',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68356670,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 68356671,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group C - GNK Dinamo Zagreb',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68356682,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 68356681,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group C - FC Astana',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.02,
              },
            ],
            id: 68356686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.55,
              },
            ],
            id: 68356685,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group C - KF Ballkani',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.31,
              },
            ],
            id: 68356815,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.89,
              },
            ],
            id: 68356816,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group D - Club Brugge',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.08,
              },
            ],
            id: 68356820,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 5.3,
              },
            ],
            id: 68356821,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group D - Besiktas JK',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.74,
              },
            ],
            id: 68356827,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.9,
              },
            ],
            id: 68356826,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group D - Bodo/Glimt',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68356830,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 11.8,
              },
            ],
            id: 68356829,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group D - FC Lugano',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 68357443,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 8.6,
              },
            ],
            id: 68357444,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group E - Aston Villa FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.76,
              },
            ],
            id: 68357530,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.86,
              },
            ],
            id: 68357529,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group E - AZ Alkmaar',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.73,
              },
            ],
            id: 68357538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.89,
              },
            ],
            id: 68357537,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group E - Legia Warszawa',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.07,
              },
            ],
            id: 68357552,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 7.2,
              },
            ],
            id: 68357551,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group E - HSK Zrinjski Mostar',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68357562,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 11.1,
              },
            ],
            id: 68357563,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group F - ACF Fiorentina',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.64,
              },
            ],
            id: 68357611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.02,
              },
            ],
            id: 68357612,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group F - KRC Genk',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.67,
              },
            ],
            id: 68357662,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.01,
              },
            ],
            id: 68357661,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group F - Ferencvarosi TC Budapest',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68357666,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 19,
              },
            ],
            id: 68357665,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group F - FK Cukaricki Belgrade',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68357714,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 14.1,
              },
            ],
            id: 68357715,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group G - Eintracht Frankfurt',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68357726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 68357727,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group G - PAOK Thessaloniki',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68357744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 12.2,
              },
            ],
            id: 68357743,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group G - Aberdeen FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 45,
              },
            ],
            id: 68357501,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: -999,
              },
            ],
            id: 68357502,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group G - HJK Helsinki',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 42,
              },
            ],
            id: 68357484,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: -999,
              },
            ],
            id: 68357483,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group H - Fenerbahce',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.6,
              },
            ],
            id: 68357476,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.09,
              },
            ],
            id: 68357477,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group H - PFC Ludogorets 1945 Razgrad',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 68357467,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.18,
              },
            ],
            id: 68357466,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group H - FC Nordsjaelland',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 19.5,
              },
            ],
            id: 68357460,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: -999,
              },
            ],
            id: 68357461,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - To Qualify from Group H - FC Spartak Trnava',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 1.7,
              },
            ],
            id: 68322190,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olimpija Ljubljana',
                ty: 8,
                od: 4.63,
              },
            ],
            id: 68322189,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 5.65,
              },
            ],
            id: 68322191,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KI Klaksvik',
                ty: 8,
                od: 8.3,
              },
            ],
            id: 68322188,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group A - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Maccabi Tel Aviv FC',
                ty: 8,
                od: 1.9,
              },
            ],
            id: 68322433,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KAA Gent',
                ty: 8,
                od: 2.81,
              },
            ],
            id: 68322432,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Zorya Lugansk',
                ty: 8,
                od: 5.7,
              },
            ],
            id: 68322434,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Breidablik Kopavogur',
                ty: 8,
                od: 19,
              },
            ],
            id: 68322431,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group B - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 2,
              },
            ],
            id: 68322575,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 2.31,
              },
            ],
            id: 68322577,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Astana',
                ty: 8,
                od: 10.4,
              },
            ],
            id: 68322576,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KF Ballkani',
                ty: 8,
                od: 12.5,
              },
            ],
            id: 68322578,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group C - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Club Brugge',
                ty: 8,
                od: 2.59,
              },
            ],
            id: 68322725,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Besiktas JK',
                ty: 8,
                od: 2.68,
              },
            ],
            id: 68322727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 3.54,
              },
            ],
            id: 68322724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lugano',
                ty: 8,
                od: 16.6,
              },
            ],
            id: 68322726,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group D - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Legia Warszawa',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 68322874,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AZ Alkmaar',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 68322876,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 3.22,
              },
            ],
            id: 68322875,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HSK Zrinjski Mostar',
                ty: 8,
                od: 10.2,
              },
            ],
            id: 68322877,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group E - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'KRC Genk',
                ty: 8,
                od: 2.27,
              },
            ],
            id: 68322984,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 2.81,
              },
            ],
            id: 68322985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 3.54,
              },
            ],
            id: 68322986,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Cukaricki Belgrade',
                ty: 8,
                od: 41,
              },
            ],
            id: 68322983,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group F - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'PAOK Thessaloniki',
                ty: 8,
                od: 1.45,
              },
            ],
            id: 68323109,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 3.63,
              },
            ],
            id: 68323111,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 11.8,
              },
            ],
            id: 68323108,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HJK Helsinki',
                ty: 8,
                od: 19.3,
              },
            ],
            id: 68323110,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group G - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'PFC Ludogorets 1945 Razgrad',
                ty: 8,
                od: 2.18,
              },
            ],
            id: 68323254,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 3,
              },
            ],
            id: 68323256,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fenerbahce',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 68323255,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 20,
              },
            ],
            id: 68323253,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group H - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'KI Klaksvik',
                ty: 8,
                od: 1.47,
              },
            ],
            id: 68323847,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olimpija Ljubljana',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 68323848,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 13.1,
              },
            ],
            id: 68323849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 801,
              },
            ],
            id: 68323850,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group A - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Breidablik Kopavogur',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 68324208,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Zorya Lugansk',
                ty: 8,
                od: 4.54,
              },
            ],
            id: 68324211,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Tel Aviv FC',
                ty: 8,
                od: 41,
              },
            ],
            id: 68324210,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KAA Gent',
                ty: 8,
                od: 151,
              },
            ],
            id: 68324209,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group B - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'KF Ballkani',
                ty: 8,
                od: 1.74,
              },
            ],
            id: 68324469,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Astana',
                ty: 8,
                od: 2,
              },
            ],
            id: 68324467,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 44,
              },
            ],
            id: 68324466,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 106,
              },
            ],
            id: 68324468,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group C - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Lugano',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 68324584,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 9,
              },
            ],
            id: 68324582,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Club Brugge',
                ty: 8,
                od: 19.6,
              },
            ],
            id: 68324583,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Besiktas JK',
                ty: 8,
                od: 37,
              },
            ],
            id: 68324585,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group D - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'HSK Zrinjski Mostar',
                ty: 8,
                od: 1.26,
              },
            ],
            id: 68324707,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Legia Warszawa',
                ty: 8,
                od: 6.75,
              },
            ],
            id: 68324704,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AZ Alkmaar',
                ty: 8,
                od: 6.75,
              },
            ],
            id: 68324706,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 76,
              },
            ],
            id: 68324705,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group E - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 55,
              },
            ],
            id: 68324782,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KRC Genk',
                ty: 8,
                od: 69,
              },
            ],
            id: 68324781,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 1001,
              },
            ],
            id: 68324783,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Cukaricki Belgrade',
                ty: 8,
                od: -999,
              },
            ],
            id: 68324780,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group F - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'HJK Helsinki',
                ty: 8,
                od: 1.47,
              },
            ],
            id: 68325013,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 2.45,
              },
            ],
            id: 68325011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PAOK Thessaloniki',
                ty: 8,
                od: 72,
              },
            ],
            id: 68325012,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 801,
              },
            ],
            id: 68325014,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group G - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68325134,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 11.2,
              },
            ],
            id: 68325137,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFC Ludogorets 1945 Razgrad',
                ty: 8,
                od: 18.8,
              },
            ],
            id: 68325135,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fenerbahce',
                ty: 8,
                od: 301,
              },
            ],
            id: 68325136,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa Conference League - Group H - To Finish Bottom',
      },
    ],
    tms: 224,
    tps: [],
    lg: {
      na: 'UEFA Europa Conference League',
      id: 16025,
      or: 11,
      lurl: 'https://static.fastbs55.com/data/6ada6999751d1c78e61e69dc80ed046c.png',
      sid: 1,
      rid: 309,
      rnm: 'Europe',
      hot: false,
      slid: 160250000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1618036,
    bt: 1702575900000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'UEFA Europa Conference League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Yokohama F Marinos',
                ty: 8,
                od: 1.9,
              },
            ],
            id: 46411616,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vissel Kobe',
                ty: 8,
                od: 1.9,
              },
            ],
            id: 46411605,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Urawa Red Diamonds',
                ty: 8,
                od: 16,
              },
            ],
            id: 46411614,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nagoya Grampus',
                ty: 8,
                od: 61,
              },
            ],
            id: 46411615,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kashima Antlers',
                ty: 8,
                od: 81,
              },
            ],
            id: 46411600,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cerezo Osaka',
                ty: 8,
                od: 201,
              },
            ],
            id: 46411601,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sanfrecce Hiroshima',
                ty: 8,
                od: 201,
              },
            ],
            id: 46411599,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Avispa Fukuoka',
                ty: 8,
                od: 1001,
              },
            ],
            id: 46411611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kawasaki Frontale',
                ty: 8,
                od: 1001,
              },
            ],
            id: 46411613,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 9,
    tps: [],
    lg: {
      na: 'Japan J.League',
      id: 10706,
      or: 12,
      lurl: 'https://static.fastbs55.com/data/fc15ad4a69dc35a9d72985a5115388f7.png',
      sid: 1,
      rid: 58,
      rnm: 'Japan',
      hot: true,
      slid: 107060000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1238861,
    bt: 1701626400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Japan J.League 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Hamburger SV',
                ty: 8,
                od: 3.83,
              },
            ],
            id: 57789998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fortuna Dusseldorf',
                ty: 8,
                od: 6.35,
              },
            ],
            id: 57789990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Schalke 04',
                ty: 8,
                od: 6.85,
              },
            ],
            id: 57790002,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC St. Pauli',
                ty: 8,
                od: 8.85,
              },
            ],
            id: 57789996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hertha BSC',
                ty: 8,
                od: 9.6,
              },
            ],
            id: 57790000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1. FC Magdeburg',
                ty: 8,
                od: 16.4,
              },
            ],
            id: 57789993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Holstein Kiel',
                ty: 8,
                od: 17.1,
              },
            ],
            id: 57790006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hannover 96',
                ty: 8,
                od: 21,
              },
            ],
            id: 57789989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greuther Furth',
                ty: 8,
                od: 25,
              },
            ],
            id: 57789995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Paderborn',
                ty: 8,
                od: 36,
              },
            ],
            id: 57789992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1 FC Kaiserslautern',
                ty: 8,
                od: 37,
              },
            ],
            id: 57789991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nuremberg',
                ty: 8,
                od: 40,
              },
            ],
            id: 57790001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karlsruher SC',
                ty: 8,
                od: 41,
              },
            ],
            id: 57789997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Wehen Wiesbaden',
                ty: 8,
                od: 111,
              },
            ],
            id: 57789999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hansa Rostock',
                ty: 8,
                od: 116,
              },
            ],
            id: 57789994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV 07 Elversberg',
                ty: 8,
                od: 146,
              },
            ],
            id: 57790005,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Braunschweig',
                ty: 8,
                od: 401,
              },
            ],
            id: 57790003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL 1899 Osnabruck',
                ty: 8,
                od: 901,
              },
            ],
            id: 57790004,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1989,
        mks: [
          {
            op: [
              {
                nm: 'Hamburger SV',
                ty: 8,
                od: 1.51,
              },
            ],
            id: 59206079,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Schalke 04',
                ty: 8,
                od: 2.42,
              },
            ],
            id: 59206088,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fortuna Dusseldorf',
                ty: 8,
                od: 3.13,
              },
            ],
            id: 59206084,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC St. Pauli',
                ty: 8,
                od: 3.31,
              },
            ],
            id: 59206074,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Holstein Kiel',
                ty: 8,
                od: 4.11,
              },
            ],
            id: 59206086,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1. FC Magdeburg',
                ty: 8,
                od: 4.11,
              },
            ],
            id: 59206087,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hertha BSC',
                ty: 8,
                od: 4.9,
              },
            ],
            id: 59206080,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hannover 96',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 59206072,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greuther Furth',
                ty: 8,
                od: 8.1,
              },
            ],
            id: 59206076,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Paderborn',
                ty: 8,
                od: 8.9,
              },
            ],
            id: 59206082,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karlsruher SC',
                ty: 8,
                od: 9.7,
              },
            ],
            id: 59206077,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nuremberg',
                ty: 8,
                od: 10.5,
              },
            ],
            id: 59206075,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hansa Rostock',
                ty: 8,
                od: 12.1,
              },
            ],
            id: 59206081,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1 FC Kaiserslautern',
                ty: 8,
                od: 12.1,
              },
            ],
            id: 59206083,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Wehen Wiesbaden',
                ty: 8,
                od: 31,
              },
            ],
            id: 59206085,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Braunschweig',
                ty: 8,
                od: 40,
              },
            ],
            id: 59206078,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV 07 Elversberg',
                ty: 8,
                od: 40,
              },
            ],
            id: 59206089,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL 1899 Osnabruck',
                ty: 8,
                od: 80,
              },
            ],
            id: 59206073,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Promotion',
      },
    ],
    tms: 36,
    tps: [],
    lg: {
      na: 'Germany 2. Bundesliga',
      id: 11460,
      or: 13,
      lurl: 'https://static.fastbs55.com/data/6e010f34d64c7f801c1d662b8cd68d6e.png',
      sid: 1,
      rid: 87,
      rnm: 'Germany',
      hot: true,
      slid: 114600000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1429966,
    bt: 1716125400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Germany 2. Bundesliga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Cincinnati',
                ty: 8,
                od: 5.05,
              },
            ],
            id: 41387990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Miami CF',
                ty: 8,
                od: 7.65,
              },
            ],
            id: 41387981,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Los Angeles FC',
                ty: 8,
                od: 7.7,
              },
            ],
            id: 41387971,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Philadelphia Union',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 41387988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New England Revolution',
                ty: 8,
                od: 13.7,
              },
            ],
            id: 41387991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Orlando City SC',
                ty: 8,
                od: 13.8,
              },
            ],
            id: 41387998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Seattle Sounders',
                ty: 8,
                od: 14.3,
              },
            ],
            id: 41387992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saint Louis City SC',
                ty: 8,
                od: 15.1,
              },
            ],
            id: 41387995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Columbus Crew',
                ty: 8,
                od: 16,
              },
            ],
            id: 41387974,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nashville SC',
                ty: 8,
                od: 24,
              },
            ],
            id: 41387984,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atlanta United FC',
                ty: 8,
                od: 30,
              },
            ],
            id: 41387976,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vancouver Whitecaps FC',
                ty: 8,
                od: 32,
              },
            ],
            id: 41387979,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Salt Lake',
                ty: 8,
                od: 33,
              },
            ],
            id: 41387986,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Houston Dynamo',
                ty: 8,
                od: 40,
              },
            ],
            id: 41387977,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'San Jose Earthquakes',
                ty: 8,
                od: 46,
              },
            ],
            id: 41387987,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dallas',
                ty: 8,
                od: 56,
              },
            ],
            id: 41387993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portland Timbers',
                ty: 8,
                od: 75,
              },
            ],
            id: 41387980,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CF Montreal',
                ty: 8,
                od: 77,
              },
            ],
            id: 41387975,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting Kansas City',
                ty: 8,
                od: 78,
              },
            ],
            id: 41387978,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austin FC',
                ty: 8,
                od: 106,
              },
            ],
            id: 41387985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Minnesota United FC',
                ty: 8,
                od: 111,
              },
            ],
            id: 41387982,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'DC United',
                ty: 8,
                od: 116,
              },
            ],
            id: 41387983,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New York Red Bulls',
                ty: 8,
                od: 121,
              },
            ],
            id: 41387973,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Charlotte FC',
                ty: 8,
                od: 141,
              },
            ],
            id: 41387997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New York City FC',
                ty: 8,
                od: 146,
              },
            ],
            id: 41387996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chicago Fire',
                ty: 8,
                od: 151,
              },
            ],
            id: 41387972,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Los Angeles Galaxy',
                ty: 8,
                od: 151,
              },
            ],
            id: 41387970,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Los Angeles FC',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 58334179,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saint Louis City SC',
                ty: 8,
                od: 4.5,
              },
            ],
            id: 58334181,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Seattle Sounders',
                ty: 8,
                od: 6.8,
              },
            ],
            id: 58334175,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Salt Lake',
                ty: 8,
                od: 15.3,
              },
            ],
            id: 58334173,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vancouver Whitecaps FC',
                ty: 8,
                od: 15.3,
              },
            ],
            id: 58334177,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Houston Dynamo',
                ty: 8,
                od: 21,
              },
            ],
            id: 58334171,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'San Jose Earthquakes',
                ty: 8,
                od: 24,
              },
            ],
            id: 58334174,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dallas',
                ty: 8,
                od: 30,
              },
            ],
            id: 58334170,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting Kansas City',
                ty: 8,
                od: 40,
              },
            ],
            id: 58334169,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Portland Timbers',
                ty: 8,
                od: 40,
              },
            ],
            id: 58334176,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Minnesota United FC',
                ty: 8,
                od: 87,
              },
            ],
            id: 58334178,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austin FC',
                ty: 8,
                od: 87,
              },
            ],
            id: 58334180,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Los Angeles Galaxy',
                ty: 8,
                od: 131,
              },
            ],
            id: 58334168,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'USA Major League Soccer - Western Conference - Winner',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Hany Mukhtar',
                ty: 8,
                od: 5,
              },
            ],
            id: 57956652,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luciano Acosta',
                ty: 8,
                od: 5.55,
              },
            ],
            id: 61997724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Giorgos Giakoumakis',
                ty: 8,
                od: 6.05,
              },
            ],
            id: 57956693,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Denis Bouanga',
                ty: 8,
                od: 7.05,
              },
            ],
            id: 57956682,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Daniel Gazdag',
                ty: 8,
                od: 18.3,
              },
            ],
            id: 57956671,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alan Pulido',
                ty: 8,
                od: 22,
              },
            ],
            id: 57956651,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Juan Camilo Hernandez Suarez',
                ty: 8,
                od: 25,
              },
            ],
            id: 57956676,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Christian Benteke',
                ty: 8,
                od: 25,
              },
            ],
            id: 57956684,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Julian Carranza',
                ty: 8,
                od: 37,
              },
            ],
            id: 57956657,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlos Vela',
                ty: 8,
                od: 38,
              },
            ],
            id: 57956635,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lionel Messi',
                ty: 8,
                od: 40,
              },
            ],
            id: 60607250,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cristian Espinoza',
                ty: 8,
                od: 42,
              },
            ],
            id: 57956645,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jesus Ferreira',
                ty: 8,
                od: 42,
              },
            ],
            id: 57956650,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jordan Morris',
                ty: 8,
                od: 65,
              },
            ],
            id: 57956631,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Thiago Almada',
                ty: 8,
                od: 83,
              },
            ],
            id: 57956660,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sebastian Driussi',
                ty: 8,
                od: 83,
              },
            ],
            id: 57956663,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Amine Bassi',
                ty: 8,
                od: 83,
              },
            ],
            id: 57956697,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jeremy Ebobisse',
                ty: 8,
                od: 100,
              },
            ],
            id: 57956643,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brian White',
                ty: 8,
                od: 101,
              },
            ],
            id: 57956647,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leonardo Campana',
                ty: 8,
                od: 106,
              },
            ],
            id: 57956670,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mikael Uhre',
                ty: 8,
                od: 126,
              },
            ],
            id: 57956661,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bobby Wood',
                ty: 8,
                od: 126,
              },
            ],
            id: 57956674,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Daniel Salloi',
                ty: 8,
                od: 136,
              },
            ],
            id: 57956641,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Raul Ruidiaz',
                ty: 8,
                od: 146,
              },
            ],
            id: 57956639,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Federico Bernardeschi',
                ty: 8,
                od: 146,
              },
            ],
            id: 57956679,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Josef Martinez',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956632,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romell Quioto',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956633,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kacper Przybylko',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956646,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gustavo Bou',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956648,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Xherdan Shaqiri',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956659,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ercan Kara',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956662,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brandon Vazquez',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956664,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karol Swiderski',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956665,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Giacomo Vrioni',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956687,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dejan Joveljic',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956688,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Christian Ramirez',
                ty: 8,
                od: 151,
              },
            ],
            id: 57956696,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gyasi Zardes',
                ty: 8,
                od: 201,
              },
            ],
            id: 57956630,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Johnny Russell',
                ty: 8,
                od: 201,
              },
            ],
            id: 57956636,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lorenzo Insigne',
                ty: 8,
                od: 201,
              },
            ],
            id: 57956675,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Enzo Copetti',
                ty: 8,
                od: 201,
              },
            ],
            id: 57956681,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joao Klauss',
                ty: 8,
                od: 201,
              },
            ],
            id: 57956691,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Charles Sapong',
                ty: 8,
                od: 251,
              },
            ],
            id: 57956654,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Emanuel Reynoso',
                ty: 8,
                od: 251,
              },
            ],
            id: 57956677,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jefferson Savarino',
                ty: 8,
                od: 251,
              },
            ],
            id: 57956690,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Franck Boli',
                ty: 8,
                od: 301,
              },
            ],
            id: 57956695,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jose Mulato',
                ty: 8,
                od: 651,
              },
            ],
            id: 57956683,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Damir Kreilach',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956638,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cory Burke',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956640,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Heber Araujo dos Santos',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956644,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Talles Magno',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956668,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dairon Asprilla',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956673,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nicolas Stefanelli',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956685,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dante Vanzeir',
                ty: 8,
                od: 751,
              },
            ],
            id: 57956686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Diego Rubio',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57956634,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Robin Lod',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57956658,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lewis Morgan',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57956672,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'USA Major League Soccer - Regular Season - Top Goalscorer (Excluding Playoffs)',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Cincinnati',
                ty: 8,
                od: 2.59,
              },
            ],
            id: 58328420,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Miami CF',
                ty: 8,
                od: 4.5,
              },
            ],
            id: 58328421,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Philadelphia Union',
                ty: 8,
                od: 8.75,
              },
            ],
            id: 58328415,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New England Revolution',
                ty: 8,
                od: 11.3,
              },
            ],
            id: 58328411,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Columbus Crew',
                ty: 8,
                od: 12.7,
              },
            ],
            id: 58328412,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Orlando City SC',
                ty: 8,
                od: 12.7,
              },
            ],
            id: 58328417,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nashville SC',
                ty: 8,
                od: 19.2,
              },
            ],
            id: 58328422,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atlanta United FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 58328419,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CF Montreal',
                ty: 8,
                od: 79,
              },
            ],
            id: 58328416,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New York Red Bulls',
                ty: 8,
                od: 131,
              },
            ],
            id: 58328410,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'DC United',
                ty: 8,
                od: 131,
              },
            ],
            id: 58328413,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chicago Fire',
                ty: 8,
                od: 151,
              },
            ],
            id: 58328409,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'New York City FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 58328418,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Charlotte FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 58328423,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'USA Major League Soccer - Eastern Conference - Winner',
      },
    ],
    tms: 110,
    tps: [],
    lg: {
      na: 'USA Major League Soccer',
      id: 11024,
      or: 15,
      lurl: 'https://static.fastbs55.com/data/1f83eedb544951a67156a8e868697979.png',
      sid: 1,
      rid: 84,
      rnm: 'USA',
      hot: true,
      slid: 110240000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1112692,
    bt: 1699128000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'USA Major League Soccer 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Botafogo FR RJ',
                ty: 8,
                od: 1.64,
              },
            ],
            id: 41137660,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SE Palmeiras SP',
                ty: 8,
                od: 3.36,
              },
            ],
            id: 41137657,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Red Bull Bragantino SP',
                ty: 8,
                od: 17.5,
              },
            ],
            id: 41137664,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CR Flamengo RJ',
                ty: 8,
                od: 17.9,
              },
            ],
            id: 41137666,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gremio FB Porto Alegrense RS',
                ty: 8,
                od: 18.1,
              },
            ],
            id: 41137663,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fluminense FC RJ',
                ty: 8,
                od: 30,
              },
            ],
            id: 41137661,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Paranaense PR',
                ty: 8,
                od: 62,
              },
            ],
            id: 41137650,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fortaleza EC CE',
                ty: 8,
                od: 116,
              },
            ],
            id: 41137659,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Mineiro MG',
                ty: 8,
                od: 126,
              },
            ],
            id: 41137651,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CR Vasco da Gama RJ',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137665,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cruzeiro EC MG',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137668,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Internacional RS',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137654,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'America FC MG',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137662,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Corinthians SP',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137649,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Santos FC SP',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137652,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Goias EC GO',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137658,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'EC Bahia BA',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137653,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sao Paulo FC SP',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137655,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coritiba FC PR',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137656,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cuiaba Esporte Clube MT',
                ty: 8,
                od: 1001,
              },
            ],
            id: 41137667,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Coritiba FC PR',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 57944486,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'America FC MG',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 57944473,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Santos FC SP',
                ty: 8,
                od: 1.74,
              },
            ],
            id: 57944479,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CR Vasco da Gama RJ',
                ty: 8,
                od: 2.14,
              },
            ],
            id: 57944470,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Goias EC GO',
                ty: 8,
                od: 2.14,
              },
            ],
            id: 57944480,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'EC Bahia BA',
                ty: 8,
                od: 2.47,
              },
            ],
            id: 57944482,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cuiaba Esporte Clube MT',
                ty: 8,
                od: 8.8,
              },
            ],
            id: 57944489,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Corinthians SP',
                ty: 8,
                od: 9.9,
              },
            ],
            id: 57944475,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Internacional RS',
                ty: 8,
                od: 12.1,
              },
            ],
            id: 57944472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cruzeiro EC MG',
                ty: 8,
                od: 16.7,
              },
            ],
            id: 57944471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sao Paulo FC SP',
                ty: 8,
                od: 23,
              },
            ],
            id: 57944485,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Mineiro MG',
                ty: 8,
                od: 801,
              },
            ],
            id: 57944474,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Paranaense PR',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944477,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CR Flamengo RJ',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944481,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fluminense FC RJ',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944483,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fortaleza EC CE',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944484,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Red Bull Bragantino SP',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944487,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gremio FB Porto Alegrense RS',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57944488,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
    ],
    tms: 38,
    tps: [],
    lg: {
      na: 'Brazil Serie A',
      id: 10580,
      or: 16,
      lurl: 'https://static.fastbs55.com/data/1ca143bc6949de8a8c45e9cc8ac361bd.png',
      sid: 1,
      rid: 41,
      rnm: 'Brazil',
      hot: true,
      slid: 105800000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1083896,
    bt: 1701640800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Brazil Serie A 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'AJ Auxerre',
                ty: 8,
                od: 5.2,
              },
            ],
            id: 60581307,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Saint Etienne',
                ty: 8,
                od: 5.3,
              },
            ],
            id: 60581290,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Girondins Bordeaux',
                ty: 8,
                od: 6.55,
              },
            ],
            id: 60581303,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SM Caen',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 60581306,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Angers SCO',
                ty: 8,
                od: 10.9,
              },
            ],
            id: 60581294,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Lavallois Mayenne FC',
                ty: 8,
                od: 13,
              },
            ],
            id: 60581305,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ES Troyes AC',
                ty: 8,
                od: 17.3,
              },
            ],
            id: 60581291,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'EA Guingamp',
                ty: 8,
                od: 18.7,
              },
            ],
            id: 60581295,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Ajaccio',
                ty: 8,
                od: 19.9,
              },
            ],
            id: 60581289,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grenoble Foot',
                ty: 8,
                od: 25,
              },
            ],
            id: 60581293,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Amiens SC',
                ty: 8,
                od: 32,
              },
            ],
            id: 60581299,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Bastia',
                ty: 8,
                od: 33,
              },
            ],
            id: 60581296,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rodez Aveyron',
                ty: 8,
                od: 46,
              },
            ],
            id: 60581292,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pau FC',
                ty: 8,
                od: 65,
              },
            ],
            id: 60581298,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Annecy FC',
                ty: 8,
                od: 111,
              },
            ],
            id: 64527875,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris FC',
                ty: 8,
                od: 126,
              },
            ],
            id: 60581297,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Valenciennes FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60581301,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Concarneau',
                ty: 8,
                od: 151,
              },
            ],
            id: 60581300,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'USL Dunkerque',
                ty: 8,
                od: 251,
              },
            ],
            id: 60581302,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Quevilly Rouen Metropole',
                ty: 8,
                od: 351,
              },
            ],
            id: 60581304,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'France Ligue 2',
      id: 11015,
      or: 36,
      lurl: 'https://static.fastbs55.com/data/5aef4a3fae1d1372dd1908c656b14a21.png',
      sid: 1,
      rid: 44,
      rnm: 'France',
      hot: false,
      slid: 110150000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1483584,
    bt: 1716062400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'France Ligue 2 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Parma Calcio',
                ty: 8,
                od: 3.27,
              },
            ],
            id: 63466614,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Palermo FC',
                ty: 8,
                od: 4.65,
              },
            ],
            id: 63466603,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Cremonese',
                ty: 8,
                od: 11.2,
              },
            ],
            id: 63466612,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Venezia',
                ty: 8,
                od: 12.6,
              },
            ],
            id: 63466606,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Como 1907',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 63466607,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Pisa',
                ty: 8,
                od: 17.2,
              },
            ],
            id: 63466598,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spezia Calcio',
                ty: 8,
                od: 22,
              },
            ],
            id: 63466605,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sampdoria',
                ty: 8,
                od: 24,
              },
            ],
            id: 63466613,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Modena FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 63466615,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brescia Calcio',
                ty: 8,
                od: 24,
              },
            ],
            id: 67403459,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sudtirol',
                ty: 8,
                od: 24,
              },
            ],
            id: 63466608,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Bari',
                ty: 8,
                od: 30,
              },
            ],
            id: 63466610,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Catanzaro 1929',
                ty: 8,
                od: 30,
              },
            ],
            id: 63466611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Cittadella',
                ty: 8,
                od: 77,
              },
            ],
            id: 63466597,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cosenza Calcio',
                ty: 8,
                od: 78,
              },
            ],
            id: 63466602,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Reggiana',
                ty: 8,
                od: 95,
              },
            ],
            id: 63466599,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ascoli Calcio 1898 FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 63466600,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Feralpisalo',
                ty: 8,
                od: 251,
              },
            ],
            id: 63466609,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Calcio Lecco 1912',
                ty: 8,
                od: 251,
              },
            ],
            id: 67407673,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ternana Calcio',
                ty: 8,
                od: 401,
              },
            ],
            id: 63466601,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Italy Serie B',
      id: 11006,
      or: 37,
      lurl: 'https://static.fastbs55.com/data/d1ccd9226072a7b01999d61f4aca7c89.png',
      sid: 1,
      rid: 29,
      rnm: 'Italia',
      hot: false,
      slid: 110060000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1513569,
    bt: 1715439600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Italy Serie B 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'RCD Espanyol',
                ty: 8,
                od: 3.63,
              },
            ],
            id: 65414274,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Zaragoza',
                ty: 8,
                od: 7.95,
              },
            ],
            id: 65414268,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Levante UD',
                ty: 8,
                od: 8,
              },
            ],
            id: 65414270,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Leganes',
                ty: 8,
                od: 11,
              },
            ],
            id: 65414259,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tenerife CD',
                ty: 8,
                od: 12,
              },
            ],
            id: 65414273,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Valladolid',
                ty: 8,
                od: 12,
              },
            ],
            id: 65414275,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting Gijon',
                ty: 8,
                od: 18.8,
              },
            ],
            id: 65414260,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Racing Santander',
                ty: 8,
                od: 18.9,
              },
            ],
            id: 65414276,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Racing Club de Ferrol',
                ty: 8,
                od: 19,
              },
            ],
            id: 65414277,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SD Eibar',
                ty: 8,
                od: 23,
              },
            ],
            id: 65414264,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Albacete Balompie',
                ty: 8,
                od: 37,
              },
            ],
            id: 65414271,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Elche CF',
                ty: 8,
                od: 38,
              },
            ],
            id: 65414263,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Andorra',
                ty: 8,
                od: 38,
              },
            ],
            id: 65414269,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Club Deportivo Eldense',
                ty: 8,
                od: 57,
              },
            ],
            id: 65414261,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burgos CF',
                ty: 8,
                od: 74,
              },
            ],
            id: 65414265,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SD Huesca',
                ty: 8,
                od: 75,
              },
            ],
            id: 65414266,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SD Amorebieta',
                ty: 8,
                od: 106,
              },
            ],
            id: 65414278,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Mirandes',
                ty: 8,
                od: 111,
              },
            ],
            id: 65414262,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF B',
                ty: 8,
                od: 151,
              },
            ],
            id: 65414279,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alcorcon AD',
                ty: 8,
                od: 151,
              },
            ],
            id: 65414267,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Oviedo',
                ty: 8,
                od: 201,
              },
            ],
            id: 65414272,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Cartagena',
                ty: 8,
                od: 201,
              },
            ],
            id: 65414280,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 22,
    tps: [],
    lg: {
      na: 'Spain LaLiga 2',
      id: 11616,
      or: 38,
      lurl: 'https://static.fastbs55.com/data/4acc1ad9904c293abbdd3479271d782b.png',
      sid: 1,
      rid: 74,
      rnm: 'Spain',
      hot: false,
      slid: 116160000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1547161,
    bt: 1717349400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Spain LaLiga 2 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Portsmouth FC',
                ty: 8,
                od: 4.48,
              },
            ],
            id: 57079980,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bolton Wanderers',
                ty: 8,
                od: 5.1,
              },
            ],
            id: 57080000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Derby County',
                ty: 8,
                od: 5.7,
              },
            ],
            id: 57079992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oxford United',
                ty: 8,
                od: 6.8,
              },
            ],
            id: 57079995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barnsley',
                ty: 8,
                od: 11.9,
              },
            ],
            id: 57079999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Peterborough United',
                ty: 8,
                od: 13,
              },
            ],
            id: 57079984,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackpool',
                ty: 8,
                od: 19.9,
              },
            ],
            id: 57079994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stevenage FC',
                ty: 8,
                od: 26,
              },
            ],
            id: 57079997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol Rovers',
                ty: 8,
                od: 29,
              },
            ],
            id: 57079996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wycombe Wanderers',
                ty: 8,
                od: 37,
              },
            ],
            id: 57079981,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Charlton Athletic',
                ty: 8,
                od: 39,
              },
            ],
            id: 57080001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Exeter City',
                ty: 8,
                od: 40,
              },
            ],
            id: 57079987,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wigan Athletic',
                ty: 8,
                od: 69,
              },
            ],
            id: 57079989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lincoln City',
                ty: 8,
                od: 69,
              },
            ],
            id: 57079985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Port Vale',
                ty: 8,
                od: 82,
              },
            ],
            id: 57079990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cambridge United',
                ty: 8,
                od: 141,
              },
            ],
            id: 57079993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leyton Orient',
                ty: 8,
                od: 201,
              },
            ],
            id: 57079982,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Reading FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 57079979,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Northampton Town',
                ty: 8,
                od: 451,
              },
            ],
            id: 57079983,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Shrewsbury Town',
                ty: 8,
                od: 451,
              },
            ],
            id: 57079991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlisle United',
                ty: 8,
                od: 501,
              },
            ],
            id: 57079998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burton Albion',
                ty: 8,
                od: 501,
              },
            ],
            id: 57079988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fleetwood Town',
                ty: 8,
                od: 551,
              },
            ],
            id: 57079978,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cheltenham Town',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57079986,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1989,
        mks: [
          {
            op: [
              {
                nm: 'Portsmouth FC',
                ty: 8,
                od: 2,
              },
            ],
            id: 57337147,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bolton Wanderers',
                ty: 8,
                od: 2.13,
              },
            ],
            id: 57337150,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Derby County',
                ty: 8,
                od: 2.27,
              },
            ],
            id: 57337151,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oxford United',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 57337134,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Peterborough United',
                ty: 8,
                od: 3.68,
              },
            ],
            id: 57337132,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barnsley',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 57337142,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackpool',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 57337141,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol Rovers',
                ty: 8,
                od: 8.1,
              },
            ],
            id: 57337131,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stevenage FC',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 57337146,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wycombe Wanderers',
                ty: 8,
                od: 8.65,
              },
            ],
            id: 57337129,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Exeter City',
                ty: 8,
                od: 9.6,
              },
            ],
            id: 57337145,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Charlton Athletic',
                ty: 8,
                od: 11.7,
              },
            ],
            id: 57337144,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lincoln City',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 57337139,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wigan Athletic',
                ty: 8,
                od: 15.9,
              },
            ],
            id: 57337133,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Port Vale',
                ty: 8,
                od: 26,
              },
            ],
            id: 57337130,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Reading FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 57337152,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cambridge United',
                ty: 8,
                od: 42,
              },
            ],
            id: 57337136,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leyton Orient',
                ty: 8,
                od: 43,
              },
            ],
            id: 57337143,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Northampton Town',
                ty: 8,
                od: 70,
              },
            ],
            id: 57337135,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Shrewsbury Town',
                ty: 8,
                od: 89,
              },
            ],
            id: 57337138,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlisle United',
                ty: 8,
                od: 106,
              },
            ],
            id: 57337137,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fleetwood Town',
                ty: 8,
                od: 106,
              },
            ],
            id: 57337148,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burton Albion',
                ty: 8,
                od: 151,
              },
            ],
            id: 57337149,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cheltenham Town',
                ty: 8,
                od: 201,
              },
            ],
            id: 57337140,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Promotion',
      },
    ],
    tms: 48,
    tps: [],
    lg: {
      na: 'England League One',
      id: 11091,
      or: 41,
      lurl: 'https://static.fastbs55.com/data/b60c4c46b8aefad6feb4e3c936fd66b4.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 110910000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1416340,
    bt: 1716055200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England League One 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Notts County',
                ty: 8,
                od: 3.2,
              },
            ],
            id: 57081834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wrexham AFC',
                ty: 8,
                od: 4.54,
              },
            ],
            id: 57081831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stockport County FC',
                ty: 8,
                od: 6.2,
              },
            ],
            id: 57081841,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mansfield Town',
                ty: 8,
                od: 7,
              },
            ],
            id: 57081850,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gillingham FC',
                ty: 8,
                od: 14.6,
              },
            ],
            id: 57081851,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swindon Town',
                ty: 8,
                od: 19.7,
              },
            ],
            id: 57081837,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Milton Keynes Dons',
                ty: 8,
                od: 23,
              },
            ],
            id: 57081832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bradford City',
                ty: 8,
                od: 29,
              },
            ],
            id: 57081838,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Wimbledon',
                ty: 8,
                od: 55,
              },
            ],
            id: 57081852,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barrow AFC',
                ty: 8,
                od: 85,
              },
            ],
            id: 57081846,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grimsby Town',
                ty: 8,
                od: 131,
              },
            ],
            id: 57081847,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Accrington Stanley',
                ty: 8,
                od: 136,
              },
            ],
            id: 57081843,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crewe Alexandra',
                ty: 8,
                od: 136,
              },
            ],
            id: 57081845,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Salford City',
                ty: 8,
                od: 136,
              },
            ],
            id: 57081849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crawley Town',
                ty: 8,
                od: 146,
              },
            ],
            id: 57081835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Walsall FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 57081853,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newport County',
                ty: 8,
                od: 151,
              },
            ],
            id: 57081836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Doncaster Rovers',
                ty: 8,
                od: 201,
              },
            ],
            id: 57081830,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Morecambe FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 57081844,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tranmere Rovers',
                ty: 8,
                od: 201,
              },
            ],
            id: 57081842,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colchester United',
                ty: 8,
                od: 201,
              },
            ],
            id: 57081840,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Harrogate Town',
                ty: 8,
                od: 201,
              },
            ],
            id: 57081848,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Forest Green Rovers',
                ty: 8,
                od: 251,
              },
            ],
            id: 57081839,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sutton United',
                ty: 8,
                od: 451,
              },
            ],
            id: 57081833,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1989,
        mks: [
          {
            op: [
              {
                nm: 'Notts County',
                ty: 8,
                od: 1.38,
              },
            ],
            id: 57641994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wrexham AFC',
                ty: 8,
                od: 1.68,
              },
            ],
            id: 57641990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stockport County FC',
                ty: 8,
                od: 1.8,
              },
            ],
            id: 57641999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mansfield Town',
                ty: 8,
                od: 1.86,
              },
            ],
            id: 57642010,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gillingham FC',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 57641997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swindon Town',
                ty: 8,
                od: 3.59,
              },
            ],
            id: 57642001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bradford City',
                ty: 8,
                od: 3.68,
              },
            ],
            id: 57641991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Milton Keynes Dons',
                ty: 8,
                od: 4.13,
              },
            ],
            id: 57642005,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Wimbledon',
                ty: 8,
                od: 5.7,
              },
            ],
            id: 57642000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barrow AFC',
                ty: 8,
                od: 8.4,
              },
            ],
            id: 57642008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Accrington Stanley',
                ty: 8,
                od: 10.5,
              },
            ],
            id: 57642012,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grimsby Town',
                ty: 8,
                od: 12.7,
              },
            ],
            id: 57641995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crewe Alexandra',
                ty: 8,
                od: 15.9,
              },
            ],
            id: 57642007,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Salford City',
                ty: 8,
                od: 15.9,
              },
            ],
            id: 57642011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crawley Town',
                ty: 8,
                od: 18,
              },
            ],
            id: 57641993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newport County',
                ty: 8,
                od: 20,
              },
            ],
            id: 57641998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Walsall FC',
                ty: 8,
                od: 22,
              },
            ],
            id: 57641992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Morecambe FC',
                ty: 8,
                od: 43,
              },
            ],
            id: 57642004,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colchester United',
                ty: 8,
                od: 43,
              },
            ],
            id: 57642003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Harrogate Town',
                ty: 8,
                od: 54,
              },
            ],
            id: 57641996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Doncaster Rovers',
                ty: 8,
                od: 71,
              },
            ],
            id: 57642006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tranmere Rovers',
                ty: 8,
                od: 71,
              },
            ],
            id: 57642009,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Forest Green Rovers',
                ty: 8,
                od: 71,
              },
            ],
            id: 57641989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sutton United',
                ty: 8,
                od: 106,
              },
            ],
            id: 57642002,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Promotion',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Sutton United',
                ty: 8,
                od: 2.81,
              },
            ],
            id: 63418812,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Forest Green Rovers',
                ty: 8,
                od: 3.72,
              },
            ],
            id: 63418808,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Doncaster Rovers',
                ty: 8,
                od: 4.18,
              },
            ],
            id: 63418792,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tranmere Rovers',
                ty: 8,
                od: 4.72,
              },
            ],
            id: 63418806,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Morecambe FC',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 63418799,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colchester United',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 63418807,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Harrogate Town',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 63418810,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crawley Town',
                ty: 8,
                od: 11.7,
              },
            ],
            id: 63418803,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Walsall FC',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 63418796,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newport County',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 63418805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Accrington Stanley',
                ty: 8,
                od: 16,
              },
            ],
            id: 63418797,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crewe Alexandra',
                ty: 8,
                od: 16,
              },
            ],
            id: 63418802,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Salford City',
                ty: 8,
                od: 16,
              },
            ],
            id: 63418809,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grimsby Town',
                ty: 8,
                od: 18.2,
              },
            ],
            id: 63418794,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barrow AFC',
                ty: 8,
                od: 20,
              },
            ],
            id: 63418811,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Wimbledon',
                ty: 8,
                od: 36,
              },
            ],
            id: 63418804,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bradford City',
                ty: 8,
                od: 55,
              },
            ],
            id: 63418800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swindon Town',
                ty: 8,
                od: 88,
              },
            ],
            id: 63418790,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Milton Keynes Dons',
                ty: 8,
                od: 88,
              },
            ],
            id: 63418798,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gillingham FC',
                ty: 8,
                od: 136,
              },
            ],
            id: 63418801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stockport County FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 63418795,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mansfield Town',
                ty: 8,
                od: 251,
              },
            ],
            id: 63418789,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wrexham AFC',
                ty: 8,
                od: 501,
              },
            ],
            id: 63418791,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Notts County',
                ty: 8,
                od: 501,
              },
            ],
            id: 63418793,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
    ],
    tms: 72,
    tps: [],
    lg: {
      na: 'England League Two',
      id: 11064,
      or: 42,
      lurl: 'https://static.fastbs55.com/data/afafd3769b3381881aabf9f27895fbd.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 110640000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1416367,
    bt: 1716055200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England League Two 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Fortaleza EC CE',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 50924249,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LDU Quito',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 46653056,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Corinthians SP',
                ty: 8,
                od: 4.36,
              },
            ],
            id: 60008801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Defensa y Justicia',
                ty: 8,
                od: 7.15,
              },
            ],
            id: 46653055,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 4,
    tps: [],
    lg: {
      na: 'Copa Sudamericana',
      id: 11188,
      or: 45,
      lurl: 'https://static.fastbs55.com/9a0ee7a07ab6c3d0996a7f7101b1066d.png',
      sid: 1,
      rid: 314,
      rnm: 'South America',
      hot: false,
      slid: 111880000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1242125,
    bt: 1696456800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Copa Sudamericana 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Melbourne City FC',
                ty: 8,
                od: 3.9,
              },
            ],
            id: 58574801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Central Coast Mariners FC',
                ty: 8,
                od: 7.5,
              },
            ],
            id: 58574793,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Western Sydney Wanderers FC',
                ty: 8,
                od: 7.8,
              },
            ],
            id: 58574796,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sydney FC',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 58574791,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Adelaide United FC',
                ty: 8,
                od: 10.4,
              },
            ],
            id: 58574800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Melbourne Victory FC',
                ty: 8,
                od: 10.6,
              },
            ],
            id: 58574795,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Western United FC',
                ty: 8,
                od: 12.3,
              },
            ],
            id: 58574798,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wellington Phoenix FC',
                ty: 8,
                od: 17.4,
              },
            ],
            id: 58574802,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Macarthur FC',
                ty: 8,
                od: 22,
              },
            ],
            id: 58574792,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brisbane Roar FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 58574797,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United Jets FC',
                ty: 8,
                od: 25,
              },
            ],
            id: 58574794,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Perth Glory FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 58574799,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Australia A-League',
      id: 10406,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/8165253ff2fe7bbed4694db7f72ffe97.png',
      sid: 1,
      rid: 78,
      rnm: 'Australia',
      hot: true,
      slid: 104060000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1442977,
    bt: 1717833600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Australia A-League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Fredrikstad FK',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 57789985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'KFUM Oslo',
                ty: 8,
                od: 9.8,
              },
            ],
            id: 57789986,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kongsvinger IL Fotball',
                ty: 8,
                od: 12.3,
              },
            ],
            id: 57789973,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'IK Start',
                ty: 8,
                od: 301,
              },
            ],
            id: 57789980,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kristiansund BK',
                ty: 8,
                od: 351,
              },
            ],
            id: 57789988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sogndal IL',
                ty: 8,
                od: 601,
              },
            ],
            id: 57789981,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 6,
    tps: [],
    lg: {
      na: 'Norway 1st Division',
      id: 10407,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/bb6dc973b370315b3122970791e13e94.png',
      sid: 1,
      rid: 65,
      rnm: 'Norway',
      hot: false,
      slid: 104070000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1145534,
    bt: 1699801200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Norway 1st Division 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'GNK Dinamo Zagreb',
                ty: 8,
                od: 1.4,
              },
            ],
            id: 60773606,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HNK Hajduk Split',
                ty: 8,
                od: 4.04,
              },
            ],
            id: 60773602,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HNK Rijeka',
                ty: 8,
                od: 9.6,
              },
            ],
            id: 60773604,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Osijek',
                ty: 8,
                od: 30,
              },
            ],
            id: 60773607,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Varazdin',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773603,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Slaven Belupo',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773608,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Istra 1961',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773609,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Lokomotiva Zagreb',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773601,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HNK Gorica',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773610,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NK Rudes Zagreb',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773605,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Croatia HNL League',
      id: 10483,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/ee963321e823014de851e4e51519bbd2.png',
      sid: 1,
      rid: 51,
      rnm: 'Croatia',
      hot: false,
      slid: 104830000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1489570,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Croatia HNL League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Bodo/Glimt',
                ty: 8,
                od: 1.67,
              },
            ],
            id: 42952949,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Viking FK',
                ty: 8,
                od: 2.74,
              },
            ],
            id: 42952955,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tromsoe IL',
                ty: 8,
                od: 10,
              },
            ],
            id: 42952948,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Brann',
                ty: 8,
                od: 31,
              },
            ],
            id: 42952946,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 39,
              },
            ],
            id: 42952944,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lillestrom SK',
                ty: 8,
                od: 121,
              },
            ],
            id: 42952943,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sarpsborg 08',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42952947,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 7,
    tps: [],
    lg: {
      na: 'Norway Eliteserien',
      id: 10489,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/365e4bb868cc0370959caa752ddb1c52.png',
      sid: 1,
      rid: 65,
      rnm: 'Norway',
      hot: true,
      slid: 104890000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1145533,
    bt: 1701529200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Norway Eliteserien 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'SK Slovan Bratislava',
                ty: 8,
                od: 1.49,
              },
            ],
            id: 60773590,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'DAC 1904 Dunajska Streda',
                ty: 8,
                od: 3.78,
              },
            ],
            id: 60773588,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MSK Zilina',
                ty: 8,
                od: 15.8,
              },
            ],
            id: 60773585,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Trencin',
                ty: 8,
                od: 21,
              },
            ],
            id: 60773591,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Spartak Trnava',
                ty: 8,
                od: 26,
              },
            ],
            id: 60773587,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Zeleziarne Podbrezova',
                ty: 8,
                od: 26,
              },
            ],
            id: 60773594,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MFk Dukla Banska Bystrica',
                ty: 8,
                od: 42,
              },
            ],
            id: 60773596,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MFK Ruzomberok',
                ty: 8,
                od: 126,
              },
            ],
            id: 60773592,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MFK Skalica',
                ty: 8,
                od: 601,
              },
            ],
            id: 60773589,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vion Zlate Moravce',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773593,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MFK Zemplin Michalovce',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773595,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Kosice',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60773586,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Slovakia Superliga',
      id: 10521,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/80dd6af851033d6fab431b3213a38a38.png',
      sid: 1,
      rid: 38,
      rnm: 'Slovakia',
      hot: false,
      slid: 105210000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1489535,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Slovakia Superliga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 60581259,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 4.98,
              },
            ],
            id: 60581265,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 22,
              },
            ],
            id: 60581260,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Rapid Wien',
                ty: 8,
                od: 91,
              },
            ],
            id: 60581264,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Austria Klagenfurt',
                ty: 8,
                od: 251,
              },
            ],
            id: 60581258,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSV Hartberg',
                ty: 8,
                od: 301,
              },
            ],
            id: 60581266,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Austria Wien',
                ty: 8,
                od: 951,
              },
            ],
            id: 60581256,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria Lustenau',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60581261,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SCR Altach',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60581262,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolfsberger AC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60581263,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'WSG Tirol',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60581255,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blau Weiss Linz',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60581257,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Austria Bundesliga',
      id: 10522,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/b0ce8639de2e90a3b1f7f8c12ed1745.png',
      sid: 1,
      rid: 24,
      rnm: 'Austria',
      hot: false,
      slid: 105220000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1483179,
    bt: 1716660000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Austria Bundesliga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 1.51,
              },
            ],
            id: 59198913,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hibernian FC',
                ty: 8,
                od: 5.7,
              },
            ],
            id: 59198895,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 59198879,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Heart of Midlothian FC',
                ty: 8,
                od: 9.45,
              },
            ],
            id: 59198910,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 4,
    tps: [],
    lg: {
      na: 'Scotland League Cup',
      id: 10523,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/e1004b535a0cb8858778b8876dbe92cc.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 105230000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1456031,
    bt: 1702828800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Scotland League Cup 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Al Hilal',
                ty: 8,
                od: 2.63,
              },
            ],
            id: 63486140,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Al Ittihad Jeddah',
                ty: 8,
                od: 3.15,
              },
            ],
            id: 63486146,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Nassr FC',
                ty: 8,
                od: 5.25,
              },
            ],
            id: 63486145,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Ahli Saudi',
                ty: 8,
                od: 7.1,
              },
            ],
            id: 63486134,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Ettifaq FC',
                ty: 8,
                od: 15.7,
              },
            ],
            id: 63486150,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Taawoun FC',
                ty: 8,
                od: 35,
              },
            ],
            id: 63486141,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Shabab FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 63486138,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Wehda FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 63486139,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Fateh SC',
                ty: 8,
                od: 121,
              },
            ],
            id: 63486144,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Fayha FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 63486148,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Khaleej Saihat FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 63486135,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Tai',
                ty: 8,
                od: 251,
              },
            ],
            id: 63486147,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Raed FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 63486133,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Abha Club',
                ty: 8,
                od: 251,
              },
            ],
            id: 63486137,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Hazem FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 63486142,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Damac FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 63486149,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Akhdood',
                ty: 8,
                od: 601,
              },
            ],
            id: 63486143,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AL Riyadh',
                ty: 8,
                od: 901,
              },
            ],
            id: 63486136,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Cristiano Ronaldo',
                ty: 8,
                od: 2,
              },
            ],
            id: 70934693,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim Benzema',
                ty: 8,
                od: 8.5,
              },
            ],
            id: 70934684,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sadio Mane',
                ty: 8,
                od: 9.45,
              },
            ],
            id: 70934706,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aleksandar Mitrovic',
                ty: 8,
                od: 12.2,
              },
            ],
            id: 70934679,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Moussa Dembele',
                ty: 8,
                od: 23,
              },
            ],
            id: 70934692,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Neymar JR',
                ty: 8,
                od: 27,
              },
            ],
            id: 70934708,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Roberto Firmino',
                ty: 8,
                od: 30,
              },
            ],
            id: 70934712,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Abderrazak Hamdallah',
                ty: 8,
                od: 30,
              },
            ],
            id: 70934683,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Riyad Mahrez',
                ty: 8,
                od: 39,
              },
            ],
            id: 70934709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Anderson Talisca',
                ty: 8,
                od: 48,
              },
            ],
            id: 70934686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Malcom Filipe Silva de Oliveira',
                ty: 8,
                od: 63,
              },
            ],
            id: 70934704,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Firas Al Buraikan',
                ty: 8,
                od: 95,
              },
            ],
            id: 70934701,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Romario Ricardo da Silva',
                ty: 8,
                od: 136,
              },
            ],
            id: 70934694,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlos Junior',
                ty: 8,
                od: 151,
              },
            ],
            id: 70934710,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Robin Quaison',
                ty: 8,
                od: 151,
              },
            ],
            id: 70934707,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mourad Batna',
                ty: 8,
                od: 151,
              },
            ],
            id: 70934682,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Allan Saint Maximin',
                ty: 8,
                od: 151,
              },
            ],
            id: 70934702,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joao Pedro Neves Filipe',
                ty: 8,
                od: 251,
              },
            ],
            id: 70934699,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Moussa Marega',
                ty: 8,
                od: 251,
              },
            ],
            id: 70934685,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Guy Mbenza',
                ty: 8,
                od: 301,
              },
            ],
            id: 70934687,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Abdullah Al Mogren',
                ty: 8,
                od: 301,
              },
            ],
            id: 70934689,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sergej Milinkovic Savic',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934695,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Felipe Caicedo',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934697,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leandre Tawamba',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934711,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Anthony Nwakaeme',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934691,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Julio Tavares',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934690,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Milan Pavkov',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934681,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fabio Martins',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934688,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim El Berkaoui',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934703,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mohamed Fouzair',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934713,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saad Bguir',
                ty: 8,
                od: 351,
              },
            ],
            id: 70934698,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jean David Beauguel',
                ty: 8,
                od: 401,
              },
            ],
            id: 70934705,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saleh Al Shehri',
                ty: 8,
                od: 601,
              },
            ],
            id: 70934700,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Andre Carrillo',
                ty: 8,
                od: 601,
              },
            ],
            id: 70934696,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ruben Neves',
                ty: 8,
                od: 951,
              },
            ],
            id: 70934680,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
    ],
    tms: 53,
    tps: [],
    lg: {
      na: 'Saudi Arabia Professional League',
      id: 10527,
      or: 9999,
      lurl: 'https://static.fastbs55.com/7f7e2281d14e60e4e23b3a4f95b36081.png',
      sid: 1,
      rid: 90,
      rnm: 'Saudi Arabia',
      hot: false,
      slid: 105270000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1502654,
    bt: 1716681600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Saudi Arabia Professional League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Falkirk FC',
                ty: 8,
                od: 1.92,
              },
            ],
            id: 63486071,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hamilton Academical FC',
                ty: 8,
                od: 2.56,
              },
            ],
            id: 63486067,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queen of The South FC',
                ty: 8,
                od: 14.3,
              },
            ],
            id: 63486075,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cove Rangers FC',
                ty: 8,
                od: 16.4,
              },
            ],
            id: 63486070,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montrose FC',
                ty: 8,
                od: 20,
              },
            ],
            id: 63486074,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stirling Albion FC',
                ty: 8,
                od: 42,
              },
            ],
            id: 63486073,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kelty Hearts FC',
                ty: 8,
                od: 46,
              },
            ],
            id: 63486069,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alloa Athletic FC',
                ty: 8,
                od: 73,
              },
            ],
            id: 63486072,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Annan Athletic FC',
                ty: 8,
                od: 106,
              },
            ],
            id: 63486076,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Edinburgh City FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 63486068,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Scotland League One',
      id: 10535,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/9548655651d833a1dbb07e34853b1460.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 105350000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1498092,
    bt: 1714831200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Scotland League One 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Groningen',
                ty: 8,
                od: 3.62,
              },
            ],
            id: 60644568,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Roda JC Kerkrade',
                ty: 8,
                od: 4.84,
              },
            ],
            id: 60644558,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Cambuur',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 60644557,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Willem II Tilburg',
                ty: 8,
                od: 7.2,
              },
            ],
            id: 60644563,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VVV Venlo',
                ty: 8,
                od: 8.85,
              },
            ],
            id: 60644559,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ADO Den Haag',
                ty: 8,
                od: 15.2,
              },
            ],
            id: 60644555,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Emmen',
                ty: 8,
                od: 15.2,
              },
            ],
            id: 60644562,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'De Graafschap',
                ty: 8,
                od: 25,
              },
            ],
            id: 60644567,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NAC Breda',
                ty: 8,
                od: 40,
              },
            ],
            id: 60644549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Eindhoven',
                ty: 8,
                od: 49,
              },
            ],
            id: 60644551,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MVV Maastricht',
                ty: 8,
                od: 121,
              },
            ],
            id: 60644556,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dordrecht',
                ty: 8,
                od: 121,
              },
            ],
            id: 60644550,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jong PSV Eindhoven',
                ty: 8,
                od: 121,
              },
            ],
            id: 60644552,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Helmond Sport',
                ty: 8,
                od: 151,
              },
            ],
            id: 60644561,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Den Bosch',
                ty: 8,
                od: 201,
              },
            ],
            id: 60644565,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jong AZ Alkmaar',
                ty: 8,
                od: 201,
              },
            ],
            id: 60644566,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jong FC Utrecht',
                ty: 8,
                od: 551,
              },
            ],
            id: 60644554,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Telstar',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60644560,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TOP Oss',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60644564,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jong Ajax Amsterdam',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60644553,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Netherlands Eerste Divisie',
      id: 10584,
      or: 9999,
      lurl: 'https://static.fastbs55.com/7629a2a96c7d224d650c144ce41529f6.png',
      sid: 1,
      rid: 305,
      rnm: 'Netherlands',
      hot: false,
      slid: 105840000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1483498,
    bt: 1715364000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Netherlands Eerste Divisie 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Salzburg',
                ty: 8,
                od: 1.95,
              },
            ],
            id: 60773533,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 60773537,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 60773543,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Rapid Wien',
                ty: 8,
                od: 10.1,
              },
            ],
            id: 60773539,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Austria Wien',
                ty: 8,
                od: 18.1,
              },
            ],
            id: 60773536,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolfsberger AC',
                ty: 8,
                od: 26,
              },
            ],
            id: 60773538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Austria Klagenfurt',
                ty: 8,
                od: 26,
              },
            ],
            id: 60773540,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSV Hartberg',
                ty: 8,
                od: 39,
              },
            ],
            id: 60773534,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blau Weiss Linz',
                ty: 8,
                od: 46,
              },
            ],
            id: 60773535,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Austria Lustenau',
                ty: 8,
                od: 52,
              },
            ],
            id: 60773542,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Austria OFB Cup',
      id: 10586,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/7c22d5cec1d84faba8099604c196a37b.png',
      sid: 1,
      rid: 24,
      rnm: 'Austria',
      hot: false,
      slid: 105860000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1487755,
    bt: 1714593600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Austria OFB Cup 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 2.45,
              },
            ],
            id: 58332699,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 2.72,
              },
            ],
            id: 58332700,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 5,
              },
            ],
            id: 58332698,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 8.05,
              },
            ],
            id: 58332697,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 4,
    tps: [],
    lg: {
      na: 'Italy Super Cup',
      id: 10594,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/2a3a02e18d33628ac43fd1ae1e9272c8.png',
      sid: 1,
      rid: 29,
      rnm: 'Italia',
      hot: true,
      slid: 105940000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1440281,
    bt: 1705254300000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2024',
    nm: 'Italy Super Cup 2024',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Dundee United',
                ty: 8,
                od: 1.75,
              },
            ],
            id: 60644573,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Partick Thistle FC',
                ty: 8,
                od: 6.35,
              },
            ],
            id: 60644569,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Raith Rovers FC',
                ty: 8,
                od: 6.6,
              },
            ],
            id: 60644577,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dunfermline Athletic FC',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 60644570,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park FC',
                ty: 8,
                od: 22,
              },
            ],
            id: 60644578,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inverness CT',
                ty: 8,
                od: 29,
              },
            ],
            id: 60644572,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arbroath FC',
                ty: 8,
                od: 30,
              },
            ],
            id: 60644574,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Airdrieonians FC',
                ty: 8,
                od: 38,
              },
            ],
            id: 60644575,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ayr United FC',
                ty: 8,
                od: 46,
              },
            ],
            id: 60644571,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greenock Morton FC',
                ty: 8,
                od: 58,
              },
            ],
            id: 60644576,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Scotland Championship',
      id: 10596,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/a68619fdc26e70a4b665e5847308e883.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 105960000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1483506,
    bt: 1717437600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Scotland Championship 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Stenhousemuir FC',
                ty: 8,
                od: 4.7,
              },
            ],
            id: 63486080,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dumbarton FC',
                ty: 8,
                od: 5.15,
              },
            ],
            id: 63486079,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Peterhead FC',
                ty: 8,
                od: 5.2,
              },
            ],
            id: 63486084,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spartans FC',
                ty: 8,
                od: 7,
              },
            ],
            id: 63486086,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'East Fife FC',
                ty: 8,
                od: 9.9,
              },
            ],
            id: 63486085,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Forfar Athletic FC',
                ty: 8,
                od: 9.9,
              },
            ],
            id: 63486081,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bonnyrigg Rose',
                ty: 8,
                od: 12,
              },
            ],
            id: 63486083,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stranraer FC',
                ty: 8,
                od: 14.6,
              },
            ],
            id: 63486082,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Clyde FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 63486078,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Elgin City FC',
                ty: 8,
                od: 46,
              },
            ],
            id: 63486087,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Scotland League Two',
      id: 10619,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/932927f0930f4508a2e4e9c327c7fa44.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 106190000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1498093,
    bt: 1717372800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Scotland League Two 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 3.68,
              },
            ],
            id: 62701241,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 11,
              },
            ],
            id: 62701247,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 13,
              },
            ],
            id: 62701246,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 13,
              },
            ],
            id: 62701244,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 14.5,
              },
            ],
            id: 62701242,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 62701243,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 15.7,
              },
            ],
            id: 62701245,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 16.7,
              },
            ],
            id: 62701251,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 19.4,
              },
            ],
            id: 66517276,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting CP',
                ty: 8,
                od: 21,
              },
            ],
            id: 62701250,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ajax Amsterdam',
                ty: 8,
                od: 29,
              },
            ],
            id: 67511825,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 31,
              },
            ],
            id: 62701248,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 31,
              },
            ],
            id: 62701252,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 60,
              },
            ],
            id: 67511827,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AEK Athens',
                ty: 8,
                od: 90,
              },
            ],
            id: 67534491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 90,
              },
            ],
            id: 67511826,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympiacos Piraeus',
                ty: 8,
                od: 90,
              },
            ],
            id: 67511830,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 90,
              },
            ],
            id: 62701249,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Saint Gilloise',
                ty: 8,
                od: 90,
              },
            ],
            id: 67511832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Haifa FC',
                ty: 8,
                od: 136,
              },
            ],
            id: 67534492,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 136,
              },
            ],
            id: 67534493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 136,
              },
            ],
            id: 66517275,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 151,
              },
            ],
            id: 67511828,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panathinaikos Athens',
                ty: 8,
                od: 151,
              },
            ],
            id: 67534494,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Qarabag FK',
                ty: 8,
                od: 151,
              },
            ],
            id: 67511829,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RKS Rakow Czestochowa',
                ty: 8,
                od: 151,
              },
            ],
            id: 67534498,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 201,
              },
            ],
            id: 67534495,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 201,
              },
            ],
            id: 67534496,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK TSC Backa Topola',
                ty: 8,
                od: 201,
              },
            ],
            id: 66691336,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aris Limassol FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 67534497,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Servette Geneva',
                ty: 8,
                od: 451,
              },
            ],
            id: 66691335,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sheriff Tiraspol',
                ty: 8,
                od: 451,
              },
            ],
            id: 67511831,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1988,
        mks: [
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 1.65,
              },
            ],
            id: 67666802,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 2.45,
              },
            ],
            id: 67666800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympiacos Piraeus',
                ty: 8,
                od: 13.2,
              },
            ],
            id: 67666801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK TSC Backa Topola',
                ty: 8,
                od: 74,
              },
            ],
            id: 67666803,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Winner',
      },
      {
        mty: 1980,
        mks: [
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68318762,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 68318760,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympiacos Piraeus',
                ty: 8,
                od: 4.25,
              },
            ],
            id: 68318761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK TSC Backa Topola',
                ty: 8,
                od: 23,
              },
            ],
            id: 68318763,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group A Top 2',
      },
      {
        mty: 1987,
        mks: [
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 67668018,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 3,
              },
            ],
            id: 67668019,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ajax Amsterdam',
                ty: 8,
                od: 5.05,
              },
            ],
            id: 67668016,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AEK Athens',
                ty: 8,
                od: 5.65,
              },
            ],
            id: 67668017,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Winner',
      },
      {
        mty: 1979,
        mks: [
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 1.41,
              },
            ],
            id: 68319081,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 68319082,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ajax Amsterdam',
                ty: 8,
                od: 2.18,
              },
            ],
            id: 68319079,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AEK Athens',
                ty: 8,
                od: 2.78,
              },
            ],
            id: 68319080,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group B Top 2',
      },
      {
        mty: 1986,
        mks: [
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 2.22,
              },
            ],
            id: 67669843,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 67669841,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 4.68,
              },
            ],
            id: 67669842,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aris Limassol FC',
                ty: 8,
                od: 28,
              },
            ],
            id: 67669844,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Winner',
      },
      {
        mty: 1978,
        mks: [
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 68319252,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 1.35,
              },
            ],
            id: 68319250,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 2.45,
              },
            ],
            id: 68319251,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aris Limassol FC',
                ty: 8,
                od: 8.55,
              },
            ],
            id: 68319253,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group C Top 2',
      },
      {
        mty: 1985,
        mks: [
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 1.8,
              },
            ],
            id: 67670490,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting CP',
                ty: 8,
                od: 2.31,
              },
            ],
            id: 67670489,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 13.2,
              },
            ],
            id: 67670488,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RKS Rakow Czestochowa',
                ty: 8,
                od: 24,
              },
            ],
            id: 67670491,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Winner',
      },
      {
        mty: 1977,
        mks: [
          {
            op: [
              {
                nm: 'Sporting CP',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 68319393,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 1.09,
              },
            ],
            id: 68319394,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 6.35,
              },
            ],
            id: 68319392,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RKS Rakow Czestochowa',
                ty: 8,
                od: 8.6,
              },
            ],
            id: 68319395,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group D Top 2',
      },
      {
        mty: 1984,
        mks: [
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 67672872,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Saint Gilloise',
                ty: 8,
                od: 17.4,
              },
            ],
            id: 67672875,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 19.4,
              },
            ],
            id: 67672873,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 101,
              },
            ],
            id: 67672874,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Winner',
      },
      {
        mty: 1976,
        mks: [
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68319583,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 1.86,
              },
            ],
            id: 68319584,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Saint Gilloise',
                ty: 8,
                od: 2.13,
              },
            ],
            id: 68319586,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 8.75,
              },
            ],
            id: 68319585,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group E Top 2',
      },
      {
        mty: 1983,
        mks: [
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 2.22,
              },
            ],
            id: 67674574,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 2.36,
              },
            ],
            id: 67674575,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panathinaikos Athens',
                ty: 8,
                od: 5.25,
              },
            ],
            id: 67674576,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Haifa FC',
                ty: 8,
                od: 26,
              },
            ],
            id: 67674573,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Winner',
      },
      {
        mty: 1975,
        mks: [
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 68319740,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 1.36,
              },
            ],
            id: 68319741,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panathinaikos Athens',
                ty: 8,
                od: 2.24,
              },
            ],
            id: 68319742,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Haifa FC',
                ty: 8,
                od: 8.4,
              },
            ],
            id: 68319739,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group F Top 2',
      },
      {
        mty: 1982,
        mks: [
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 67675900,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 6,
              },
            ],
            id: 67675901,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Servette Geneva',
                ty: 8,
                od: 26,
              },
            ],
            id: 67675902,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sheriff Tiraspol',
                ty: 8,
                od: 31,
              },
            ],
            id: 67675903,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Winner',
      },
      {
        mty: 1974,
        mks: [
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68319894,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 1.09,
              },
            ],
            id: 68319895,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Servette Geneva',
                ty: 8,
                od: 7.25,
              },
            ],
            id: 68319896,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sheriff Tiraspol',
                ty: 8,
                od: 11.6,
              },
            ],
            id: 68319897,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group G Top 2',
      },
      {
        mty: 1981,
        mks: [
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 1.17,
              },
            ],
            id: 67676848,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Qarabag FK',
                ty: 8,
                od: 7.1,
              },
            ],
            id: 67676849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 13.5,
              },
            ],
            id: 67676847,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 31,
              },
            ],
            id: 67676850,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Winner',
      },
      {
        mty: 1973,
        mks: [
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 68319955,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Qarabag FK',
                ty: 8,
                od: 1.76,
              },
            ],
            id: 68319956,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 2.06,
              },
            ],
            id: 68319954,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 68319957,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Group H Top 2',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68326064,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 10,
              },
            ],
            id: 68326065,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group A - West Ham United',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.09,
              },
            ],
            id: 68326352,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 68326353,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group A - SC Freiburg',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.18,
              },
            ],
            id: 68326491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 4.21,
              },
            ],
            id: 68326490,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group A - Olympiacos Piraeus',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68326705,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 21,
              },
            ],
            id: 68326704,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group A - FK TSC Backa Topola',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.52,
              },
            ],
            id: 68326994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 68326995,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group B - Brighton & Hove Albion FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.4,
              },
            ],
            id: 68327066,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.59,
              },
            ],
            id: 68327067,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group B - Olympique Marseille',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.59,
              },
            ],
            id: 68327143,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.13,
              },
            ],
            id: 68327142,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group B - Ajax Amsterdam',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.46,
              },
            ],
            id: 68327201,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.56,
              },
            ],
            id: 68327200,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group B - AEK Athens',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.14,
              },
            ],
            id: 68327709,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 5.2,
              },
            ],
            id: 68327710,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group C - Real Betis',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.37,
              },
            ],
            id: 68327873,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 2.77,
              },
            ],
            id: 68327874,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group C - Glasgow Rangers',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.45,
              },
            ],
            id: 68328045,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.46,
              },
            ],
            id: 68328044,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group C - AC Sparta Prague',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68328301,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.25,
              },
            ],
            id: 68328300,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group C - Aris Limassol FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.06,
              },
            ],
            id: 68328515,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 6.95,
              },
            ],
            id: 68328516,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group D - Atalanta BC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68328659,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 7.85,
              },
            ],
            id: 68328660,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group D - Sporting CP',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 68328849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 5.9,
              },
            ],
            id: 68328848,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group D - SK Sturm Graz',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.05,
              },
            ],
            id: 68328990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 7.9,
              },
            ],
            id: 68328989,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group D - RKS Rakow Czestochowa',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68329281,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 82,
              },
            ],
            id: 68329282,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group E - Liverpool FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.79,
              },
            ],
            id: 68329471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.89,
              },
            ],
            id: 68329472,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group E - Toulouse FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.66,
              },
            ],
            id: 68329659,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.04,
              },
            ],
            id: 68329658,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group E - Union Saint Gilloise',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68329805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 10.5,
              },
            ],
            id: 68329804,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group E - LASK',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.3,
              },
            ],
            id: 68329956,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 3.25,
              },
            ],
            id: 68329957,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group F - Villarreal CF',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 68330280,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 4.61,
              },
            ],
            id: 68330281,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group F - Stade Rennes',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.67,
              },
            ],
            id: 68331299,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.09,
              },
            ],
            id: 68331298,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group F - Panathinaikos Athens',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68331633,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.25,
              },
            ],
            id: 68331632,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group F - Maccabi Haifa FC',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68332060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 34,
              },
            ],
            id: 68332061,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group G - AS Roma',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.1,
              },
            ],
            id: 68332184,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 5.5,
              },
            ],
            id: 68332185,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group G - Slavia Prague',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68332317,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 68332316,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group G - Servette Geneva',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68332715,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 15.4,
              },
            ],
            id: 68332714,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group G - FC Sheriff Tiraspol',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68332870,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 37,
              },
            ],
            id: 68332871,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group H - Bayer Leverkusen',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.6,
              },
            ],
            id: 68333102,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 2.18,
              },
            ],
            id: 68333101,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group H - Molde FK',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.83,
              },
            ],
            id: 68333238,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 1.85,
              },
            ],
            id: 68333237,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group H - Qarabag FK',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'No',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 68333468,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yes',
                ty: 8,
                od: 12.4,
              },
            ],
            id: 68333467,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - To Qualify From Group H - BK Hacken',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 2.04,
              },
            ],
            id: 68314726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 68314728,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympiacos Piraeus',
                ty: 8,
                od: 5.65,
              },
            ],
            id: 68314727,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK TSC Backa Topola',
                ty: 8,
                od: 31,
              },
            ],
            id: 68314729,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group A - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 68314911,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 68314912,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ajax Amsterdam',
                ty: 8,
                od: 4.09,
              },
            ],
            id: 68314909,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AEK Athens',
                ty: 8,
                od: 5.1,
              },
            ],
            id: 68314910,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group B - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 2.5,
              },
            ],
            id: 68315011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 2.77,
              },
            ],
            id: 68315013,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 68315012,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aris Limassol FC',
                ty: 8,
                od: 12.5,
              },
            ],
            id: 68315014,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group C - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Sporting CP',
                ty: 8,
                od: 2.09,
              },
            ],
            id: 68315101,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 2.27,
              },
            ],
            id: 68315102,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 68315100,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RKS Rakow Czestochowa',
                ty: 8,
                od: 12.8,
              },
            ],
            id: 68315103,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group D - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 2.36,
              },
            ],
            id: 68315194,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Saint Gilloise',
                ty: 8,
                od: 2.36,
              },
            ],
            id: 68315196,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 6.1,
              },
            ],
            id: 68315193,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 10.3,
              },
            ],
            id: 68315195,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group E - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 2.59,
              },
            ],
            id: 68315280,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 2.59,
              },
            ],
            id: 68315281,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panathinaikos Athens',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 68315282,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maccabi Haifa FC',
                ty: 8,
                od: 14.5,
              },
            ],
            id: 68315279,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group F - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 1.44,
              },
            ],
            id: 68315472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 4.13,
              },
            ],
            id: 68315471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Servette Geneva',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 68315473,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sheriff Tiraspol',
                ty: 8,
                od: 16,
              },
            ],
            id: 68315474,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group G - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Qarabag FK',
                ty: 8,
                od: 2.31,
              },
            ],
            id: 68315620,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 2.86,
              },
            ],
            id: 68315618,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 4.31,
              },
            ],
            id: 68315619,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 68315621,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group H - Runner Up',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FK TSC Backa Topola',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 68316739,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympiacos Piraeus',
                ty: 8,
                od: 7.9,
              },
            ],
            id: 68316737,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 90,
              },
            ],
            id: 68316736,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 111,
              },
            ],
            id: 68316738,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group A - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'AEK Athens',
                ty: 8,
                od: 2,
              },
            ],
            id: 68316914,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ajax Amsterdam',
                ty: 8,
                od: 3.27,
              },
            ],
            id: 68316913,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 6.85,
              },
            ],
            id: 68316915,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 6.85,
              },
            ],
            id: 68316916,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group B - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Aris Limassol FC',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 68317095,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 5.5,
              },
            ],
            id: 68317093,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 17.1,
              },
            ],
            id: 68317092,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 34,
              },
            ],
            id: 68317094,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group C - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'RKS Rakow Czestochowa',
                ty: 8,
                od: 1.62,
              },
            ],
            id: 68317295,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sturm Graz',
                ty: 8,
                od: 2.22,
              },
            ],
            id: 68317292,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting CP',
                ty: 8,
                od: 43,
              },
            ],
            id: 68317293,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 71,
              },
            ],
            id: 68317294,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group D - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'LASK',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 68317427,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 7.45,
              },
            ],
            id: 68317426,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Saint Gilloise',
                ty: 8,
                od: 7.45,
              },
            ],
            id: 68317428,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 68317425,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group E - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Maccabi Haifa FC',
                ty: 8,
                od: 1.15,
              },
            ],
            id: 68317653,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Panathinaikos Athens',
                ty: 8,
                od: 6.5,
              },
            ],
            id: 68317656,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 24,
              },
            ],
            id: 68317654,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 24,
              },
            ],
            id: 68317655,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group F - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FC Sheriff Tiraspol',
                ty: 8,
                od: 1.46,
              },
            ],
            id: 68317807,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Servette Geneva',
                ty: 8,
                od: 2.54,
              },
            ],
            id: 68317806,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 43,
              },
            ],
            id: 68317805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 251,
              },
            ],
            id: 68317804,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group G - To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 1.2,
              },
            ],
            id: 68317934,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Molde FK',
                ty: 8,
                od: 6.65,
              },
            ],
            id: 68317931,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Qarabag FK',
                ty: 8,
                od: 8.95,
              },
            ],
            id: 68317933,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 251,
              },
            ],
            id: 68317932,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'UEFA Europa League - Group H - To Finish Bottom',
      },
    ],
    tms: 224,
    tps: [],
    lg: {
      na: 'UEFA Europa League',
      id: 10661,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/1f0c6bc1ed9e527a441da13811d6f009.png',
      sid: 1,
      rid: 309,
      rnm: 'Europe',
      hot: true,
      slid: 106610000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1520314,
    bt: 1702575900000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'UEFA Europa League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Ferencvarosi TC Budapest',
                ty: 8,
                od: 1.22,
              },
            ],
            id: 60773614,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Puskas Akademia FC',
                ty: 8,
                od: 18.6,
              },
            ],
            id: 60773613,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Debreceni VSC',
                ty: 8,
                od: 18.7,
              },
            ],
            id: 60773620,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paksi FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 60773622,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Diosgyori VTK',
                ty: 8,
                od: 29,
              },
            ],
            id: 60773619,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MTK Budapest',
                ty: 8,
                od: 34,
              },
            ],
            id: 60773618,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ujpest FC',
                ty: 8,
                od: 39,
              },
            ],
            id: 60773617,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kecskemeti TE',
                ty: 8,
                od: 39,
              },
            ],
            id: 60773611,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fehervar FC',
                ty: 8,
                od: 65,
              },
            ],
            id: 60773621,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kisvarda FC',
                ty: 8,
                od: 501,
              },
            ],
            id: 60773616,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mezokovesd Zsory SE',
                ty: 8,
                od: 651,
              },
            ],
            id: 60773612,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Zalaegerszeg TE',
                ty: 8,
                od: 701,
              },
            ],
            id: 60773615,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Hungary NB I',
      id: 10677,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/abcd1291968131e44276a9f5d36be145.png',
      sid: 1,
      rid: 45,
      rnm: 'Hungary',
      hot: false,
      slid: 106770000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1489815,
    bt: 1716651000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Hungary NB I 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 1.32,
              },
            ],
            id: 57790016,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 57790018,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Heart of Midlothian FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 57790015,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hibernian FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 57790009,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 57790011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Mirren FC',
                ty: 8,
                od: 351,
              },
            ],
            id: 57790017,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Motherwell FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 57790013,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kilmarnock FC',
                ty: 8,
                od: 751,
              },
            ],
            id: 57790010,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Johnstone FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57790007,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Livingston FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57790008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dundee',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62972306,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ross County FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57790012,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1970,
        mks: [
          {
            op: [
              {
                nm: 'ST Johnstone FC',
                ty: 8,
                od: 2.83,
              },
            ],
            id: 63454036,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dundee',
                ty: 8,
                od: 2.83,
              },
            ],
            id: 63454038,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ross County FC',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 63454039,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Livingston FC',
                ty: 8,
                od: 7.75,
              },
            ],
            id: 63454037,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kilmarnock FC',
                ty: 8,
                od: 13.6,
              },
            ],
            id: 63454032,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Motherwell FC',
                ty: 8,
                od: 26,
              },
            ],
            id: 63454033,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Mirren FC',
                ty: 8,
                od: 31,
              },
            ],
            id: 63454035,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hibernian FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 63454028,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 42,
              },
            ],
            id: 63454029,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Heart of Midlothian FC',
                ty: 8,
                od: 106,
              },
            ],
            id: 63454031,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63454030,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63454034,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'To Finish Bottom',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'Heart of Midlothian FC',
                ty: 8,
                od: 3.13,
              },
            ],
            id: 63472368,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 4.5,
              },
            ],
            id: 63472367,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hibernian FC',
                ty: 8,
                od: 5.4,
              },
            ],
            id: 63472366,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Motherwell FC',
                ty: 8,
                od: 6.5,
              },
            ],
            id: 63472370,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Mirren FC',
                ty: 8,
                od: 7.6,
              },
            ],
            id: 63472371,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kilmarnock FC',
                ty: 8,
                od: 28,
              },
            ],
            id: 63472369,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Livingston FC',
                ty: 8,
                od: 39,
              },
            ],
            id: 63472373,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ross County FC',
                ty: 8,
                od: 55,
              },
            ],
            id: 63472375,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dundee',
                ty: 8,
                od: 151,
              },
            ],
            id: 63472374,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Johnstone FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 63472372,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Scotland Premiership - Without Celtic Glasgow & Glasgow Rangers - Winner',
      },
    ],
    tms: 34,
    tps: [],
    lg: {
      na: 'Scotland Premiership',
      id: 10698,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/a5ed5b028a52fdb988785b74830d4605.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 106980000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1429976,
    bt: 1716134400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Scotland Premiership 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Celtic Glasgow',
                ty: 8,
                od: 2.56,
              },
            ],
            id: 60133984,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glasgow Rangers',
                ty: 8,
                od: 3.65,
              },
            ],
            id: 60133978,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberdeen FC',
                ty: 8,
                od: 11.4,
              },
            ],
            id: 60134007,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Heart of Midlothian FC',
                ty: 8,
                od: 14.1,
              },
            ],
            id: 60134000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hibernian FC',
                ty: 8,
                od: 18.1,
              },
            ],
            id: 60133999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Motherwell FC',
                ty: 8,
                od: 27,
              },
            ],
            id: 60133992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Livingston FC',
                ty: 8,
                od: 47,
              },
            ],
            id: 60133986,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Mirren FC',
                ty: 8,
                od: 48,
              },
            ],
            id: 60133970,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ST Johnstone FC',
                ty: 8,
                od: 48,
              },
            ],
            id: 60133991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kilmarnock FC',
                ty: 8,
                od: 60,
              },
            ],
            id: 60134001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ross County FC',
                ty: 8,
                od: 78,
              },
            ],
            id: 60133973,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dundee',
                ty: 8,
                od: 78,
              },
            ],
            id: 60133987,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dundee United',
                ty: 8,
                od: 95,
              },
            ],
            id: 60133979,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ayr United FC',
                ty: 8,
                od: 95,
              },
            ],
            id: 60133976,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park FC',
                ty: 8,
                od: 100,
              },
            ],
            id: 60133982,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dunfermline Athletic FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 60133988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Partick Thistle FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 60133996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greenock Morton FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 60133983,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Inverness CT',
                ty: 8,
                od: 116,
              },
            ],
            id: 60133981,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Airdrieonians FC',
                ty: 8,
                od: 141,
              },
            ],
            id: 60134004,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arbroath FC',
                ty: 8,
                od: 141,
              },
            ],
            id: 60134005,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Raith Rovers FC',
                ty: 8,
                od: 146,
              },
            ],
            id: 60133997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Falkirk FC',
                ty: 8,
                od: 146,
              },
            ],
            id: 60133974,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hamilton Academical FC',
                ty: 8,
                od: 146,
              },
            ],
            id: 60133977,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cove Rangers FC',
                ty: 8,
                od: 146,
              },
            ],
            id: 60133985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queen of The South FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60133998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Alloa Athletic FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60134009,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Edinburgh City FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60133993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montrose FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 60133975,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kelty Hearts FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 60134008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dumbarton FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 60133990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stirling Albion FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 60133994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Clyde FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 60133971,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stranraer FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 60134006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stenhousemuir FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 60133995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'East Fife FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 60134010,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Forfar Athletic FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 60134002,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Peterhead FC',
                ty: 8,
                od: 601,
              },
            ],
            id: 60134003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Annan Athletic FC',
                ty: 8,
                od: 851,
              },
            ],
            id: 60133969,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bonnyrigg Rose',
                ty: 8,
                od: 851,
              },
            ],
            id: 60133980,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Elgin City FC',
                ty: 8,
                od: 901,
              },
            ],
            id: 60133989,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 41,
    tps: [],
    lg: {
      na: 'Scotland FA Cup',
      id: 10701,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/21ae9e823d90b7776ce9474eef360920.png',
      sid: 1,
      rid: 490,
      rnm: 'Scotland',
      hot: false,
      slid: 107010000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1473702,
    bt: 1716662700000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Scotland FA Cup 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 1.36,
              },
            ],
            id: 57692958,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 7.45,
              },
            ],
            id: 57692960,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Broendby IF',
                ty: 8,
                od: 7.95,
              },
            ],
            id: 57692954,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Silkeborg IF',
                ty: 8,
                od: 17.5,
              },
            ],
            id: 57692956,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Midtjylland',
                ty: 8,
                od: 26,
              },
            ],
            id: 57692959,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AGF Aarhus',
                ty: 8,
                od: 46,
              },
            ],
            id: 57692957,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Viborg FF',
                ty: 8,
                od: 451,
              },
            ],
            id: 57692965,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lyngby BK',
                ty: 8,
                od: 551,
              },
            ],
            id: 57692964,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Odense Boldklub',
                ty: 8,
                od: 801,
              },
            ],
            id: 57692963,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Randers FC',
                ty: 8,
                od: 801,
              },
            ],
            id: 57692962,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vejle BK',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57692961,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hvidovre IF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57692955,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Hvidovre IF',
                ty: 8,
                od: 1.12,
              },
            ],
            id: 59204836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vejle BK',
                ty: 8,
                od: 1.22,
              },
            ],
            id: 59204833,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Odense Boldklub',
                ty: 8,
                od: 8.15,
              },
            ],
            id: 59204827,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Randers FC',
                ty: 8,
                od: 8.8,
              },
            ],
            id: 59204835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lyngby BK',
                ty: 8,
                od: 10,
              },
            ],
            id: 59204830,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Viborg FF',
                ty: 8,
                od: 12.8,
              },
            ],
            id: 59204825,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AGF Aarhus',
                ty: 8,
                od: 106,
              },
            ],
            id: 59204829,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Midtjylland',
                ty: 8,
                od: 301,
              },
            ],
            id: 59204826,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Silkeborg IF',
                ty: 8,
                od: 501,
              },
            ],
            id: 59204832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59204828,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Broendby IF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59204831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59204834,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
    ],
    tms: 24,
    tps: [],
    lg: {
      na: 'Denmark Superliga',
      id: 10744,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/a686726a07b45bdc2c0682361fe3670.png',
      sid: 1,
      rid: 13,
      rnm: 'Denmark',
      hot: false,
      slid: 107440000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1428491,
    bt: 1719252000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Denmark Superliga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Aalborg BK',
                ty: 8,
                od: 1.39,
              },
            ],
            id: 59199006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sonderjyske',
                ty: 8,
                od: 3.75,
              },
            ],
            id: 59199004,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Fredericia',
                ty: 8,
                od: 20,
              },
            ],
            id: 59198997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Horsens',
                ty: 8,
                od: 30,
              },
            ],
            id: 59198985,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hobro IK',
                ty: 8,
                od: 44,
              },
            ],
            id: 59199002,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vendsyssel FF',
                ty: 8,
                od: 53,
              },
            ],
            id: 59198989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kolding IF',
                ty: 8,
                od: 53,
              },
            ],
            id: 59198993,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'B93 Copenhagen',
                ty: 8,
                od: 451,
              },
            ],
            id: 59199000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hillerod Fodbold',
                ty: 8,
                od: 451,
              },
            ],
            id: 59198991,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Helsingoer',
                ty: 8,
                od: 601,
              },
            ],
            id: 59198984,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Naestved BK',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59198995,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HB Koge',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59198987,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1997,
        mks: [
          {
            op: [
              {
                nm: 'Aalborg BK',
                ty: 8,
                od: 1.03,
              },
            ],
            id: 59199001,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sonderjyske',
                ty: 8,
                od: 1.54,
              },
            ],
            id: 59198999,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Fredericia',
                ty: 8,
                od: 6,
              },
            ],
            id: 59198998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Horsens',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 59199003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hobro IK',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 59198990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kolding IF',
                ty: 8,
                od: 11,
              },
            ],
            id: 59198994,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vendsyssel FF',
                ty: 8,
                od: 15,
              },
            ],
            id: 59199007,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'B93 Copenhagen',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198988,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hillerod Fodbold',
                ty: 8,
                od: 151,
              },
            ],
            id: 59199005,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Helsingoer',
                ty: 8,
                od: 201,
              },
            ],
            id: 59198996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HB Koge',
                ty: 8,
                od: 301,
              },
            ],
            id: 59198992,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Naestved BK',
                ty: 8,
                od: 801,
              },
            ],
            id: 59198986,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top 2 Finish',
      },
    ],
    tms: 24,
    tps: [],
    lg: {
      na: 'Denmark 1st Division',
      id: 10746,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/9fe39e065a36072fadaea469338c19da.png',
      sid: 1,
      rid: 13,
      rnm: 'Denmark',
      hot: false,
      slid: 107460000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1455735,
    bt: 1717178400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Denmark 1st Division 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Copenhagen',
                ty: 8,
                od: 2.66,
              },
            ],
            id: 63399519,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Broendby IF',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 63399524,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland',
                ty: 8,
                od: 6.15,
              },
            ],
            id: 63399482,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Midtjylland',
                ty: 8,
                od: 7.15,
              },
            ],
            id: 63399521,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AGF Aarhus',
                ty: 8,
                od: 10.3,
              },
            ],
            id: 63399501,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Silkeborg IF',
                ty: 8,
                od: 13.1,
              },
            ],
            id: 63399481,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Viborg FF',
                ty: 8,
                od: 20,
              },
            ],
            id: 63399515,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Odense Boldklub',
                ty: 8,
                od: 21,
              },
            ],
            id: 63399512,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Randers FC',
                ty: 8,
                od: 29,
              },
            ],
            id: 63399489,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lyngby BK',
                ty: 8,
                od: 40,
              },
            ],
            id: 63399514,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vejle BK',
                ty: 8,
                od: 48,
              },
            ],
            id: 63399499,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hvidovre IF',
                ty: 8,
                od: 201,
              },
            ],
            id: 63399509,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Fredericia',
                ty: 8,
                od: 201,
              },
            ],
            id: 63399518,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Helsingoer',
                ty: 8,
                od: 351,
              },
            ],
            id: 63399526,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AB Gladsaxe',
                ty: 8,
                od: 551,
              },
            ],
            id: 63399480,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ishoej IF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63399508,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 16,
    tps: [],
    lg: {
      na: 'Denmark DBU Pokalen',
      id: 10753,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/3f3e7a5b0931980813acd2fe2292fd00.png',
      sid: 1,
      rid: 13,
      rnm: 'Denmark',
      hot: false,
      slid: 107530000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1511631,
    bt: 1715281200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Denmark DBU Pokalen 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Real Madrid',
                ty: 8,
                od: 3.5,
              },
            ],
            id: 59198802,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Barcelona',
                ty: 8,
                od: 3.51,
              },
            ],
            id: 59198790,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Madrid',
                ty: 8,
                od: 9.5,
              },
            ],
            id: 59198787,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sevilla FC',
                ty: 8,
                od: 15.5,
              },
            ],
            id: 59198804,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Sociedad',
                ty: 8,
                od: 20,
              },
            ],
            id: 59198815,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Villarreal CF',
                ty: 8,
                od: 21,
              },
            ],
            id: 59198795,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Betis',
                ty: 8,
                od: 27,
              },
            ],
            id: 59198799,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Athletic Bilbao',
                ty: 8,
                od: 28,
              },
            ],
            id: 59198816,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Osasuna',
                ty: 8,
                od: 41,
              },
            ],
            id: 59198819,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Celta Vigo',
                ty: 8,
                od: 42,
              },
            ],
            id: 59198807,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Valencia CF',
                ty: 8,
                od: 50,
              },
            ],
            id: 59198789,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Girona FC',
                ty: 8,
                od: 52,
              },
            ],
            id: 59198793,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RCD Mallorca',
                ty: 8,
                od: 62,
              },
            ],
            id: 59198794,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rayo Vallecano',
                ty: 8,
                od: 63,
              },
            ],
            id: 59198813,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Getafe CF',
                ty: 8,
                od: 63,
              },
            ],
            id: 59198812,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Granada CF',
                ty: 8,
                od: 65,
              },
            ],
            id: 59198798,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'UD Almeria',
                ty: 8,
                od: 80,
              },
            ],
            id: 59198788,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Valladolid',
                ty: 8,
                od: 82,
              },
            ],
            id: 59198792,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cadiz CF',
                ty: 8,
                od: 100,
              },
            ],
            id: 59198791,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Levante UD',
                ty: 8,
                od: 101,
              },
            ],
            id: 59198785,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Deportivo Alaves',
                ty: 8,
                od: 101,
              },
            ],
            id: 59198814,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'UD Las Palmas',
                ty: 8,
                od: 101,
              },
            ],
            id: 59198821,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RCD Espanyol',
                ty: 8,
                od: 126,
              },
            ],
            id: 59198808,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Elche CF',
                ty: 8,
                od: 126,
              },
            ],
            id: 59198811,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SD Eibar',
                ty: 8,
                od: 131,
              },
            ],
            id: 59198801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Oviedo',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198803,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Real Zaragoza',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198797,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sporting Gijon',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198818,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tenerife CD',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Leganes',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198817,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Racing Santander',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198786,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Albacete Balompie',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198796,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Cartagena',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198809,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SD Huesca',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198806,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Andorra',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198810,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Mirandes',
                ty: 8,
                od: 201,
              },
            ],
            id: 59198800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burgos CF',
                ty: 8,
                od: 251,
              },
            ],
            id: 59198820,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 37,
    tps: [],
    lg: {
      na: 'Spain Copa del Rey',
      id: 10781,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/b06dfcbd5436332f9dbb3029dfdd25f7.png',
      sid: 1,
      rid: 74,
      rnm: 'Spain',
      hot: false,
      slid: 107810000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1457400,
    bt: 1714953600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Spain Copa del Rey 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Malmo FF',
                ty: 8,
                od: 1.53,
              },
            ],
            id: 42952925,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'IF Elfsborg',
                ty: 8,
                od: 2.56,
              },
            ],
            id: 42952915,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Hacken',
                ty: 8,
                od: 13.9,
              },
            ],
            id: 42952924,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Djurgardens IF',
                ty: 8,
                od: 251,
              },
            ],
            id: 42952921,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hammarby IF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42952917,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'IFK Norrkoping FK',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42952923,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kalmar FF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 42952913,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Jeppe Okkels',
                ty: 8,
                od: 37,
              },
            ],
            id: 59293269,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Viktor Djukanovic',
                ty: 8,
                od: 46,
              },
            ],
            id: 59293286,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Christoffer Nyman',
                ty: 8,
                od: 136,
              },
            ],
            id: 59293256,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marcus Berg',
                ty: 8,
                od: 136,
              },
            ],
            id: 59293266,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oscar Pettersson',
                ty: 8,
                od: 136,
              },
            ],
            id: 59293278,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Isaac Thelin',
                ty: 8,
                od: -999,
              },
            ],
            id: 59293262,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
    ],
    tms: 13,
    tps: [],
    lg: {
      na: 'Sweden Allsvenskan',
      id: 10785,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/cd0a80bdd820300a881ff9001aeb0c9.png',
      sid: 1,
      rid: 46,
      rnm: 'Sweden',
      hot: true,
      slid: 107850000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1145322,
    bt: 1699812000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Sweden Allsvenskan 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Esbjerg FB',
                ty: 8,
                od: 1.55,
              },
            ],
            id: 60016552,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aarhus Fremad',
                ty: 8,
                od: 4.09,
              },
            ],
            id: 60016554,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middelfart BK',
                ty: 8,
                od: 10.7,
              },
            ],
            id: 60016545,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Roskilde',
                ty: 8,
                od: 12.7,
              },
            ],
            id: 60016547,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nykoebing FC',
                ty: 8,
                od: 17.9,
              },
            ],
            id: 60016555,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'BK Fremad Amager',
                ty: 8,
                od: 36,
              },
            ],
            id: 60016551,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AB Gladsaxe',
                ty: 8,
                od: 66,
              },
            ],
            id: 60016546,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Thisted FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 60016549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FA 2000',
                ty: 8,
                od: 151,
              },
            ],
            id: 60016548,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Skive IK',
                ty: 8,
                od: 651,
              },
            ],
            id: 60016544,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'HIK Hellerup',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60016553,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brabrand IF',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60016550,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Denmark 2nd Division',
      id: 10795,
      or: 9999,
      lurl: 'https://static.fastbs55.com/99f934a06c989baa5c6227ee585866bd.png',
      sid: 1,
      rid: 13,
      rnm: 'Denmark',
      hot: false,
      slid: 107950000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1473624,
    bt: 1718463600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Denmark 2nd Division 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'HB Koege (w)',
                ty: 8,
                od: 1.95,
              },
            ],
            id: 60023672,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Broendby IF (w)',
                ty: 8,
                od: 2.9,
              },
            ],
            id: 60023675,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nordsjaelland (w)',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 60023671,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'DBK Fortuna Hjoerring (w)',
                ty: 8,
                od: 18.7,
              },
            ],
            id: 60023673,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Koldingq (w)',
                ty: 8,
                od: 19.2,
              },
            ],
            id: 60023669,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AGF Aarhus (w)',
                ty: 8,
                od: 251,
              },
            ],
            id: 60023674,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aalborg BK (w)',
                ty: 8,
                od: 751,
              },
            ],
            id: 60023670,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Thy Thisted Q (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60023676,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 8,
    tps: [],
    lg: {
      na: 'Denmark Elitedivisionen Women',
      id: 10802,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/8f70ee8d3c8a0045bac2cc14134ccfb9.png',
      sid: 1,
      rid: 13,
      rnm: 'Denmark',
      hot: false,
      slid: 108020000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1473467,
    bt: 1717351200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Denmark Elitedivisionen Women 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Dynamo Dresden',
                ty: 8,
                od: 2.4,
              },
            ],
            id: 58215459,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Sandhausen',
                ty: 8,
                od: 8.85,
              },
            ],
            id: 58215467,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1. FC Saarbrucken',
                ty: 8,
                od: 12.3,
              },
            ],
            id: 58215466,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Erzgebirge Aue',
                ty: 8,
                od: 16.5,
              },
            ],
            id: 58215472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jahn Regensburg',
                ty: 8,
                od: 17,
              },
            ],
            id: 58215469,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Cologne',
                ty: 8,
                od: 17.6,
              },
            ],
            id: 58215475,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Ingolstadt 04',
                ty: 8,
                od: 20,
              },
            ],
            id: 58215470,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arminia Bielefeld',
                ty: 8,
                od: 20,
              },
            ],
            id: 58215464,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSV 1860 Munich',
                ty: 8,
                od: 24,
              },
            ],
            id: 58215471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Waldhof Mannheim 07',
                ty: 8,
                od: 30,
              },
            ],
            id: 58215460,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSV Ulm 1846',
                ty: 8,
                od: 31,
              },
            ],
            id: 58215477,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund II',
                ty: 8,
                od: 36,
              },
            ],
            id: 58215458,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rot Weiss Essen',
                ty: 8,
                od: 60,
              },
            ],
            id: 58215474,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Preussen 06 Munster',
                ty: 8,
                od: 62,
              },
            ],
            id: 58215476,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Verl',
                ty: 8,
                od: 74,
              },
            ],
            id: 58215462,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SpVgg Unterhaching',
                ty: 8,
                od: 88,
              },
            ],
            id: 58215463,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg II',
                ty: 8,
                od: 131,
              },
            ],
            id: 58215468,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hallescher FC',
                ty: 8,
                od: 136,
              },
            ],
            id: 58215473,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MSV Duisburg',
                ty: 8,
                od: 151,
              },
            ],
            id: 58215461,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VFB Lubeck',
                ty: 8,
                od: 151,
              },
            ],
            id: 58215465,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Germany 3rd Liga',
      id: 10804,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/f6b040784713e17eac17643778d591f2.png',
      sid: 1,
      rid: 87,
      rnm: 'Germany',
      hot: false,
      slid: 108040000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1438351,
    bt: 1716033600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Germany 3rd Liga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Bayern Munich',
                ty: 8,
                od: 2.28,
              },
            ],
            id: 57959052,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Dortmund',
                ty: 8,
                od: 5.6,
              },
            ],
            id: 57958990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RB Leipzig',
                ty: 8,
                od: 7.1,
              },
            ],
            id: 57959021,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bayer Leverkusen',
                ty: 8,
                od: 13,
              },
            ],
            id: 57959035,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Berlin',
                ty: 8,
                od: 23,
              },
            ],
            id: 57959022,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eintracht Frankfurt',
                ty: 8,
                od: 23,
              },
            ],
            id: 57958989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Freiburg',
                ty: 8,
                od: 34,
              },
            ],
            id: 57959046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Borussia Monchengladbach',
                ty: 8,
                od: 40,
              },
            ],
            id: 57959006,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfL Wolfsburg',
                ty: 8,
                od: 41,
              },
            ],
            id: 57959008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TSG Hoffenheim',
                ty: 8,
                od: 51,
              },
            ],
            id: 57959041,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Koln',
                ty: 8,
                od: 70,
              },
            ],
            id: 57959024,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FSV Mainz',
                ty: 8,
                od: 78,
              },
            ],
            id: 57959017,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'VfB Stuttgart',
                ty: 8,
                od: 90,
              },
            ],
            id: 57958996,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hamburger SV',
                ty: 8,
                od: 111,
              },
            ],
            id: 57959000,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Heidenheim 1846',
                ty: 8,
                od: 111,
              },
            ],
            id: 57959051,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hertha BSC',
                ty: 8,
                od: 126,
              },
            ],
            id: 57959007,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Schalke 04',
                ty: 8,
                od: 131,
              },
            ],
            id: 57959042,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Greuther Furth',
                ty: 8,
                od: 151,
              },
            ],
            id: 57959031,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC St. Pauli',
                ty: 8,
                od: 151,
              },
            ],
            id: 57959003,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Paderborn 07',
                ty: 8,
                od: 151,
              },
            ],
            id: 57959019,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fortuna Dusseldorf',
                ty: 8,
                od: 151,
              },
            ],
            id: 57958998,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nuremberg',
                ty: 8,
                od: 201,
              },
            ],
            id: 57959050,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Holstein Kiel',
                ty: 8,
                od: 201,
              },
            ],
            id: 57959030,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hansa Rostock',
                ty: 8,
                od: 251,
              },
            ],
            id: 57959011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1 FC Kaiserslautern',
                ty: 8,
                od: 251,
              },
            ],
            id: 57959043,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1. FC Magdeburg',
                ty: 8,
                od: 251,
              },
            ],
            id: 57959034,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SV Sandhausen',
                ty: 8,
                od: 251,
              },
            ],
            id: 57959036,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1. FC Saarbrucken',
                ty: 8,
                od: 301,
              },
            ],
            id: 57959038,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arminia Bielefeld',
                ty: 8,
                od: 401,
              },
            ],
            id: 57959015,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Cologne',
                ty: 8,
                od: 401,
              },
            ],
            id: 57959048,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SpVgg Unterhaching',
                ty: 8,
                od: 451,
              },
            ],
            id: 57959002,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC 08 Homburg Saar',
                ty: 8,
                od: 901,
              },
            ],
            id: 57959044,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 32,
    tps: [],
    lg: {
      na: 'Germany DFB Pokal',
      id: 10836,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/6146e7e5d66f93c7520ad372f0290ac9.png',
      sid: 1,
      rid: 87,
      rnm: 'Germany',
      hot: false,
      slid: 108360000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1431855,
    bt: 1716660000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Germany DFB Pokal 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Manchester City FC',
                ty: 8,
                od: 4.03,
              },
            ],
            id: 57777274,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 9.2,
              },
            ],
            id: 57777291,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 9.2,
              },
            ],
            id: 57777275,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 9.2,
              },
            ],
            id: 57777285,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 13.1,
              },
            ],
            id: 57777268,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 13.1,
              },
            ],
            id: 57777257,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur',
                ty: 8,
                od: 18,
              },
            ],
            id: 57777276,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC',
                ty: 8,
                od: 20,
              },
            ],
            id: 57777273,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC',
                ty: 8,
                od: 25,
              },
            ],
            id: 57777282,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 50,
              },
            ],
            id: 57777272,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brentford FC',
                ty: 8,
                od: 50,
              },
            ],
            id: 57777262,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crystal Palace',
                ty: 8,
                od: 61,
              },
            ],
            id: 57777283,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 61,
              },
            ],
            id: 57777258,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wolverhampton Wanderers FC',
                ty: 8,
                od: 61,
              },
            ],
            id: 57777278,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 61,
              },
            ],
            id: 57777255,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777277,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777253,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nottingham Forest',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777295,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777279,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777265,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 81,
              },
            ],
            id: 57777296,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777281,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield United FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777269,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777294,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777292,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777263,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777259,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777288,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luton Town',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777287,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777271,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777286,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777266,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777254,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777280,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 151,
              },
            ],
            id: 57777267,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777256,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777260,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777293,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777290,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777284,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777264,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 201,
              },
            ],
            id: 57777270,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 301,
              },
            ],
            id: 57777261,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 301,
              },
            ],
            id: 57777289,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 44,
    tps: [],
    lg: {
      na: 'England FA Cup',
      id: 10840,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/f61140f5a112da06c708d6bf10f8f977.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 108400000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1428566,
    bt: 1716645600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England FA Cup 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Liverpool FC',
                ty: 8,
                od: 4.54,
              },
            ],
            id: 57777250,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC',
                ty: 8,
                od: 5.15,
              },
            ],
            id: 57777221,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC',
                ty: 8,
                od: 5.75,
              },
            ],
            id: 57777244,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chelsea FC',
                ty: 8,
                od: 6.25,
              },
            ],
            id: 57777225,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newcastle United FC',
                ty: 8,
                od: 6.3,
              },
            ],
            id: 57777252,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United',
                ty: 8,
                od: 17.9,
              },
            ],
            id: 57777218,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Fulham FC',
                ty: 8,
                od: 22,
              },
            ],
            id: 57777227,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Bournemouth',
                ty: 8,
                od: 37,
              },
            ],
            id: 57777223,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Burnley FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 57777247,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC',
                ty: 8,
                od: 37,
              },
            ],
            id: 57777234,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 50,
              },
            ],
            id: 57777243,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 95,
              },
            ],
            id: 57777251,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 121,
              },
            ],
            id: 57777249,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 13,
    tps: [],
    lg: {
      na: 'England League Cup',
      id: 10862,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/fb9d1cf9158caf1e94f3288c23ecf8eb.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 108620000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1428414,
    bt: 1708869600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England League Cup 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Shamrock Rovers',
                ty: 8,
                od: 1.01,
              },
            ],
            id: 57570470,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Derry City FC',
                ty: 8,
                od: 17.7,
              },
            ],
            id: 57570465,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Saint Patricks Athletic FC',
                ty: 8,
                od: 17.8,
              },
            ],
            id: 57570471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Shelbourne FC',
                ty: 8,
                od: 801,
              },
            ],
            id: 57570472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bohemians Dublin FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57570467,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dundalk FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57570466,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 6,
    tps: [],
    lg: {
      na: 'Ireland Premier Division',
      id: 10901,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/69557bdf1edf7eb6e97d9062fc035f8c.png',
      sid: 1,
      rid: 70,
      rnm: 'Ireland',
      hot: false,
      slid: 109010000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1214322,
    bt: 1699040700000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Ireland Premier Division 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'The New Saints FC',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 61146238,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Connah`s Quay Nomads FC',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 61146243,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bala Town FC',
                ty: 8,
                od: 54,
              },
            ],
            id: 61146239,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Penybont FC',
                ty: 8,
                od: 67,
              },
            ],
            id: 61146237,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff Metropolitan University FC',
                ty: 8,
                od: 136,
              },
            ],
            id: 61146240,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Caernarfon Town FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 61146233,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pontypridd Town',
                ty: 8,
                od: 301,
              },
            ],
            id: 61146244,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newtown AFC',
                ty: 8,
                od: 451,
              },
            ],
            id: 61146235,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Haverfordwest County AFC',
                ty: 8,
                od: 651,
              },
            ],
            id: 61146236,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barry Town United FC',
                ty: 8,
                od: 951,
              },
            ],
            id: 61146234,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colwyn Bay',
                ty: 8,
                od: 951,
              },
            ],
            id: 61146241,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aberystwyth Town FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 61146242,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Wales Cymru Premier',
      id: 10913,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/c721107f0a5f3bc9be28d3fb9edd50a0.png',
      sid: 1,
      rid: 82,
      rnm: 'Wales',
      hot: false,
      slid: 109130000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1494069,
    bt: 1715450400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Wales Cymru Premier 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Slavia Prague',
                ty: 8,
                od: 1.75,
              },
            ],
            id: 57941757,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Sparta Prague',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 57941748,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Viktoria Plzen',
                ty: 8,
                od: 10.4,
              },
            ],
            id: 57941755,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Sigma Olomouc',
                ty: 8,
                od: 151,
              },
            ],
            id: 57941747,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: '1.FC Slovacko',
                ty: 8,
                od: 151,
              },
            ],
            id: 57941749,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Mlada Boleslav',
                ty: 8,
                od: 201,
              },
            ],
            id: 57941752,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Banik Ostrava',
                ty: 8,
                od: 501,
              },
            ],
            id: 57941756,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bohemians Prague 1905',
                ty: 8,
                od: 501,
              },
            ],
            id: 57941744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Jablonec',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941742,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Slovan Liberec',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941745,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Teplice',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941746,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SK Dynamo Ceske Budejovice',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941751,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Hradec Kralove',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941743,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Trinity Zlin',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941753,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'MFK Karvina',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941754,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Pardubice',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57941750,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 16,
    tps: [],
    lg: {
      na: 'Czech Republic 1. Liga',
      id: 11002,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/54196276f6c70dfee40d5a9826108d45.png',
      sid: 1,
      rid: 555,
      rnm: 'Czech Republic',
      hot: false,
      slid: 110020000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1432249,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Czech Republic 1. Liga 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 2.24,
              },
            ],
            id: 57075847,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 5,
              },
            ],
            id: 57075848,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 6.3,
              },
            ],
            id: 57075838,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 57075835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 28,
              },
            ],
            id: 57075834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 29,
              },
            ],
            id: 57075842,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 31,
              },
            ],
            id: 57075836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 47,
              },
            ],
            id: 57075846,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 49,
              },
            ],
            id: 57075832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 53,
              },
            ],
            id: 57075852,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 61,
              },
            ],
            id: 57075831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 64,
              },
            ],
            id: 57075843,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 72,
              },
            ],
            id: 57075839,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 74,
              },
            ],
            id: 57075850,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 75,
              },
            ],
            id: 57075851,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 82,
              },
            ],
            id: 57075845,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 84,
              },
            ],
            id: 57075837,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 95,
              },
            ],
            id: 57075849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 131,
              },
            ],
            id: 57075844,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 151,
              },
            ],
            id: 57075840,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 151,
              },
            ],
            id: 57075853,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 301,
              },
            ],
            id: 57075841,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 851,
              },
            ],
            id: 57075854,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57075833,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1997,
        mks: [
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 1.6,
              },
            ],
            id: 63393811,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 2.39,
              },
            ],
            id: 63393812,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 3.21,
              },
            ],
            id: 63393815,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 6.1,
              },
            ],
            id: 63393817,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 8,
              },
            ],
            id: 63393799,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 9.55,
              },
            ],
            id: 63393813,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 12.3,
              },
            ],
            id: 63393801,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 18.5,
              },
            ],
            id: 63393803,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 19.9,
              },
            ],
            id: 63393810,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 22,
              },
            ],
            id: 63393818,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 25,
              },
            ],
            id: 63393808,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 26,
              },
            ],
            id: 63393809,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 26,
              },
            ],
            id: 63393820,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 26,
              },
            ],
            id: 63393821,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 28,
              },
            ],
            id: 63393804,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 30,
              },
            ],
            id: 63393798,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 33,
              },
            ],
            id: 63393814,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 35,
              },
            ],
            id: 63393806,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 46,
              },
            ],
            id: 63393819,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 84,
              },
            ],
            id: 63393816,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 111,
              },
            ],
            id: 63393800,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 141,
              },
            ],
            id: 63393805,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 451,
              },
            ],
            id: 63393802,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 551,
              },
            ],
            id: 63393807,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top 2 Finish',
      },
      {
        mty: 1969,
        mks: [
          {
            op: [
              {
                nm: 'Joel Piroe',
                ty: 8,
                od: 7.25,
              },
            ],
            id: 63424520,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Adam Armstrong',
                ty: 8,
                od: 12.5,
              },
            ],
            id: 63424493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jamie Vardy',
                ty: 8,
                od: 22,
              },
            ],
            id: 63424479,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Matthew Godden',
                ty: 8,
                od: 27,
              },
            ],
            id: 63424497,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nathan Broadhead',
                ty: 8,
                od: 30,
              },
            ],
            id: 63424513,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Will Keane',
                ty: 8,
                od: 33,
              },
            ],
            id: 63424490,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Adam Idah',
                ty: 8,
                od: 33,
              },
            ],
            id: 63424517,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Che Adams',
                ty: 8,
                od: 34,
              },
            ],
            id: 63424491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ross Stewart',
                ty: 8,
                od: 34,
              },
            ],
            id: 63424522,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ryan Hardie',
                ty: 8,
                od: 35,
              },
            ],
            id: 63424508,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Conor Chaplin',
                ty: 8,
                od: 38,
              },
            ],
            id: 63424495,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kelechi Iheanacho',
                ty: 8,
                od: 40,
              },
            ],
            id: 63424492,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jerry Yates',
                ty: 8,
                od: 40,
              },
            ],
            id: 63424505,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Georginio Rutter',
                ty: 8,
                od: 55,
              },
            ],
            id: 63424531,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'George Hirst',
                ty: 8,
                od: 59,
              },
            ],
            id: 63424523,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Patson Daka',
                ty: 8,
                od: 72,
              },
            ],
            id: 63424519,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marcus Forss',
                ty: 8,
                od: 75,
              },
            ],
            id: 63424510,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brandon Thomas Asante',
                ty: 8,
                od: 75,
              },
            ],
            id: 63424516,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ellis Simms',
                ty: 8,
                od: 77,
              },
            ],
            id: 63424530,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Freddie Ladapo',
                ty: 8,
                od: 80,
              },
            ],
            id: 63424499,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Scott Hogan',
                ty: 8,
                od: 83,
              },
            ],
            id: 63424483,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sekou Mara',
                ty: 8,
                od: 83,
              },
            ],
            id: 63424529,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tommy Conway',
                ty: 8,
                od: 83,
              },
            ],
            id: 63424533,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Morgan Whittaker',
                ty: 8,
                od: 87,
              },
            ],
            id: 63424521,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ashley Barnes',
                ty: 8,
                od: 91,
              },
            ],
            id: 63424477,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nahki Wells',
                ty: 8,
                od: 91,
              },
            ],
            id: 63424484,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sam Gallagher',
                ty: 8,
                od: 91,
              },
            ],
            id: 63424501,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jack Clarke',
                ty: 8,
                od: 91,
              },
            ],
            id: 63424507,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Niall Ennis',
                ty: 8,
                od: 95,
              },
            ],
            id: 63424502,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karlan Grant',
                ty: 8,
                od: 95,
              },
            ],
            id: 63424503,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Patrick Bamford',
                ty: 8,
                od: 100,
              },
            ],
            id: 63424485,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liam Delap',
                ty: 8,
                od: 106,
              },
            ],
            id: 63424532,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tom Bradshaw',
                ty: 8,
                od: 111,
              },
            ],
            id: 63424486,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kevin Nisbet',
                ty: 8,
                od: 111,
              },
            ],
            id: 63424537,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dwight Gayle',
                ty: 8,
                od: 116,
              },
            ],
            id: 63424482,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Josh Windass',
                ty: 8,
                od: 116,
              },
            ],
            id: 63424496,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tyrese Campbell',
                ty: 8,
                od: 116,
              },
            ],
            id: 63424509,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luis Semedo',
                ty: 8,
                od: 116,
              },
            ],
            id: 63424536,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carlos Jonas Alcaraz',
                ty: 8,
                od: 116,
              },
            ],
            id: 63424538,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lukas Jutkiewicz',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424478,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Andreas Weimann',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424481,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Michael Smith',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424487,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Callum Robinson',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424506,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lyndon Dykes',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424515,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crysencio Summerville',
                ty: 8,
                od: 121,
              },
            ],
            id: 63424535,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jed Wallace',
                ty: 8,
                od: 131,
              },
            ],
            id: 63424489,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Danny Ward',
                ty: 8,
                od: 141,
              },
            ],
            id: 63424480,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lee Gregory',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424488,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tyler Roberts',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424498,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jordan Hugill',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424500,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rhys Healey',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424512,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Emil Riis Jakobsen',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424518,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Joe Gelhardt',
                ty: 8,
                od: 151,
              },
            ],
            id: 63424526,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Callum Paterson',
                ty: 8,
                od: 251,
              },
            ],
            id: 63424504,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Top Goalscorer',
      },
      {
        mty: 1989,
        mks: [
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 1.37,
              },
            ],
            id: 57076625,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 1.91,
              },
            ],
            id: 57076626,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 2.38,
              },
            ],
            id: 57076629,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 4.81,
              },
            ],
            id: 57076631,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 5.25,
              },
            ],
            id: 57076613,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 7.2,
              },
            ],
            id: 57076627,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 9.15,
              },
            ],
            id: 57076615,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 10.2,
              },
            ],
            id: 57076617,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 10.7,
              },
            ],
            id: 57076624,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 11.2,
              },
            ],
            id: 57076632,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 11.8,
              },
            ],
            id: 57076635,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 12.8,
              },
            ],
            id: 57076622,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 13.3,
              },
            ],
            id: 57076623,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 13.6,
              },
            ],
            id: 57076634,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 16.2,
              },
            ],
            id: 57076618,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 16.8,
              },
            ],
            id: 57076612,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 18,
              },
            ],
            id: 57076620,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 21,
              },
            ],
            id: 57076628,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 35,
              },
            ],
            id: 57076633,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 55,
              },
            ],
            id: 57076630,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 65,
              },
            ],
            id: 57076614,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 85,
              },
            ],
            id: 57076619,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 151,
              },
            ],
            id: 57076616,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 251,
              },
            ],
            id: 57076621,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Promotion',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 1.39,
              },
            ],
            id: 57643288,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 1.91,
              },
            ],
            id: 57643283,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 2.66,
              },
            ],
            id: 57643286,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 3.45,
              },
            ],
            id: 57643281,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 3.83,
              },
            ],
            id: 57643297,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 4.67,
              },
            ],
            id: 57643300,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 7.7,
              },
            ],
            id: 57643295,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 10.6,
              },
            ],
            id: 57643287,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 57643279,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 15.2,
              },
            ],
            id: 57643285,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 16.7,
              },
            ],
            id: 57643302,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 17.3,
              },
            ],
            id: 57643290,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 17.6,
              },
            ],
            id: 57643301,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 18.9,
              },
            ],
            id: 57643289,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 18.9,
              },
            ],
            id: 57643291,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 27,
              },
            ],
            id: 57643284,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 28,
              },
            ],
            id: 57643299,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 32,
              },
            ],
            id: 57643294,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 36,
              },
            ],
            id: 57643282,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 57,
              },
            ],
            id: 57643298,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 72,
              },
            ],
            id: 57643280,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 93,
              },
            ],
            id: 57643296,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 601,
              },
            ],
            id: 57643293,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 851,
              },
            ],
            id: 57643292,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
      {
        mty: 1970,
        mks: [
          {
            op: [
              {
                nm: 'Rotherham United',
                ty: 8,
                od: 2.62,
              },
            ],
            id: 58690243,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sheffield Wednesday',
                ty: 8,
                od: 4.33,
              },
            ],
            id: 58690238,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Queens Park Rangers',
                ty: 8,
                od: 8.2,
              },
            ],
            id: 58690241,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huddersfield Town',
                ty: 8,
                od: 11.1,
              },
            ],
            id: 58690236,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Plymouth Argyle',
                ty: 8,
                od: 11.8,
              },
            ],
            id: 58690252,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Swansea City',
                ty: 8,
                od: 21,
              },
            ],
            id: 58690255,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cardiff City',
                ty: 8,
                od: 27,
              },
            ],
            id: 58690250,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stoke City',
                ty: 8,
                od: 30,
              },
            ],
            id: 58690242,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Blackburn Rovers',
                ty: 8,
                od: 35,
              },
            ],
            id: 58690234,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Birmingham City',
                ty: 8,
                od: 43,
              },
            ],
            id: 58690240,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City',
                ty: 8,
                od: 53,
              },
            ],
            id: 58690256,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coventry City',
                ty: 8,
                od: 70,
              },
            ],
            id: 58690244,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millwall FC',
                ty: 8,
                od: 70,
              },
            ],
            id: 58690245,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Watford FC',
                ty: 8,
                od: 70,
              },
            ],
            id: 58690246,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hull City',
                ty: 8,
                od: 70,
              },
            ],
            id: 58690254,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Middlesbrough FC',
                ty: 8,
                od: 70,
              },
            ],
            id: 58690257,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Bromwich Albion',
                ty: 8,
                od: 106,
              },
            ],
            id: 58690239,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Norwich City',
                ty: 8,
                od: 151,
              },
            ],
            id: 58690235,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Preston North End',
                ty: 8,
                od: 151,
              },
            ],
            id: 58690237,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sunderland AFC',
                ty: 8,
                od: 151,
              },
            ],
            id: 58690249,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southampton FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 58690253,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leeds United',
                ty: 8,
                od: 501,
              },
            ],
            id: 58690251,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ipswich Town',
                ty: 8,
                od: 701,
              },
            ],
            id: 58690248,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leicester City FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58690247,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'To Finish Bottom',
      },
    ],
    tms: 174,
    tps: [],
    lg: {
      na: 'England Championship League',
      id: 11030,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/f847883e4fd177386abd031d22a5abe9.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 110300000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1416244,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England Championship League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Chesterfield FC',
                ty: 8,
                od: 1.42,
              },
            ],
            id: 58416871,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barnet FC',
                ty: 8,
                od: 6.7,
              },
            ],
            id: 58416872,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gateshead FC',
                ty: 8,
                od: 10.3,
              },
            ],
            id: 58416877,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Solihull Moors FC',
                ty: 8,
                od: 40,
              },
            ],
            id: 58416869,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hartlepool United',
                ty: 8,
                od: 40,
              },
            ],
            id: 58416876,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oldham Athletic',
                ty: 8,
                od: 42,
              },
            ],
            id: 58416867,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Woking FC',
                ty: 8,
                od: 50,
              },
            ],
            id: 58416873,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rochdale AFC',
                ty: 8,
                od: 57,
              },
            ],
            id: 58416843,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bromley FC',
                ty: 8,
                od: 89,
              },
            ],
            id: 58416875,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Altrincham FC',
                ty: 8,
                od: 121,
              },
            ],
            id: 58416847,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Halifax Town',
                ty: 8,
                od: 151,
              },
            ],
            id: 58416849,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eastleigh FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 58416851,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Boreham Wood FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 58416859,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southend United',
                ty: 8,
                od: 151,
              },
            ],
            id: 58416868,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ebbsfleet United FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 58416853,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'York City FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 58416874,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wealdstone FC',
                ty: 8,
                od: 301,
              },
            ],
            id: 58416870,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aldershot Town FC',
                ty: 8,
                od: 451,
              },
            ],
            id: 58416863,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Fylde',
                ty: 8,
                od: 451,
              },
            ],
            id: 58416857,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dorking Wanderers',
                ty: 8,
                od: 451,
              },
            ],
            id: 58416855,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dagenham and Redbridge FC',
                ty: 8,
                od: 551,
              },
            ],
            id: 58416861,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kidderminster Harriers FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58416865,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maidenhead United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58416845,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oxford City',
                ty: 8,
                od: 1001,
              },
            ],
            id: 58416878,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1989,
        mks: [
          {
            op: [
              {
                nm: 'Chesterfield FC',
                ty: 8,
                od: 1.16,
              },
            ],
            id: 58416836,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Gateshead FC',
                ty: 8,
                od: 3.22,
              },
            ],
            id: 58416852,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Barnet FC',
                ty: 8,
                od: 3.5,
              },
            ],
            id: 58416833,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Solihull Moors FC',
                ty: 8,
                od: 9,
              },
            ],
            id: 58416840,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oldham Athletic',
                ty: 8,
                od: 9,
              },
            ],
            id: 58416832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Woking FC',
                ty: 8,
                od: 11.3,
              },
            ],
            id: 58416856,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hartlepool United',
                ty: 8,
                od: 11.3,
              },
            ],
            id: 58416854,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rochdale AFC',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 58416838,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Altrincham FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 58416850,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bromley FC',
                ty: 8,
                od: 24,
              },
            ],
            id: 58416848,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ebbsfleet United FC',
                ty: 8,
                od: 39,
              },
            ],
            id: 58416831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Southend United',
                ty: 8,
                od: 39,
              },
            ],
            id: 58416842,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Halifax Town',
                ty: 8,
                od: 47,
              },
            ],
            id: 58416834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'York City FC',
                ty: 8,
                od: 59,
              },
            ],
            id: 58416835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Eastleigh FC',
                ty: 8,
                od: 59,
              },
            ],
            id: 58416844,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Boreham Wood FC',
                ty: 8,
                od: 59,
              },
            ],
            id: 58416858,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Wealdstone FC',
                ty: 8,
                od: 59,
              },
            ],
            id: 58416860,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Fylde',
                ty: 8,
                od: 77,
              },
            ],
            id: 58416866,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aldershot Town FC',
                ty: 8,
                od: 95,
              },
            ],
            id: 58416864,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dorking Wanderers',
                ty: 8,
                od: 95,
              },
            ],
            id: 58416862,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dagenham and Redbridge FC',
                ty: 8,
                od: 116,
              },
            ],
            id: 58416839,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kidderminster Harriers FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 58416841,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Maidenhead United FC',
                ty: 8,
                od: 201,
              },
            ],
            id: 58416846,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Oxford City',
                ty: 8,
                od: 201,
              },
            ],
            id: 58416837,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Promotion',
      },
    ],
    tms: 48,
    tps: [],
    lg: {
      na: 'England National League',
      id: 11031,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/c0bb670ab4f32f12c9150d240e035b34.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 110310000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1442975,
    bt: 1714485600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England National League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Paris Saint Germain',
                ty: 8,
                od: 1.65,
              },
            ],
            id: 60773552,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Marseille',
                ty: 8,
                od: 13,
              },
            ],
            id: 60773560,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Monaco FC',
                ty: 8,
                od: 16.3,
              },
            ],
            id: 60773573,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RC Lens',
                ty: 8,
                od: 16.9,
              },
            ],
            id: 60773548,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lille OSC',
                ty: 8,
                od: 17.6,
              },
            ],
            id: 60773549,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Olympique Lyonnais',
                ty: 8,
                od: 19,
              },
            ],
            id: 60773565,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Rennes',
                ty: 8,
                od: 28,
              },
            ],
            id: 60773559,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'OGC Nice',
                ty: 8,
                od: 36,
              },
            ],
            id: 60773569,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Strasbourg Alsace',
                ty: 8,
                od: 46,
              },
            ],
            id: 60773576,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stade Reims',
                ty: 8,
                od: 50,
              },
            ],
            id: 60773571,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Toulouse FC',
                ty: 8,
                od: 55,
              },
            ],
            id: 60773561,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Montpellier HSC',
                ty: 8,
                od: 57,
              },
            ],
            id: 60773562,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Nantes',
                ty: 8,
                od: 68,
              },
            ],
            id: 60773575,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Lorient',
                ty: 8,
                od: 70,
              },
            ],
            id: 60773572,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Clermont Foot',
                ty: 8,
                od: 73,
              },
            ],
            id: 60773567,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Girondins Bordeaux',
                ty: 8,
                od: 101,
              },
            ],
            id: 60773558,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Le Havre AC',
                ty: 8,
                od: 101,
              },
            ],
            id: 60773566,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Metz',
                ty: 8,
                od: 101,
              },
            ],
            id: 60773545,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AJ Auxerre',
                ty: 8,
                od: 111,
              },
            ],
            id: 60773577,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Saint Etienne',
                ty: 8,
                od: 111,
              },
            ],
            id: 60773551,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Estac Troyes',
                ty: 8,
                od: 151,
              },
            ],
            id: 60773570,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Angers SCO',
                ty: 8,
                od: 151,
              },
            ],
            id: 60773547,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SC Bastia',
                ty: 8,
                od: 251,
              },
            ],
            id: 60773556,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SM Caen',
                ty: 8,
                od: 251,
              },
            ],
            id: 60773554,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'EA Guingamp',
                ty: 8,
                od: 301,
              },
            ],
            id: 60773550,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sochaux Montbeliard',
                ty: 8,
                od: 301,
              },
            ],
            id: 60773546,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Paris FC',
                ty: 8,
                od: 351,
              },
            ],
            id: 60773555,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Amiens SC',
                ty: 8,
                od: 451,
              },
            ],
            id: 60773568,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Grenoble Foot',
                ty: 8,
                od: 451,
              },
            ],
            id: 60773564,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Valenciennes FC',
                ty: 8,
                od: 451,
              },
            ],
            id: 60773553,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rodez Aveyron',
                ty: 8,
                od: 601,
              },
            ],
            id: 60773563,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pau FC',
                ty: 8,
                od: 651,
              },
            ],
            id: 60773557,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'USL Dunkerque',
                ty: 8,
                od: 951,
              },
            ],
            id: 60773574,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 33,
    tps: [],
    lg: {
      na: 'Coupe de France',
      id: 11054,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/fe1e5d93eeda8aea5298723605531089.png',
      sid: 1,
      rid: 44,
      rnm: 'France',
      hot: false,
      slid: 110540000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1489924,
    bt: 1716663600000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Coupe de France 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Inter Milan',
                ty: 8,
                od: 4.32,
              },
            ],
            id: 59198743,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'SSC Napoli',
                ty: 8,
                od: 4.45,
              },
            ],
            id: 59198741,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Juventus',
                ty: 8,
                od: 5.1,
              },
            ],
            id: 59198740,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Milan',
                ty: 8,
                od: 7.6,
              },
            ],
            id: 59198753,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Roma',
                ty: 8,
                od: 9.9,
              },
            ],
            id: 59198738,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lazio',
                ty: 8,
                od: 12.9,
              },
            ],
            id: 59198750,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atalanta BC',
                ty: 8,
                od: 15.2,
              },
            ],
            id: 59198748,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACF Fiorentina',
                ty: 8,
                od: 22,
              },
            ],
            id: 59198756,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Torino FC',
                ty: 8,
                od: 60,
              },
            ],
            id: 59198739,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Udinese Calcio',
                ty: 8,
                od: 78,
              },
            ],
            id: 59198736,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bologna FC',
                ty: 8,
                od: 80,
              },
            ],
            id: 59198757,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sassuolo Calcio',
                ty: 8,
                od: 80,
              },
            ],
            id: 59198737,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hellas Verona',
                ty: 8,
                od: 100,
              },
            ],
            id: 59198724,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Salernitana',
                ty: 8,
                od: 100,
              },
            ],
            id: 59198742,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cagliari Calcio',
                ty: 8,
                od: 100,
              },
            ],
            id: 59198744,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Lecce',
                ty: 8,
                od: 116,
              },
            ],
            id: 59198759,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Genoa CFC',
                ty: 8,
                od: 116,
              },
            ],
            id: 59198752,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sampdoria',
                ty: 8,
                od: 121,
              },
            ],
            id: 59198726,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Parma Calcio',
                ty: 8,
                od: 121,
              },
            ],
            id: 59198761,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Spezia Calcio',
                ty: 8,
                od: 121,
              },
            ],
            id: 59198730,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'US Cremonese',
                ty: 8,
                od: 121,
              },
            ],
            id: 59198725,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Frosinone Calcio',
                ty: 8,
                od: 121,
              },
            ],
            id: 59198728,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AS Cittadella',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198732,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Reggina 1914',
                ty: 8,
                od: 151,
              },
            ],
            id: 59198755,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AC Reggiana',
                ty: 8,
                od: 201,
              },
            ],
            id: 59198746,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 25,
    tps: [],
    lg: {
      na: 'Coppa Italia',
      id: 11065,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/592a5c1a8ae14515599c6278794cd835.png',
      sid: 1,
      rid: 29,
      rnm: 'Italia',
      hot: true,
      slid: 110650000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1458610,
    bt: 1716403500000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Coppa Italia 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Linfield FC',
                ty: 8,
                od: 1.91,
              },
            ],
            id: 62802530,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Larne FC',
                ty: 8,
                od: 3.38,
              },
            ],
            id: 62802522,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Crusaders FC',
                ty: 8,
                od: 7.95,
              },
            ],
            id: 62802528,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glentoran FC',
                ty: 8,
                od: 9.7,
              },
            ],
            id: 62802521,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cliftonville FC',
                ty: 8,
                od: 14.8,
              },
            ],
            id: 62802525,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coleraine FC',
                ty: 8,
                od: 30,
              },
            ],
            id: 62802531,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Glenavon FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802524,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Dungannon Swifts FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802526,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ballymena United FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802523,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Loughgall FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802532,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Carrick Rangers FC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802529,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Newry City AFC',
                ty: 8,
                od: 1001,
              },
            ],
            id: 62802527,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 12,
    tps: [],
    lg: {
      na: 'Northern Ireland Premiership',
      id: 11082,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/998be809f105c456b10f13ff999d02d3.png',
      sid: 1,
      rid: 63,
      rnm: 'Northern Ireland',
      hot: false,
      slid: 110820000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1504502,
    bt: 1717286400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Northern Ireland Premiership 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Boca Juniors',
                ty: 8,
                od: 3.04,
              },
            ],
            id: 57660990,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA San Lorenzo de Almagro',
                ty: 8,
                od: 4.68,
              },
            ],
            id: 57660968,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Estudiantes de La Plata',
                ty: 8,
                od: 6.25,
              },
            ],
            id: 57660989,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Talleres de Cordoba',
                ty: 8,
                od: 6.8,
              },
            ],
            id: 57660981,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Defensa y Justicia',
                ty: 8,
                od: 8.45,
              },
            ],
            id: 57660997,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Huracan',
                ty: 8,
                od: 13.8,
              },
            ],
            id: 57660966,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Chaco For Ever',
                ty: 8,
                od: 28,
              },
            ],
            id: 57660969,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'San Martin de San Juan',
                ty: 8,
                od: 36,
              },
            ],
            id: 57660976,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 8,
    tps: [],
    lg: {
      na: 'Argentina Cup',
      id: 11112,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/8f6d87caff82657f17f7691b944cd2ee.png',
      sid: 1,
      rid: 102,
      rnm: 'Argentina',
      hot: false,
      slid: 111120000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1242328,
    bt: 1698703200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Argentina Cup 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FK Zenit Saint Petersburg',
                ty: 8,
                od: 1.6,
              },
            ],
            id: 59843476,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Krasnodar',
                ty: 8,
                od: 4.63,
              },
            ],
            id: 59843469,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Spartak Moscow',
                ty: 8,
                od: 7.3,
              },
            ],
            id: 59843471,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CSKA Moscow',
                ty: 8,
                od: 21,
              },
            ],
            id: 59843473,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Dinamo Moscow',
                ty: 8,
                od: 26,
              },
            ],
            id: 59843465,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lokomotiv Moscow',
                ty: 8,
                od: 42,
              },
            ],
            id: 59843475,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFK Krylia Sovetov Samara',
                ty: 8,
                od: 106,
              },
            ],
            id: 59843468,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Rostov',
                ty: 8,
                od: 501,
              },
            ],
            id: 59843479,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'RFK Akhmat Grozny',
                ty: 8,
                od: 501,
              },
            ],
            id: 59843477,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Ural Yekaterinburg',
                ty: 8,
                od: 501,
              },
            ],
            id: 59843470,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Fakel Voronezh',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843480,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Rubin Kazan',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843472,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Orenburg',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843474,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Nizhny Novgorod',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843466,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFK Sochi',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843467,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Baltika Kaliningrad',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843478,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1999,
        mks: [
          {
            op: [
              {
                nm: 'FK Spartak Moscow',
                ty: 8,
                od: 2.68,
              },
            ],
            id: 59843463,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CSKA Moscow',
                ty: 8,
                od: 3.31,
              },
            ],
            id: 59843462,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Dinamo Moscow',
                ty: 8,
                od: 3.9,
              },
            ],
            id: 59843464,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lokomotiv Moscow',
                ty: 8,
                od: 5.9,
              },
            ],
            id: 59843461,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Russia Premier League - Best Moscow Team',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Russia Premier League',
      id: 11118,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/b9305c689972c55564fbdb22ce836cbc.png',
      sid: 1,
      rid: 5,
      rnm: 'Russia',
      hot: false,
      slid: 111180000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1467141,
    bt: 1717178400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Russia Premier League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Cobresal',
                ty: 8,
                od: 1.96,
              },
            ],
            id: 41137912,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Colo Colo',
                ty: 8,
                od: 2.63,
              },
            ],
            id: 41137918,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Huachipato',
                ty: 8,
                od: 3.86,
              },
            ],
            id: 41137924,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Palestino',
                ty: 8,
                od: 44,
              },
            ],
            id: 41137923,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Coquimbo Unido',
                ty: 8,
                od: 201,
              },
            ],
            id: 41137916,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Universidad Catolica',
                ty: 8,
                od: 451,
              },
            ],
            id: 41137915,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Everton Vina del Mar',
                ty: 8,
                od: 451,
              },
            ],
            id: 41137913,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Universidad de Chile',
                ty: 8,
                od: 701,
              },
            ],
            id: 41137922,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Espanola',
                ty: 8,
                od: 901,
              },
            ],
            id: 41137917,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Deportes Union La Calera',
                ty: 8,
                od: 901,
              },
            ],
            id: 41137921,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 10,
    tps: [],
    lg: {
      na: 'Chile Primera Division',
      id: 11121,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/50abd84cde4fbef2b740105f277463fb.png',
      sid: 1,
      rid: 33,
      rnm: 'Chile',
      hot: false,
      slid: 111210000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1084153,
    bt: 1701306000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Chile Primera Division 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Mamelodi Sundowns',
                ty: 8,
                od: 1.04,
              },
            ],
            id: 63486060,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Supersport United',
                ty: 8,
                od: 24,
              },
            ],
            id: 63486054,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Orlando Pirates FC',
                ty: 8,
                od: 28,
              },
            ],
            id: 63486057,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kaizer Chiefs',
                ty: 8,
                od: 29,
              },
            ],
            id: 63486053,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lamontville Golden Arrows',
                ty: 8,
                od: 32,
              },
            ],
            id: 63486051,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Moroka Swallows FC',
                ty: 8,
                od: 95,
              },
            ],
            id: 63486050,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Amazulu FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 63486048,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Chippa United FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 63486046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cape Town City FC',
                ty: 8,
                od: 151,
              },
            ],
            id: 63486059,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Stellenbosch FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 63486056,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Royal AM FC',
                ty: 8,
                od: 351,
              },
            ],
            id: 63486055,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Polokwane City',
                ty: 8,
                od: 351,
              },
            ],
            id: 63486058,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Sekhukhune United',
                ty: 8,
                od: 351,
              },
            ],
            id: 63486052,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'TS Galaxy FC',
                ty: 8,
                od: 451,
              },
            ],
            id: 63486045,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Richards Bay FC',
                ty: 8,
                od: 951,
              },
            ],
            id: 63486049,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cape Town Spurs',
                ty: 8,
                od: 1001,
              },
            ],
            id: 63486047,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 16,
    tps: [],
    lg: {
      na: 'South Africa Premier Soccer League',
      id: 11156,
      or: 9999,
      lurl: 'https://static.fastbs55.com/657aaea51837af9776650862cb1c54a2.png',
      sid: 1,
      rid: 85,
      rnm: 'South Africa',
      hot: false,
      slid: 111560000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1498657,
    bt: 1716217200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'South Africa Premier Soccer League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Maritzburg United',
                ty: 8,
                od: 3.77,
              },
            ],
            id: 63506938,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Orbit College FC',
                ty: 8,
                od: 6.05,
              },
            ],
            id: 63506929,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Magesi FC',
                ty: 8,
                od: 6.65,
              },
            ],
            id: 63506926,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Casric Stars FC',
                ty: 8,
                od: 10,
              },
            ],
            id: 63506936,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'JDR Stars',
                ty: 8,
                od: 12.4,
              },
            ],
            id: 63506932,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Hungry Lions',
                ty: 8,
                od: 13.5,
              },
            ],
            id: 63506939,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Marumo Gallants FC',
                ty: 8,
                od: 15.9,
              },
            ],
            id: 63506933,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pretoria University FC',
                ty: 8,
                od: 28,
              },
            ],
            id: 63506930,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Venda Football Academy',
                ty: 8,
                od: 28,
              },
            ],
            id: 63506935,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'NB La Masia',
                ty: 8,
                od: 28,
              },
            ],
            id: 63506928,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Pretoria Callies',
                ty: 8,
                od: 45,
              },
            ],
            id: 63506927,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Upington City FC',
                ty: 8,
                od: 45,
              },
            ],
            id: 63506931,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Baroka FC',
                ty: 8,
                od: 57,
              },
            ],
            id: 63506937,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Cape Town All Stars',
                ty: 8,
                od: 57,
              },
            ],
            id: 63506940,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Platinum City Rovers',
                ty: 8,
                od: 74,
              },
            ],
            id: 63506941,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Uthongathi FC',
                ty: 8,
                od: 111,
              },
            ],
            id: 63506934,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 16,
    tps: [],
    lg: {
      na: 'South Africa National First Division',
      id: 11189,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/bdea684d5212b69586750caa96efb1b4.png',
      sid: 1,
      rid: 85,
      rnm: 'South Africa',
      hot: false,
      slid: 111890000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1498644,
    bt: 1717426800000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'South Africa National First Division 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Chelsea FC (w)',
                ty: 8,
                od: 1.98,
              },
            ],
            id: 60014024,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Arsenal FC (w)',
                ty: 8,
                od: 2.91,
              },
            ],
            id: 60014016,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester City FC (w)',
                ty: 8,
                od: 5.65,
              },
            ],
            id: 60014023,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Manchester United FC (w)',
                ty: 8,
                od: 8.15,
              },
            ],
            id: 60014022,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC (w)',
                ty: 8,
                od: 601,
              },
            ],
            id: 60014021,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014017,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014019,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bristol City WFC (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014025,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014026,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014018,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014020,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leicester City WFC (w)',
                ty: 8,
                od: 1001,
              },
            ],
            id: 60014027,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
      {
        mty: 1990,
        mks: [
          {
            op: [
              {
                nm: 'Bristol City WFC (w)',
                ty: 8,
                od: 2.73,
              },
            ],
            id: 60014010,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Brighton & Hove Albion FC (w)',
                ty: 8,
                od: 3.42,
              },
            ],
            id: 60014009,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leicester City WFC (w)',
                ty: 8,
                od: 3.93,
              },
            ],
            id: 60014012,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'West Ham United (w)',
                ty: 8,
                od: 12,
              },
            ],
            id: 60014014,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Liverpool FC (w)',
                ty: 8,
                od: 15.6,
              },
            ],
            id: 60014008,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Tottenham Hotspur (w)',
                ty: 8,
                od: 20,
              },
            ],
            id: 60014013,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Everton FC (w)',
                ty: 8,
                od: 42,
              },
            ],
            id: 60014011,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Aston Villa FC (w)',
                ty: 8,
                od: 80,
              },
            ],
            id: 60014015,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Relegation',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'England Womens Super League',
      id: 11190,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/52834e558dad0aa4e729cf0edf102f68.png',
      sid: 1,
      rid: 20,
      rnm: 'England',
      hot: false,
      slid: 111900000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1473658,
    bt: 1716037200000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'England Womens Super League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'FC Alania Vladikavkaz',
                ty: 8,
                od: 2.95,
              },
            ],
            id: 59843503,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Torpedo Moscow',
                ty: 8,
                od: 5.7,
              },
            ],
            id: 59843504,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Akron Tolyatti',
                ty: 8,
                od: 6.95,
              },
            ],
            id: 59843505,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FK Khimki',
                ty: 8,
                od: 9.35,
              },
            ],
            id: 59843495,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dynamo Makhachkala',
                ty: 8,
                od: 9.35,
              },
            ],
            id: 59843498,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rodina Moscow',
                ty: 8,
                od: 10.5,
              },
            ],
            id: 59843501,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Sokol Saratov',
                ty: 8,
                od: 23,
              },
            ],
            id: 59843494,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Ska Khabarovsk',
                ty: 8,
                od: 23,
              },
            ],
            id: 59843506,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Shinnik Yaroslavl',
                ty: 8,
                od: 30,
              },
            ],
            id: 59843493,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Yenisey Krasnoyarsk',
                ty: 8,
                od: 201,
              },
            ],
            id: 59843499,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Tyumen',
                ty: 8,
                od: 201,
              },
            ],
            id: 59843497,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Kamaz Naberezhnye Chelny',
                ty: 8,
                od: 351,
              },
            ],
            id: 59843496,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Neftekhimik Nizhnekamsk',
                ty: 8,
                od: 351,
              },
            ],
            id: 59843491,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFK Arsenal Tula',
                ty: 8,
                od: 351,
              },
            ],
            id: 59843502,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Volgar Astrakhan',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843507,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Chernomorets Novorossiysk',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843492,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Leningradets',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843490,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'PFK Kuban Krasnodar',
                ty: 8,
                od: 1001,
              },
            ],
            id: 59843500,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 18,
    tps: [],
    lg: {
      na: 'Russia Football National League',
      id: 11371,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/2c4910a1f3d65c1c77d74d9ae6e6c1d.png',
      sid: 1,
      rid: 5,
      rnm: 'Russia',
      hot: false,
      slid: 113710000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1469044,
    bt: 1717178400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Russia Football National League 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Fotbal Club FCSB',
                ty: 8,
                od: 1.86,
              },
            ],
            id: 57942931,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC CFR 1907 Cluj',
                ty: 8,
                od: 3.4,
              },
            ],
            id: 57942932,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rapid Bucuresti 1923',
                ty: 8,
                od: 11,
              },
            ],
            id: 57942943,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CS Universitatea Craiova 1948',
                ty: 8,
                od: 12.8,
              },
            ],
            id: 57942930,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Farul Constanta',
                ty: 8,
                od: 25,
              },
            ],
            id: 57942939,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ACS Sepsi Osk Sfantu Gheorghe',
                ty: 8,
                od: 49,
              },
            ],
            id: 57942941,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC U Craiova 1948',
                ty: 8,
                od: 126,
              },
            ],
            id: 57942933,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Petrolul Ploiesti',
                ty: 8,
                od: 131,
              },
            ],
            id: 57942935,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AFC Hermannstadt',
                ty: 8,
                od: 131,
              },
            ],
            id: 57942934,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Voluntari',
                ty: 8,
                od: 136,
              },
            ],
            id: 57942936,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Dinamo Bucuresti 1948',
                ty: 8,
                od: 551,
              },
            ],
            id: 57942940,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Universitatea Cluj',
                ty: 8,
                od: 551,
              },
            ],
            id: 57942938,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'ASC Otelul Galati',
                ty: 8,
                od: 601,
              },
            ],
            id: 57942944,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC UTA Arad',
                ty: 8,
                od: 601,
              },
            ],
            id: 57942937,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CSM Politehnica Iasi',
                ty: 8,
                od: 601,
              },
            ],
            id: 57942942,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'FC Botosani',
                ty: 8,
                od: 1001,
              },
            ],
            id: 57942945,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 16,
    tps: [],
    lg: {
      na: 'Romania Liga 1',
      id: 11610,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/2f91ba6ab6c96ea69699e73fd030f9e7.png',
      sid: 1,
      rid: 76,
      rnm: 'Romania',
      hot: false,
      slid: 116100000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1432248,
    bt: 1716746400000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '23/24',
    nm: 'Romania Liga 1 23/24',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Lionel Messi',
                ty: 8,
                od: 1.12,
              },
            ],
            id: 57660947,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Erling Braut Haaland',
                ty: 8,
                od: 6,
              },
            ],
            id: 57660951,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kevin De Bruyne',
                ty: 8,
                od: 56,
              },
            ],
            id: 57660955,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Rodrigo Hernandez Cascante',
                ty: 8,
                od: 57,
              },
            ],
            id: 63531687,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Vinicius Junior',
                ty: 8,
                od: 62,
              },
            ],
            id: 57660956,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kylian Mbappe',
                ty: 8,
                od: 76,
              },
            ],
            id: 57660958,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jude Bellingham',
                ty: 8,
                od: 95,
              },
            ],
            id: 63531686,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Karim Benzema',
                ty: 8,
                od: 101,
              },
            ],
            id: 57660952,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Luka Modric',
                ty: 8,
                od: 151,
              },
            ],
            id: 68329825,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ilkay Gundogan',
                ty: 8,
                od: 151,
              },
            ],
            id: 63531684,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Harry Kane',
                ty: 8,
                od: 151,
              },
            ],
            id: 57660949,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bernardo Silva',
                ty: 8,
                od: 151,
              },
            ],
            id: 68329827,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Julian Alvarez',
                ty: 8,
                od: 151,
              },
            ],
            id: 68329835,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Khvicha Kvaratskhelia',
                ty: 8,
                od: 201,
              },
            ],
            id: 63569279,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Antoine Griezmann',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329826,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Martin Odegaard',
                ty: 8,
                od: 251,
              },
            ],
            id: 68342827,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Mohamed Salah',
                ty: 8,
                od: 251,
              },
            ],
            id: 57660953,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Lautaro Martinez',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329828,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Ruben Dias',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329829,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Nicolo Barella',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329831,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Victor Osimhen',
                ty: 8,
                od: 251,
              },
            ],
            id: 68342828,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jamal Musiala',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329834,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Yassine Bounou',
                ty: 8,
                od: 251,
              },
            ],
            id: 68329838,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Robert Lewandowski',
                ty: 8,
                od: 301,
              },
            ],
            id: 57660948,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Kim Min-Jae',
                ty: 8,
                od: 451,
              },
            ],
            id: 68329830,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Bukayo Saka',
                ty: 8,
                od: 451,
              },
            ],
            id: 68329832,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Josko Gvardiol',
                ty: 8,
                od: 451,
              },
            ],
            id: 68329833,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Andre Onana',
                ty: 8,
                od: 451,
              },
            ],
            id: 68329837,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Randal Kolo Muani',
                ty: 8,
                od: 451,
              },
            ],
            id: 68329839,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 29,
    tps: [],
    lg: {
      na: 'Ballon dOr',
      id: 16846,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/45e70f9769857453be9e056928c2ea1.jpg',
      sid: 1,
      rid: 106,
      rnm: 'International',
      hot: false,
      slid: 168460000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1421315,
    bt: 1697481000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Ballon dOr 2023',
    sb: {},
  },
  {
    nsg: [],
    mg: [
      {
        mty: 1998,
        mks: [
          {
            op: [
              {
                nm: 'Aguilas Doradas',
                ty: 8,
                od: 5.9,
              },
            ],
            id: 65589028,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Millonarios FC',
                ty: 8,
                od: 7.15,
              },
            ],
            id: 65589031,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'America de Cali',
                ty: 8,
                od: 8.45,
              },
            ],
            id: 65589029,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Atletico Nacional Medellin',
                ty: 8,
                od: 8.45,
              },
            ],
            id: 65589027,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Junior FC',
                ty: 8,
                od: 9.7,
              },
            ],
            id: 65589030,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Independiente Medellin',
                ty: 8,
                od: 11.5,
              },
            ],
            id: 65589032,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Alianza Petrolera',
                ty: 8,
                od: 16,
              },
            ],
            id: 65589042,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Tolima',
                ty: 8,
                od: 21,
              },
            ],
            id: 65589046,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Independiente Santa Fe',
                ty: 8,
                od: 21,
              },
            ],
            id: 65589045,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CA Bucaramanga',
                ty: 8,
                od: 31,
              },
            ],
            id: 65589037,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CS Deportivo Pereira',
                ty: 8,
                od: 36,
              },
            ],
            id: 65589039,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AD Pasto',
                ty: 8,
                od: 36,
              },
            ],
            id: 65589034,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Boyaca Chico FC',
                ty: 8,
                od: 42,
              },
            ],
            id: 65589033,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Once Caldas',
                ty: 8,
                od: 42,
              },
            ],
            id: 65589038,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'AD Cali',
                ty: 8,
                od: 50,
              },
            ],
            id: 65589040,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD La Equidad',
                ty: 8,
                od: 50,
              },
            ],
            id: 65589036,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'CD Atletico Huila',
                ty: 8,
                od: 70,
              },
            ],
            id: 65589043,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Union Magdalena',
                ty: 8,
                od: 95,
              },
            ],
            id: 65589044,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Jaguares de Cordoba',
                ty: 8,
                od: 151,
              },
            ],
            id: 65589035,
            ss: 1,
            au: 0,
          },
          {
            op: [
              {
                nm: 'Envigado FC',
                ty: 8,
                od: 251,
              },
            ],
            id: 65589041,
            ss: 1,
            au: 0,
          },
        ],
        nm: 'Winner',
      },
    ],
    tms: 20,
    tps: [],
    lg: {
      na: 'Colombia Primera A Clausura',
      id: 18794,
      or: 9999,
      lurl: 'https://static.fastbs55.com/data/3df5567af55ed82e8dd231add2594c29.png',
      sid: 1,
      rid: 184,
      rnm: 'Colombia',
      hot: false,
      slid: 187940000,
    },
    ts: [],
    mc: {
      pe: 1001,
      r: false,
    },
    id: 1581686,
    bt: 1699218000000,
    ms: 4,
    ne: 0,
    vs: {
      have: false,
    },
    sid: 1,
    smt: 0,
    ty: 1,
    ye: '2023',
    nm: 'Colombia Primera A Clausura 2023',
    sb: {},
  },
];
