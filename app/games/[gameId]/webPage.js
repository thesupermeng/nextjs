import { useSelector } from 'react-redux';
import GameHeader from './GameHeader';
export const WebPage = ({ id, url }) => {
  const gameFullScreen = useSelector((s) => s.games.gameFullScreen);
  return (
    <div
      className={` ${
        gameFullScreen
          ? `fixed z-50 inset-0 bg-black/100 flex flex-col`
          : `flex flex-col flex-1 w-full mx-12 my-6`
      }`}
    >
      <GameHeader id={id} />
      <iframe
        key={id}
        src={url}
        className={`flex-1 ${gameFullScreen ? `` : `pb-4`}`}
      />
    </div>
  );
};
