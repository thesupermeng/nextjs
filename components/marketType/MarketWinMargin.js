'use client';
import { useEffect, useState } from 'react';
import { RowTeams } from './component/RowTeams';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  mty: 1018,
  pe: 1001,
  mks: [
    {
      op: [
        {
          na: 'Putera Oesao - Win By 1 Goal',
          nm: ' Home Win By 1 Goal',
          ty: 63,
          od: 15,
        },
        {
          na: 'Putera Oesao - Win By 2 Goals',
          nm: ' Home Win By 2 Goals',
          ty: 64,
          od: 71,
        },
        {
          na: 'Putera Oesao - Win By 3+ Goals',
          nm: ' Home Win By 3+ Goals',
          ty: 65,
          od: 101,
        },
        {
          na: 'Draw',
          nm: 'Draw',
          ty: 3,
          od: 4.54,
        },
        {
          na: 'Persemal Malaka - Win By 1 Goal',
          nm: ' Away Win By 1 Goal',
          ty: 66,
          od: 2.31,
        },
        {
          na: 'Persemal Malaka - Win By 2 Goals',
          nm: ' Away Win By 2 Goals',
          ty: 67,
          od: 2.94,
        },
        {
          na: 'Persemal Malaka - Win By 3+ Goals',
          nm: ' Away Win By 3+ Goals',
          ty: 68,
          od: 4.42,
        },
      ],
      id: 65490916,
      ss: 1,
      au: 1,
    },
  ],
  tps: ['s', 'i'],
  nm: 'Winning Margin',
};

export const MarketWinMargin = ({ data = sample, matchData }) => {
  const {
    mks: [{ op, id, ss }],
  } = data;
  const [list, setList] = useState({ homes: [], draws: [], aways: [] });
  const onClickTile = (data) => {
    console.log('select title', data);
  };
  // todo ss0 not yet sale, ss1 on sale
  useEffect(() => {
    const homes = [],
      draws = [],
      aways = [],
      extra = [];
    try {
      data.mks[0].op.map((op) => {
        if ([63, 64, 65].includes(op.ty)) {
          homes.push(op);
        } else if ([66, 67, 68].includes(op.ty)) {
          aways.push(op);
        } else {
          draws.push(op);
        }
      });
      const maxLength = Math.max(homes.length, draws.length, aways.length);
      [...Array(maxLength)]
        .map((_, idx) => idx)
        .map((idx) => {
          homes[idx] = homes[idx] || {};
          draws[idx] = draws[idx] || {};
          aways[idx] = aways[idx] || {};
        });

      setList({ homes, draws, aways, maxLength });
    } catch (e) {
      setList({ homes, draws, aways, maxLength: 0 });
      console.error('exce', e);
    }
  }, [data]);
  if (ss === -1) {
    return <></>;
  }
  return (
    <MarketContainer title={data.nm}>
      <RowTeams matchData={matchData} middle='Tier' />
      <div
        className='grid grid-flow-col grid-cols-3 grid-rows-3 gap-y-4 gap-x-3'
        // style={{
        //   gridTemplateRows: `repeat(${list.maxLength}, minmax(0, 1fr))`,
        // }}
      >
        {[...list.homes, ...list.draws, ...list.aways].map((op, idx) => {
          return op.na ? (
            <MarketTile
              key={op.nm}
              marketId={id}
              opData={op}
              matchData={matchData}
              name={op.nm}
              odd={op.bod}
              ss={ss}
            />
          ) : (
            <div key={'empty' + idx} />
          );
        })}
      </div>
    </MarketContainer>
  );
};
