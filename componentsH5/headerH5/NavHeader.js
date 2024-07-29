import {
  ArrowWhiteLeft,
  IconChevron,
  LiveChat,
  TeamIconIrrPlaceholder,
} from '@/asset/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeaderBetSlip from '../headerBetSlip';
import { setActiveParlay } from '@/store/common';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserGuideStages, setUserGuideStep } from '@/store/userGuide';

export default function NavHeader({
  label = '',
  showBack = true,
  onBack = null,
  right = null,
  betslip = false,
  className = '',
  fixedPosition = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeParlay = useSelector((s) => s.common.activeParlay);
  const isApp = useSelector((s) => s.common.isApp);
  const userGuideStage = useSelector((s) => s.userGuide.currentStep);

  const onClickBack = () => {
    if (userGuideStage === UserGuideStages.Register) {
      dispatch(setUserGuideStep(UserGuideStages.DepositGuide));
    }
    if (activeParlay) {
      dispatch(setActiveParlay(undefined));
    }
    if (onBack) {
      onBack();
    } else {
      if (window.history.length === 1) {
        router.push('/');
      } else {
        router.back();
      }
    }
  };

  if (isApp) {
    return null;
  }
  return (
    <div
      className={`${
        fixedPosition ? 'fixed top-0 z-20' : ''
      } bg-black flex flex-row items-center justify-between flex-initial w-full py-3 ${className}`}
    >
      <div
        className='flex flex-row items-center flex-1 px-2'
        onClick={onClickBack}
      >
        {showBack && (
          <>
            <Image
              alt='back'
              src={IconChevron}
              width={17}
              height={18}
              className='object-contain mr-1 h-[18px]'
            />
            <div className='text-white font-normal text-[14px]'>
              {t('back')}
            </div>
          </>
        )}
      </div>

      <div className='flex flex-initial font-semibold text-[17px]'>
        {typeof label === 'string' ? (
          label?.length > 25 ? (
            `${label.slice(0, 25)}...`
          ) : (
            label
          )
        ) : (
          // for flags & score in liveroom
          <>{label}</>
        )}
      </div>

      <div className='flex justify-end flex-1 items-center'>
        {right && <span>{right}</span>}
        {betslip && <HeaderBetSlip />}
      </div>
      <div className=' h-[0.80px] bg-tayaGrey'></div>
    </div>
  );
}
