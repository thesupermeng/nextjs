import { USDT } from '@/asset/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RightArrow from './media/angleRight.svg';
import { isWeb } from '@/util/common';
import { H5Only, WEBOnly } from '../Fragments/EnvComponent';
import { useTranslation } from 'next-i18next';

export const Links = () => {
  const { t } = useTranslation();

  return (
    <>
      <WEBOnly>
        <div className='flex flex-1 flex-row justify-between pr-6 gap-4 w-[110%]'>
          <LinkCol title={t('categories')}>
            <LinkEntry text={t('sports')} href='/sports' />
          </LinkCol>

          <LinkCol title={t('helpCenter')}>
            {AboutUsLinksData.map((link) => {
              return (
                <LinkEntry
                  key={link.link}
                  text={t(link.title)}
                  href={link.link}
                />
              );
            })}
          </LinkCol>

          <LinkCol title={t('paymentMethods')}>
            <div className='flex flex-row flex-wrap flex-initial items-center gap-3'>
              <div className='bg-white px-3 py-1 rounded-md'>
                <Image src={USDT} alt='USDT' width={20} height={20} />
              </div>
            </div>
          </LinkCol>
        </div>
      </WEBOnly>

      <H5Only>
        <div className='grid grid-cols-2 gap-x-10'>
          <div className='w-full h-[1px] bg-[#A9A9A938] my-7 col-span-2 items-center'></div>

          <LinkCol title={t('categories')}>
            <LinkEntry text={t('sports')} href='/sports' />
          </LinkCol>

          <LinkCol title={t('helpCenter')}>
            {AboutUsLinksData.map((link) => {
              return (
                <LinkEntry
                  key={link.link}
                  text={t(link.title)}
                  href={link.link}
                />
              );
            })}
          </LinkCol>

          <div className='w-full h-[1px] bg-[#A9A9A938] my-7 col-span-2'></div>

          <LinkCol title={t('paymentMethods')}>
            <div className='flex flex-row flex-initial items-center gap-3'>
              <div className='bg-white px-3 py-1 rounded-md'>
                <Image src={USDT} alt='USDT' width={20} height={20} />
              </div>
            </div>
          </LinkCol>

          <div className='w-full h-[1px] bg-[#A9A9A938] my-7 col-span-2'></div>
        </div>
      </H5Only>
    </>
  );
};

export const AboutUsLinksData = [
  { title: 'termsAndConditions', link: '/aboutus/termsandcondition' },
  { title: 'faq', link: '/aboutus/faq' },
];

const LinkEntry = ({ text, href }) => {
  return (
    <div className='flex flex-row flex-initial items-center gap-3'>
      <Image alt='a' src={RightArrow} />
      <Link
        href={href}
        className='text-xs font-semibold hover:text-red-600 transition-all'
      >
        {text}
      </Link>
    </div>
  );
};

const LinkCol = ({ title, children }) => {
  return (
    <div className={isWeb() ? 'flex flex-1 flex-col' : 'col-span-1 w-[110%]'}>
      <div className='mb-5 font-bold text-base'>{title}</div>
      <div className='flex flex-initial flex-col gap-2 justify-around'>
        {children && React.Children.map(children, (a) => a)}
      </div>
    </div>
  );
};
