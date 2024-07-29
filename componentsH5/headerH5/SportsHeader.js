'use client';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { EastRichWhiteLogo, FbLogo } from '@/asset/icons';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeaderBetSlip from '../headerBetSlip';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function SportsHeader() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { checkOffset } = useOffsetPosition();

  const Option = ({ label, href, logo }) => {
    return (
      <Link
        href={href}
        className={`items-center flex flex-row gap-1 ${
          pathname === href ? 'text-xl font-bold' : 'text-opacity-50 text-md'
        }`}
      >
        {pathname === href && (
          <Image src={logo} alt='icon' width={logo === FbLogo ? 15 : 24} />
        )}
        <p>{label}</p>
      </Link>
    );
  };

  if (
    pathname === '/sports/Eastrich' ||
    pathname === '/sports/FB' ||
    pathname === '/sports/SABA'
  ) {
    const Seperator = () => {
      return <div className='w-0.5 my-1 bg-white h-3'></div>;
    };
    return (
      <>
        <div
          style={{ top: `${checkOffset(3)}rem` }}
          className={`w-full fixed flex flex-row pl-5 gap-3 shrink-0 h-12 items-center z-20 bg-black`}
        >
          <Option
            href={'/sports/Eastrich'}
            label={t('eastrich')}
            logo={EastRichWhiteLogo}
          />
          <Seperator />
          {/* <Option href={'/sports/SABA'} label={'Saba'} logo={Saba} />
          <Seperator /> */}
          <Option href={'/sports/FB'} label={t('fbSports')} logo={FbLogo} />
          <div className='flex flex-1' />
          <HeaderBetSlip />
        </div>
      </>
    );
  }
}
