import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import { useFocusStream } from '@/hook/user/useFocusStream';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

const TeamStat = ({ isHome, key, matchDetail, pe, tyg }) => {
  const item = matchDetail?.nsg?.find(
    (item) => item.pe === pe && item.tyg === tyg
  );
  const total = item?.sc;

  return (
    <td className={`px-1 py-3 `} key={key}>
      <p>{isHome ? total?.[0] ?? '-' : total?.[1] ?? '-'}</p>
    </td>
  );
};
export const BasketballScore = () => {
  const isOpenStats = useSelector((s) => s.stats.isOpenStats);
  const { focusStream } = useFocusStream();
  const { matchDetail } = useMatchDetail(focusStream?.match_id);
  const { t } = useTranslation();

  const teamStatItems = [
    { label: t('q1'), pe: 3005, tyg: 5 },
    { label: t('q2'), pe: 3006, tyg: 5 },
    { label: t('q3'), pe: 3007, tyg: 5 },
    { label: t('q4'), pe: 3008, tyg: 5 },
    { label: t('ot1'), pe: 3009, tyg: 5 },
    { label: t('total'), pe: 3001, tyg: 5 },
  ];

  return (
    <div
      className={`fixed right-0 px-3 flex h-full flex-col gap-3 p-4 w-6/12 bg-[#00000090] backdrop-blur-[44px] transform transition-transform duration-300 ease-in-out ${
        isOpenStats
          ? 'translate-x-[0%] animate-in'
          : 'translate-x-[100%] animate-out'
      }`}
    >
      <p className='text-[15px] font-bold tracking-tight'>{t('teamStats')}</p>
      <div className='flex justify-between items-center text-[13px]'>
        <div className='flex items-center gap-1'>
          {matchDetail?.ts?.[0]?.lurl && (
            <Image
              src={matchDetail?.ts?.[0]?.lurl}
              width={25}
              height={25}
              alt='icon'
            />
          )}
          <p>{matchDetail?.ts?.[0]?.na}</p>
        </div>
        <div className='flex items-center gap-1'>
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
      </div>
      <table className='w-full text-sm text-left table-auto'>
        <thead className='text-xs '>
          <tr className='border-b-2 border-[#FFFFFF1A] w-full text-[#96979B]'>
            <th className='px-1 py-3 font-normal'>{t('team')}</th>

            {teamStatItems.map((item, idx) => {
              return (
                <th className='px-1 py-3 font-normal' key={idx}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          <tr className='w-full border-b-2 border-[#FFFFFF1A]'>
            <td className='px-1 py-3'>
              <p>{matchDetail?.ts?.[0]?.na}</p>
            </td>

            {teamStatItems.map((item, index) => (
              <TeamStat
                isHome={true}
                key={index}
                matchDetail={matchDetail}
                pe={item.pe}
                tyg={item.tyg}
              />
            ))}
          </tr>
          <tr>
            <td className='px-1 py-3'>
              <p>{matchDetail?.ts?.[1]?.na}</p>
            </td>
            {teamStatItems.map((item, index) => (
              <TeamStat
                isHome={false}
                key={index}
                matchDetail={matchDetail}
                pe={item.pe}
                tyg={item.tyg}
              />
            ))}
          </tr>
        </tbody>
      </table>
      {/* <ScoreTable matchUpdateData={eg} /> */}
    </div>
  );
};
