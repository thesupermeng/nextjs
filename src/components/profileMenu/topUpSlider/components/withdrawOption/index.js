import { SideBlock } from '@/components/sideBlock';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { DeleteModal } from '../deleteModal';
import { useRouter } from 'next/navigation';
import { AddIcon, CheckBox0, CheckBoxRed, Dustbin, GCash } from '@/asset/icons';
import { isWeb } from '@/util/common';
import { useDispatch, useSelector } from 'react-redux';
import { setWithdrawTab } from '@/store/common';
import { WithdrawTab } from '../..';
import { WEBOnly } from '@/components/Fragments/EnvComponent';
import { setSelectedWithdrawAcc } from '@/store/withdraw';
import { RouterH5 } from '@/util/routes';
import useWithdrawInfo from '@/hook/user/useWithdrawInfo';

export const WithdrawOption = ({ editMode }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [eMode, setEMode] = useState(false);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedAcc } = useSelector((s) => s.withdraw);
  const { t } = useTranslation();

  const { withdrawAcc, mutateWithdrawAcc } = useWithdrawInfo();
  const onClick = () => {
    if (isWeb()) {
      dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_METHOD));
    } else {
      router.push(RouterH5.withdrawMethod);
    }
  };

  const onDelete = () => {
    mutateWithdrawAcc();
    setShowDelete(false);
  };

  const onSelect = (m) => {
    if (eMode || editMode) return;
    dispatch(setSelectedWithdrawAcc(m));

    if (isWeb()) {
      dispatch(setWithdrawTab(WithdrawTab.TOP_UP));
    } else {
      router.replace(RouterH5.withdraw);
    }
  };

  useEffect(() => {
    setSelected(selectedAcc);
  }, [selectedAcc]);

  return (
    <>
      <WEBOnly>
        <div className='flex justify-between px-4'>
          <p className='text-sm'>{t('withdrawOption')}</p>
          <p
            className='text-sm hover:opacity-100 opacity-50 cursor-pointer '
            onClick={() => setEMode(!eMode)}
          >
            {eMode ? t('done') : t('edit')}
          </p>
        </div>
      </WEBOnly>
      <div className='mx-3 flex flex-col'>
        {withdrawAcc?.map((m, idx) => {
          return (
            <SideBlock
              key={idx}
              className='w-full flex flex-1 gap-3 rounded-[4px] items-center justify-between'
              onClick={() => onSelect(m)}
            >
              <Image
                src={m?.method?.icon_url}
                width={30}
                height={30}
                alt='icon'
                className='flex-none rounded-[4px] w-[30px] h-[30px]'
                onError={(e) => (e.target.src = GCash.src)}
              />
              <div className='flex-1 truncate'>
                <p className='text-sm truncate text-ellipsis'>
                  {m.account_name}
                </p>
                <p className='text-xs opacity-50 truncate text-ellipsis'>
                  {m.account_number}
                </p>
              </div>
              {editMode || eMode ? (
                <Image
                  src={Dustbin}
                  alt='dustbin'
                  width={20}
                  height={20}
                  className='flex-none'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowDelete(true);
                    setSelected(m);
                  }}
                />
              ) : (
                <Image
                  className='flex-none'
                  alt='check'
                  src={selected?.id === m.id ? CheckBoxRed : CheckBox0}
                />
              )}
            </SideBlock>
          );
        })}

        {withdrawAcc?.length >= 5 ? (
          <SideBlock className='justify-center'>
            <p className='opacity-50 text-xs'>
              {t('maximumNumberOfWithdrawalMethodsExceeded')}
            </p>
          </SideBlock>
        ) : (
          <SideBlock
            className='justify-center cursor-pointer'
            onClick={onClick}
          >
            <Image src={AddIcon} alt='addicon' width={20} height={20} />
            <p className='opacity-50'>{t('addWithdrawalMethod')}</p>
          </SideBlock>
        )}

        {showDelete && (
          <DeleteModal
            onCancel={() => setShowDelete(false)}
            onDelete={onDelete}
            selected={selected}
          />
        )}
      </div>
    </>
  );
};
