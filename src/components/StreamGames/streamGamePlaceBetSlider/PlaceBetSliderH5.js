import { PlaceBetSlider } from '@/componentsH5/PlaceBetSlider';
import { GameBetOptionCard } from '@/componentsH5/PlaceBetSlider/GameBetOptionCard';
import BottomSheet from '@/componentsH5/bottomSheet';
import { useSelector } from 'react-redux';
import { GAMES_TITLE } from '@/config/streamGames';
import { useTranslation } from 'next-i18next';

export const PlaceBetSliderH5 = ({
  selectedBet,
  setSelectedBet,
  isBetExpired,
  onClickPlaceBet,
  min,
  max,
}) => {
  const gameId = useSelector((s) => s.streamGame.gameId);
  const { t } = useTranslation();

  return (
    <>
      <BottomSheet
        isOpen={true}
        toggleSheet={() => {
          setSelectedBet(false);
        }}
        title={t(GAMES_TITLE[gameId])}
        className='!h-[580px] !p-0 !pt-3 '
      >
        <PlaceBetSlider
          isBetExpired={isBetExpired}
          min={min}
          max={max}
          onClick={onClickPlaceBet}
        >
          <GameBetOptionCard selectedBet={selectedBet} min={min} max={max} />
        </PlaceBetSlider>
      </BottomSheet>
    </>
  );
};
