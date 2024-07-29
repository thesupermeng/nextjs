'use client';
import { IconArrowWhite } from '@/asset/icons';
import AllBetTypes from '@/components/allBetTypes';
import Footer from '@/components/Footer';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { LoadingPage } from '@/components/loading';
import { MatchInfo } from '@/components/matchInfo';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMatchId, showQuickBet } from '@/store/common';
import { OutrightH5 } from './OutrightH5';
import { isWeb } from '@/util/common';

export default function Page({ params }) {
  const dispatch = useDispatch();
  const { matchPlayType } = useSelector((s) => s.sportsTaya);
  useEffect(() => {
    dispatch(setMatchId(params.matchId));
  }, [params.matchId]);

  useEffect(() => {
    return () => dispatch(showQuickBet(false));
  }, []);

  return (
    <>
      <WEBOnly>
        <div className='flex flex-1 flex-col px-12 relative'>
          <Link href='/sports/Eastrich'>
            <Image
              alt='back'
              src={IconArrowWhite}
              className='absolute right-full rotate-90 w-4 h-5'
            />
          </Link>
          <MatchInfo withVideoIcon />
          <AllBetTypes full />
        </div>
      </WEBOnly>

      <H5Only>
        {/* <FullPageContent> */}
        <div className='flex flex-col flex-1'>
          {matchPlayType === 7 ? (
            <OutrightH5 />
          ) : (
            <>
              <NavHeader betslip fixedPosition />
              <div className='flex mt-20 flex-col'>
                <MatchInfo />
                <AllBetTypes full />
                <Footer />
              </div>
            </>
          )}
        </div>
        {/* </FullPageContent> */}
      </H5Only>
    </>
  );
}
