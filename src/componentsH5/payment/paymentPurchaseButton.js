import {Button, Dialog, DialogBody} from '@material-tailwind/react';
import styles from './styles.module.css'
import React, {useState} from 'react';
import {postPayOrder} from '@/services/yingshiPayment';
import Image from 'next/image';
import {TickAnimation} from '@/asset/gif';
import {CrossRed} from '@/asset/icons';
import {useRouter} from 'next/navigation';
import {isMobile} from 'react-device-detect';
import {usePaymentOpen} from '@/hook/yingshiScreenState/usePaymentOpen';
import {usePaymentPendingOpen} from '@/hook/yingshiScreenState/usePaymentPendingOpen';

export default function PaymentPurchaseButton({productInfo, paymentInfo, className}) {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [showPaymentFailed, setShowPaymentFailed] = useState(false)
  const [isOpenPayment, setIsOpenPayment] = usePaymentOpen();
  const [isShowPaymentPending, setShowPaymentPending] = usePaymentPendingOpen()
  const router = useRouter()


  const handleShowPaymentFailed = () => {
    setShowPaymentFailed(x => !x)
  }

  const handleOnPurchase = () => {
 
    let i=1
    if (!isMobile && /iPad|iPhone|iPod/.test(navigator.userAgent) || i==1) {
      localStorage.setItem('productId' , productInfo.product_id)
      localStorage.setItem('zfType' , paymentInfo.payment_type_code)
      window.open('/purchase-redirect', '_blank');
      setIsOpenPayment(false)
      setShowPaymentPending(true)
      return; 
    }


    setIsPaymentProcessing(true)
    postPayOrder({ productId: productInfo.product_id, zfType: paymentInfo.payment_type_code })
      .then(res => {
        if (res.code === 0) {
          if (res.data.paymentData.url) {
            window.location.href = res.data.paymentData.url
            if (isMobile) {
              router.push(res.data.paymentData.url)
            } else {
              window.open(res.data.paymentData.url, '_blank')
            }

          } else if (res.data.paymentData.html) {
            const target = isMobile ? '_self' : '_blank';

           //  Open a new tab/window
            const newTab = window.open('', target);
            //  Write the HTML content into the new tab
            newTab.document.write(res.data.paymentData.html.replaceAll('\\', ''));
            newTab.document.close();
          }
        } else {
          setShowPaymentFailed(true)
          setTimeout(() => {
            setShowPaymentFailed(false)
          }, 3000)
        }
        setIsPaymentProcessing(false)

        setIsOpenPayment(false)
        setShowPaymentPending(true)

      })
      .finally(() => {
        setIsPaymentProcessing(false)
      })

  }

  // const handleOnPurchase = () => {


  //   setIsPaymentProcessing(true);
  
  //   let newTab;
  //   if (!isMobile && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
  //     newTab = window.open('', '_blank');
  //   }
  
  //   postPayOrder({ productId: productInfo.product_id, zfType: paymentInfo.payment_type_code })
  //     .then(res => {
  //       if (res.code === 0) {
  //         if (res.data.paymentData.url) {
  //           if (isMobile) {
  //             router.push(res.data.paymentData.url);
  //           } else {
  //             if (newTab) {
  //               newTab.location.href = res.data.paymentData.url;
  //             } else {
  //               window.open(res.data.paymentData.url, '_blank');
  //             }
  //           }
  //         } else if (res.data.paymentData.html) {
  //           const target = isMobile ? '_self' : '_blank';
  
  //           if (newTab) {
  //             newTab.document.write(res.data.paymentData.html.replaceAll('\\', ''));
  //             newTab.document.close();
  //           } else {
  //             const newWindow = window.open('', target);
  //             newWindow.document.write(res.data.paymentData.html.replaceAll('\\', ''));
  //             newWindow.document.close();
  //           }
  //         }
  //       } else {
  //         setShowPaymentFailed(true);
  //         setTimeout(() => {
  //           setShowPaymentFailed(false);
  //         }, 3000);
  //       }
  
  //       setIsPaymentProcessing(false);
  //       setIsOpenPayment(false);
  //       setShowPaymentPending(true);
  //     });


  // };

  return (
    <>
      {productInfo &&
        <Button loading={isPaymentProcessing} className={`justify-center bg-[#FAC33D] ${styles.payment_button} ${className}`} onClick={handleOnPurchase}>
        <span className={'text-[#1D2023] text-[19px] font-semibold'}>
          立即解锁 - 总额 {productInfo.currency.currency_symbol}{productInfo.product_price}
        </span>
        </Button>
      }
      {showPaymentFailed &&
        <Dialog open={open} handler={handleShowPaymentFailed} className={'bg-[#121212] rounded-[28px] p-[30px] outline-none'} size={'xs'}>
          <DialogBody className={'p-0 w-full h-full'}>
            <div
              className={'w-full h-full rounded-[14px] flex flex-col items-center justify-center'}>
              <Image src={CrossRed} alt={'Login success'} width={95} height={95} className={'p-2'}/>
              <span className={'text-[17px] text-white'}>支付失败，请稍后再试</span>
            </div>
          </DialogBody>
        </Dialog>

      }
    </>
  )
}
