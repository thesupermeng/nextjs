import { CrossWhite, GearIcon, TrashIcon } from '@/asset/icons';
import { setAllBetOptions } from '@/store/betCart';
import { showRightBarContent } from '@/store/common';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BetSetting from '../betSetting';
import HeaderBetSlip from '../header/headerBetSlip';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { isWeb } from '@/util/common';
import { useTranslation } from 'next-i18next';

export default function BetCartHeader({ onClose, showSettingsIcon = true }) {
  const dispatch = useDispatch();
  const [showDelModal, setShowDelModal] = useState(false);
  const { options } = useSelector((s) => s.betCart);
  const showSetting = () => {
    dispatch(showRightBarContent(RightSidebarContantTypes.BetSetting));
  };
  const onClick = () => {
    dispatch(showRightBarContent(RightSidebarContantTypes.BetCart));
  };
  return (
    <>
      <div className='flex flex-initial flex-row justify-between p-4'>
        <HeaderBetSlip onClick={onClick} />
        <div className='flex flex-row gap-4 items-center flex-initial'>
          {showSettingsIcon && (
            <Image
              alt='setting'
              src={GearIcon}
              onClick={() => {
                showSetting();
              }}
              className='cursor-pointer'
            />
          )}
          {Object.keys(options).length > 0 && (
            <Image
              alt='delete'
              src={TrashIcon}
              className='w-5 h-5 cursor-pointer'
              onClick={() => setShowDelModal(true)}
            />
          )}
          <Image
            alt='close'
            src={CrossWhite}
            className='w-9 h-9 opacity-20 hover:opacity-100 cursor-pointer'
            onClick={onClose}
          />
        </div>
      </div>
      {showDelModal && <ConfirmDelModal setShowDelModal={setShowDelModal} />}
      <BetSetting />
    </>
  );
}

export const ConfirmDelModal = ({ setShowDelModal }) => {
  const dispatch = useDispatch();
  const btnTw =
    'flex flex-1 items-center justify-center rounded-lg text-white py-4 font-main';
  const { t } = useTranslation();

  return (
    <div className='pointer-events-none absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/100 z-40'>
      <div className='flex flex-col gap-9 '>
        <pre className='flex-initial text-white font-semibold text-lg text-center font-main'>
          {t('areYouSureYouWantToRemoveAllMatch')}
        </pre>
        <div className='pointer-events-auto flex flex-row flex-initial gap-3'>
          <div
            className={`${btnTw} bg-[#222] ${isWeb() && 'cursor-pointer'}`}
            onClick={() => {
              setShowDelModal(false);
            }}
          >
            {t('cancel')}
          </div>
          <div
            className={`${btnTw} ${isWeb() && 'cursor-pointer'} tayagradient`}
            onClick={() => {
              setShowDelModal(false);
              dispatch(setAllBetOptions({}));
            }}
          >
            {t('remove')}
          </div>
        </div>
      </div>
    </div>
  );
};
