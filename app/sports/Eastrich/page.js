'use client';

import { useEffect, useState } from 'react';
import HeaderFilterRow from './HeaderFilterRow';
import HeaderMatchPlayType from './HeaderMatchPlayType';
import HeaderMatchSportsType from './HeaderMatchSportsType';
import TayaSportsList from './TayaSportsList';
import { TayaSportsPagingFooter } from './TayaSportsPagingFooter';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { useDispatch } from 'react-redux';
import { showQuickBet } from '@/store/common';
import Footer from '@/components/Footer';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function Page() {
  const [allExpand, setAllExpand] = useState(true);
  const dispatch = useDispatch();
  const { checkOffset } = useOffsetPosition();

  const customClsForH5Sports = `justify-between mt-0 px-0 bg-[#060607] rounded-none self-stretch`;

  useEffect(() => {
    return () => dispatch(showQuickBet(false));
  }, []);
  return (
    <>
      <WEBOnly>
        <div className='flex flex-col flex-1 text-white'>
          <HeaderMatchPlayType />
          <HeaderMatchSportsType />
          <HeaderFilterRow allExpand={allExpand} setAllExpand={setAllExpand} />
          <div className='overflow-y-auto flex flex-1'>
            <TayaSportsList allExpand={allExpand} />
          </div>
          <TayaSportsPagingFooter />
        </div>
      </WEBOnly>

      <H5Only>
        <div className='flex flex-col flex-1 overflow-hidden text-white bg-transparent z-10 h-full'>
          <div
            style={{ top: `${checkOffset(6)}rem` }}
            className={`fixed flex flex-col z-10 w-full px-4 bg-black`}
          >
            <HeaderMatchPlayType />
            <HeaderMatchSportsType />
            <HeaderFilterRow
              allExpand={allExpand}
              setAllExpand={setAllExpand}
            />
          </div>
          <div
            style={{ marginTop: `${checkOffset(13)}rem` }}
            className={`flex flex-col px-4`}
          >
            <TayaSportsList allExpand={allExpand} />
            <div className='flex flex-initial'>
              <Footer />
            </div>
          </div>
        </div>
        <div className='fixed bottom-16 w-full z-10'>
          <TayaSportsPagingFooter customCss={customClsForH5Sports} />
        </div>
        <NavFooter />
      </H5Only>
    </>
  );
}
