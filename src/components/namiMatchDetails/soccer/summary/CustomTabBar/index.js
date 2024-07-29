import React, { useState } from 'react';
import i18n from 'i18next';
import SoccerTimeline from './SoccerTimeline';
import SoccerStat from '../SoccerStat';
import { isWeb } from '@/util/common';

const tabs = [
  {
    title: i18n.t('keyEvents'),
    children: SoccerTimeline,
  },
  {
    title: i18n.t('statistics'),
    children: SoccerStat,
  },
];

export default function CustomMatchDetailsTabBar() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className='bg-tayaGrey grid grid-cols-2 text-center rounded-[8px] text-sm'>
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

      {tabs.map((Tab, index) => {
        if (index === selected) {
          return <Tab.children key={index} />;
        }
      })}
    </div>
  );
}
