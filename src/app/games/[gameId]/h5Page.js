import GameHeader from './GameHeader';
import { useSelector } from 'react-redux';
import { isWeb } from '@/util/common';

export const H5Page = ({ id, url }) => {
  const gameFullScreen = useSelector((s) => s.games.gameFullScreen);
  return (
    <div
      className={` bg-black/100 fixed z-50 inset-0 flex flex-col ${
        gameFullScreen
          ? `fixed z-50 inset-0 flex flex-col`
          : isWeb()
            ? `flex-none`
            : 'flex flex-1 flex-col'
      }`}
    >
      <GameHeader id={id} />
      <iframe
        key={id}
        src={url}
        className={`${
          gameFullScreen
            ? `flex flex-1`
            : isWeb()
              ? 'flex-none w-full h-[80vh]'
              : `w-full h-full`
        }`}
      />
    </div>
  );
};
