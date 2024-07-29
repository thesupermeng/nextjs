import {Button, Dialog, DialogBody} from '@material-tailwind/react';

export default function LogoutModal({open, handler, onConfirm, onCancel}) {
  return (
    <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] p-[30px]'} size={'xs'}>
      <DialogBody className={'p-0 w-full h-full'}>
        <div className={'desktop'}>
          <div className={'flex flex-col gap-[16px] font-medium'}>
            <span className={'text-[21px] text-white text-center'}>退出登录</span>
            <span className={'text-[17px] text-white text-center'}>您是否确定要退出登录？</span>
            <div className={'flex flex-col py-[10px] px-10'}>
              <Button className={'text-[15px] text-white bg-shayuBlue'} onClick={onConfirm}>确定</Button>
              <Button className={'text-[15px] text-[#9C9C9C] bg-transparent'} onClick={onCancel}>取消</Button>
            </div>
          </div>
        </div>
        <div className={'mobile'}>
          <div className={'flex flex-col gap-[16px] font-medium'}>
            <span className={'text-[21px] text-white text-center'}>退出登录</span>
            <span className={'text-[17px] text-white text-center'}>您是否确定要退出登录？</span>
            <div className={'flex gap-2'}>
              <Button tabIndex={-1} className={'flex-1 text-[16px] text-[#9C9C9C] bg-transparent'} size={'sm'}
                      onClick={onCancel} variant={'text'}>取消</Button>
              <Button tabIndex={-1} className={'flex-1 text-[16px] text-shayuBlue'} size={'sm'}
                      onClick={onConfirm} variant={'text'}>确定</Button>
            </div>
        </div>
        </div>
      </DialogBody>
    </Dialog>
  )
}
