import { NodataV2 } from '@/components/noDataV2';
import { useGames } from '@/hook/games/useGames';
import { isWeb } from '@/util/common';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GameCard } from './GameCard';
import { LoadingPage } from '@/components/loading';

export const ColsObj = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
};

export const GamesList = ({ onClick }) => {
  const ref = useRef();
  const { games, isLoading } = useGames();
  const [gridCols, setGridCols] = useState(0);
  const selectedProviders = useSelector((s) => s.games.selectedProviders);
  useEffect(() => {
    if (isWeb()) {
      const observer = new ResizeObserver((entries) => {
        const cols = Math.floor(entries[0].contentRect.width / 220);
        setGridCols(ColsObj[cols] || 'grid-cols-12');
      });
      ref.current && observer.observe(ref.current);

      return () => ref.current && observer.unobserve(ref.current);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (games?.length === 0) {
    return (
      <div ref={ref} className={`${isWeb() ? 'flex w-full h-full' : ''}`}>
        <NodataV2 />
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={`grid ${
        isWeb() ? `${gridCols} gap-5` : 'grid-cols-2 gap-1.5'
      } grid-flow-row`}
    >
      {games
        ?.filter((game) => selectedProviders.includes(game.vendor.id))
        .map((game) => {
          return (
            <GameCard
              key={game.id}
              data={game}
              onClick={(data) => onClick(data)}
            />
          );
        })}
    </div>
  );
};
