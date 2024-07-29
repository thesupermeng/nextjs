import React, { useContext, useEffect, useState } from 'react';
import MatchDetailsData from '../../../contexts/MatchDetailsContext';
import { weatherIndicatorImage } from './ImageIndicator';
import Image from 'next/image';
import i18n from 'i18next';
import { Humidity, Pressure, Temperature, Wind } from '../../assets/assets';

export default function Weather() {
  const { matchDetailsData } = useContext(MatchDetailsData);
  const [currentWeather, setCurrentWeather] = useState(
    weatherIndicatorImage[0]
  );
  const weatherEnv = matchDetailsData?.football_match?.environment;
  const venue = matchDetailsData?.football_match?.venue?.name_en;

  useEffect(() => {
    checkWeather(weatherEnv);
  }, [weatherEnv]);

  function checkWeather(weather) {
    weatherIndicatorImage.map((item) => {
      if (weather?.weather === item.type) {
        setCurrentWeather(weatherIndicatorImage[item.type]);
        return true;
      }
    });
  }

  const weatherParameters = [
    { key: 'humidity', icon: Humidity, label: i18n.t('humidity') },
    { key: 'temperature', icon: Temperature, label: i18n.t('temperature') },
    { key: 'wind', icon: Wind, label: i18n.t('wind') },
    { key: 'pressure', icon: Pressure, label: i18n.t('Pressure') },
  ];

  return (
    <div className='flex w-full bg-center text-[9px] p-3 bg-tayaGrey rounded-[3px] gap-5'>
      <div className='flex flex-col items-center gap-1 '>
        <span className='flex items-center justify-center mr-1'>
          <Image
            src={currentWeather?.icon?.src}
            alt='weather'
            width={28}
            height={28}
          />
          <p className='ml-2 text-xs font-medium leading-tight'>
            {currentWeather?.name}
          </p>
        </span>

        {venue && <p>{venue}</p>}
      </div>

      <div className='grid grid-cols-2 gap-1'>
        {weatherParameters.map((param) => (
          <div key={param.key} className='flex text-[9px] gap-2 items-center'>
            <Image
              src={param.icon}
              width={17}
              alt={param.label.toLowerCase()}
            />
            <p>
              {param.label}: {weatherEnv?.[param.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
