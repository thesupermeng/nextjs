import { MarketTile } from '@/components/marketType/MarketContainer';
import { isWeb } from '@/util/common';

const GridCols = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' };

export const TayaOutright = ({ match, data }) => {
  return (
    <div>
      <div
        className={`mb-2 ${
          isWeb() ? '' : 'text-[#96979B] text-xs font-medium'
        }`}
      >
        {data.nm}
      </div>

      <div
        className={`grid grid-flow-row gap-y-4 gap-x-3 ${
          isWeb() ? GridCols[data.mks.length] || 'grid-cols-4' : 'grid-cols-1'
        }`}
      >
        {data.mks.map((mk, idx) => {
          return (
            <MarketTile
              key={idx}
              marketId={mk.id}
              opData={mk.op[0]}
              matchData={match}
              name={mk.op[0].nm}
              odd={mk.op[0].bod}
              ss={mk.ss}
              leagueName={match?.nm}
            />
          );
        })}
      </div>
    </div>
  );
};
