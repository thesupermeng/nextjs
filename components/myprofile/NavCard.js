import Image from 'next/image';
import {ArrowRightBlue, ArrowRigthGrey} from '@/asset/icons';
import React, {useState} from 'react';
import {Button} from '@material-tailwind/react';
import Link from 'next/link';

export default function NavCard({icon, iconSelected, title, isSelected, onClick, href, platform}) {

  const [renderIcon, setRenderIcon] = useState(icon)
  const [arrowIcon, setArrowIcon] = useState(ArrowRigthGrey)

  const handleMouseEnter = () => {
    if (platform === 'mobile') return
    setRenderIcon(iconSelected)
    setArrowIcon(ArrowRightBlue)
  }

  const handleMouseLeave = () => {
    if (platform === 'mobile') return
    setRenderIcon(icon)
    setArrowIcon(ArrowRigthGrey)
  }

  return (
    <WithLink href={href}>
      <div className={'bg-[#1D2023] rounded-[12px]'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Button className={`${isSelected ? 'bg-[#FAC33D0D]' :'bg-[#1D2023]'} rounded-[10px] w-full h-12 flex items-center p-3 gap-3 text-[#9C9C9C] ${platform === 'mobile'? '' : 'hover:text-shayuBlue'}`} onClick={onClick}>
          <div className={'w-[24px] h-[24px] flex items-center justify-center'}>
            <Image src={isSelected ? iconSelected : renderIcon} alt={'Icon'}/>
          </div>
          <span className={`font-semibold text-[15px] leading-[15px] ${isSelected ? 'text-shayuBlue': 'text-inherit'} flex-1 text-left`}>{title}</span>
          <div className={'w-[30px] h-[30px] flex items-center justify-center'}>
            <Image src={isSelected ? ArrowRightBlue: arrowIcon} alt={'Arrow'} height={16}/>
          </div>
        </Button>
      </div>
    </WithLink>

    )
}

function WithLink({href, children}) {
  return href ?
    <Link href={href} className={'no-underline'}>
      {children}
    </Link>
    :
    children
}
