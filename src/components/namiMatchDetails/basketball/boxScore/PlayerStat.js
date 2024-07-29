import React from 'react';
import {
  basketball,
  basketballAwayStarter,
  basketballAwayTeam,
  basketballHomeTeam,
} from '../assets/assets';
import Image from 'next/image';

export default function PlayerStat({ playerData, status, viewMore, home }) {
  const Menu = [
    'Time',
    'Points',
    'Rebounds',
    'Assists',
    'Throw',
    'Three Pointer',
    'Free Throw',
    'Rebounds',
    'Defensive Rebounds',
    'Steals',
    'Blocks',
    'Mistakes',
    'Fouls',
  ];
  const numberOfPlayersToShow = viewMore ? playerData.length : 4;

  return (
    <div className='flex w-full'>
      {/* Left Component (Player Info) */}
      <div className='w-[150px]'>
        <table>
          <tbody className='flex flex-col'>
            <tr className=''>
              <td className='px-2 py-1 text-xs text-[#96979B]'>Player</td>
            </tr>
            {playerData?.slice(0, numberOfPlayersToShow).map((item, idx) => (
              <tr key={idx} className='flex items-center gap-1  truncate h-10'>
                <td className='shrink-0'>
                  <div className='relative'>
                    <Image
                      src={
                        item[6][22] == 0
                          ? home
                            ? basketballHomeTeam
                            : basketballAwayStarter
                          : basketballAwayTeam
                      }
                      width={21}
                      height={21}
                      alt='home'
                    />

                    <p className='text-[9px] absolute top-2  text-center w-full text-[#1C1C1C]'>
                      {item[5]}
                    </p>
                  </div>
                </td>
                <td className='flex '>
                  <p className='text-sm truncate w-[100px]'>{item[3]}</p>
                  {status == 1 && item[6][21] == 0 && (
                    <Image
                      src={basketball.src}
                      width={24}
                      height={24}
                      alt='logo'
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Component (Stats Table) */}
      <div className='overflow-x-auto w-[300px] no-scrollbar'>
        <table>
          {/* Table Header */}
          <thead className='text-sm truncate text-[#96979B]'>
            <tr>
              {Menu.map((item, idx) => (
                <th key={`playerStat-${idx}`} className='px-2 py-1 text-xs'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className='mt-2 text-sm text-center'>
            {playerData?.slice(0, numberOfPlayersToShow).map((item, idx) => (
              <tr key={`playerStatDetailsView1-${idx}`}>
                {Menu.map((data, idx1) => (
                  <td
                    key={`playerStatDetailTabView-${idx1}`}
                    className='px-2 h-10'
                  >
                    <p>{getArrayIndex(Menu.indexOf(data), item[6])}</p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const getArrayIndex = (index, item) => {
  switch (index) {
    case 0:
      return `${item[0]}'`;
    case 1:
      return item[19];
    case 2:
      return item[12];
    case 3:
      return item[13];
    case 4:
      return `${item[1]}-${item[2]}`;
    case 5:
      return `${item[4]}-${item[5]}`;
    case 6:
      return `${item[7]}-${item[8]}`;
    case 7:
      return item[10];
    case 8:
      return item[11];
    case 9:
      return item[14];
    case 10:
      return item[15];
    case 11:
      return item[16];
    case 12:
      return item[17];
  }
};
