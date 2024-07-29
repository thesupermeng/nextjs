import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { FootballField } from '../assets/assets';
import HeaderLineUp from './HeaderLineUp';
import Player from './Player';

export default function LineUpFootball(props) {
  const { lineUp, detail } = props;

  return (
    <div className='flex flex-col'>
      <FootballTiles lineUp={lineUp} detail={detail} />
    </div>
  );
}

const FootballTiles = (props) => {
  const { t } = useTranslation();
  const { lineUp, detail } = props;

  return (
    <div className='relative mt-3 text-sm'>
      <Image
        src={FootballField}
        className='w-full'
        width={100}
        height={100}
        alt='field'
      />

      <HeaderLineUp
        teamIcon={lineUp?.home?.icon}
        formation={lineUp?.football_match_lineup?.home_formation}
        coach={detail?.home?.coach?.name_en}
        referee={
          detail?.football_match?.referee?.name_en_short?.length > 0
            ? detail?.football_match?.referee?.name_en_short
            : detail?.football_match?.referee?.short_name_en?.length > 0
            ? detail?.football_match?.referee?.short_name_en
            : detail?.football_match?.referee?.name_en
        }
        location={
          detail?.football_match?.venue?.name_en_short?.length > 0
            ? detail?.football_match?.venue?.name_en_short
            : detail?.football_match?.venue?.short_name_en?.length > 0
            ? detail?.football_match?.venue?.short_name_en
            : detail?.football_match?.venue?.name_en
        }
      />

      <HomeTeam
        lineUp={lineUp?.football_match_lineup?.home}
        netWorth={lineUp?.football_match_lineup?.home_value}
      ></HomeTeam>
      <AwayTeam
        lineUp={lineUp?.football_match_lineup?.away}
        netWorth={lineUp?.football_match_lineup?.away_value}
      ></AwayTeam>

      <div className='flex items-center gap-2 mt-2 text-sm absolute bottom-2 ml-5'>
        <div className='rounded-[50%] overflow-hidden h-[28px] w-[28px]'>
          <Image
            src={lineUp?.away?.icon}
            width={28}
            height={28}
            className=' h-[28px] w-[28px] object-cover'
            alt='logo'
          />
        </div>
        <div className='text-[10px] leading-tight'>
          <p>{t('formation')}: {lineUp?.football_match_lineup?.away_formation}</p>
          <p>{t('coaches')}: {detail?.away?.coach?.name_en}</p>
        </div>
      </div>
    </div>
  );
};

const HomeTeam = (props) => {
  const { t } = useTranslation();
  const { lineUp, netWorth } = props;
  const player = (data) =>
    data.map((player) => (
      <Player
        team='home'
        key={`homePlayer${player.id}`}
        player={player}
      ></Player>
    ));
  const formation = (data) => {
    const shift = data.slice(1); // the first array is subsitution so need to slice
    return shift.map((row, idx) => (
      <div
        key={`homeRow${idx}`}
        className='flex items-center justify-center w-full'
      >
        {row.length > 0 && player(row)}
      </div>
    ));
  };
  return (
    <div className='flex-1 w-full absolute top-0 text-center flex items-center h-[47%] justify-center'>
      <div className='flex flex-col w-full gap-2 mt-10'>
        {lineUp && formation(lineUp)}
      </div>
      <div className='absolute bottom-[-5.5%] text-xs right-7'>
        {t('teamValue')}: {netWorth}
      </div>
    </div>
  );
};

const AwayTeam = (props) => {
  const { t } = useTranslation();
  const { lineUp, netWorth } = props;
  const player = (data) => {
    // const test = [...data].reverse();
    return data.map((player) => (
      <Player
        team='away'
        key={`awayPlayer${player.id}`}
        player={player}
      ></Player>
    ));
  };

  const formation = (data) => {
    const shift = data.slice(1); // the first array is subsitution so need to slice
    return shift.reverse().map((row, idx) => (
      <div
        key={`awayRow${idx}`}
        className='flex items-center justify-center w-full'
      >
        {row.length > 0 && player(row)}
      </div>
    ));
  };

  return (
    <div className='h-[42%] absolute top-[50.5%] w-full text-xs px-7'>
      <div className='flex text-right justify-end'>{t('teamValue')}: {netWorth}</div>
      <div className='h-full flex flex-col gap-2 justify-around'>
        {lineUp && formation(lineUp)}
      </div>
    </div>
  );
};
