import {useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {getTransactionDetail} from '@/services/yingshiPayment';
import PaymentStatusModal from '@/componentsH5/payment/paymentStatusModal';

export default function WebPage() {
  const router = useRouter()
  const queryParams = useSearchParams();
  const transactionId = queryParams.get('transactionId')


  const [openPaymentStatus, setOpenPaymentStatus] = useState(false);
  const [transactionResponse, setTransactionResponse] = useState(null)

  useEffect(() => {
    if (transactionId){
      setOpenPaymentStatus(true)
      getTransactionDetail(transactionId).then(res => {
        setTransactionResponse(res)
      })
    } else {
      router.push('/myprofile')
    }
  }, [transactionId])

  return (
    <>
      {transactionId &&
        transactionResponse &&
        <PaymentStatusModal
          open={openPaymentStatus}
          handler={() => {
            setOpenPaymentStatus(x => !x)
            router.push('/myprofile')
          }}
          transactionDetail={transactionResponse}
        />
      }
    </>
  )

}
