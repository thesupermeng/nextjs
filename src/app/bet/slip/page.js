'use client';
import { GearIcon, TrashIcon } from '@/asset/icons';
import BetCart from '@/components/betCart';
import { ConfirmDelModal } from '@/components/betCart/BetCartHeader';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Keyboard from '@/componentsH5/keyboard';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { ScrollContentVertical } from '@/components/ScrollContentVertical';

export default function Page({ params }) {
  const router = useRouter();
  const { options } = useSelector((s) => s.betCart);
  const [showDelModal, setShowDelModal] = useState(false);
  const { t } = useTranslation();

  return (
    <FullPageContent>
      <NavHeader
        label={t('betSlip')}
        right={
          <div className='flex'>
            <Image
              alt='setting'
              src={GearIcon}
              className='w-6 h-6 mr-3 p-[2.4px]'
              onClick={() => {
                //showSetting();
                router.push('/bet/setting');
              }}
            />
            {Object.keys(options).length > 0 && (
              <Image
                alt='delete'
                src={TrashIcon}
                className='w-6 h-6 mr-3 p-[2.4px] cursor-pointer'
                onClick={() => {
                  setShowDelModal(true);
                }}
              />
            )}
          </div>
        }
      />
      {/* <ScrollContentVertical> */}
      <BetCart />
      {/* </ScrollContentVertical> */}

      <Keyboard />
      {showDelModal && <ConfirmDelModal setShowDelModal={setShowDelModal} />}
    </FullPageContent>
  );
}
