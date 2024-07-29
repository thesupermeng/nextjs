import { isWeb } from '@/util/common';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function GoalDistribution({
  matchDetailsData,
  goalDistribution,
}) {
  const homeDetails = matchDetailsData?.home;
  const awayDetails = matchDetailsData?.away;
  const time = ['', "0'", "15'", "30'", "45'", "60'", "75'", "90'"];
  const awayHighestColor = 'bg-[#0051C8]';
  const homeHighestColor = 'bg-[#AF0F1D]';
  const awayColor = 'bg-[#227CFF]';
  const homeColor = 'bg-[#F3293A]';

  let getHomeHighest = () => {
    let homeHighest = 0;
    goalDistribution?.home_scored?.forEach((element) => {
      if (Number(element[0]) > homeHighest) {
        homeHighest = Number(element[0]);
      }
    });
    return homeHighest;
  };

  let getAwayHighest = () => {
    let awayHighest = 0;
    goalDistribution?.away_scored?.forEach((element) => {
      if (Number(element[0]) > awayHighest) {
        awayHighest = Number(element[0]);
      }
    });
    return awayHighest;
  };

  let calHomeTotal = () => {
    let HomeTotal = 0;
    goalDistribution?.home_scored?.forEach((element) => {
      HomeTotal += Number(element[0]);
    });
    return HomeTotal;
  };

  let calAwayTotal = () => {
    let AwayTotal = 0;
    goalDistribution?.away_scored?.forEach((element) => {
      AwayTotal += Number(element[0]);
    });
    return AwayTotal;
  };

  const renderGoalDistribution = (scores, isHome) => {
    const color = isHome ? homeColor : awayColor;
    const highestColor = isHome ? homeHighestColor : awayHighestColor;
    const highest = isHome ? getHomeHighest() : getAwayHighest();

    return scores.map((score, index) => (
      <p
        key={index}
        className={`${
          score[0] === highest ? highestColor : color
        } w-9 text-center ${index === 2 ? 'mr-1' : ''}`}
      >
        {score[0]}
      </p>
    ));
  };

  const TeamDetails = ({ detail, total, score, isHome }) => {
    return (
      <div className='flex'>
        <div className='w-[40%] flex items-center'>
          <span className='bg-white rounded-full min-w-[28px] h-[28px] flex justify-center items-center'>
            <Image
              className='w-[20px] h-[20px] object-contain'
              src={detail?.icon}
              alt='logo'
              width={20}
              height={20}
            />
          </span>
          <p className='ml-2 text-sm truncate'>{detail?.short_name_en}</p>
        </div>

        <div className='w-[60%] flex justify-between h-max text-sm'>
          <p
            className={`${
              isHome ? 'text-[#F3293A]' : 'text-[#227CFF]'
            } w-[10%] text-center`}
          >
            {total}
          </p>
          {renderGoalDistribution(score, isHome)}
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-md bg-[#00000033] mt-4 ${isWeb() ? '' : 'px-3'}`}>
      <h1 className='mb-2 text-lg font-medium'>
        Goal Distribution
        <small className='text-xs text-[#6F7076] ml-3'>
          {'(For this season)'}
        </small>
      </h1>

      <div className='w-[60%] flex justify-between ml-auto pb-3 text-[#6F7076]'>
        {time.map((item, index) => (
          <p className='text-[10px] w-[8.5%] text-center' key={index}>
            {item}
          </p>
        ))}
      </div>

      <TeamDetails
        detail={homeDetails}
        score={goalDistribution?.home_scored}
        total={calHomeTotal()}
        isHome={true}
      />
      <div className='h-2'></div>
      <TeamDetails
        detail={awayDetails}
        score={goalDistribution?.away_scored}
        total={calAwayTotal()}
        isHome={false}
      />
    </div>
  );
}
