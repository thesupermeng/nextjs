'use client';
import { usePathname } from 'next/navigation';
import { H5Only, WEBOnly } from '../Fragments/EnvComponent';
import { Links } from './Links';
import { Media } from './Media';
import { Statements } from './Statements';
import { Licenses } from './Licenses';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/liveplay')) {
    return <></>;
  }

  return (
    <>
      <WEBOnly>
        <div className='py-[25px] w-full bg-transparent' />
        <div className='flex flex-col px-12 flex-initial bg-sideMenu'>
          <div className='flex pt-5 flex-row justify-between'>
            <div className='w-[45%] justify-self-start'>
              <Statements />
            </div>
            <div className='w-[50%] justify-self-end'>
              <Links />
            </div>
          </div>
          <div className='my-7' />
          <Licenses />
          <div className='w-full h-[1px] bg-[#A9A9A938] my-7'></div>
          <Media />
        </div>
      </WEBOnly>
      <H5Only>
        <div className='bg-sideMenu w-full px-5 pt-8'>
          <Statements>
            <Links />
          </Statements>
          <Licenses />
          <div className='w-full h-[1px] bg-[#A9A9A938] my-7'></div>
          <Media />
        </div>
      </H5Only>
    </>
  );
}
