import Image from 'next/image';
import React from 'react';
import InjuryComponent from './InjuryComponent';

export default function InjuryList({
  homeTeam = null,
  awayTeam = null,
  homePlayerList = [],
  awayPlayerList = [],
}) {
  return (
    <div className='flex flex-col w-full bg-200 rounded-[8px] p-3'>
      <p className='text-md'>Injury Report</p>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center gap-2'>
          <div className='h-[30px] w-[30px] bg-white rounded-[50%] flex justify-center items-center'>
            <img src={homeTeam?.icon} width={30} />
          </div>
          <p className='truncate text-md w-[100px]'>
            {homeTeam?.name_en_short?.length > 0
              ? homeTeam?.name_en_short
              : homeTeam?.short_name_en?.length > 0
              ? homeTeam?.short_name_en
              : homeTeam?.name_en}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='truncate text-md text-end w-[100px]'>
            {awayTeam?.name_en_short?.length > 0
              ? awayTeam?.name_en_short
              : awayTeam?.short_name_en?.length > 0
              ? awayTeam?.short_name_en
              : awayTeam?.name_en}
          </p>
          <div className='h-[30px] w-[30px] bg-white rounded-[50%] flex justify-center items-center'>
            <img src={awayTeam?.icon} width={30} />
          </div>
        </div>
      </div>

      <div>
        <div>
          {homePlayerList?.length > 0 &&
            homePlayerList.map((item, index) => (
              <InjuryComponent
                key={`homePlayer${index}`}
                data={item}
                isHome={true}
              ></InjuryComponent>
            ))}
        </div>
        <div>
          {awayPlayerList?.length > 0 &&
            awayPlayerList.map((item, index) => (
              <InjuryComponent
                key={`awayPlayer${index}`}
                data={item}
                isHome={false}
              ></InjuryComponent>
            ))}
        </div>
      </div>
    </div>
  );
}
