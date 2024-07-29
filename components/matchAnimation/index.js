import { Close, CrossWhite, FBAnimation } from '@/asset/icons';
import { setAnimationUrl } from '@/store/sportsTaya';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const MatchAnimation = () => {
  const dispatch = useDispatch();
  const { url = '', title = '' } = useSelector(
    (s) => s.sportsTaya.animationUrl
    );
  const { showRightSidebar } = useSelector((s) => s.common);
  const ref = useRef();
  const closePip = () => {
    dispatch(setAnimationUrl({}));
  };
  
  // {showRightSidebar ? 'fixed right-[32rem] bottom-7 w-[400px] bg-transparent' : 
  const pathname = usePathname();
  const [shiftAnimationVideo, setShiftAnimationVideo] = useState(false)

  useEffect(() => {
      if (pathname.includes('/home')) {
        setShiftAnimationVideo(true)
      } else {
        setShiftAnimationVideo(false)
      }
    }, [pathname]);

  return url ? (
    <div className={shiftAnimationVideo || showRightSidebar ? 'fixed right-[33rem] bottom-7 w-[400px] bg-transparent' :'fixed right-7 bottom-7 w-[400px] bg-transparent'}>
      <div className='bg-[#101010] flex flex-row px-3 py-2 gap-3 rounded-t-lg overflow-hidden'>
        <Image alt='pip' src={FBAnimation} />
        <div className='flex-1 whitespace-normal text-normal font-medium'>
          {title}
        </div>
        <Image
          alt='cross'
          src={Close}
          onClick={() => closePip()}
          className='cursor-pointer'
        />
      </div>
      <iframe
        ref={ref}
        src={url}
        className='w-[400px] h-[290px] bg-[#101010]'
      />
    </div>
  ) : null;
};
