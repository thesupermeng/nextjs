import { CheckBox0, CheckBoxRed } from '@/asset/icons';
import Image from 'next/image';

export const LeagueSection = ({ data, tickedLeagues, onToggle }) => {
  return (
    <div className='flex flex-col flex-initial gap-2 py-2.5 bg-black/50'>
      {data.map((lg) => {
        const isTick = tickedLeagues.includes(lg.id);
        return (
          <div
            key={lg.id}
            className={`flex flex-row items-center text-sm mr-8 ${
              isTick ? 'text-white/100' : 'text-sm text-white/50'
            }`}
            data-letter={lg.na[0]}
            onClick={() => onToggle(lg.id, !isTick)}
          >
            <Image
              alt='flag'
              src={lg.lurl}
              width={20}
              height={20}
              className='object-cover w-5 h-5 mr-2 rounded-full'
            />
            {lg.na} ({lg.mt})
            <div className='flex-1' />
            <Image
              alt='check'
              src={isTick ? CheckBoxRed : CheckBox0}
            />
          </div>
        );
      })}
    </div>
  );
};
