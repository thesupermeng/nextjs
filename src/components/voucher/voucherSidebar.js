import React, { useEffect, useState } from 'react';
import { Voucher } from './Voucher';
import { WEBOnly } from '../Fragments/EnvComponent';
import { ScrollContentVertical } from '../ScrollContentVertical';
import { Button } from '@/componentsH5/button';
import { RightMenuLayout } from '../rightMenuLayout';
import { RightMenuSubpageHeader } from '../rightMenuLayout/rightMenuSubpageHeader';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { setSelectedVoucher } from '@/store/voucher';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import { VoucherDetail } from '@/components/voucher/VoucherDetail';
import { useVoucher } from '@/hook/api/useVoucher';
import { NodataV2 } from '../noDataV2';
import { LoadingPage } from '../loading';
import useSinglePassBet from '@/hook/FB/useSinglePassBet';
import Image from 'next/image';
import { SignIcon } from '@/asset/icons';
import { useVoucherList } from '@/hook/api/useVoucherList';

export const VoucherSidebar = ({ useNow }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isViewVoucherDetail, setIsViewVoucherDetail] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);
  const { getApplicables } = useVoucher();
  const [applcableList, setApplicableList] = useState(null);
  const { getBetDetails } = useSinglePassBet();
  const router = useRouter();
  const { data: voucherList, isLoading: loading } = useVoucherList('valid');

  //get all voucher list
  useEffect(() => {
    !useNow && fetchBetDetailsAndApplicables();
  }, []);

  const fetchBetDetailsAndApplicables = async () => {
    await getBetDetails()
      .then((betDetails) => getApplicables(betDetails))
      .then((applicableData) => {
        setApplicableList(applicableData.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (selectedVoucher) setIsChecked(selectedVoucher.id);
  }, [selectedVoucher]);

  const onVoucherSelected = () => {
    dispatch(setSelectedVoucher(voucherList.find((e) => e.id === isChecked)));
    if (isWeb())
      dispatch(hideRightBarContent(RightSidebarContantTypes.Voucher));
    else {
      router.back();
    }
  };

  return (
    <>
      <RightMenuLayout>
        <div className='p-4 flex flex-col flex-1 bg-[#0E0F11]'>
          <WEBOnly>
            <RightMenuSubpageHeader
              onBack={() => {
                dispatch(hideRightBarContent(RightSidebarContantTypes.Voucher));
                dispatch(
                  hideRightBarContent(RightSidebarContantTypes.MyVoucher)
                );
              }}
              label={useNow ? t('myVoucher') : t('voucher')}
              right={
                useNow ? (
                  <p
                    className='cursor-pointer'
                    onClick={() => {
                      dispatch(
                        hideRightBarContent(RightSidebarContantTypes.MyVoucher)
                      );
                      dispatch(
                        showRightBarContent(
                          RightSidebarContantTypes.VoucherHistory
                        )
                      );
                    }}
                  >
                    {t('history')}
                  </p>
                ) : (
                  <></>
                )
              }
            ></RightMenuSubpageHeader>
          </WEBOnly>

          <ScrollContentVertical>
            {loading && <LoadingPage />}

            {voucherList?.length > 0 ? (
              <div className='flex flex-col gap-3 '>
                {voucherList?.map((v, index) => {
                  return (
                    <div key={index}>
                      <Voucher
                        invalid={
                          !useNow && !applcableList?.find((e) => e.id === v.id)
                        }
                        voucherInfo={v}
                        checkbox={!useNow}
                        useNow={useNow}
                        isShowLink
                        setIsChecked={() => {
                          if (isChecked === v.id) {
                            setIsChecked(null);
                          } else setIsChecked(v.id);
                        }}
                        isChecked={isChecked === v.id}
                        setIsViewVoucherDetail={() =>
                          setIsViewVoucherDetail(!isViewVoucherDetail)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              !loading && <NodataV2 />
            )}

            {!useNow && (
              <div className='flex no-shrink gap-1 bg-[#613200] rounded-md mt-3 px-3 py-1 items-center'>
                <Image
                  src={SignIcon}
                  alt='signicon'
                  width={20}
                  height={20}
                  className='no-shrink'
                />
                <p className='text-[11px] '>
                  {t('appliesToSpecificBetsVerifyEligibilityBeforeWagering')}
                </p>
              </div>
            )}
          </ScrollContentVertical>
        </div>

        {!useNow && (
          <div className='text-[13px] pl-5'>
            {isChecked ? 1 : 0} {t('voucherSelected')}.
            <span className='pl-1 text-[#FF9C00]'>
              {voucherList?.find((e) => e.id === isChecked)?.name}
            </span>
          </div>
        )}
        {!useNow && <Button onClick={onVoucherSelected}>{'Ok'} </Button>}

        {isViewVoucherDetail && isWeb() && (
          <VoucherDetail
            setIsViewVoucherDetail={() =>
              setIsViewVoucherDetail(!isViewVoucherDetail)
            }
          />
        )}
      </RightMenuLayout>
    </>
  );
};
