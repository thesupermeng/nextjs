import React from 'react';
import MatchStatisticComponent from './MatchStatisticComponent';

export default function MatchStatistic({
  statisticData = [],
  sportType,
  viewMore,
}) {
  const numberOfPlayersToShow = viewMore ? statisticData.length : 4;

  return statisticData
    ?.slice(0, numberOfPlayersToShow)
    .map((item, index) => (
      <MatchStatisticComponent
        key={index}
        index={index}
        data={item}
        sportType={sportType}
      />
    ));
}
