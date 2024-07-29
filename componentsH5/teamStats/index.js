import React from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import Image from 'next/image';
import { calculatePercent } from '@/components/namiMatchDetails/util/util';
import { Line } from 'rc-progress';
import { useFocusStream } from '@/hook/user/useFocusStream';

const StatItem = ({ label, value, reverse = false }) => (
  <div className='flex justify-between'>
    <p className='text-[13px] font-bold'>
      {reverse ? value[1] ?? '-' : value[0] ?? '-'}
    </p>
    <p className='text-center capitalize text-[#D1D1D1] text-xs'>{label}</p>
    <p className='text-[13px] font-bold'>
      {reverse ? value[0] ?? '-' : value[1] ?? '-'}
    </p>
  </div>
);

const TeamStat = ({ label, matchDetail, pe, tyg }) => {
  const item = matchDetail?.nsg?.find(
    (item) => item.pe === pe && item.tyg === tyg
  );
  const total = item?.sc ?? '-';
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <StatItem label={label} value={total} />
      <div className='flex items-center gap-5'>
        <Line
          strokeWidth={4}
          trailWidth={4}
          percent={calculatePercent(total[1], total[0])}
          strokeColor={`${
            (total[0] === 0 && total[1] === 0) || total[0] === '-'
              ? '#27282D'
              : '#DE173E'
          }`}
          trailColor='#27282D'
          className='transform -scale-x-100'
        />
        <Line
          strokeWidth={4}
          trailWidth={4}
          percent={calculatePercent(total[0], total[1])}
          strokeColor={`${
            (total[0] === 0 && total[1] === 0) || total[0] === '-'
              ? '#27282D'
              : '#227CFF'
          }`}
          trailColor='#27282D'
        />
      </div>
    </div>
  );
};

const TeamStatsSoccer = () => {
  const { focusStream } = useFocusStream();
  const { matchDetail } = useMatchDetail(focusStream?.match_id);
  const isOpenStats = useSelector((s) => s.stats.isOpenStats);
  const { t } = useTranslation();

  const teamStatItems = [
    { label: t('firstHalf'), pe: 1002, tyg: 5 },
    { label: t('secondHalf'), pe: 1003, tyg: 5 },
    { label: t('redCard'), pe: 1000, tyg: 8 },
    { label: t('yellowCard'), pe: 1000, tyg: 7 },
    { label: t('corner_kicks'), pe: 1000, tyg: 6 },
  ];

  return (
    <div
      className={`fixed z-50 right-0 px-3 flex h-full flex-col gap-3 p-4 w-6/12 bg-[#00000090] backdrop-blur-[44px] transform transition-transform duration-300 ease-in-out ${
        isOpenStats
          ? 'translate-x-[0%] animate-in'
          : 'translate-x-[100%] animate-out'
      }`}
    >
      <p className='text-[15px] font-bold tracking-tight'>{t('teamStats')}</p>
      <div className='flex flex-col gap-2 text-sm'>
        <div className='flex justify-between items-center'>
          {matchDetail?.ts?.[0]?.lurl && (
            <Image
              src={matchDetail?.ts?.[0]?.lurl}
              width={25}
              height={25}
              alt='icon'
            />
          )}
          <p>{matchDetail?.ts?.[0]?.na}</p>
          <p>{matchDetail?.ts?.[1]?.na}</p>
          {matchDetail?.ts?.[1]?.lurl && (
            <Image
              src={matchDetail?.ts?.[1]?.lurl}
              width={25}
              height={25}
              alt='icon'
            />
          )}
        </div>
        {teamStatItems.map((item, index) => (
          <TeamStat
            key={index}
            label={item.label}
            matchDetail={matchDetail}
            pe={item.pe}
            tyg={item.tyg}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamStatsSoccer;
