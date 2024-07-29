import { Bookmark, CrossWhite } from '@/asset/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { HostRecomendationCard } from './hostRecomendationCard';
import { useSelector } from 'react-redux';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';

export const WebRecommendationSlider = () => {
  const { hostRecommendationList } = useSelector((s) => s.hostRecommendation);
  const { data: currentMatchData } = useCurrentMatchDetail();
  const [showRecommendation, setShowRecommendation] = useState(false);
  const mg = currentMatchData?.mg;

  return (
    <div className='ml-20 min-h-[150px] flex items-center absolute right-10 bottom-1/4 cursor-pointer'>
      {showRecommendation && (
        <>
          <Image
            src={CrossWhite}
            alt='cross'
            width={30}
            className='absolute -top-10 -left-10 opacity-20 hover:opacity-100'
            onClick={() => setShowRecommendation(!showRecommendation)}
          />

          <div className='flex gap-2 flex-wrap justify-end'>
            {hostRecommendationList?.map((recommendation, index) => (
              <HostRecomendationCard
                currentMatchData={currentMatchData}
                key={`${recommendation?.ty}${index}`}
                mg={mg}
                recommendation={recommendation}
              />
            ))}
          </div>
        </>
      )}
      {hostRecommendationList.length > 0 && !showRecommendation && (
        <Image
          src={Bookmark}
          alt='Bookmark'
          width={60}
          height={60}
          onClick={() => setShowRecommendation(!showRecommendation)}
        />
      )}
    </div>
  );
};
