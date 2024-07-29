import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InvalidStamp, UsedStamp, VoucherIcon } from '@/asset/icons';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Checkbox } from '@material-tailwind/react';
import { formatDateToDashOnly, formatOnlyDate } from '@/util/date';
import { useDispatch } from 'react-redux';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import { hideRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { ImageWithFallback } from '../fallbackImage';
import { useVoucher } from '@/hook/api/useVoucher';
import { setVoucherDetails } from '@/store/voucher';

export const VoucherStatus = {
  VoucherStatusNotExist: 0,
  VoucherStatusReady: 1,
  VoucherStatusPending: 2,
  VoucherStatusRedeemed: 3,
};

const Curve = ({ className = '' }) => {
  return (
    <div
      className={`w-5 h-5 bg-[#0E0F11] rounded-full absolute ${className}`}
    ></div>
  );
};

export const Voucher = ({
  voucherInfo = {},
  checkbox = false,
  isShowLink = false,
  setIsChecked = () => {},
  isChecked,
  useNow,
  invalid,
  setIsViewVoucherDetail = () => {},
}) => {
  const { t } = useTranslation();
  const [isUsed, setIsUsed] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { checkExpired } = useVoucher();
  const { year, month, day } = formatOnlyDate(voucherInfo.end_at * 1000);

  const onLinkClick = (e) => {
    if (isWeb()) {
      e.preventDefault();
      setIsViewVoucherDetail(true);
    }
    dispatch(setVoucherDetails(voucherInfo));
  };

  useEffect(() => {
    if (voucherInfo) {
      switch (voucherInfo.status) {
        case VoucherStatus.VoucherStatusReady:
          break;
        case VoucherStatus.VoucherStatusPending:
        case VoucherStatus.VoucherStatusRedeemed:
          setIsUsed(true);
          return;
      }

      if (checkExpired(voucherInfo)) {
        setIsExpired(true);
      }
    }
  }, [voucherInfo]);

  return (
    <div
      className={` relative w-full flex items-center  bg-[#191A1D] rounded-lg ${
        invalid || isExpired || isUsed ? 'opacity-50' : ''
      }`}
    >
      <div className='flex flex-1'>
        <div className=' flex items-center justify-center relative pl-5 pr-2 overflow-hidden'>
          <ImageWithFallback
            src={voucherInfo.image}
            fallbackSrc={VoucherIcon}
            width={60}
            alt='voucherIcon'
            height={60}
            className='rounded-md'
          />
          <div className='w-3'></div>
          <div className='border-2 border-dashed absolute h-full w-[3px] border-[#0E0F11] top-0 right-0 bottom-0'></div>

          <Curve className='-top-2.5 -right-2' />
          <Curve className='-bottom-2.5 -right-2' />
        </div>

        <div className='flex flex-col p-3 px-5 relative overflow-hidden'>
          <p className='text-[15px] w-[90%]'>{voucherInfo.name}</p>
          <span className='text-[#96979B] flex flex-col text-[11px]'>
            {/* <p>{voucherInfo.description}</p> */}
            <p className='mb-1 text-13'>
              {t('validTill')} {day + '/' + month + '/' + year}
            </p>
            {isShowLink && (
              <Link
                className='text-[#FFA100] text-13'
                href={`/bet/voucher/${voucherInfo.id}`}
                onClick={onLinkClick}
              >{`T&C Apply ->`}</Link>
            )}
            <div className='h-9'></div>
          </span>

          <Curve className='-bottom-2.5 -left-3' />
          <Curve className='-top-2.5 -left-3' />
        </div>
      </div>

      {isUsed || isExpired ? (
        <div className='absolute top-10 right-5 rotate-[-30deg]'>
          <Image
            src={isUsed ? UsedStamp : InvalidStamp}
            alt='Stamp'
            width={60}
          />
        </div>
      ) : (
        checkbox && (
          <div className='absolute top-1 right-0'>
            <Checkbox
              className={`checked:bg-tayaRed`}
              checked={isChecked}
              onChange={setIsChecked}
              disabled={invalid}
              color='red'
              ripple={false}
            />
          </div>
        )
      )}

      {useNow && !isExpired && !isUsed && (
        <button
          onClick={() => {
            router.push('/sports/Eastrich');
            if (isWeb()) {
              dispatch(hideRightBarContent(RightSidebarContantTypes.MyVoucher));
            }
          }}
          className='absolute right-2 bottom-3 mx-3 flex bg-tayaRed text-xs rounded-md px-3 py-1'
        >
          Use Now
        </button>
      )}
    </div>
  );
};
