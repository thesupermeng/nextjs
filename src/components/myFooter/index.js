'use client';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import {
  homeTab,
  homeTabActive,
  topicTab,
  topicTabActive,
  profileTab,
  profileTabActive,
  AhaLogoActive,
  AhaLogo,
} from '@/asset/icons';
import { use, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MyFooter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    if (pathname.startsWith('/topic')) {
      setSelectedId(998);
    } else if (pathname.startsWith('/vod/show')) {
      setSelectedId(999);
    } else if (pathname.startsWith('/vod/play/')) {
      setSelectedId(-1);
    } else {
      const match = pathname.match(/\/index\/type\/id\/(\w+)/);
      if (match) {
        setSelectedId(parseInt(match[1]));
      } else {
        setSelectedId(0);
      }
    }
  }, [pathname]);

  const handleClick = (value) => {
    if (value == 998) {
      router.push('/topic/index/page');
    } else if (value == 999) {
      // router.push('/film-library');
      router.push('/vod/show/by/time/id/1')
    } else if (value == 990) {
      router.push('/myprofile');
    } else if (value == 997) {
      router.push('/sport');
    } else {
      router.push('/');
    }
  };

  if (
    pathname.startsWith('/vod/play') ||
    pathname.startsWith('/search/') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/setpin') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/service') ||
    // pathname.startsWith('/sport') ||
    pathname.startsWith('/myprofile/watchHistory') ||
    pathname.startsWith('/myprofile/userCenter') ||
    pathname.startsWith('/myprofile/feedback') ||
    // aha
    pathname.startsWith('/sport') ||
    pathname.startsWith('/service') ||
    pathname.startsWith('/sport/user/deposit') ||
    pathname.startsWith('/sport/user/withdraw') ||
    pathname.startsWith('/sport/user/transaction') ||
    pathname.startsWith('/sport/user/history') ||
    pathname.startsWith('/purchase-redirect') 
  ) {
    return <></>;
  }

  const tabs = [
    {
      onClick: () => {
        handleClick(0);
      },
      active: selectedId === 0 && pathname == '/',
      icon: homeTab,
      iconActive: homeTabActive,
      title: '首页',
    },
    // {
    //   onClick: () => {
    //     handleClick(997);
    //   },
    //   active: pathname.startsWith('/sport'),
    //   icon: AhaLogo,
    //   iconActive: AhaLogoActive,
    //   //title: 'aha体育',
    //   title: '体育',
    // },
    {
      onClick: () => {
        handleClick(998);
      },
      active: pathname.startsWith('/topic'),
      icon: topicTab,
      iconActive: topicTabActive,
      title: '播单',
    },
    {
      onClick: () => {
        handleClick(990);
      },
      active: pathname.startsWith('/myprofile'),
      icon: profileTab,
      iconActive: profileTabActive,
      title: '我的',
    },
  ];

  return (
    <div className='w-full mobile' style={{ paddingBottom: '70px' }}>
      <div className='fixed bottom-0 w-full' >
        <div
          className='w-full bg-[#161616eb] pt-2 pb-2'
          style={{ backdropFilter: 'blur(3px)' }}
        >
          <div className='flex'>
            {tabs.map((tab, index) => (
              <TabItem key={index} {...tab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabItem = ({ onClick, active, icon, iconActive, title }) => {
  return (
    <div
      className='col flex-col d-flex justify-center align-center items-center'
      onClick={onClick}
    >
      <div className='d-flex'>
        <Image
          alt='影视TV'
          src={active ? iconActive : icon}
          width={22}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div
        className={`text-[14px] font-medium ${active ? 'text-shayuBlue' : 'text-[#6A6A6A]'
          }`}
      >
        {title}
      </div>
    </div>
  );
};

export default MyFooter;
