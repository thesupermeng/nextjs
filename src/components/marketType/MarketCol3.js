'use client';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1032,
  pe: 1001,
  mks: [
    {
      op: [
        {
          na: 'Perse Ende&Yes',
          nm: 'Home&Yes',
          ty: 23,
          od: 6.35,
        },
        {
          na: 'Perse Ende&No',
          nm: 'Home&No',
          ty: 24,
          od: -999,
        },
        {
          na: 'Draw&Yes',
          nm: 'Draw&Yes',
          ty: 27,
          od: 3.31,
        },
        {
          na: 'Draw&No',
          nm: 'Draw&No',
          ty: 28,
          od: -999,
        },
        {
          na: 'PS Kota Kupang&Yes',
          nm: 'Away&Yes',
          ty: 25,
          od: 3.44,
        },
        {
          na: 'PS Kota Kupang&No',
          nm: 'Away&No',
          ty: 26,
          od: 1.81,
        },
      ],
      id: 65490876,
      ss: 1,
      au: 0,
    },
  ],
  tps: ['p', 's'],
  nm: '1x2 & Both Team To Score',
};

export const MarketCol3 = ({ data = sample, matchData, rows = 2 }) => {
  const {
    mks: [{ op, id, ss }],
  } = data;
  const onClickTile = (data) => {
    console.log('select title', data);
  };
  if (ss === -1) {
    return <></>;
  }
  // todo ss0 not yet sale, ss1 on sale
  const op0 = op || [{ na: '' }, { na: '' }, { na: '' }];

  const rowsClass = {
    2: 'grid-rows-2',
    3: 'grid-rows-3',
  };

  return (
    <MarketContainer title={data.nm}>
      <div
        className={`grid grid-cols-3 ${
          rowsClass[rows] || rowsClass[2]
        } grid-flow-col gap-y-4 gap-x-3`}
      >
        {op.map((op, idx) => {
          return (
            <MarketTile
              key={idx}
              marketId={id}
              opData={op}
              matchData={matchData}
              name={op.na}
              odd={op.bod}
              ss={ss}
            />
          );
        })}
      </div>
    </MarketContainer>
  );
};
