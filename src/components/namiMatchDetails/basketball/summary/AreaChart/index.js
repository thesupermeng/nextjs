import React, { useState } from 'react';
// import '../style/style.css';
import Image from 'next/image';
import CanvasIncident from './CanvasIncident';
import styles from './style.module.css';
import { isWeb } from '@/util/common';

const chartHeight = 50;
const iconHeight = 24;
const rightContentWidth = isWeb() ? 400 : 350;

export default function SummaryChart({ liveRoomUpdate }) {
  const { basketball_match_trend, home, away } = liveRoomUpdate;
  const chartData = basketball_match_trend?.data;

  const time = chartData?.length;
  const totalTime = time <= 40 ? 40 : time; //比赛总时间
  const minutes = [0, 12, 24, 36, totalTime];

  return (
    <div className='my-8 flex flex-1 flex-col'>
      <div
        className={styles.container}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <div className={styles.rowContent}>
          <div className={styles.leftContent}></div>

          <div
            className={styles.rightContent}
            style={{ height: `${iconHeight}px`, position: 'relative' }}
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
                  {`${e}'`}
                </span>
              ))}
            </div>
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
                  width: rightContentWidth,
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
                  width: '100%',
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
          ></div>
        </div>
      </div>
    </div>
  );
}
