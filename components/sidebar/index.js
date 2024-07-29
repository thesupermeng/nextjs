'use client';
import Image from 'next/image';
import { useState } from 'react';
import { TabBarButtons } from './buttons/TabBarButton';
import { Expand } from './Expand';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIsLeftSideBarExpanded } from '@/store/common';
import { EastRichRedBlackLogo, EastRichWhiteRedText } from '@/asset/icons';

const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLeftSideBarExpanded(isExpand));
  }, [isExpand]);
  return (
    <div
      className={`flex flex-1 flex-col px-[1.5rem] py-5 items-stretch common-transition ${
        isExpand ? 'w-[17rem] ' : 'w-[7.3rem]'
      }`}
    >
      <div className='flex-initial flex flex-row py-1 mb-1 relative'>
        <Link className='flex flex-row items-center gap-2' href='/home'>
          <Image
            src={EastRichRedBlackLogo}
            alt='Taya'
            className='w-[3.5rem] h-[3.5rem] mx-[0.4rem]'
          />
          <Image
            src={EastRichWhiteRedText}
            alt='Taya'
            className={`flex-initial h-[3.65rem] w-[9rem] ${
              isExpand ? '' : 'hidden'
            }`}
          />
        </Link>
        <div
          className='absolute right-[-2.5rem] bottom-0'
          onClick={() => setIsExpand(!isExpand)}
        >
          <Expand isExpand={isExpand} />
        </div>
      </div>
      <div className={`flex flex-1 flex-col px-[0.4rem] items-stretch `}>
        <TabBarButtons isExpand={isExpand} />
      </div>
    </div>
  );
};

export default Sidebar;
