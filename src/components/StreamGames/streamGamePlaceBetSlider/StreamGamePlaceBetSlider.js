import { isWeb } from '@/util/common';
import { PlaceBetSliderWeb } from './PlaceBetSliderWeb';
import { PlaceBetSliderH5 } from './PlaceBetSliderH5';
import { PlaceBetRespModal } from './PlaceBetRespModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useUser from '@/hook/user/useUser';
import { useRouter } from 'next/navigation';
import { showRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { postGameBetOrder } from '@/services/user';
import { useStreamGame } from '@/hook/streamGames/useStreamGame';
import { setStreamGameBetAmt } from '@/store/streamGame';
import { useStreamGameList } from '@/hook/streamGames/useStreamGameList';

export const StreamGamePlaceBetSlider = ({
  selectedBet,
  setSelectedBet,
  isBetExpired,
}) => {
  const betAmt = useSelector((s) => s.streamGame.betAmt);
  const gameId = useSelector((s) => s.streamGame.gameId);
  const { gameList } = useStreamGameList();
  const [showPlaceGameBetModal, setShowPlaceGameBetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [placeBetResData, setPlaceBetResData] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState('');
  const { ongoing } = useStreamGame();

  useEffect(() => {
    const currGame = gameList?.find(({ id }) => {
      return id === gameId;
    });
    if (currGame) {
      setSelectedGame(currGame);
      //default min bet amt in gamebet slider upon initialising
      dispatch(setStreamGameBetAmt(currGame.min_bet));
    }
  }, [gameList.id, gameId]);

  // once bet successful and this will auto close pop up
  useEffect(() => {
    if (showPlaceGameBetModal && !isLoading) {
      setTimeout(() => {
        setShowPlaceGameBetModal(false);
        setSelectedBet(null);
        dispatch(setStreamGameBetAmt(selectedGame.min_bet));
      }, 4000);
    }
  }, [showPlaceGameBetModal, isLoading]);

  const onClickPlaceBet = () => {
    setErrMsg('');
    if (user?.sum?.balance < betAmt) {
      if (isWeb()) {
        dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
      } else {
        router.push('/user/deposit');
      }
      return;
    } else {
      setShowPlaceGameBetModal(true);
      //WIP
      postGameBetOrder(ongoing.id, selectedBet.betOption, betAmt)
        .then((res) => {
          if (res) {
            setIsLoading(false);
            if (res.code === 0) {
              setPlaceBetResData(res.data);
            } else {
              setIsError(true);
              setErrMsg(res);
            }
          }
        })
        .catch((e) => console.error('Game bet error', e));
    }
  };

  return (
    <>
      {isWeb()
        ? selectedBet && (
            <PlaceBetSliderWeb
              selectedBet={selectedBet}
              gameId={gameId}
              setSelectedBet={setSelectedBet}
              onClickPlaceBet={onClickPlaceBet}
              isBetExpired={isBetExpired}
              min={selectedGame.min_bet}
              max={selectedGame.max_bet}
            />
          )
        : selectedBet && (
            <PlaceBetSliderH5
              selectedBet={selectedBet}
              gameId={gameId}
              setSelectedBet={setSelectedBet}
              isBetExpired={isBetExpired}
              onClickPlaceBet={onClickPlaceBet}
              min={selectedGame.min_bet}
              max={selectedGame.max_bet}
            />
          )}
      {showPlaceGameBetModal && (
        <PlaceBetRespModal
          isLoading={isLoading}
          isError={isError}
          selectedBet={selectedBet}
          errMsg={errMsg}
          placeBetResData={placeBetResData}
        />
      )}
    </>
  );
};
