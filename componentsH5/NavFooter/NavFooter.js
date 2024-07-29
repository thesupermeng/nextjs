'use client';
import Announcement from '@/components/announcement';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export const NavFooter = () => {
  const pathname = usePathname();
  if (pathname.includes('/bet/')) {
    return null;
  }
  return (
    <>
      <div className='fixed bottom-0 inset-x-0 flex-initial bg-black/75 backdrop-blur z-[50]'>
        <Announcement />
        <div className='h-16 flex flex-row justify-around bg-black'>
          <FooterButton data={NavItem.home} />
          {/* <FooterButton data={NavItem.live} /> */}
          <FooterButton data={NavItem.games} />
          <FooterButton data={NavItem.sports} />
          <FooterButton data={NavItem.promotion} />
          <FooterButton data={NavItem.userMore} id='footer-more' />
        </div>
      </div>
      <div className='h-16'></div>
    </>
  );
};

export const FooterButton = ({ data, ...props }) => {
  const { icon, iconActive, text, link } = data;
  const pathname = usePathname();
  const router = useRouter();
  const onLink = (href) => {
    href && router.push(href);
  };
  return (
    <div
      {...props}
      onClick={() => {
        onLink(link);
      }}
      className='flex flex-col items-center justify-center gap-1.5'
    >
      <Image
        alt={text}
        src={pathname.startsWith(link) ? iconActive : icon}
        //  width={22}
        height={22}
      />
      <div
        className={`${
          pathname.startsWith(link) ? 'text-white' : 'text-[#6F7076]'
        } text-[10px] font-medium`}
      >
        {text}
      </div>
    </div>
  );
};
