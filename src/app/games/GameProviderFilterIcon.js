'use client';
import { Filter } from '@/asset/icons';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GameProviderFilter } from './GameProviderFilter';

export const GameProviderFilterIcon = () => {
  const selectedProviders = useSelector((s) => s.games.selectedProviders);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          isWeb() ? setShowFilterModal(true) : router.push('/games/providers');
        }}
        className={`flex flex-initial relative bg-tayaGrey cursor-pointer ${
          isWeb() ? 'px-3 py-2 rounded-xl' : 'mr-4 px-1.5 py-1.5 rounded-lg'
        }`}
      >
        <Image
          alt='filter'
          src={Filter}
          width={isWeb() ? 20 : 17}
          height={isWeb() ? 20 : 17}
        />
        {/* {selectedProviders.length ? ( */}
        <div
          className={`absolute  ${
            isWeb()
              ? 'w-5 h-5 -top-2 -right-2'
              : 'w-3.5 h-3.5 -top-1.5 -right-1'
          } rounded-full bg-tayaRed flex items-center justify-center`}
        >
          <div className={`${isWeb() ? 'text-xs' : 'text-[10px]'} font-medium`}>
            {selectedProviders.length}
          </div>
        </div>
        {/* ) : null} */}
      </div>
      {showFilterModal ? (
        <GameProviderFilter setShowFilterModal={setShowFilterModal} />
      ) : null}
    </>
  );
};
