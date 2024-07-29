import React, { useState } from 'react';
import SoccerMatchDetails from './soccer';
import SoccerLineUpPage from './soccer/lineUpPage';
import MatchDetailsData from './contexts/MatchDetailsContext';

import Stats from './soccer/stats/stats';
import BasketballMatchDetails from './basketball';
import BoxScore from './basketball/boxScore';
import BasketballStats from './basketball/statistics';
import { useNamiMatchDetail } from '@/hook/nami/useNamiMatchDetail';
import { useNamiMatchUpdate } from '@/hook/nami/useNamiMatchUpdate';
import { useNamiMatchLineUp } from '@/hook/nami/useNamiMatchLineUp';
import { useStreamer } from '@/hook/user/useStreamer';
import { SportsTypeFB } from './util/util';
import { isWeb } from '@/util/common';
import i18n from 'i18next';

export default function StatPage({ isMini }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { streamer } = useStreamer();
  const sportType =
    streamer?.live?.match?.sport_id === SportsTypeFB.Basketball ? 2 : 1;
  // todo: seems should be streamer?.match?.sport_id
  const id = streamer?.live?.match?.nami_id;

  const matchDetailsData = useNamiMatchDetail({ id: id }).matchDetail.data;
  const matchUpdateData = useNamiMatchUpdate({ id: id }).matchUpdate.data;
  const liveRoomLineUp = useNamiMatchLineUp({ id: id }).matchLineup.data;

  const tabs = [
    {
      title: i18n.t('summary'),
      children:
        sportType === 1 ? <SoccerMatchDetails /> : <BasketballMatchDetails />,
    },
    {
      title: sportType === 1 ? i18n.t('lineUp') : i18n.t('boxScore'),
      children: sportType === 1 ? <SoccerLineUpPage /> : <BoxScore />,
    },
    {
      title: i18n.t('statistics'),
      children: sportType === 1 ? <Stats /> : <BasketballStats />,
    },
  ];
  return (
    <div className={`flex flex-col flex-1 ${isWeb() ? 'my-5' : ''}`}>
      <div
        className={`flex gap-3 ${isWeb() ? '' : 'p-2'} ${
          isMini && 'fixed top-16 bg-black  w-full z-10'
        }`}
      >
        {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={`cursor-pointer  px-3  rounded-[6px] ${
                selectedTab === index ? 'bg-[#DE173E52]' : 'bg-tayaGrey'
              } ${isWeb() ? 'text-sm py-2' : 'text-[13px] py-1'}`}
              onClick={() => setSelectedTab(index)}
            >
              <p>{tab.title}</p>
            </div>
          );
        })}
      </div>

      <MatchDetailsData.Provider
        value={{ matchUpdateData, matchDetailsData, liveRoomLineUp }}
      >
        {tabs.map((tab, index) => {
          if (selectedTab === index)
            return (
              <div
                key={index}
                className={`detect-scroll overflow-y-auto mt-3 ${
                  isWeb() ? 'flex flex-col flex-[1_0_0]' : ''
                }`}
              >
                {tab.children}
              </div>
            );
        })}
      </MatchDetailsData.Provider>
    </div>
  );
}
