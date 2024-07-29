import React, { useState } from 'react';
import '../style/style.css';
import Image from 'next/image';
import CanvasIncident from './CanvasIncident';
import styles from './style.module.css';

import {
  CornerKickIcon,
  PenaltyGoal,
  RedCard,
  YellowCard,
  YellowToRedCard,
  Goal,
} from '../../assets/assets';
import { isWeb } from '@/util/common';

const EventIcon = {
  1: Goal,
  2: CornerKickIcon,
  3: YellowCard,
  4: RedCard,
  15: YellowToRedCard,
  29: PenaltyGoal,
};
const chartHeight = 46;
const iconHeight = 24;
const rightContentWidth = isWeb() ? 390 : 340;

export default function SummaryChart({ matchUpdateData }) {
  const chartData = matchUpdateData?.football_match_trend?.data;
  const liveRoomUpdate = matchUpdateData;
  const time = chartData?.length;
  const totalTime = time <= 90 ? 90 : time; //比赛总时间
  const minutes = [0, 15, 30, 45, 60, 75, totalTime];
  const home = liveRoomUpdate?.home;
  const away = liveRoomUpdate?.away;

  const chartIncident = Array.prototype.filter
    .call(liveRoomUpdate?.football_match_live?.tlive || [], (x) => x.main === 1)
    .sort((a, b) => {
      if (a.time === b.time) {
        return 0;
      } else if (a.time > b.time) {
        return 1;
      } else {
        return -1;
      }
    });

  const incidentFilter = (incidents) => {
    var allocateTime;
    return incidents?.map((x, idx) => {
      const curTime = x.time;
      if (idx > 0) {
        if (curTime <= allocateTime) {
          return { ...x, allocateTime: ++allocateTime };
        } else {
          allocateTime = curTime;
          return { ...x, allocateTime: allocateTime };
        }
      } else {
        allocateTime = curTime;
        return { ...x, allocateTime: curTime };
      }
    });
  };
  const filteredHomeIncident = incidentFilter(
    chartIncident?.filter((x) => x.position === 1)
  );
  const filteredAwayIncident = incidentFilter(
    chartIncident?.filter((x) => x.position === 2)
  );

  const IncidentIcons = ({ data }) => {
    return (
      <div className='relative'>
        {data?.map((e, index) => {
          const size = e.type === 1 || e.type === 29 ? 8 : 10;
          if (EventIcon[e.type]) {
            return (
              <Image
                src={EventIcon[e.type] || ''}
                alt='icon'
                width={size}
                height={size}
                key={`filteredHomeIncident-${index}`}
                style={{
                  width: size,
                  height: size,
                  position: 'absolute',
                  left: (rightContentWidth * e.allocateTime) / totalTime,
                  transform: [{ translateX: -size / 2 }],
                }}
              />
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className='my-8 flex flex-1 flex-col w-full'>
      <div className={styles.container}>
        <div className={styles.rowContent}>
          <div className={styles.leftContent}></div>

          <div
            className={styles.rightContent}
            style={{ height: `${iconHeight + 10}px`, position: 'relative' }}
          >
            <div className={styles.timeIndicators}>
              {minutes.map((e, index) => (
                <span
                  key={`footBallAreaChartMinute-${index}`}
                  className={styles.minuteText}
                  style={{
                    textAlign: 'center',
                    position: 'absolute',
                    left: (e / totalTime) * rightContentWidth,
                    transform: [{ translateX: -200 }],
                  }}
                >
                  {e === 45 ? 'HT' : ` ${e}'`}
                </span>
              ))}
            </div>
            {/* Home Incident */}
            <IncidentIcons data={filteredHomeIncident || []} />
          </div>
        </div>

        <div className={styles.rowContent}>
          <div className={styles.leftContent}>
            {home?.icon && (
              <div className={styles.teamIconContainer}>
                <Image src={home?.icon} width={15} height={15} alt='icon' />
              </div>
            )}
            {away?.icon && (
              <div className={styles.teamIconContainer}>
                <Image src={away?.icon} width={15} height={15} alt='icon' />
              </div>
            )}
          </div>
          <div className={styles.rightContent} style={{ height: chartHeight }}>
            <div className='relative'>
              {/* 背景颜色 */}

              <div
                style={{
                  position: 'absolute',
                  height: chartHeight,
                  width: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: '50%',
                    left: 0,
                    right: 0,
                    background: '#DE173E29',
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: '#0E80E929',
                  }}
                ></div>
              </div>
              {/* 时间指标 */}
              <div
                style={{
                  height: chartHeight,
                  width: rightContentWidth,
                  zIndex: 99,
                  left: (time / totalTime) * rightContentWidth,
                }}
              >
                <CanvasIncident
                  data={chartData}
                  height={chartHeight}
                  width={(time / totalTime) * rightContentWidth}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rowContent} style={{ position: 'relative' }}>
          <div className={styles.leftContent}></div>
          <div
            className={styles.rightContent}
            style={{ height: `${iconHeight}` }}
          >
            {/* Away Incident */}

            <IncidentIcons data={filteredAwayIncident || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
