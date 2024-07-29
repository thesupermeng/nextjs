import Image from 'next/image';
import { TickAnimation } from '@/asset/gif';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';

export default function WithdrawalSuccess({ open, handler, msg }) {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    let timer;
    if (open && showGif) {
      // Assuming the GIF duration is 3 seconds (3000 ms)
      timer = setTimeout(() => {
        setShowGif(false);
      }, 2000); // Adjust the duration according to your GIF's actual duration
    }
    return () => clearTimeout(timer);
  }, [open, showGif]);

  return (
    <>
      {open &&
        <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] p-[30px] outline-none'} size={'xs'}>
          <DialogBody className={'p-0 w-full h-full'}>
            <div className={'w-full h-full rounded-[14px] flex flex-col items-center justify-center'}>
              {showGif && <Image src={TickAnimation} alt={'Login success'} width={95} height={95} />}
              <span className={'text-[17px] text-white'}>{msg}</span>

              <span className={'text-[14px] text-white pt-3'}>
                您的提款请求已成功处理，并正在等待最终 <br />
                确认。一旦我们完成确认，提款将立即发送<br />
                到您指定的账户。感谢您的耐心等待。
              </span>

              <span
                onClick={() => {
                  handler();
                  setShowGif(true); // Reset GIF display state when dialog is closed
                }}
                style={{ width: '100%', borderRadius: '8px', marginTop: '15px', fontWeight: '700px', paddingTop: '8px', paddingBottom: '8px' }} className={'text-[17px] text-[14px] text-white btn btn-block btn-primary'}>
                确定
              </span>
            </div>
          </DialogBody>
        </Dialog>
      }
    </>
  );
}
