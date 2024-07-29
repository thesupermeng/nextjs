'use client';
import Image from 'next/image';
import Link from 'next/link';
import FBWhiteIcon from './FB/FBActive.svg';
import FBGreyIcon from './FB/FBInactive.svg';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import SportsHeader from '@/componentsH5/headerH5/SportsHeader';
import { PageContent } from '@/components/pageElement/PageContent';
import { EastRichWhiteLogo } from '@/asset/icons';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [withHeader, setWithHeader] = useState(true);
  const Option = ({
    href,
    isActive,
    activeImg,
    inactiveImg,
    label,
    children,
  }) => {
    return (
      <Link
        href={href}
        className={`flex items-center h-11 min-w-11 max-w-[200px] px-2 gap-1 rounded-lg group ${
          pathname === href ? 'tayagradient' : 'bg-tayaGrey'
        }`}
      >
        {pathname === href ? (
          <Image className={`w-7 h-7`} src={activeImg} alt='Icon' />
        ) : (
          <>
            <Image
              className='w-0 h-7 object-contain group-hover:w-7'
              src={activeImg}
              alt='Icon'
            />

            <Image
              className={`w-7 h-7 object-contain group-hover:w-0`}
              src={inactiveImg}
              alt='Icon'
            />
          </>
        )}
        <div
          className={`common-transtion ${
            pathname === href
              ? 'text-white'
              : 'hidden group-hover:flex text-[#7B7B7B]'
          }`}
        >
          {label}
        </div>
      </Link>
    );
  };
  useEffect(() => {
    if (pathname.startsWith('/sports/Eastrich/')) {
      setWithHeader(false);
    } else {
      setWithHeader(true);
    }
  }, [pathname]);

  return (
    <>
      <div className={`flex flex-col flex-1 bg-transparent min-x-0 h-full`}>
        <WEBOnly>
          <PageContent
            header={
              withHeader && (
                <Pageheader navItem={NavItem.sports}>
                  <div className='flex flex-row gap-5'>
                    <Option
                      href='/sports/Eastrich'
                      inactiveImg={EastRichWhiteLogo}
                      activeImg={EastRichWhiteLogo}
                      label='Eastrich'
                    />
                    <Option
                      href='/sports/FB'
                      inactiveImg={FBGreyIcon}
                      activeImg={FBWhiteIcon}
                      label='FB Sports'
                    />
                    {/* <Option
                  href='/sports/SABA'
                  inactiveImg={SABAGreyIcon}
                  activeImg={SABAWhiteIcon}
                /> */}
                  </div>
                </Pageheader>
              )
            }
          >
            {children}
          </PageContent>
        </WEBOnly>

        <H5Only>
          <SportsHeader />
          {children}
        </H5Only>
      </div>
    </>
  );
};
export default Layout;
