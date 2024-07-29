import { Bookmark, IconArrowWhite, Plus } from '@/asset/icons';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HostRecomendationCard } from './hostRecomendationCard';
import useUser from '@/hook/user/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { formatCredit } from '@/util/numbers';
import { showQuickTopUp } from '@/store/common';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';

export const HostRecommendation = () => {
  const [show, setShow] = useState(false);
  const { user, isLogin } = useUser();
  const dispatch = useDispatch();
  const { data: currentMatchData } = useCurrentMatchDetail();
  const mg = currentMatchData?.mg;

  const { hostRecommendationList } = useSelector((s) => s.hostRecommendation);

  useEffect(() => {
    hostRecommendationList?.length <= 0 && setShow(false);
  }, [hostRecommendationList]);

  return (
    <Accordion
      open={show}
      icon={
        <Image
          className={`-translate-x-4 w-3 h-3 transition-transform duration-500 ease-in-out ${
            show ? 'rotate-180' : 'rotate-0'
          }`}
          src={IconArrowWhite}
          alt='expand'
          width={50}
          height={20}
          priority
        />
      }
      className=' !text-white bg-[#121212]'
    >
      <AccordionHeader
        onClick={() => hostRecommendationList?.length > 0 && setShow(!show)}
        className='gap-2 text-[13px] !text-white px-2.5 !border-0 bg-[#050505] !justify-start'
      >
        <Image src={Bookmark} alt='Bookmark' width={16} height={16} />
        Recommended by Host ({hostRecommendationList?.length})
        {isLogin && (
          <div
            className='flex gap-2 bg-[#191A1D] absolute right-0 rounded-[20px] p-1 px-2'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(showQuickTopUp(true));
            }}
          >
            <p>{formatCredit(user?.sum?.balance, false)}</p>
            <div className='bg-tayaRed rounded-full flex items-center justify-center p-1'>
              <Image src={Plus} alt='plus' width={10} height={10} />
            </div>
          </div>
        )}
      </AccordionHeader>

      <AccordionBody className='flex overflow-x-auto gap-2 !text-white '>
        <div className='w-5'></div>
        {hostRecommendationList?.map((recommendation, index) => (
          <HostRecomendationCard
            currentMatchData={currentMatchData}
            key={`${recommendation?.ty}${index}`}
            mg={mg}
            recommendation={recommendation}
          />
        ))}

        <div className='w-5'></div>
      </AccordionBody>
    </Accordion>
  );
};
