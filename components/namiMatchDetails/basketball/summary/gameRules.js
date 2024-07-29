import React from 'react';
import { useTranslation } from 'next-i18next';

export default function GameRules() {
  const { t } = useTranslation();
  return (
    <div className='px-5'>
      <p className='text-[17px]'>{t('gameRules')}</p>
      <ul className='list-decimal text-[#96979B] p-5 text-[13px]'>
        <li>{t('twoTeamsPlayBasketballWithFivePlayersEach')}</li>
        <li>
          {t('theGoalIsToScorePointsByShootingTheBall')}
        </li>
        <li>{t('theTeamWithTheMostPointsAtTheEnd')}</li>
        <li>
          {t('playersCanMoveTheBallBy')}
        </li>
        <li>
          {t('ifAPlayerTouchesAnOpponentAndItsNotAllowed')}
        </li>
        <li>
          {t('ifATeamGetsTooManyFoulsOrTechnicalFouls')}
        </li>
        <li>
          {t('theresAShotClockThatGivesPlayers')}
        </li>
      </ul>
    </div>
  );
}
