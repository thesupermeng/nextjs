import Image from 'next/image';
import Img1 from './media/mediaFacebook.svg';
import Img2 from './media/mediaInsta.svg';
import Img3 from './media/mediaWhapp.svg';
import { isWeb } from '@/util/common';

export const Media = () => {
  return (
    <div
      className={`flex pb-7 ${
        isWeb() ? 'justify-between' : 'flex-col items-center gap-3 text-center'
      } `}
    >
      <pre className='text-[13px] font-normal font-sans'>
        © EastRicher.com {'\n'}All Rights Reserved Copyrights 2024
      </pre>
      {/* <div className='flex flex-row gap-4'>
        <Image alt='a' src={Img1} />
        <Image alt='a' src={Img2} />
        <Image alt='a' src={Img3} />
      </div> */}
    </div>
  );
};
