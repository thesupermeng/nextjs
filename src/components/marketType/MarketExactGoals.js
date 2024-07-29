'use client';

import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1102,
  pe: 1001,
  mks: [
    {
      op: [
        {
          na: '0',
          nm: '0',
          ty: 311,
          od: -999,
        },
        {
          na: '1',
          nm: '1',
          ty: 312,
          od: 6.4,
        },
        {
          na: '2',
          nm: '2',
          ty: 313,
          od: 3.02,
        },
        {
          na: '3',
          nm: '3',
          ty: 314,
          od: 2.85,
        },
        {
          na: '4',
          nm: '4',
          ty: 315,
          od: 4.03,
        },
        {
          na: '5',
          nm: '5',
          ty: 316,
          od: 7.55,
        },
        {
          na: '6+',
          nm: '6+',
          ty: 322,
          od: 11.9,
        },
      ],
      id: 65482284,
      ss: 1,
      au: 1,
    },
  ],
  tps: ['p', 's'],
  nm: 'Exact Goals',
};
export const MarketExactGoals = ({ data = sample, matchData, col = 3 }) => {
  const {
    mks: [{ op, id, ss }],
  } = data;
  const onClickTile = (data) => {
    console.log('select title', data);
  };

  return (
    <MarketContainer title={data.nm}>
      <div className={`grid grid-cols-${col} grid-flow-row gap-y-4 gap-x-3`}>
        {op.map((o, idx) => {
          return (
            <MarketTile
              key={idx}
              marketId={id}
              opData={o}
              matchData={matchData}
              name={o.na || o.nm}
              odd={o.bod}
              ss={ss}
            />
          );
        })}
      </div>
    </MarketContainer>
  );
};
