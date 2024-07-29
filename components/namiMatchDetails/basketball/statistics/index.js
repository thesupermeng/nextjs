import React, { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import MatchDetailsData from '../../contexts/MatchDetailsContext';
import MatchHistory from '@/components/matchHistory';
import Overview from './Overview';
import Comparison from './Comparison';
import { isWeb } from '@/util/common';

export default function BasketballStats() {
  const [activeTab, setActiveTab] = useState(1);
  const { matchDetailsData } = useContext(MatchDetailsData);
  const { t } = useTranslation();
  const tabs = [
    {
      title: t('overview'),
    },
    {
      title: t('comparison'),
    },
  ];

  return (
    <div className='w-full p-3'>
      <div className='bg-tayaGrey grid grid-cols-2 text-center rounded-[8px] text-sm'>
        {tabs.map((tab, index) => {
          return (
            <div
              className={`cursor-pointer ${
                isWeb() ? 'py-2' : 'py-1'
              } rounded-[8px] ${
                activeTab === index ? 'bg-white text-black' : 'opacity-[0.5]'
              }`}
              key={index}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          );
        })}
      </div>

      {activeTab === 0 ? (
        <Overview matchDetailsData={matchDetailsData} />
      ) : (
        activeTab === 1 && <Comparison matchDetailsData={matchDetailsData} />
      )}

      {matchDetailsData?.basketball_match_analysis?.history?.vs_total &&
        matchDetailsData?.basketball_match_analysis?.history?.vs &&
        matchDetailsData?.home && (
          <MatchHistory
            title={t('headToHead')}
            id={matchDetailsData?.home_id}
            team={matchDetailsData?.home}
            totalData={
              matchDetailsData?.basketball_match_analysis?.history?.vs_total
            }
            data={matchDetailsData?.basketball_match_analysis?.history?.vs}
            sportType={matchDetailsData?.sports_type}
          />
        )}

      {matchDetailsData?.basketball_match_analysis?.history?.home_total &&
        matchDetailsData?.basketball_match_analysis?.history?.home &&
        matchDetailsData?.home && (
          <MatchHistory
            title={t('form')}
            id={matchDetailsData?.home_id}
            team={matchDetailsData?.home}
            totalData={
              matchDetailsData?.basketball_match_analysis?.history?.home_total
            }
            data={matchDetailsData?.basketball_match_analysis?.history?.home}
            sportType={matchDetailsData?.sports_type}
          />
        )}

      {matchDetailsData?.basketball_match_analysis?.history?.away_total &&
        matchDetailsData?.basketball_match_analysis?.history?.away &&
        matchDetailsData?.away && (
          <MatchHistory
            id={matchDetailsData?.away_id}
            team={matchDetailsData?.away}
            totalData={
              matchDetailsData?.basketball_match_analysis?.history?.away_total
            }
            data={matchDetailsData?.basketball_match_analysis?.history?.away}
            sportType={matchDetailsData?.sports_type}
          />
        )}
    </div>
  );
}
