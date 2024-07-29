import {URL_YINGSHI_PAYMENT} from '@/config/yingshiUrl';
import {YingshiApi} from '@/util/YingshiApi';

export const getYingshiProducts = async () => {
  return YingshiApi(
    URL_YINGSHI_PAYMENT.getProducts,
    {},
    { method: 'GET' }
  );
}

export const postPayOrder = async ({ productId, zfType }) => {
  return YingshiApi(
    URL_YINGSHI_PAYMENT.createPayOrder,
    {
      platform: 'WEB',
      redirect_to: 'web',
      product_id: productId,
      zf_type: zfType,
    },
    {
      method: 'POST',
      returnFullResponse: true
    }
  );
}

export const getTransactionDetail = async (transactionId) => {
  return YingshiApi(
    URL_YINGSHI_PAYMENT.getTransactionDetail,
    {
      transaction_id: transactionId
    },
    {
      method: 'GET',
      returnFullResponse: true
    }
  )
}
