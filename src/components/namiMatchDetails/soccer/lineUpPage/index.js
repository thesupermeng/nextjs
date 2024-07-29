import React, { useContext } from 'react';
import LineUpFootball from './LineUpFootball';
import MatchDetailsData from '../../contexts/MatchDetailsContext';
import SubComponent from './SubComponent';
import Tag from '../summary/Tag';
import { VerticalLine } from '@/components/verticalLine';
import { NodataV2 } from '@/components/noDataV2';
import InjuriesComponent from './InjuriesComponent';

export default function LineUpPage() {
  const { liveRoomLineUp, matchDetailsData } = useContext(MatchDetailsData);

  if (!liveRoomLineUp) {
    return (
      <div className='flex flex-1 h-[calc(100%_-_3.5rem)]'>
        <NodataV2 />
      </div>
    );
  }
  return (
    <>
      {liveRoomLineUp?.sports_type === 1 && (
        <>
          <LineUpFootball detail={matchDetailsData} lineUp={liveRoomLineUp} />
          {liveRoomLineUp?.football_match_lineup && (
            <SubComponent
              homeTeam={liveRoomLineUp?.home}
              awayTeam={liveRoomLineUp?.away}
              homePlayerList={liveRoomLineUp?.football_match_lineup?.home?.[0]}
              awayPlayerList={liveRoomLineUp?.football_match_lineup?.away?.[0]}
            />
          )}
          {(matchDetailsData?.football_away_injuries ||
            matchDetailsData?.football_home_injuries) && (
            <InjuriesComponent
              homeInjuryList={matchDetailsData?.football_home_injuries}
              awayInjuryList={matchDetailsData?.football_away_injuries}
            />
          )}
          <VerticalLine className='border-2 my-5 !mx-0' />
          <Tag />
        </>
      )}
    </>
  );
}
