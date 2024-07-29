import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';

export default function MatchHistoryItem({ item, sportType, id }) {
  const { t } = useTranslation();
  const calMatchScore = (home, away) => {
    let result = 0;

    if (sportType === 1) {
      if (home > away) {
        result = 0;
      } else if (home < away) {
        result = 1;
      } else if (home === away) {
        result = 2;
      }
    } else if (sportType === 2) {
      let sumHome = home.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let sumAway = away.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      if (sumHome > sumAway) {
        result = 0;
      } else if (sumHome < sumAway) {
        result = 1;
      } else if (sumHome == sumAway) {
        result = 2;
      }
    }
    let classStyle =
      'rounded-full w-[30px] h-[30px] flex items-center justify-center text-tayaGrey font-[700]';

    switch (result) {
      case 0:
        return <div className={`${classStyle} bg-[#0AFF5F]`}>{t('w')}</div>;
      case 1:
        return <div className={`${classStyle}  bg-tayaRed`}>{t('l')}</div>;
      default:
        return <div className={`${classStyle} bg-[#C1C1C1]`}>{t('d')}</div>;
    }
  };

  const sumScore = (score) => {
    const total = score.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return total;
  };

  const homeScores =
    sportType === 2 ? sumScore(item?.home_scores) : item?.home_scores[0];

  const awayScores =
    sportType === 2 ? sumScore(item?.away_scores) : item?.away_scores[0];

  const dt = new Date(item?.match_time);
  const formattedDate = dt.toLocaleDateString('en-SG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dt.toLocaleTimeString('en-SG', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const ItemDetails = ({ item, score, penaltyScore, winner }) => {
    return (
      <span className='flex items-center justify-between text-[13px] gap-1'>
        <span className='flex items-center gap-2'>
          <Image src={item?.icon} alt='icon' width={20} height={20} />
          <p>{item?.short_name_en || item?.name_en || ' '}</p>
        </span>

        <span className='flex gap-1 w-3 justify-center'>
          <p className={`${winner ? 'text-white' : 'text-grey'} font-bold`}>
            {score || 0}
          </p>
          {/* {penaltyScore > 0 && (
            <small className='text-[#717698]'>({penaltyScore})</small>
          )} */}
        </span>
      </span>
    );
  };

  return (
    <li className='flex flex-col w-full gap-2 my-3 h-[76px]'>
      {/* if removing the 76px, the container height will keep blinking */}
      <span className='flex text-[11px] gap-1'>
        <span className='bg-[#DE173E38] rounded-[2px] px-1'>{t('ft')}</span>
        <p className='text-xs text-[#96979B]'>
          {formattedDate}, {formattedTime}
        </p>
      </span>

      <div className='flex items-center gap-2'>
        <div className='flex flex-col w-full gap-2'>
          <ItemDetails
            item={item?.home}
            score={sportType === 2 ? homeScores : item?.home_scores[0]}
            penaltyScore={
              sportType === 2
                ? item.home_scores[0] + item.home_scores[1]
                : item?.home_scores[1]
            }
            winner={
              sportType === 2
                ? homeScores >= awayScores
                : item?.home_scores[0] >= item?.away_scores[0]
            }
          />
          <ItemDetails
            item={item?.away}
            score={sportType === 2 ? awayScores : item?.away_scores[0]}
            penaltyScore={
              sportType === 2
                ? item.away_scores[0] + item.away_scores[1]
                : item?.away_scores[1]
            }
            winner={
              sportType === 2
                ? awayScores >= homeScores
                : item?.away_scores[0] >= item?.home_scores[0]
            }
          />
        </div>

        <span className='pl-2'>
          {sportType === 1
            ? item.home_team_id === id
              ? calMatchScore(item?.home_scores[0], item?.away_scores[0])
              : calMatchScore(item?.away_scores[0], item?.home_scores[0])
            : sportType === 2 && item.home_team_id === id
            ? calMatchScore(item?.home_scores, item?.away_scores)
            : calMatchScore(item?.away_scores, item?.home_scores)}
        </span>
      </div>
    </li>
  );
}
