import VipCard from '@/components/myprofile/VipCard';
import {
  FeedbackIconBlue,
  FeedbackIconGrey,
  HistoryIconBlue,
  HistoryIconGrey,
  LogoutBlue,
  LogoutGrey,
  PersonIconBlue,
  PersonIconGrey,
} from '@/asset/icons';
import NavCard from '@/components/myprofile/NavCard';
import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/myprofile/ProfileCard';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/services/yingshiUser';
import { useDispatch } from 'react-redux';
import {
  setAhaToken,
  setYingshiUserInfo,
  setYingshiUserToken,
} from '@/store/yingshiUser';
import LogoutModal from '@/components/login/logoutModal';
import { usePaymentOpen } from '@/hook/yingshiScreenState/usePaymentOpen';
import { useLoginOpen } from '@/hook/yingshiScreenState/useLoginOpen';

export default function WebPage({ subMenus }) {
  const dispatch = useDispatch();
  const { isVip, userInfo, token, refreshUserInfo } = useYingshiUser();
  const router = useRouter();
  const pathname = usePathname();
  const [openLogout, setOpenLogout] = useState(false);
  const [openPayment, setOpenPayment] = usePaymentOpen();
  const [openLogin, setOpenLogin] = useLoginOpen();

  useEffect(() => {
    refreshUserInfo();
  }, []);

  const handleLogout = () => {
    setOpenLogout((x) => !x);
  };

  const hanldeVipClick = () => {
    if (userInfo) {
      setOpenPayment(true);
    } else {
      setOpenLogin(true);
    }
  };

  const navs = [
    {
      title: '个人中心',
      icon: PersonIconGrey,
      iconSelected: PersonIconBlue,
      onClick: () => {},
      platform: 'web',
      href: '/myprofile/userCenter',
      isRequireLogin: true,
    },
    {
      title: '播放历史',
      icon: HistoryIconGrey,
      iconSelected: HistoryIconBlue,
      onClick: () => {},
      platform: 'web',
      href: '/myprofile/watchHistory',
      isRequireLogin: false,
    },
    {
      title: '我要反馈',
      icon: FeedbackIconGrey,
      iconSelected: FeedbackIconBlue,
      onClick: () => {},
      platform: 'web',
      href: '/myprofile/feedback',
      isRequireLogin: false,
    },
    {
      title: '登出',
      icon: LogoutGrey,
      iconSelected: LogoutBlue,
      onClick: () => {
        setOpenLogout(true);
      },
      platform: 'web',
      // href:'/myprofile/logout',
      isRequireLogin: true,
    },
  ];

  // useEffect(() => {
  //   const localStorageToken = localStorage.getItem(LocalStorageKeys.AuthTokenHeader)
  //
  //   if (!token && !localStorageToken && window.innerWidth > 768) {
  //     router.push('/')
  //   }
  // }, [token])

  return (
    <div className={'grid grid-cols-5 xl:grid-cols-4 px-[110px]'}>
      <div
        className={
          'col-span-2 xl:col-span-1 w-full flex flex-col gap-[15px] min-w-[300px]'
        }
      >
        <div
          className={
            'h-[80px] rounded-[12px] bg-[#1A1F24] flex items-center px-[21px] py-[12px]'
          }
          onClick={() => {
              if (!userInfo) {
                // router.push('/myprofile?login=true');
                setOpenLogin(true);
              } 
          }}
        >
          <ProfileCard userInfo={userInfo} isVip={isVip} isH5={false} />
        </div>

        <VipCard onClick={hanldeVipClick} />
        {navs
          .filter((x) => {
            if (userInfo) {
              // is logged in
              return true; // show all
            } else {
              return x.isRequireLogin === false; // show only those that don't require login
            }
          })
          .map((nav, index) => {
            return (
              <NavCard
                key={index}
                {...nav}
                isSelected={pathname === nav.href}
              />
            );
          })}
      </div>
      <div
        className={
          'col-span-3 xl:col-span-3 w-full flex flex-col gap-[15px] items-center px-[60px]'
        }
      >
        {subMenus}
      </div>
      <LogoutModal
        open={openLogout}
        handler={handleLogout}
        onConfirm={() => {
          // logout()
          // dispatch(setYingshiUserToken(null))
          // dispatch(setYingshiUserInfo(null))
          // dispatch(setAhaToken(null))
          // router.push('/')

          logout();

          setTimeout(() => {
            dispatch(setYingshiUserInfo(null));
            dispatch(setYingshiUserToken(null));
            dispatch(setAhaToken(null));
            setOpenLogout(false);
          }, 10);

          router.push('/');
        }}
        onCancel={() => setOpenLogout(false)}
      />
    </div>
  );
}
