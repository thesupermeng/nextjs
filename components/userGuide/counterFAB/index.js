import { TimerIcon } from '@/asset/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useGuideTimerCountdown } from '@/hook/common/useGuideTimerCountdown';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { STATIC_PROMOTION_TUTORIAL_DURATION } from '@/config/User/promotion';
import { formatCredit } from '@/util/numbers';

export const CounterFAB = ({ reward, minAmount, onTimeup, startTime = 0 }) => {
  const [remainingSec, setRemaininSec] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const nowTime = Date.now();
    setRemaininSec(
      Math.ceil(STATIC_PROMOTION_TUTORIAL_DURATION + startTime - nowTime / 1000)
    );
  }, [startTime]);

  const { min, sec, isTimeUp } = useGuideTimerCountdown(remainingSec);
  const { t } = useTranslation();

  useEffect(() => {
    if (isTimeUp) {
      onTimeup?.();
    }
  }, [min, sec, onTimeup]);

  if (remainingSec <= 0) {
    return null;
  }
  return (
    <div
      onClick={() => {
        router.push('/user/deposit');
      }}
      className='fixed bottom-1/2 transform translate-y-1/2 right-0 w-fit z-10 h-fit flex flex-col items-center'
    >
      <Image src={TimerIcon} alt='TimerIcon' width={70} />
      <div className='absolute top-5 text-[5.455px] text-tayaRed text-center font-bold'>
        <p>{t('limited')} </p>
        <p>{t('timeOffer')}</p>

        <p className='text-[#56548C] text-[13.636px] font-bold'>
          {min}:{sec}
        </p>
      </div>
      <div className='flex flex-col items-center w-[100px] text-[8.182px] font-extrabold absolute -bottom-2 -left-4'>
        <ForegroundText text={`${t('deposit')} ${formatCredit(minAmount)} `} />
        <ForegroundText text={`${t('get')} ${reward || 0} ${t('usdtFree')}`} />
      </div>
    </div>
  );
};

const ForegroundText = ({ text }) => {
  return (
    <div>
      <p className='text-stroke'>{text}</p>
    </div>
  );
};

export default ForegroundText;
