import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import i18n from 'i18next';
import { Button } from '@/componentsH5/button';
import {
  CheckBox0,
  CheckBoxRed,
  IconRoundWarningSign,
  USDT,
  IconChevron,
} from '@/asset/icons';
import { WithdrawModalType } from '@/components/profileMenu';
import BetError from '@/components/betCart/BetError';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setWithdrawTab, setWithdrawModal } from '@/store/common';
import { WithdrawTab } from '../..';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import QRFileInput from './QRFileInput';
import readQRCode from './QRCodeReader';
import { addWithdrawAcc } from '@/services/user';
import useWithdrawInfo from '@/hook/user/useWithdrawInfo';
export default function WithdrawMethod() {
  const [disabled, setIsDisabled] = useState(true);
  const [selected, selectedVal] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState('');
  const [label, setLabel] = useState('');
  const [dropdownSelect, setDropdownSelect] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const maxLength = 200;

  const { withdrawMethod, mutateWithdrawAcc } = useWithdrawInfo();
  const onClick = () => {
    setIsDone(true);
    addWithdraw();
  };

  const addWithdraw = () => {
    const params = {
      account_no: address,
      method_id: selected?.id,
      account_name: label,
    };

    addWithdrawAcc(params).then((data) => {
      if (data?.code === 0) {
        if (isWeb()) {
          dispatch(setWithdrawModal(WithdrawModalType.AddMethodSuccess));
          dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_OPTION));
        } else {
          setSuccess(true);
          router.push('/user/withdraw/option');
        }
        mutateWithdrawAcc();
      } else {
        setErrorMsg(data?.msg);
      }
    });
  };

  const handleWalletAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    if (address?.length > 0 && label.length > 0 && label.length <= maxLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [address, label]);

  useEffect(() => {
    setSelectionList(withdrawMethod);
    selectedVal(withdrawMethod?.find((item) => item.name == 'TRC20'));
  }, [withdrawMethod]);

  const handleQRFileUpload = (file) => {
    readQRCode(file, (code) => {
      if (code) {
        setAddress(code?.data);
      }
    });
  };

  return (
    <>
      <div
        className={`rounded-xl flex flex-col px-5 py-3.5 bg-tayaGrey my-2 ${
          isWeb() ? 'mx-4' : 'mx-5'
        }`}
      >
        <div
          className='flex flex-row justify-between hover:cursor-pointer'
          onClick={() => setDropdownSelect(!dropdownSelect)}
        >
          <div className='flex items-center gap-3'>
            {dropdownSelect ? (
              <p className='text-[13px] text-white/50 mb-2'>
                {t('selectWithdrawalMethod')}
              </p>
            ) : (
              <>
                <Image
                  className='rounded-[4px] w-[26px] h-[26px]'
                  src={selected?.icon_url}
                  alt='payment-icon'
                  width={26}
                  height={26}
                  onError={(e) => (e.target.src = USDT.src)}
                />
                <p className='text-[13px]'>{selected?.name}</p>
              </>
            )}
          </div>
          <Image
            alt='dropdown'
            src={IconChevron}
            width={10}
            className={`${
              dropdownSelect ? 'rotate-90' : '-rotate-90'
            } mr-[6px]`}
          />
        </div>
        {dropdownSelect &&
          selectionList?.map((s) => (
            <div
              key={s?.id}
              className='flex py-2 justify-between hover:cursor-pointer'
              onClick={() => {
                selectedVal(s);
                setDropdownSelect(!dropdownSelect);
              }}
            >
              <div className='flex items-center'>
                <Image
                  className='rounded-[4px] w-[26px] h-[26px]'
                  src={s?.icon_url}
                  alt='payment-icon'
                  width={26}
                  height={26}
                  onError={(e) => (e.target.src = USDT.src)}
                />
                <p className='text-[13px] pl-2'>{s?.name}</p>
              </div>
              <Image
                alt='check'
                src={selected?.id === s?.id ? CheckBoxRed : CheckBox0}
              />
            </div>
          ))}
      </div>

      {selected?.name === 'TRC20' && (
        <>
          <div className={`py-3 h-full ${isWeb() ? 'px-4' : 'px-5'}`}>
            {/* <h2 className='text-sm text-white'>{t('selectNetwork')}</h2>
            <div className='flex flex-row my-3'>
              <div className='bg-tayaRed/30 text-white text-center text-[13px] px-4 py-3 rounded-[7px] w-full'>
                TRC20
              </div>
            </div> */}
            <div className='flex items-center'>
              <Image src={IconRoundWarningSign} alt='warning' />
              <p className='text-[13px] text-white mx-2'>
                {t('networkWarning')}
              </p>
            </div>
            <h2 className='text-sm text-white mt-6 mb-3'>
              <label htmlFor='walletAddress'>{t('usdtWalletAddress')}</label>
            </h2>

            <div className='flex flex-row justify-between bg-tayaGrey px-[18px] py-[15px] mb-3 rounded-lg'>
              <input
                id='walletAddress'
                className='w-[90%] bg-tayaGrey focus:outline-none text-base text-ellipsis'
                placeholder={t('tetherAddress')}
                value={address}
                onChange={handleWalletAddressChange}
              />
              <QRFileInput onFileUpload={handleQRFileUpload} />
            </div>
            <div className='flex items-center'>
              <Image src={IconRoundWarningSign} alt='warning' />
              <p className='text-[13px] text-white mx-2'>
                {t('addressWarning')}
              </p>
            </div>
            <h2 className='text-sm text-white mt-6 mb-3'>{t('walletLabel')}</h2>
            <div className='flex bg-tayaGrey px-[18px] py-[15px] mb-3 rounded-lg'>
              <input
                placeholder={t('setYourWalletLabel')}
                className='w-full bg-tayaGrey focus:outline-none text-base'
                onChange={handleLabelChange}
              />
            </div>
            {label?.length > maxLength && (
              <div className='text-tayaRed text-xs'>
                {i18n.t('walletLabelLimit', {
                  maxLength,
                })}
              </div>
            )}
          </div>
          <Button onClick={onClick} disabled={disabled}>
            {t('done')}
          </Button>
        </>
      )}

      {errorMsg && (
        <BetError
          title={t('error')}
          message={errorMsg}
          setShowErrorModal={() => {
            setErrorMsg('');
            setIsDone(false);
          }}
        />
      )}
    </>
  );
}
