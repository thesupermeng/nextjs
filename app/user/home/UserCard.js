'use client';
import { Avatar, ArrowRight, ProfileEdit } from '@/asset/icons';
import useUser from '@/hook/user/useUser';
import { formatCredit } from '@/util/numbers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { ImageWithFallback } from '@/components/fallbackImage';

export const UserCard = () => {
  const { isLogin, user } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  const gotoProfilePage = () => {
    router.push('/user/profileInfo');
  };
  const gotoLogin = () => {
    router.push('/user/login');
  };
  const gotoFollowing = () => {
    router.push('/user/following');
  };

  return (
    <div className='flex flex-col items-stretch rounded-xl backdrop-blur-2xl h-[148px] p-3 bg-tayaGrey'>
      <div className='flex-1 flex flex-row justify-between items-center '>
        <ImageWithFallback
          alt='user'
          width={48}
          height={48}
          src={user?.avatar || Avatar}
          className='w-12 h-12 p-2 rounded-full object-cover'
        />
        <div className='flex-1'>
          {isLogin ? (
            <>
              <div className='text-white text-[15px] font-bold'>
                {user?.nickname}
              </div>
              <div className='flex gap-2 items-center'>
                <div className='text-white/[.55] text-xs font-normal'>
                  {t('userID')}: {user?.username}
                </div>
              </div>
            </>
          ) : (
            <div>{t('helloGuest')}</div>
          )}
        </div>
        {isLogin && (
          <Image
            alt='edit'
            src={ProfileEdit}
            className='w-4 h-4 flex-initial mr-5'
            onClick={gotoProfilePage}
          />
        )}
      </div>
      {isLogin ? (
        <div className='flex flex-1 flex-row items-center justify-start gap-9'>
          <UserNumber
            label={t('balance')}
            text={formatCredit(user?.sum?.balance)}
          />
          <UserNumber
            label={t('following')}
            text={user?.following_count}
            onClick={gotoFollowing}
          />
        </div>
      ) : (
        <div className='flex flex-1 flex-col items-start justify-center'>
          <div className='text-[15px] font-bold'>
            {t('welcomeTo')} {t('eastrich')}
          </div>
          <div
            onClick={gotoLogin}
            className='flex flex-initial self-stretch flex-row items-center justify-between'
          >
            <div className='text-[#FFFFFF8C] text-[13px] font-normal'>
              {t('youAreNotLoggedInClickHereToLogIn')}
            </div>
            <Image
              alt='login'
              src={ArrowRight}
              className='flex'
              onClick={gotoLogin}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const UserNumber = ({ label, text, onClick = () => {} }) => {
  return (
    <div
      className='flex flex-col flex-initial gap-1 text-white text-start'
      onClick={onClick}
    >
      <div className='text-normal font-normal'>{label}</div>
      <div className='text-base font-semibold'>{text}</div>
    </div>
  );
};
