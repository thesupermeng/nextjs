import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  whatsapp as WhatsappIcon,
  MessengerIcon,
  TelegramIcon,
  LineIcon,
  WechatIcon,
  CameraIcon,
  WeiboIcon,
  QqIcon,
  Facebook2Icon,
  CopyLink2Icon,
} from '@/asset/icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export const ShareHorizontal = ({ className = '', setShowShareBox }) => {
  const { t } = useTranslation();
  const [showDropDown, setShowDropDown] = useState(false);

  const sharingMethod = [
    WhatsappIcon,
    MessengerIcon,
    TelegramIcon,
    LineIcon,
    WechatIcon,
    CameraIcon,
    WeiboIcon,
    QqIcon,
    Facebook2Icon,
    CopyLink2Icon,
  ];

  const share = () => {
    setShowShareBox();
  };

  const closeShare = () => {
    setShowShareBox();
  };

  return (
    <div
      className={`flex space-x-4 md:items-center items-start ${className} m-0`} style={{alignItems:'center'}}
    >
      <div className='text-nowrap pt-1'>
        <div className='lg:hidden flex'>
          <span
            className='text-sm text-white/75 py-1 '
            style={{ fontWeight: '300', color: '#9C9C9C' }}
          >
            {t('分享')}:
          </span>
        </div>
        <div className='lg:flex hidden'>
          <span>{t('分享')}:</span>
        </div>
      </div>
      <div
        className='grid grid-cols-5 gap-4 md:hidden cursor-pointer'
        onClick={share}
      >
        {sharingMethod.map((item, index) => (
          <div
            key={index}
            className={` ${index >= 5 && !showDropDown ? 'hidden' : ''}`}
          >
            <Image src={item} alt='Icon' className='rounded-full share-icn' />
          </div>
        ))}
      </div>
      <div
        className='flex-1 flex-row space-x-4 hidden md:flex cursor-pointer'
        onClick={share}
      >
        {sharingMethod.map((item, index) => (
          <div key={index}>
            <Image src={item} alt='Icon' className='rounded-full share-icn' />
          </div>
        ))}
      </div>
      <div
        className='pt-1 md:hidden'
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <FontAwesomeIcon
          className='text-[#9C9C9C] text-sm cursor-pointer'
          icon={showDropDown ? faAngleUp : faAngleDown}
        />
      </div>
    </div>
  );

  // return <div className={`flex space-x-4 items-center ${className} m-0`}>

  //

  //   <div className='grid grid-cols-5 gap-4 md:flex md:flex-1 md:space-x-2' onClick={share} style={{ cursor: 'pointer' }}>
  //     <div className="">
  //       <Image
  //         width={ '3px' }
  //         src={WhatsappIcon}
  //         alt="Icon"
  //         style={{
  //           borderRadius: 999,
  //         }}
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={MessengerIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={TelegramIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={LineIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={WechatIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={CameraIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={WeiboIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={QqIcon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={Facebook2Icon}
  //         alt="Icon"
  //       />
  //     </div>
  //     <div className="">
  //       <Image
  //         src={CopyLink2Icon}
  //         alt="Icon"
  //       />
  //     </div>
  //   </div>
  // </div>
};
