import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import SubPlayerComponent from './SubPlayerComponent';
import { isWeb } from '@/util/common';

export default function SubComponent({
  showTeamIcon = true,
  isInjuryList = false,
  homeTeam = null,
  awayTeam = null,
  homePlayerList = [],
  awayPlayerList = [],
}) {
  const { t } = useTranslation();
  return (
    <div className={`${isWeb() ? 'px-2' : 'px-5'}`}>
      <div className='my-3'>
        <p className='text-[16px]'>{t('substitution')}</p>
        <div className='flex justify-between mt-5'>
          {showTeamIcon && (
            <div className={`flex gap-2 ${isWeb() ? 'text-md' : 'text-sm'}`}>
              <Image
                src={homeTeam.icon}
                width={isWeb() ? 30 : 24}
                height={isWeb() ? 30 : 24}
                alt='home'
              />
              <p>
                {homeTeam?.name_en_short?.length > 0
                  ? homeTeam?.name_en_short
                  : homeTeam?.short_name_en?.length > 0
                  ? homeTeam?.short_name_en
                  : homeTeam?.name_en}
              </p>
            </div>
          )}

          {showTeamIcon && (
            <div className={`flex gap-2 ${isWeb() ? 'text-md' : 'text-sm'}`}>
              <p>
                {awayTeam?.name_en_short?.length > 0
                  ? awayTeam?.name_en_short
                  : awayTeam?.short_name_en?.length > 0
                  ? awayTeam?.short_name_en
                  : awayTeam?.name_en}
              </p>
              <Image
                src={awayTeam.icon}
                width={isWeb() ? 30 : 24}
                height={isWeb() ? 30 : 24}
                alt='away'
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-1 gap-2 mt-3'>
        <div className='flex-1'>
          {homePlayerList?.length > 0 &&
            homePlayerList.map((item, index) => (
              <SubPlayerComponent
                key={`homePlayer${index}`}
                isInjury={isInjuryList}
                data={item}
                isHome={true}
              ></SubPlayerComponent>
            ))}
        </div>

        <div className='flex-1'>
          {awayPlayerList?.length > 0 &&
            awayPlayerList.map((item, index) => (
              <SubPlayerComponent
                key={`awayPlayer${index}`}
                isInjury={isInjuryList}
                data={item}
                isHome={false}
              ></SubPlayerComponent>
            ))}
        </div>
      </div>
    </div>
  );
}
