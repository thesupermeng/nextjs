'use client';
import Image from 'next/image';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useRouter } from 'next/navigation';
import { ArrowRight } from '@/asset/icons';
import { Logout } from '@/asset/icons';
import { logout } from '@/services/user';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import useUser from '@/hook/user/useUser';

const Option = ({ label, icon = '', tw, onClick }) => {
  return (
    <div
      className={`bg-tayaGrey rounded-xl py-4 flex gap-4 px-3 text-md ${tw}`}
      onClick={() => onClick()}
    >
      {icon ? <Image src={icon} alt='icon' width={25} height={25} /> : ''}

      <p className='flex-1'>{label}</p>
      <Image src={ArrowRight} alt='icon' width={25} height={25} />
    </div>
  );
};

export default function Page() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  const onLogoutClick = () => {
    logout().then((res) => {
      if (res.code === 0) {
        router.back();
      }
    });
  };

  const onCloseClick = () => {
    setIsLogoutOpen(false);
  };

  return (
    <FullPageContent>
      <NavHeader label={t('security')} />
      <div className='flex flex-col gap-3 p-3'>
        <div className='flex flex-col rounded-xl gap-3'>
          <Option
            label={t('changePassword')}
            onClick={() => {
              router.push('/user/changePassword');
            }}
          />
          <Option
            onClick={() => {
              user?.has_set_secondary_pwd
                ? router.push('/user/withdraw/resetPin')
                : router.push('/user/withdraw/setUpPin');
            }}
            label={`${
              user?.has_set_secondary_pwd ? t('reset') : t('setUp')
            } ${t('eastrich')} ${t('pin')}`}
          />
          {/* <Option
            label={t('deleteAccount')}
            onClick={() => {
              router.replace('/user/deleteAccount');
            }}
          /> */}
          <Option
            onClick={() => {
              setIsLogoutOpen(true);
            }}
            icon={Logout}
            label={t('logOut')}
          />
        </div>
      </div>
      {isLogoutOpen && (
        <FullPageContent>
          <div className='flex-1 flex flex-col items-center justify-center gap-2'>
            <div className='text-xl font-bold text-center'>{t('logOut')}</div>
            <div className='text-lg text-center mt-5 mb-3'>
              {t('logOutDesc')}
            </div>
            <button
              className='py-3 px-3.5 rounded-md mb-1 tayagradient w-[331px] ml-[61px] mr-[58px]'
              onClick={onLogoutClick}
            >
              <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                {t('logOut')}
              </p>
            </button>
            <button
              className='py-3 px-3.5 opacity-50 w-[331px] ml-[61px] mr-[58px]'
              onClick={onCloseClick}
            >
              <p className='font-semibold text-[15px] text-[#FFFFFF]'>
                {t('cancel')}
              </p>
            </button>
          </div>
        </FullPageContent>
      )}
    </FullPageContent>
  );
}
