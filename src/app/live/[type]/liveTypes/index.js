import { isWeb } from '@/util/common';
import Image from 'next/image';
import React, { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { ImageWithFallback } from '@/components/fallbackImage';

const LiveType = memo(({ selected, typeData = null, onClick }) => {
  LiveType.displayName = 'LiveType';
  const data = typeData || {};
  const { t } = useTranslation();

  return (
    <div
      onClick={() => onClick()}
      className={
        `${
          !isWeb() && 'text-[13px] h-[30px]'
        } relative shrink-0 flex-initial rounded-lg h-11 px-[0.625rem] overflow-hidden flex flex-row items-center gap-[0.3rem] transition-length duration-300 ease-in-out ` +
        `${
          selected
            ? 'tayagradient shadow-inner text-white max-w-[40rem] cursor-pointer'
            : isWeb()
            ? 'bg-white/5 text-transparent max-w-[2.5rem] hover:max-w-[40rem] hover:text-[#7B7B7B] cursor-pointer'
            : 'bg-white/5 max-w-[40rem] '
        }`
      }
    >
      <ImageWithFallback
        alt={data.name}
        width={isWeb() ? 22 : 18}
        height={isWeb() ? 22 : 18}
        src={selected ? data.icon2 : data.icon1}
        className={`flex-initial ${
          isWeb() ? 'w-[22px] h-[22px]' : 'w-[18px] h-[18px]'
        }`}
      />
      {t(data.name)}
    </div>
  );
});
export default LiveType;
