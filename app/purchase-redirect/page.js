'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { postPayOrder } from '@/services/yingshiPayment';
import Swal from 'sweetalert2';
import { Spinner } from '@/components/spinner';

export default function PurchaseRedirect() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const initPaymentProcess = async () => {
    console.log('payment_type_code');
    let product_id = Number(localStorage.getItem('productId'));
    let payment_type_code = localStorage.getItem('zfType');

    if (!product_id || !payment_type_code) {
      Swal.fire({
        title: '系统繁忙, 请稍后重试',

        confirmButtonText: '确定',
      }).then((result) => {
        window.close();
      });
    }

    let res = await postPayOrder({
      productId: product_id,
      zfType: payment_type_code,
    });
    if (res.code === 0) {
      if (res.data.paymentData.url) {
        window.location.href = res.data.paymentData.url;
      } else if (res.data.paymentData.html) {
        const target = '_self';
        //  Open a new tab/window
        const newTab = window.open('', target);
        //  Write the HTML content into the new tab
        newTab.document.write(res.data.paymentData.html.replaceAll('\\', ''));
        newTab.document.close();
      }
    } else {
      Swal.fire({
        title: '系统繁忙, 请稍后重试!',

        confirmButtonText: '确定',
      }).then((result) => {
        window.close();
      });
    }
  };

  useEffect(() => {
    initPaymentProcess();
  }, []);

  return (
    <>
      {isLoading && (
        <div style={{ flec: 1 }}>
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
}
