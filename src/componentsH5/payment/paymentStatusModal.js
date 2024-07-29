import React from 'react';
import {Button, Dialog, DialogBody} from '@material-tailwind/react';
import Image from 'next/image';
import {TickAnimation} from '@/asset/gif';
import {CrossRed} from '@/asset/icons';

export default function PaymentStatusModal({transactionDetail, open, handler}){
  const completed = transactionDetail?.data?.transaction_status_string === 'COMPLETED'
  const isQueryError = transactionDetail?.code !== 0
  const msg = transactionDetail?.message

  return (
    <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] p-[30px] outline-none'} size={'xs'}>
      <DialogBody className={'p-0 w-full h-full'}>
        <div className={'flex flex-col items-center'}>
          {isQueryError &&
            <div
              className={'w-full h-full rounded-[14px] flex flex-col items-center justify-center'}>
              <Image src={CrossRed} alt={'Error'} width={95} height={95} className={'p-[15px]'}/>
              <span className={'text-[17px] text-white'}>{msg}</span>
              {/*<span className={'text-[17px] text-white'}>你已成为VIP用户</span>*/}
            </div>
          }
          {!isQueryError && completed &&
            <div
              className={'w-full h-full rounded-[14px] flex flex-col items-center justify-center'}>
              <Image src={TickAnimation} alt={'Login success'} width={95} height={95}/>
              <span className={'text-[17px] text-white'}>付款成功</span>
              <span className={'text-[17px] text-white'}>你已成为VIP用户</span>
            </div>
          }
          {!isQueryError && !completed &&
            <div className={'flex flex-col text-white items-center gap-2 text-center'}>
              <span className={'text-[17px] font-medium'}>VIP会员</span>
              <span className={'text-[14px] font-normal'}>请耐心等待VIP生效，或尝试刷新个人中心/重启应用</span>
            </div>
          }
          <Button className={'w-full bg-[#D1AC7D] text-black text-[14px] mt-[17px]'} onClick={handler}>确定</Button>

        </div>
      </DialogBody>
    </Dialog>
  )

}
