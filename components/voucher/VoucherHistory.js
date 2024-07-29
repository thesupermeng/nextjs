import React, { useEffect, useState } from 'react';
import { List, ListItem } from '@material-tailwind/react';
import { RightMenuLayout } from '../rightMenuLayout';
import { Voucher } from './Voucher';
import { ScrollContentVertical } from '../ScrollContentVertical';
import { NodataV2 } from '../noDataV2';
import i18n from 'i18next';
import { useVoucherList } from '@/hook/api/useVoucherList';
import { LoadingPage } from '../loading';
import { useTranslation } from 'next-i18next';
import { RightMenuSubpageHeader } from '../rightMenuLayout/rightMenuSubpageHeader';
import { WEBOnly } from '../Fragments/EnvComponent';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import { useDispatch, useSelector } from 'react-redux';
import { isWeb } from '@/util/common';
import { VoucherDetail } from './VoucherDetail';

const tab = [
  {
    label: i18n.t('all'),
  },
  {
    label: i18n.t('used'),
  },
  {
    label: i18n.t('expiry'),
  },
];

export const VoucherHistory = () => {
  const [selected, setSelected] = useState(0);
  const setSelectedItem = (value) => setSelected(value);
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();
  const [allVoucher, setAllVoucher] = useState([]);
  const [isViewVoucherDetail, setIsViewVoucherDetail] = useState(false);

  useEffect(() => {
    const newFilter = selected === 0 ? '' : selected === 1 ? 'used' : 'expired';
    setFilter(newFilter);
  }, [selected]);

  const {
    data: voucherList,
    isLoading,
    getVoucherList,
  } = useVoucherList(filter);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selected === 0) {
          const expiredVouchers = await getVoucherList('expired');
          const usedVouchers = await getVoucherList('used');
          const combinedVoucherList = [
            ...usedVouchers.data,
            ...expiredVouchers.data,
          ];
          setAllVoucher(combinedVoucherList);
        }
      } catch (error) {
        console.error('Error fetching voucher data:', error);
      }
    };

    fetchData();
  }, [selected]);

  return (
    <RightMenuLayout className='bg-[#0E0F11]'>
      <WEBOnly>
        <div className='p-4 flex flex-col bg-[#0E0F11]'>
          <RightMenuSubpageHeader
            onBack={() => {
              dispatch(
                hideRightBarContent(RightSidebarContantTypes.VoucherHistory)
              );
              dispatch(showRightBarContent(RightSidebarContantTypes.MyVoucher));
            }}
            label={t('history')}
          ></RightMenuSubpageHeader>
        </div>
      </WEBOnly>

      <List className='flex-row bg-[#191A1D] rounded-md mx-3 my-2 p-0 '>
        {tab.map((t, index) => {
          return (
            <ListItem
              key={index}
              className={`active:bg-white focus:bg-white hover:bg-opacity-100 active:bg-opacity-100 focus:bg-opacity-100 justify-center text-xs py-1 ${
                selected === index
                  ? 'bg-white text-black font-semibold '
                  : ' text-white/50'
              }`}
              selected={selected === index}
              onClick={() => {
                setSelectedItem(index);
              }}
            >
              {t.label}
            </ListItem>
          );
        })}
      </List>

      <ScrollContentVertical className='p-4 gap-3 '>
        {!isLoading ? (
          selected === 0 ? (
            allVoucher?.length > 0 ? (
              allVoucher?.map((v, idx) => {
                return (
                  <div key={`${v.id}${idx}`}>
                    <Voucher
                      voucherInfo={v}
                      checkbox={false}
                      isShowLink
                      setIsViewVoucherDetail={setIsViewVoucherDetail}
                    />
                  </div>
                );
              })
            ) : (
              <NodataV2 />
            )
          ) : voucherList?.length > 0 ? (
            voucherList?.map((v, idx) => {
              return (
                <div key={`${v.id}${idx}`}>
                  <Voucher
                    voucherInfo={v}
                    checkbox={false}
                    isShowLink
                    setIsViewVoucherDetail={setIsViewVoucherDetail}
                  />
                </div>
              );
            })
          ) : (
            <NodataV2 />
          )
        ) : (
          <LoadingPage />
        )}
      </ScrollContentVertical>

      {isViewVoucherDetail && isWeb() && (
        <VoucherDetail setIsViewVoucherDetail={setIsViewVoucherDetail} />
      )}
    </RightMenuLayout>
  );
};
