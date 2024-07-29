import { useEffect, useState } from 'react';
import { RowTeams } from './component/RowTeams';
import { MarketContainer, MarketTile, TeamLabel } from './MarketContainer';

const sample = {
  op: [
    {
      na: '1-0',
      nm: '1-0',
      ty: 110,
      od: -999,
    },
    {
      na: '2-0',
      nm: '2-0',
      ty: 120,
      od: -999,
    },
    {
      na: '2-1',
      nm: '2-1',
      ty: 121,
      od: 15.5,
    },
    {
      na: '3-0',
      nm: '3-0',
      ty: 130,
      od: -999,
    },
    {
      na: '3-1',
      nm: '3-1',
      ty: 131,
      od: 79,
    },
    {
      na: '3-2',
      nm: '3-2',
      ty: 132,
      od: 126,
    },
    {
      na: '4-0',
      nm: '4-0',
      ty: 140,
      od: -999,
    },
    {
      na: '4-1',
      nm: '4-1',
      ty: 141,
      od: 351,
    },
    {
      na: '4-2',
      nm: '4-2',
      ty: 142,
      od: 351,
    },
    {
      na: '4-3',
      nm: '4-3',
      ty: 143,
      od: 351,
    },
    {
      na: '0-0',
      nm: '0-0',
      ty: 100,
      od: -999,
    },
    {
      na: '1-1',
      nm: '1-1',
      ty: 111,
      od: 4.35,
    },
    {
      na: '2-2',
      nm: '2-2',
      ty: 122,
      od: 25,
    },
    {
      na: '3-3',
      nm: '3-3',
      ty: 133,
      od: 251,
    },
    {
      na: '4-4',
      nm: '4-4',
      ty: 144,
      od: 351,
    },
    {
      na: '0-1',
      nm: '0-1',
      ty: 101,
      od: 2.82,
    },
    {
      na: '0-2',
      nm: '0-2',
      ty: 102,
      od: 4.13,
    },
    {
      na: '1-2',
      nm: '1-2',
      ty: 112,
      od: 7.3,
    },
    {
      na: '0-3',
      nm: '0-3',
      ty: 103,
      od: 13.9,
    },
    {
      na: '1-3',
      nm: '1-3',
      ty: 113,
      od: 23,
    },
    {
      na: '2-3',
      nm: '2-3',
      ty: 123,
      od: 80,
    },
    {
      na: '0-4',
      nm: '0-4',
      ty: 104,
      od: 67,
    },
    {
      na: '1-4',
      nm: '1-4',
      ty: 114,
      od: 111,
    },
    {
      na: '2-4',
      nm: '2-4',
      ty: 124,
      od: 351,
    },
    {
      na: '3-4',
      nm: '3-4',
      ty: 134,
      od: 351,
    },
    {
      na: 'Others',
      nm: 'Others',
      ty: 244,
      od: 151,
    },
  ],
  id: 64286993,
  ss: 1,
  au: 1,
};

export const MarketCorrectScore = ({ data = sample, matchData, teams }) => {
  // console.log('correct score sample', data);
  const {
    mks: [{ op, id, ss }],
  } = data;
  const onClickTile = (data) => {
    console.log('select title', data);
  };

  // todo ss0 not yet sale, ss1 on sale
  const [list, setList] = useState({ homes: [], draws: [], aways: [] });
  useEffect(() => {
    const homes = [],
      draws = [],
      aways = [],
      extra = [];
    try {
      data.mks[0].op.map((op) => {
        const [home, away] = op.na.split('-');
        if (isNaN(home) || isNaN(away)) {
          // potential others
          extra.push(op);
        } else {
          // normal vs score
          if (home == away) {
            draws.push(op);
          } else if (home > away) {
            homes.push(op);
          } else {
            aways.push(op);
          }
        }
      });
      const maxLength = Math.max(homes.length, draws.length, aways.length);
      [...Array(maxLength)]
        // reverse the list and fill from the end to insert extras
        .map((_, idx) => idx)
        .map((idx) => {
          homes[idx] = homes[idx] || extra.shift() || null;
          draws[idx] = draws[idx] || extra.shift() || null;
          aways[idx] = aways[idx] || extra.shift() || null;
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
      <>
        <RowTeams matchData={matchData} middle='Tier' />
        <div
          className='grid grid-flow-col grid-cols-3 grid-rows-6 gap-y-4 gap-x-3'
          style={{
            gridTemplateRows: `repeat(${list.maxLength}, minmax(0, 1fr))`,
          }}
        >
          {[...list.homes, ...list.draws, ...list.aways].map((op, idx) => {
            return op ? (
              <MarketTile
                key={idx}
                marketId={id}
                opData={op}
                matchData={matchData}
                name={op.na}
                odd={op.bod}
                ss={ss}
              />
            ) : (
              <div key={idx} />
            );
          })}
        </div>
      </>
    </MarketContainer>
  );
};
