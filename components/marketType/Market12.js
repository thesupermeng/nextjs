'use client';

import { RowTeams } from './component/RowTeams';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1000,
  pe: 1006,
  mks: [
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: '0',
          ty: 1,
          od: 3.1,
          li: '0',
        },
        {
          na: 'Ha Noi FC',
          nm: '0',
          ty: 2,
          od: 1.43,
          li: '0',
        },
      ],
      id: 3965130,
      ss: 1,
      au: 1,
      mbl: 1,
      li: '0',
    },
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: '-0/0.5',
          ty: 1,
          od: 3.6,
          li: '-0/0.5',
        },
        {
          na: 'Ha Noi FC',
          nm: '+0/0.5',
          ty: 2,
          od: 1.34,
          li: '+0/0.5',
        },
      ],
      id: 3965150,
      ss: 1,
      au: 1,
      mbl: 2,
      li: '-0.25',
    },
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: '+0.5',
          ty: 1,
          od: 3.6,
          li: '+0.5',
        },
        {
          na: 'Ha Noi FC',
          nm: '-0.5',
          ty: 2,
          od: 1.34,
          li: '-0.5',
        },
      ],
      id: 3965115,
      ss: 1,
      au: 1,
      mbl: 3,
      li: '0.5',
    },
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: '-1',
          ty: 1,
          od: 1.3,
          li: '-1',
        },
        {
          na: 'Ha Noi FC',
          nm: '+1',
          ty: 2,
          od: 3.98,
          li: '+1',
        },
      ],
      id: 3965126,
      ss: 1,
      au: 1,
      mbl: 4,
      li: '-1',
    },
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: '+1/1.5',
          ty: 1,
          od: 1.2,
          li: '+1/1.5',
        },
        {
          na: 'Ha Noi FC',
          nm: '-1/1.5',
          ty: 2,
          od: 5.35,
          li: '-1/1.5',
        },
      ],
      id: 3965119,
      ss: 1,
      au: 1,
      mbl: 5,
      li: '1.25',
    },
  ],
  tps: ['p', 'ps', 'h'],
  nm: 'Handicap-Penalty',
};
export const Market12 = ({ data = sample, matchData }) => {
  const { mks = [] } = data;
  const op0 = mks?.[0]?.op || [{ na: '' }, { na: '' }];

  return (
    <MarketContainer title={data.nm}>
      <RowTeams matchData={matchData} />
      <div className='flex flex-1 flex-col gap-4'>
        {mks.map((mk, idx) => {
          const { op, id, ss } = mk;
          return (
            <div
              key={idx}
              className='grid grid-cols-2 grid-flow-row gap-y-4 gap-x-3 justify-between'
            >
              <MarketTile
                marketId={id}
                opData={op[0]}
                matchData={matchData}
                name={op[0].nm}
                odd={op[0].bod}
                ss={ss}
              />
              <MarketTile
                marketId={id}
                opData={op[1]}
                matchData={matchData}
                name={op[1].nm}
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
