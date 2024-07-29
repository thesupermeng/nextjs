import { isWeb } from '@/util/common';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';

export default function HeaderLineUp(props) {
  const { teamIcon, formation, coach, referee, location } = props;
  const { t } = useTranslation();

  return (
    <div
      className={`absolute top-0 flex justify-between w-full p-2 leading-tight  ${
        isWeb() ? 'text-xs' : 'text-[10px] px-5'
      }`}
    >
      <div className='flex items-center gap-2'>
        <div
          className={`bg-white ${
            isWeb() ? 'w-[37px] h-[37px]' : 'w-[30px] h-[30px]'
          } rounded-[50%] overflow-hidden flex items-center justify-center`}
        >
          {teamIcon && (
            <Image
              src={teamIcon}
              width={isWeb() ? 30 : 25}
              height={isWeb() ? 30 : 25}
              alt='icon'
            />
          )}
        </div>
        <div className={`flex flex-col ${isWeb() ? 'gap-2' : ''}  `}>
          <p>{t('formation')}: {formation || '-'}</p>
          <p>{t('coaches')}: {coach || '-'}</p>
        </div>
      </div>

      <div className={`flex flex-col ${isWeb() ? 'gap-2' : ''}  `}>
        <p>{t('referee')}: {referee || '-'}</p>
        <p>{t('venue')}: {location || '-'}</p>
      </div>
    </div>
  );
}
