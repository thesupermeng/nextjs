// ingshiUser from '@/hook/yingshiUser/useYingshiUser';
import CryptoJS from 'crypto-js';

export function handleCompletePaymentAha(res) {
  const purchaseData = {
    topupPrice: res?.value, // Replace with actual data
    currency: res?.currency, // example currency, adjust as needed
    content_type: 'topup', // Adjust as necessary
  };

  if (typeof window.fbq === 'undefined') {
    console.error('Facebook Pixel is not loaded');
    return;
  }

  // Ensure productPrice is a valid number
  const topupPrice = parseFloat(purchaseData.topupPrice);
  if (isNaN(topupPrice) || topupPrice < 0) {
    console.error('Invalid product price:', purchaseData.topupPrice);
    return;
  }

  // Track the CompletePayment event
  console.log('Tracking CompletePayment with:', {
    purchaseData,
  }); // Debug log

  // Ensure the Facebook pixel library is loaded
  if (window.fbq && typeof window.fbq === 'function') {
    window.fbq('track', 'CompletePaymentAha', purchaseData);
  } else {
    console.error(
      'Facebook pixel is not initialized or fbq.track is not a function.'
    );
  }
}

export function trackLoginSignUp(res) {
  const userData = {
    email: res.user_email,
    phone: res.user_phone,
    userId: res.user_id,
    status: 'success'
  };

  if (typeof window.fbq === 'undefined') {
    console.error('Facebook Pixel is not loaded');
    return;
  }

  // Track the LoginSignUp event
  console.log('Tracking LoginSignup with:', {
    userData,
  }); // Debug log

  // Ensure the Facebook pixel library is loaded
  if (window.fbq && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'LoginSignUp', userData);
  } else {
    console.error(
      'Facebook pixel is not initialized or fbq.track is not a function.'
    );
  }
}
