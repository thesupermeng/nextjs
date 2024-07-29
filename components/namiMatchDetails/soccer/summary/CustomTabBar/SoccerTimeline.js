import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import MatchDetailsData from '../../../contexts/MatchDetailsContext';
import Switch from 'react-switch';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Image from 'next/image';
import {
  PenaltyGoal,
  SubInV2,
  SubOutV2,
  VideoVAR,
  Whistle,
  YellowCard,
  YellowToRedCard,
  Goal,
  OwnGoal,
  AssistGoal,
} from '../../assets/assets';
import Clock from '../../assets/Clock.svg';
import { isWeb } from '@/util/common';

export default function SoccerTimeline() {
  const { t } = useTranslation();
  const { matchUpdateData } = useContext(MatchDetailsData);
  const [goalOnly, setGoalOnly] = useState(false);

  const [newMatchLive, setNewMatchLive] = useState();
  const matchLive = matchUpdateData?.football_match_live?.incidents;

  useEffect(() => {
    filterMatchLive();
  }, [goalOnly, matchLive]);

  function filterMatchLive() {
    const newMatchLive = matchLive?.filter(({ type }) => {
      if (goalOnly) {
        return type === 1 || type === 8 || type === 12 || type === 11 || type === 17;
      } else {
        return (
          type === 1 ||
          type === 3 ||
          type === 8 ||
          type === 9 ||
          type === 11 ||
          type === 12 ||
          type === 15 ||
          type === 17 ||
          type === 19 ||
          type === 28
        );
      }
    });
    setNewMatchLive(newMatchLive);
  }

  return (
    <>
      <div className='flex justify-end mt-5'>
        <p className='text-[13px] font-normal mr-2'>{t('goalsOnly')}</p>
        <Switch
          className={`switch-goals ${goalOnly ? 'switch-on' : 'switch-off'}`}
          onChange={() => setGoalOnly(!goalOnly)}
          checked={goalOnly}
          height={17}
          width={30}
          onColor='#27282D'
          offColor='#27282D'
          offHandleColor='#8D8D8D'
          onHandleColor='#8D8D8D'
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>

      <div className='relative !text-xs timeline-container'>
        <VerticalTimeline animate={false}>
          <VerticalTimelineElement
            className='vertical-timeline-element--work'
            contentStyle={{ display: 'none' }}
            iconStyle={{
              color: '#fff',
              borderRadius: '20px',
              padding: '0 0.25rem',
            }}
            icon={
              <span className='flex items-center justify-center'>
                <Image src={Clock} alt='clock' width={20} height={20} />
              </span>
            }
          />

          {newMatchLive &&
            newMatchLive.map((item, index) => {
              if (item.type === 11 || item.type === 12 || item.type === 19) {
                return (
                  <VerticalTimelineElement
                    id='timeline'
                    key={index}
                    className='vertical-timeline-element--work'
                    icon={
                      <span className='bg-[#27282D] p-1 rounded-full text-[10px]'>
                        {item.type === 11
                          ? t('halfTime')
                          : item.type === 12
                          ? t('fullTime')
                          : item.type === 19 && t('injuryOt')}
                      </span>
                    }
                  />
                );
              } else if (item.type === 9) {
                //换人
                return (
                  <VerticalTimelineElement 
                    id='timeline'
                    key={index}
                    className='vertical-timeline-element--work'
                    contentStyle={{
                      background: '#1C1C1C',
                      color: '#fff',
                    }}
                    icon={
                      <span className='bg-[#27282D] p-1 rounded-full'>
                        {item.time}
                      </span>
                    }
                    position={item.position === 1 ? 'left' : 'right'}
                  >
                    <div className={`flex items-center ${item.position === 1 ? 'flex-row-reverse' : ''}`}>
                      <Image
                        src={SubInV2}
                        className='w-[15px]'
                        alt='football-icon'
                      />
                      <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'}
                                    ${item.position === 1 ? 'text-end' : ''}
                                    font-normal`}>
                        {item.in_player_name_en}
                      </p>
                    </div>
                    <div className={`flex items-center ${item.position === 1 ? 'flex-row-reverse' : ''}`}>
                      <Image
                        src={SubOutV2}
                        className='w-[15px]'
                        alt='football-icon'
                      />
                      <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'}
                                    ${item.position === 1 ? 'text-end' : ''}
                                    font-normal`}>
                        {item.out_player_name_en}
                      </p>
                    </div>
                  </VerticalTimelineElement>
                );
              }
              //黄牌
              else if (item.type === 3 || item.type === 15 || item.type === 28) {
                return (
                  <VerticalTimelineElement
                    id='timeline'
                    key={index}
                    className='vertical-timeline-element--work'
                    contentStyle={{
                      background: '#1C1C1C',
                      color: '#fff',
                    }}
                    icon={
                      <span className='bg-[#27282D] p-1 rounded-full'>
                        {item.time}
                      </span>
                    }
                    position={item.position === 1 ? 'left' : 'right'}
                  >
                    <div className='bg-[#1C1C1C]'>
                      <div className={`flex ${item.position === 1 ? 'flex-row-reverse' : ''}`}>
                        <Image
                          src={
                            item.type === 3
                              ? YellowCard
                              : item.type === 15 ? YellowToRedCard
                              : item.type === 28 && VideoVAR
                          }
                          className='w-[16px]'
                          alt='football-icon'
                        />
                        <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'} font-normal`}>
                          {item.player_name_en}
                        </p>
                      </div>
                      <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'}  font-normal text-[#8D8D8D] ${item.position === 1 ? 'text-end' : ''}`}>
                        {item.type === 3
                          ? 'Foul'
                          : item.type === 15 ? 'other'
                          : item.type === 28 && 'Pseudo-penalty is effective'}
                      </p>
                    </div>
                  </VerticalTimelineElement>
                );
              } else if (item.type === 1 || item.type === 8 || item.type === 17) {
                //进球, 乌龙球
                return (
                  <VerticalTimelineElement
                    id='timeline'
                    key={index}
                    className='vertical-timeline-element--work'
                    contentStyle={{
                      background: '#1C1C1C',
                      color: '#fff',
                    }}
                    icon={
                      <span className='bg-[#27282D] p-1 rounded-full'>
                        {item.time}
                      </span>
                    }
                    position={item.position === 1 ? 'left' : 'right'}
                  >
                    <div className={`flex items-center ${item.position === 1 ? 'flex-row-reverse' : ''}`}>
                      <Image
                        src={
                          item.type === 1
                            ? Goal
                            : item.type === 8 ? PenaltyGoal
                            : item.type === 17 && OwnGoal
                        }
                        className='w-[16px]'
                        alt='football-icon'
                      />
                      <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'} font-normal`}>
                        {item.player_name_en}
                        {` (${item.home_score}-${item.away_score})`}
                      </p>
                    </div>
                    {
                      item.assist1_id &&
                      <div className={`flex items-center ${item.position === 1 ? 'flex-row-reverse' : ''}`}>
                        <Image
                          src={AssistGoal}
                          className='w-[16px]'
                          alt='assistgoal-icon'
                        />
                        <p className={`${isWeb() ? '!text-xs' : '!text-[10px]'} font-normal text-[#8D8D8D]`}>
                          {item.assist1_name_en}
                        </p>
                      </div>
                    }
                  </VerticalTimelineElement>
                );
              }
            })}

          <VerticalTimelineElement
            className='vertical-timeline-element--work'
            contentStyle={{ display: 'none' }}
            iconStyle={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
            icon={<Image src={Whistle} alt='Whistle' width={30} />}
          />
        </VerticalTimeline>
      </div>
    </>
  );
}
