import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import PaymentHeader from '@/componentsH5/payment/paymentHeader';
import PaymentCountdown from '@/componentsH5/payment/paymentCountdown';
import { useEffect, useState } from 'react';
import { getYingshiProducts } from '@/services/yingshiPayment';
import PaymentProductsList from '@/componentsH5/payment/paymentProductsList';
import PaymentMethods from '@/componentsH5/payment/paymentMethods';
import PaymentDisclaimer from '@/componentsH5/payment/paymentDisclaimer';
import PaymentPurchaseButton from '@/componentsH5/payment/paymentPurchaseButton';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PaymentDetailModal from '@/components/payment/paymentDetailModal';

export default function PaymentModal({ open, handler }) {
  const { token } = useYingshiUser();
  const [productSelected, setProductSelected] = useState(null);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(null);
  const [productList, setProductList] = useState([]);
  const [showPaymentDetail, setShowPaymentDetail] = useState(false);

  const handleShowPaymentDetail = () => {
    setShowPaymentDetail((x) => !x);
  };

  useEffect(() => {
    if (token !== null && token !== 'null' && token !== '' && token !== undefined) {
      // console.log(`native product in paymentmodel, check null is string null or null->`, token)

      getYingshiProducts().then((res) => {
        if (res) setProductList(res['4_fang_items']);
      });
    }
  }, [token]);

  return (
    <>
      <Dialog
        open={open}
        handler={handler}
        className={'relative bg-[#121212] rounded-[28px] outline-none h-[90vh]'}
        size={'md'}
        dismiss={{
          outsidePress: false,
        }}
      >
        <DialogBody className='w-full h-full flex flex-col'>
          <div className='w-full relative mb-[10px]'>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className='absolute top-2 right-2 cursor-pointer w-[35px] h-[35px] text-[#FFFFFF33] hover-effect'
              onClick={handler}
            />
            <PaymentHeader />
          </div>
          <div className='flex-1 overflow-auto styling-scrollbar pl-2 pr-2'>
            <span
              className={
                'hover-effect text-[#9C9C9C] text-[14px] mt-[5px] self-end'
              }
              onClick={handleShowPaymentDetail}
            >
              VIP明细
            </span>
            <PaymentProductsList
              className={'mt-[5px]'}
              productList={productList}
              onProductSelect={(product) => setProductSelected(product)}
            />
            <PaymentMethods
              className={'mt-[26px]'}
              paymentOptions={productSelected?.payment_options ?? []}
              onMethodSelect={(method) => setPaymentMethodSelected(method)}
            />
          </div>
          <div className='w-full'>
            <PaymentDisclaimer className='mt-[30px]' />
            <PaymentPurchaseButton
              className='mt-[15px]'
              productInfo={productSelected}
              paymentInfo={paymentMethodSelected}
            />
          </div>
        </DialogBody>
      </Dialog>

      <PaymentDetailModal
        open={showPaymentDetail}
        handler={handleShowPaymentDetail}
      />
    </>
  );
}
