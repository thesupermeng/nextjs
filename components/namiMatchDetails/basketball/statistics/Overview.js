import React from 'react';
import { useTranslation } from 'next-i18next';
import { ImageWithFallback } from '@/components/fallbackImage';
import { IconDefaultGames } from '@/asset/icons';

export default function Overview({ matchDetailsData }) {
  const { t } = useTranslation();
  const TeamStats = ({ homeScore, awayScore, label, className }) => {
    return (
      <div
        className={`flex w-[100%] text-sm py-3  border-[#FFFFFF1A] ${className}`}
      >
        <p className='w-[40%] text-left font-bold'>{homeScore}</p>
        <p className='w-[20%] text-center text-[#D1D1D1]'>{label}</p>
        <p className='w-[40%] text-right font-bold'>{awayScore}</p>
      </div>
    );
  };
  return (
    <div className='mt-3 p-4 rounded-md bg-[#00000033]'>
      <div className='flex justify-between mb-5'>
        <div className='flex items-center w-[50%]'>
          <span className='overflow-hidden rounded-full flex justify-center items-center w-[24px] h-[24px]'>
            <ImageWithFallback
              className='object-cover'
              src={matchDetailsData?.away?.icon}
              alt='logo'
              width={24}
              height={24}
              fallbackSrc={IconDefaultGames}
            />
          </span>
          <p className='ml-3 text-sm'>
            {matchDetailsData?.home?.short_name_en
              ? matchDetailsData?.home?.short_name_en
              : matchDetailsData?.home?.name_en}
          </p>
        </div>
        <div className='flex items-center justify-end w-[50%]'>
          <p className='mr-3 text-sm'>
            {matchDetailsData?.away?.short_name_en
              ? matchDetailsData?.away?.short_name_en
              : matchDetailsData?.away?.name_en}
          </p>
          <span className='overflow-hidden rounded-full flex justify-center items-center w-[24px] h-[24px]'>
            <ImageWithFallback
              className='object-cover'
              src={matchDetailsData?.away?.icon}
              alt='logo'
              width={24}
              height={24}
              fallbackSrc={IconDefaultGames}
            />
          </span>
        </div>
      </div>

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.position ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.position ?? '-'}
        label={t('ranking')}
      />

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.won_rate ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.won_rate ?? '-'}
        label={t('pct')}
      />

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.streaks ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.streaks ?? '-'}
        label={t('streak')}
      />

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.last10 ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.last10 ?? '-'}
        label={t('l10')}
      />

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.home ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.home ?? '-'}
        label={t('home')}
      />

      <TeamStats
        homeScore={matchDetailsData?.basketball_home_ranking?.away ?? '-'}
        awayScore={matchDetailsData?.basketball_away_ranking?.away ?? '-'}
        label={t('away')}
      />
    </div>
  );
}
