'use client';

import { RowTeams } from './component/RowTeams';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1007,
  pe: 1001,
  mks: [
    {
      op: [
        {
          na: 'Over',
          nm: 'o 1.5/2',
          ty: 4,
          od: 1.54,
          li: '1.5/2',
        },
        {
          na: 'Under',
          nm: 'u 1.5/2',
          ty: 5,
          od: 2.06,
          li: '1.5/2',
        },
      ],
      id: 65481820,
      ss: 1,
      au: 0,
      mbl: 1,
      li: '1.75',
    },
    {
      op: [
        {
          na: 'Over',
          nm: 'o 2',
          ty: 4,
          od: 2.07,
          li: '2',
        },
        {
          na: 'Under',
          nm: 'u 2',
          ty: 5,
          od: 1.53,
          li: '2',
        },
      ],
      id: 65481468,
      ss: 1,
      au: 0,
      mbl: 2,
      li: '2',
    },
  ],
  tps: ['p', 'h'],
  nm: 'Over/Under',
};
export const MarketOverUnder = ({ data = sample, matchData }) => {
  const { mks = [] } = data;
  const onClickTile = (data) => {
    console.log('select title', data);
  };
  const op0 = mks?.[0]?.op || [{ na: '' }, { na: '' }];

  return (
    <MarketContainer title={data.nm}>
      <RowTeams matchData={matchData} left=' ' />
      <div className='flex flex-1 flex-row gap-3'>
        <TeamLabel text='' />
        <TeamLabel text={op0[0].na} />
        <TeamLabel text={op0[1].na} />
      </div>
      <div className='flex flex-1 flex-col gap-3'>
        {mks.map((mk, idx) => {
          const { op, id, ss } = mk;
          return (
            <div
              key={idx}
              className='grid grid-cols-3 grid-flow-row gap-y-4 gap-x-3 justify-between'
            >
              <MarketTile
                marketId={id}
                opData={op[0]}
                matchData={matchData}
                mode='label'
                label={op[0].li}
                ss={ss}
              />
              <MarketTile
                marketId={id}
                opData={op[0]}
                matchData={matchData}
                name={op[0].li}
                odd={op[0].bod}
                ss={ss}
              />
              <MarketTile
                marketId={id}
                opData={op[1]}
                matchData={matchData}
                name={op[1].li}
                odd={op[1].bod}
                ss={ss}
              />
            </div>
          );
        })}
      </div>
    </MarketContainer>
  );
};
