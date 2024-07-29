import Image from 'next/image';
import {TickAnimation} from '@/asset/gif';
import React from 'react';
import {Dialog, DialogBody} from '@material-tailwind/react';

export default function LoginSuccess({open, handler, msg}) {
  return <>
  {open &&
    <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] p-[30px] outline-none'} size={'xs'}>
      <DialogBody className={'p-0 w-full h-full'}>
        <div
          className={'w-full h-full rounded-[14px] flex flex-col items-center justify-center'}>
          <Image src={TickAnimation} alt={'Login success'} width={95} height={95}/>
          <span className={'text-[17px] text-white'}>{msg}</span>
        </div>
      </DialogBody>
    </Dialog>
  }
  </>
}
