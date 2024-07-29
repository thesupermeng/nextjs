'use client'
import React from 'react';
import {useRouter} from 'next/navigation';
import {isMobile} from 'react-device-detect';

export default function PaymentDisclaimer({className}) {

  const router = useRouter()

  const handleClickPrivacy = () => {
    if (isMobile) {
      router.push('/privacy')
    } else {
      window.open('/privacy', '_blank')
    }
  }

  const handleClickService = () => {
    if (isMobile) {
      router.push('/service')
    } else {
      window.open('/service', '_blank')
    }
  }

  // const handleClickAutoRenew = () => {
  //   console.log('Renewal clicked')
  // }

  const handleClickEmail = () => {
    window.location = 'mailto:contact.movie9@gmail.com'
  }

  return (
    <div className={`text-[12px] text-[#9C9C9C] text-center ${className}`}>
      <p>
        <span className={'hover-effect'} onClick={handleClickPrivacy}>隐私协议</span>&nbsp;|&nbsp;
        <span className={'hover-effect'} onClick={handleClickService}>用户服务协议</span>
        {/*&nbsp;|&nbsp;<span onClick={handleClickAutoRenew}>自动续费协议</span>*/}
      </p>
      <p>
        如遇支付问题，请联系
        <span className={'hover-effect'} onClick={handleClickEmail}><u>contact.movie9@gmail.com</u></span>
      </p>
    </div>

  );
}
