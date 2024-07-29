import React, { useContext } from 'react';
import SummaryChart from './summary/AreaChart';
import ScoreInformation from './summary/PieChart';
import CustomMatchDetailsTabBar from './summary/CustomTabBar';
import MatchDetailsData from '../contexts/MatchDetailsContext';
import Tag from './summary/Tag';
import Weather from './summary/Weather';
import { VerticalLine } from '@/components/verticalLine';
import { NodataV2 } from '@/components/noDataV2';

export default function SoccerMatchDetails() {
  const { matchDetailsData, matchUpdateData } = useContext(MatchDetailsData);
  return (
    <div
      className={`flex flex-1 flex-col overflow-x-hidden ${
        !matchDetailsData && !matchUpdateData ? 'h-[calc(100%_-_3.5rem)]' : ''
      }`}
    >
      {!matchDetailsData && !matchUpdateData && <NodataV2 />}

      {matchUpdateData?.football_match_trend && (
        <SummaryChart matchUpdateData={matchUpdateData} />
      )}

      {matchDetailsData && matchUpdateData && (
        <ScoreInformation
          matchDetailsData={matchDetailsData}
          matchUpdateData={matchUpdateData}
        />
      )}

      {matchUpdateData && matchUpdateData?.football_match_live?.incidents && (
        <CustomMatchDetailsTabBar />
      )}
      {matchDetailsData && matchUpdateData && (
        <>
          <Tag />
          <VerticalLine className='border-2 my-5 mx-0' />
          <div className='px-3'>
            <Weather />
          </div>
        </>
      )}
    </div>
  );
}
