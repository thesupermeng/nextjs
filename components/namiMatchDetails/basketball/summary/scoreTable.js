import React from 'react';
import { useTranslation } from 'next-i18next';

function calculateTotalScore(scoresArray) {
  return scoresArray?.reduce(
    (totalScore, score) => totalScore + parseInt(score),
    0
  );
}
function renderTeamRow(isHome, team, scores, overTimeScore, total) {
  return (
    <tr className='w-full border-b-2 border-[#FFFFFF1A]'>
      <td className='px-1 py-3'>{team?.short_name_en || team?.name_en}</td>

      {scores?.map((score, index) => {
        if (index !== scores?.length - 1)
          return (
            <td
              className={`px-1 py-3 ${
                index === scores.length - 1 ? 'last:pr-0 last:text-right' : ''
              }`}
              key={index}
            >
              <p>{score}</p>
            </td>
          );

        if (scores?.length > 4 && scores[4] !== 0 && !overTimeScore) {
          return (
            <td className='px-1 py-3 last:pr-0 last:text-right' key={index}>
              <p>{score}</p>
            </td>
          );
        }
      })}

      {overTimeScore?.map((o, index) => (
        <td key={index} className='px-1 py-3 font-normal'>
          {isHome ? o[0] : o[1]}
        </td>
      ))}
      <td className='px-1 py-3'>{total}</td>
    </tr>
  );
}

export default function ScoreTable({ matchUpdateData }) {
  const { t } = useTranslation();

  if (!matchUpdateData) return <div></div>;

  const homeTotal = calculateTotalScore(matchUpdateData?.home_score);
  const awayTotal = calculateTotalScore(matchUpdateData?.away_score);
  const overTimeScore = matchUpdateData?.basketball_match?.over_time_score;

  return (
    <div className='relative rounded-md bg-[#00000033] px-4 mt-4'>
      <table className='w-full text-sm text-left table-auto'>
        <thead className='text-xs '>
          <tr className='border-b-2 border-[#FFFFFF1A] w-full text-[#96979B]'>
            <th className='px-1 py-3 font-normal'>{t('team')}</th>
            <th className='px-1 py-3 font-normal'>{t('q1')}</th>
            <th className='px-1 py-3 font-normal'>{t('q2')}</th>
            <th className='px-1 py-3 font-normal'>{t('q3')}</th>
            <th className='px-1 py-3 font-normal'>{t('q4')}</th>
            {matchUpdateData?.away_score?.[4] > 0 || overTimeScore ? (
              <td className='px-1 py-3 font-normal'>{t('qt1')}</td>
            ) : (
              <></>
            )}
            {overTimeScore && <td className='px-1 py-3 font-normal'>{t('qt2')}</td>}
            <th className='px-1 py-3 font-normal'>{t('total')}</th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {renderTeamRow(
            true,
            matchUpdateData.home,
            matchUpdateData.home_score,
            overTimeScore,
            homeTotal
          )}
          {renderTeamRow(
            false,
            matchUpdateData.away,
            matchUpdateData.away_score,
            overTimeScore,
            awayTotal
          )}
        </tbody>
      </table>
    </div>
  );
}
