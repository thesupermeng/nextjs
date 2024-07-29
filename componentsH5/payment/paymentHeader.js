import Image from 'next/image';
import {glyph, noADIcon, PaymentTitle, subtractIcon, VipBenefits, vipLightIcon} from '@/asset/icons';
import styles from './styles.module.css'

const benefits = [
  {
    icon: vipLightIcon,
    title: 'VIP尊贵标识',
  },
  {
    icon: noADIcon,
    title: '纯净广告',
  },
  {
    icon: glyph,
    title: '解锁全部影视内容',
  },
  // {
  //   icon: subtractIcon,
  //   title: '畅享离线下载',
  // },
]

export default function PaymentHeader({className}) {
  return (
    <div className={`flex flex-col w-full items-center ${className}`}>
      <Image src={PaymentTitle} alt={'Title'} width={282}/>
      <div className={'mobile  w-full'}>
        <div className="flex flex-col items-center">
          <div className={`${styles.benefit_container_border} w-full mt-[32px] min-w-[290px]`}>
            <div
              className={`relative flex flex-col items-center px-[12px] pb-[12px] pt-[20px]  rounded-xl ${styles.benefit_container_background_color}`}>
              <SubHeader className={'absolute top-0 -translate-y-1/2  min-w-[270px]'}/>
              <div className={'grid grid-cols-5 w-full gap-y-1  min-w-[290px]'}>
                {
                  benefits.map((benefit, index) => <BenefitItem key={index} icon={benefit.icon} title={benefit.title} className={index % 2 === 0 ? 'col-span-3' : 'col-span-2'}/>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'desktop w-full'}>
        <div className="flex flex-col items-center">
          <SubHeader className={'mt-[15px]'}/>
          <div className={'flex justify-between w-full gap-y-1 mt-[28px]'}>
            {
              benefits.map((benefit, index) => <BenefitItem key={index} icon={benefit.icon} title={benefit.title}/>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function SubHeader({className}) {
  return (
    <div className={`${styles.sub_header_container_color} px-[10px] py-[4px] mx-[18px] rounded-[10px] ${className} text-center`}>
      <span className={'text-[#351B04] text-center text-[12px] font-medium'}>升级解锁全部功能/内容 您还未开通 全部权益</span>
    </div>
  )
}

function BenefitItem({icon, title, className = ''}) {
  return (
    <>
      <div className={`mobile ${className}`}>
        <div className={'flex items-center gap-1'}>
          <Image src={icon} alt={`${title} icon`} width={20} height={20}/>
          <span className={'text-[12px] text-[#F4DBBA] font-normal'}>{title}</span>
        </div>
      </div>
      <div className={`desktop ${className}`}>
        <div className={'flex items-center gap-1'}>
          <Image src={icon} alt={`${title} icon`} width={28} height={28}/>
          <span className={'text-[15px] text-[#F4DBBA] font-normal'}>{title}</span>
        </div>
      </div>
    </>

  )
}

