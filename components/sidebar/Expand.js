import Image from 'next/image';
import DefaultIcon from './img/CollapseIcon.svg';
import { Tooltip } from 'react-tooltip';

export const Expand = ({ isExpand }) => {
  return (
    <>
      <Image
        data-tooltip-id='collapsed-tooltip'
        data-tooltip-content={isExpand ? 'Hide' : 'Show'} // Use a ternary operator
        data-tooltip-place='right'
        alt='expand'
        className={`w-8 h-8 rounded-[50%] border border-[transparent] bg-tayaGrey hover:opacity-100 cursor-pointer ${
          isExpand ? '' : 'rotate-180'
        }`}
        src={DefaultIcon}
      />
      <Tooltip
        id='collapsed-tooltip'
        className='bg-[#212446] py-2 rounded-[6px]'
      />
    </>
  );
};
