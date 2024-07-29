import { MarketContainer } from '@/components/marketType/MarketContainer';
import { formatCredit } from '@/util/numbers';
import React, { useEffect, useState } from 'react';
import { DICE_BET_TILES, GAMES_ID, GAMES_TITLE } from '@/config/streamGames';
import { setProfileModal, showRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { useDispatch } from 'react-redux';
import { StreamGamePlaceBetSlider } from '../streamGamePlaceBetSlider/StreamGamePlaceBetSlider';
import useUser from '@/hook/user/useUser';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';
import { ProfileModalType } from '@/components/profileModal';
import { useStreamGame } from '@/hook/streamGames/useStreamGame';
import { IconLockOdd } from '@/asset/icons';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const PlayBetDicesAccordion = () => {
  const { ongoing } = useStreamGame();
  const [selectedBet, setSelectedBet] = useState(null);
  const [isBetExpired, setIsBetExpired] = useState(false);
  const dispatch = useDispatch();
  const { isLogin } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (ongoing?.game_id === GAMES_ID.DICES) {
      setIsBetExpired(false);
    } else {
      setIsBetExpired(true);
    }
  }, [ongoing]);

  return (
    <>
      <MarketContainer title={t(GAMES_TITLE[GAMES_ID.DICES])}>
        <div className='grid grid-cols-[repeat(2,_1fr)] gap-3'>
          {DICE_BET_TILES.map((content, index) => {
            return (
              <Tile
                key={`${index}`}
                isLock={isBetExpired}
                content={content}
                onPress={() => {
                  if (!isLogin) {
                    if (isWeb()) {
                      dispatch(setProfileModal(ProfileModalType.LoginModal));
                    } else {
                      router.push('/user/login');
                    }
                  } else {
                    setSelectedBet(content);
                    dispatch(
                      showRightBarContent(
                        RightSidebarContantTypes.StreamGameBetSlip
                      )
                    );
                  }
                }}
                css={content.css}
              />
            );
          })}
        </div>
      </MarketContainer>

      <StreamGamePlaceBetSlider
        selectedBet={selectedBet}
        setSelectedBet={setSelectedBet}
        isBetExpired={isBetExpired}
      />
    </>
  );
};

const Tile = ({ isLock, content = {}, onPress, css = '' }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => {
        isLock ? null : onPress();
      }}
      className={`${
        isLock
          ? 'bg-[#222222] cursor-not-allowed'
          : 'bg-[#242B3E] cursor-pointer'
      } min-w-1/2 p-1.5 rounded-md flex flex-col items-center border border-transparent hover:rounded-md hover:border-white/40 hover:bg-[#242B3E8E] ${css} h-[56px]`}
    >
      {isLock ? (
        <Image
          alt='lock'
          src={IconLockOdd}
          className={`flex flex-initial py-1.5 opacity-20 h-[40px] w-auto`}
          height={30}
          width={30}
        />
      ) : (
        <>
          <p className='flex items-center justify-self-center text-[#6F7076] text-sm leading-[1.125rem]'>
            {t(content.label)}
          </p>
          <p className='font-bold'>{formatCredit(content.betOdds, false)}</p>
        </>
      )}
    </div>
  );
};
