import React, { useContext } from 'react';
import MatchDetailsData from '../contexts/MatchDetailsContext';
import SummaryChart from './summary/AreaChart';
import ScoreTable from './summary/scoreTable';
import ScoreInformation from './summary/scoreInformation';
import PlaceInformation from './summary/placeInformation';
import GameRules from './summary/gameRules';

export default function BasketballMatchDetails() {
  const { matchDetailsData, matchUpdateData } = useContext(MatchDetailsData);

  return (
    <div className='w-full'>
      {matchUpdateData?.basketball_match_trend && (
        <SummaryChart
          liveRoomUpdate={matchUpdateData}
          matchDetailsData={matchDetailsData}
        />
      )}
      <ScoreTable matchUpdateData={matchUpdateData} />
      <ScoreInformation
        matchUpdateData={matchUpdateData}
        matchDetailsData={matchDetailsData}
      />
      <PlaceInformation matchUpdateData={matchUpdateData} />
      <GameRules />
    </div>
  );
}
