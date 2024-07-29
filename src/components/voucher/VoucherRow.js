import { IconArrowWhite, VoucherIcon } from '@/asset/icons';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';
import { useDispatch, useSelector } from 'react-redux';
import {
  setErrorModalProps,
  setShowErrorModal,
  showRightBarContent,
} from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { setSelectedVoucher } from '@/store/voucher';
import { Checkbox } from '@material-tailwind/react';
import useUser from '@/hook/user/useUser';

export const VoucherRow = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);
  const { options } = useSelector((s) => s.betCart);
  const optionsLength = Object.keys(options).length;
  const { isLogin } = useUser();

  const { t } = useTranslation();

  const onVoucherClick = () => {
    if (optionsLength !== 1) {
      showError();
      return;
    }

    if (isWeb()) {
      dispatch(showRightBarContent(RightSidebarContantTypes.Voucher));
    } else {
      if (!isLogin) {
        router.push('/user/login');
      } else {
        router.push('/bet/voucher');
      }
    }
  };

  useEffect(() => {
    if (optionsLength !== 1 && optionsLength > 0 && selectedVoucher) {
      showError();
      dispatch(setSelectedVoucher(null));
    }
  }, [optionsLength]);

  const showError = () => {
    dispatch(setShowErrorModal(true));
    dispatch(
      setErrorModalProps({
        title: t('attention'),
        message: t('validApplyVoucherWarning'),
        attention: true,
      })
    );
  };

  return (
    <div
      className='flex flex-row justify-between mb-[10px] cursor-pointer'
      onClick={() => {
        onVoucherClick();
      }}
    >
      <div className='gap-2 items-center flex flex-row'>
        <Image src={VoucherIcon} alt='VoucherIcon' width={20} height={20} />
        <p>{t('myVoucher')}</p>
      </div>

      {selectedVoucher ? (
        <div className='flex flex-initial items-center checkbox gap-2'>
          <p>{selectedVoucher.name}</p>
          <Checkbox
            color='red'
            checked
            className='border-0 checked:bg-tayaRed'
            onChange={() => {}}
          />
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <Image src={IconArrowWhite} alt='arrowRight' className='-rotate-90' />
        </div>
      )}
    </div>
  );
};
