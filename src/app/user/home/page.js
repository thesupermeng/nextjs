'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Rules from './icons/Rules.svg';
import Security from './icons/Security.svg';
import {
  ArrowRight,
  Bell,
  FaqIcon,
  Feedback,
  WhiteVoucher,
} from '@/asset/icons';
import { UserCard } from './UserCard';
import { BalanceOptions } from './BalanceOptions';
import LabelHeader from '@/componentsH5/headerH5/LabelHeader';
import useUser from '@/hook/user/useUser';
import { Count } from '@/components/count';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

const NewTag = () => {
  return (
    <div
      className={` bg-[#DE173E] rounded-full p-2 h-4 text-[9px] flex items-center justify-center`}
    >
      New
    </div>
  );
};
const Option = ({
  label,
  icon,
  className,
  type,
  showNewTag = false,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`rounded-xl py-4 flex gap-4 px-3 text-md items-center ${className}`}
    >
      <Image src={icon} alt='icon' width={25} height={25} />
      <p className='flex-1 text-[15px]'>{label}</p>
      <Count type={type} />
      {showNewTag && <NewTag />}
      <Image src={ArrowRight} alt='icon' width={25} height={25} />
    </div>
  );
};

export default function Page() {
  const { isLogin } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { checkOffset } = useOffsetPosition();
  return (
    <>
      <LabelHeader label={'More'} />
      <div
        style={{ marginTop: `${checkOffset(6)}rem` }}
        className={`flex flex-col gap-3 p-3 flex-1 overflow-hidden`}
      >
        <UserCard />

        <div className='flex flex-col gap-3 overflow-y-auto'>
          <BalanceOptions />

          <Option
            className={'bg-tayaGrey '}
            label={t('myVoucher')}
            icon={WhiteVoucher}
            onClick={() => {
              if (!isLogin) router.push('/user/login');
              else router.push('/user/voucher');
            }}
            // showNewTag
          />
          <div className='flex flex-col bg-tayaGrey rounded-xl'>
            <Option
              label={t('bettingRules')}
              icon={Rules}
              onClick={() => {
                router.push('/bettingrules');
              }}
            />
            <div className=' h-[0.80px] border-t border-[#FFFFFF0F] mx-2' />
            <Option
              label={t('notification')}
              icon={Bell}
              type={0}
              onClick={() => {
                if (!isLogin) router.push('/user/login');
                else router.push('/user/notification');
              }}
            />

            <div className='h-[0.80px] border-t border-[#FFFFFF0F] mx-2' />

            <Option
              label={t('faq')}
              icon={FaqIcon}
              onClick={() => {
                router.push('/aboutus/faq');
              }}
            />
            <div className='h-[0.80px] border-t border-[#FFFFFF0F] mx-2' />

            <Option
              label={t('security')}
              icon={Security}
              onClick={() => {
                if (isLogin) router.push('/user/security');
                else router.push('/user/login');
              }}
            />

            <div className='h-[0.80px] border-t border-[#FFFFFF0F] mx-2' />

            <Option
              label={t('customerFeedback')}
              icon={Feedback}
              onClick={() => {
                if (isLogin) router.push('/user/feedback');
                else router.push('/user/login');
              }}
            />

            {/* <div class=' h-[0.80px] border-t border-[#FFFFFF0F] mx-2'></div> */}
            {/* <Option label={'Share'} icon={ShareHollow} /> */}
          </div>
        </div>
      </div>

      <NavFooter />
    </>
  );
}
