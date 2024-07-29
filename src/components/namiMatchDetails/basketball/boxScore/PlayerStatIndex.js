import React, { useState } from 'react';
import PlayerStatistic from './PlayerStatistic';
import { isWeb } from '@/util/common';

export default function PlayerStatIndex({ matchUpdateData }) {
  const [selected, setSelected] = useState(0);

  const tabs = [
    {
      title: matchUpdateData.home.name_en,
    },
    {
      title: matchUpdateData.away.name_en,
    },
  ];
  return (
    <div>
      <div
        className={`${
          isWeb() ? ' text-sm' : 'mx-3 text-xs'
        } bg-tayaGrey grid grid-cols-2 text-center rounded-[8px]`}
      >
        {tabs.map((tab, index) => {
          return (
            <div
              className={`${isWeb() ? 'py-2' : 'py-1'} rounded-[8px] ${
                selected === index ? 'bg-white text-black' : 'opacity-[0.5]'
              }`}
              key={index}
              onClick={() => setSelected(index)}
            >
              {tab.title}
            </div>
          );
        })}
      </div>

      {selected === 0
        ? matchUpdateData?.basketball_match_live?.players?.home !=
            undefined && (
            <PlayerStatistic
              data={matchUpdateData?.basketball_match_live?.players?.home}
              teamData={matchUpdateData?.home}
              status={matchUpdateData?.status}
              home={true}
            />
          )
        : matchUpdateData?.basketball_match_live?.players?.away !=
            undefined && (
            <PlayerStatistic
              data={matchUpdateData?.basketball_match_live?.players?.away}
              teamData={matchUpdateData?.away}
              status={matchUpdateData?.status}
              home={false}
            />
          )}
    </div>
  );
}
