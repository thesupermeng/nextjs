import React, { useContext } from 'react';
import MatchHistory from '../../../matchHistory';
import GoalDistribution from './GoalDistribution';
import InjurieSusp from './InjuriesSusp';
import MatchDetailsData from '../../contexts/MatchDetailsContext';
import { VerticalLine } from '@/components/verticalLine';
import { NodataV2 } from '@/components/noDataV2';

export default function Stats() {
  const { matchDetailsData } = useContext(MatchDetailsData);

  const goalDistribution = matchDetailsData?.football_match_analysis
    ?.goal_distribution
    ? matchDetailsData?.football_match_analysis?.goal_distribution
    : {};

  return (
    <div className='flex flex-1 flex-col h-[calc(100%_-_3.5rem)]'>
      {!matchDetailsData?.football_match_analysis && <NodataV2 />}

      {matchDetailsData?.football_home_injuries?.length > 0 ||
        (matchDetailsData?.football_away_injuries?.length > 0 && (
          <InjurieSusp
            homePlayerList={matchDetailsData?.football_home_injuries}
            awayPlayerList={matchDetailsData?.football_away_injuries}
          />
        ))}

      {Object.keys(goalDistribution).length > 0 && (
        <>
          <GoalDistribution
            matchDetailsData={matchDetailsData}
            goalDistribution={goalDistribution}
          />
          <VerticalLine className='border-2 my-5 mx-0' />
        </>
      )}

      {matchDetailsData?.football_match_analysis?.history?.vs && (
        <>
          <MatchHistory
            title='Head-to-head'
            id={matchDetailsData?.home_id}
            team={matchDetailsData?.home}
            totalData={
              matchDetailsData?.football_match_analysis?.history?.vs_total
            }
            data={matchDetailsData?.football_match_analysis?.history?.vs}
            sportType={matchDetailsData?.sports_type}
          />
          <VerticalLine className='border-2 my-5 mx-0' />
        </>
      )}

      {matchDetailsData?.football_match_analysis?.history?.home_total && (
        <>
          <MatchHistory
            title='Form'
            id={matchDetailsData?.home_id}
            team={matchDetailsData?.home}
            totalData={
              matchDetailsData?.football_match_analysis?.history?.home_total
            }
            data={matchDetailsData?.football_match_analysis?.history?.home}
            sportType={matchDetailsData?.sports_type}
          />
          <VerticalLine className='border-2 my-5 mx-0' />
        </>
      )}

      {matchDetailsData?.football_match_analysis?.history?.away_total && (
        <MatchHistory
          id={matchDetailsData?.away_id}
          team={matchDetailsData?.away}
          totalData={
            matchDetailsData?.football_match_analysis?.history?.away_total
          }
          data={matchDetailsData?.football_match_analysis?.history?.away}
          sportType={matchDetailsData?.sports_type}
        />
      )}
    </div>
  );
}
