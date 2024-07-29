'use client';
import { Favicon } from '@/asset/icons';
import Image from 'next/image';

const FloatingPill = () => {

  const getOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    } else {
        return "not supported";
    }
  }

  const redirectDownload = () => {
    const os = getOperatingSystem();
    const isIOS = os == "iOS"

    let redirectUrl = ""

    if(isIOS){
      redirectUrl = "https://apps.apple.com/cn/app/id6474402534";
    }else{
      redirectUrl = "https://oss.yingshi.tv/assets/yingshi.apk";
    }

    window.location.href = redirectUrl
  }

  return (
    <div 
      className='flex'
      style={{ 
        color: '#FFF',
        position: 'absolute',
        bottom:'5rem',
        background: '#FAC33D',
        fontSize: '0.9rem',
        padding: '0.4rem 1.5rem',
        borderRadius: '1rem'
      }}
      onClick={redirectDownload}
    >
      <div><Image src={Favicon} alt='icon' width={22} /></div>
      <div className='pl-2'>打开影视APP，看精彩流畅视频</div>
    </div>
  )
}

export default FloatingPill;