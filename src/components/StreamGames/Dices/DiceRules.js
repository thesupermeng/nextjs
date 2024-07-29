import { GAMES_ID } from '@/config/streamGames';
import { isWeb } from '@/util/common';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';

export const DiceRules = () => {
  const { gameList } = useStreamGameList();
  const diceGameConfig = gameList?.find(({ id }) => {
    return id === GAMES_ID.DICES;
  });

  if (!diceGameConfig) return null;
  return (
    <img
      src={isWeb() ? diceGameConfig?.rule_img_web : diceGameConfig?.rule_img_h5}
      alt='Dice Game Rules'
      className='w-full h-auto'
    />
  );
};
