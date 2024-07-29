import {Button, Dialog, DialogBody} from '@material-tailwind/react';
import {usePaymentPendingOpen} from '@/hook/yingshiScreenState/usePaymentPendingOpen';

export default function PaymentPendingModal({open, handler}) {

  const [isShowPaymentPending, setShowPaymentPending] = usePaymentPendingOpen()


  const handleClick = () => {
    setShowPaymentPending(false)
  }

  return (
  <Dialog open={open} handler={handler} className={'bg-[#121212] rounded-[28px] py-[30px] px-[80px] outline-none'} size={'xs'}>
    <DialogBody className={'p-0 w-full h-full text-white flex flex-col items-center gap-[20px]'}>
      <span className={'text-[20px] font-semibold'}>VIP会员</span>
      <span className={'text-[17px] font-medium text-center'}>支付完成后，请刷新页面以查看您的VIP</span>
      <Button className={'text-[13px] text-black bg-[#D1AC7D] w-full'} onClick={handleClick}>确定</Button>
    </DialogBody>
  </Dialog>
  )
}
