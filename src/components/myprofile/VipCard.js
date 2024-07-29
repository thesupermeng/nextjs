import Image from 'next/image';
import { VipBlackIcon } from '@/asset/icons';
import React from 'react';
import { Button } from '@material-tailwind/react';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';

export default function VipCard({ onClick }) {
  const { isVip } = useYingshiUser();
  
  return (
    <div className={'w-full'}>
      <div
        className={
          'flex h-[58px] bg-[#D1AC7D] rounded-lg p-1.5 items-center gap-1'
        }
      >
        <div className={'w-12 h-12 flex justify-center items-center'}>
          <Image src={VipBlackIcon} alt={'VIP icon'} />
        </div>
        <div className={'flex flex-col flex-1 pl-1'}>
          <span className={'text-[15px] text-[#1D2023] font-semibold'}>
            {isVip?'续费VIP': '开通VIP'}
          </span>
          <span className={'text-[13px] text-[#1D2023]'}>
            去广告 看完整视频
          </span>
        </div>
        <Button
          className={
            'h-12 w-22 rounded-[10px] bg-[#1D2023] flex items-center justify-center'
          }
          onClick={onClick}
        >
          <span className={'text-[#D1AC7D] text-[15px] font-semibold'}>
            立即购买
          </span>
        </Button>
      </div>
    </div>
  );
}
