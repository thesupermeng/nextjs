import React, { useContext } from 'react';
import MatchDetailsData from '../../contexts/MatchDetailsContext';
import TopPlayerStatistic from './TopPlayerStatistic';
import PlayerStatIndex from './PlayerStatIndex';
import { NodataV2 } from '@/components/noDataV2';

export default function BoxScore() {
  const { matchUpdateData } = useContext(MatchDetailsData);

  return (
    <div className='flex flex-1 flex-col h-full'>
      {!(
        matchUpdateData?.basketball_match_live?.players ||
        matchUpdateData?.basketball_match_live
      ) && <NodataV2 />}

      {matchUpdateData?.basketball_match_live?.players && (
        <TopPlayerStatistic
          data={matchUpdateData?.basketball_match_live?.players}
        />
      )}

      {matchUpdateData?.basketball_match_live && (
        <PlayerStatIndex matchUpdateData={matchUpdateData} />
      )}
    </div>
  );
}
