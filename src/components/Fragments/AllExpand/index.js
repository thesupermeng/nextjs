import { IconArrowWhite } from '@/asset/icons';
import { isWeb } from '@/util/common';
import Image from 'next/image';

export default function index({ tw = '', isExpand, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${
        isWeb() ? 'px-3 h-[38px]' : 'px-2'
      } cursor-pointer rounded-md bg-tayaGrey  py-2 flex flex-col gap-1 flex-initial justify-around items-center ${tw} `}
    >
      <Image
        src={IconArrowWhite}
        className={`flex common-transition ${isExpand ? 'rotate-180' : ''}`}
        alt='a'
      />
      <Image
        src={IconArrowWhite}
        className={`flex common-transition ${!isExpand ? 'rotate-180' : ''}`}
        alt='a'
      />
    </div>
  );
}
