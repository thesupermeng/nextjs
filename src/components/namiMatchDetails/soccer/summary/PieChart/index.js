import React from 'react';
import { useTranslation } from 'next-i18next';
import { Circle } from 'rc-progress';
import CornerKickIcon from '../../assets/CornerKickIcon.svg';
import InOutTargetRed from '../../assets/InOutTargetRed.svg';
import InOutTargetBlue from '../../assets/InOutTargetBlue.svg';
import Image from 'next/image';

const PieChart = ({ header, home, away }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='header'>{header}</p>
      <div className='flex items-center text-xs'>
        <p>{home ?? '-'}</p>
        <Circle
          className='w-[32px] h-[32px] mx-2'
          percent={calculatePercent(away ?? 0, home ?? 0)}
          strokeColor={away === 0 && home === 0 ? '#7A8997' : '#227CFF'}
          trailColor={'#DE173E'}
          strokeWidth={11}
          trailWidth={11}
        />
        <p>{away ?? '-'}</p>
      </div>
    </div>
  );
};

function calculatePercent(away, home) {
  let newAway = parseInt(away);
  let newHome = parseInt(home);
  const total = newHome + newAway;
  const percent = (newAway / total) * 100;
  return Number.isFinite(percent) ? percent : 0;
}

const CenterStats = (props) => {
  const { isHome, inTarget, offTarget } = props;

  return (
    <div className='relative mx-1 text-xs rounded-full'>
      <Image
        src={isHome ? InOutTargetRed : InOutTargetBlue}
        alt='InOutTargetRed'
        width={62}
      />
      <p
        className={` absolute top-[6px] ${
          isHome ? 'left-[16px]' : 'right-[20px]'
        }`}
      >
        {inTarget || '-'}
      </p>
      <p
        className={`absolute bottom-[13px] ${
          isHome ? 'right-[18px]' : 'left-[18px]'
        }`}
      >
        {offTarget || '-'}
      </p>
    </div>
  );
};

const LeftRightStats = (props) => {
  const { statsIcon, statsLabel } = props;

  return (
    <div className='flex flex-col items-center gap-2 px-1'>
      {statsIcon === 'flag' ? (
        <Image src={CornerKickIcon} alt='cornerKick' width={20} />
      ) : (
        <span
          className={`block ${
            statsIcon === 'yellowCard' ? 'bg-[#FCC511]' : 'bg-[#FC1111]'
          } h-[20px] w-[14px] rounded-sm`}
        />
      )}
      <p className='text-xs font-medium'>{statsLabel ?? '-'}</p>
    </div>
  );
};

export default function ScoreInformation({ matchUpdateData }) {
  const { t } = useTranslation();
  const matchStats = matchUpdateData?.football_match_live?.stats;
  let statsObject = {};
  matchStats?.forEach((x) => {
    statsObject[x.type] = x;
  });

  return (
    <div className='flex flex-col gap-3 mb-5'>
      <div className='flex flex-row justify-around '>
        <PieChart
          header={t('attack')}
          home={statsObject[23]?.home}
          away={statsObject[23]?.away}
        />
        <PieChart
          header={t('dangerousAttack')}
          home={statsObject[24]?.home}
          away={statsObject[24]?.away}
        />
        <PieChart
          header={t('possession')}
          home={statsObject[25]?.home}
          away={statsObject[25]?.away}
        />
      </div>

      <div className='flex flex-row items-center justify-around'>
        <div className='flex justify-between gap-3 mt-4'>
          <LeftRightStats
            statsIcon='yellowCard'
            statsLabel={statsObject[3]?.home}
          />
          <LeftRightStats
            statsIcon='redCard'
            statsLabel={statsObject[4]?.home}
          />
          <LeftRightStats statsIcon='flag' statsLabel={statsObject[2]?.home} />
        </div>
        <div className='flex gap-3'>
          <CenterStats
            isHome={true}
            inTarget={statsObject[22]?.home}
            offTarget={statsObject[21]?.home ?? 0}
          />
          <CenterStats
            isHome={false}
            inTarget={statsObject[22]?.away}
            offTarget={statsObject[21]?.away}
          />
        </div>
        <div className='flex justify-between gap-3 mt-4'>
          <LeftRightStats statsIcon='flag' statsLabel={statsObject[2]?.away} />
          <LeftRightStats
            statsIcon='redCard'
            statsLabel={statsObject[4]?.away}
          />
          <LeftRightStats
            statsIcon='yellowCard'
            statsLabel={statsObject[3]?.away}
          />
        </div>
      </div>
    </div>
  );
}
