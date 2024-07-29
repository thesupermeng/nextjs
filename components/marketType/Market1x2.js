'use client';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1005,
  pe: 1015,
  mks: [
    {
      op: [
        {
          na: 'Hoang Anh Gia Lai',
          nm: 'Home',
          ty: 1,
          od: -999,
        },
        {
          na: 'Draw',
          nm: 'Draw',
          ty: 3,
          od: 2.27,
        },
        {
          na: 'Ha Noi FC',
          nm: 'Away',
          ty: 2,
          od: 1.15,
        },
      ],
      id: 3730230,
      ss: 0,
      au: 1,
    },
  ],
  tps: ['p', 'ps', 't'],
  nm: '1x2-1st 5 Rounds of Penalty Shootout',
};

export const Market1x2 = ({ data = sample, matchData }) => {
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
  return (
    <MarketContainer title={data.nm}>
      <div className='grid grid-cols-3 grid-flow-row gap-y-4 gap-x-3 flex-initial justify-between'>
        <MarketTile
          marketId={id}
          opData={op[0]}
          matchData={matchData}
          name={op[0].na}
          odd={op[0].bod}
          ss={ss}
        />
        <MarketTile
          marketId={id}
          opData={op[1]}
          matchData={matchData}
          name={op[1].na}
          odd={op[1].bod}
          ss={ss}
        />
        <MarketTile
          marketId={id}
          opData={op[2]}
          matchData={matchData}
          name={op[2].na}
          odd={op[2].bod}
          ss={ss}
        />
      </div>
    </MarketContainer>
  );
};
