import { WEBOnly } from '@/components/Fragments/EnvComponent';
import { H5Only } from '@/components/Fragments/EnvComponent';
import { RightMenuSubpageHeader } from '@/components/rightMenuLayout/rightMenuSubpageHeader';
import { ScrollContentVertical } from '@/components/ScrollContentVertical';
import { Voucher } from '@/components/voucher/Voucher';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { isWeb } from '@/util/common';
import { useParams } from 'next/navigation';
import { formatDate } from '../matchHistory/utils';
import { LoadingPage } from '../loading';
import { useSelector } from 'react-redux';
import { useVoucherList } from '@/hook/api/useVoucherList';

export const VoucherDetail = ({ setIsViewVoucherDetail = () => {} }) => {
  const { t } = useTranslation();
  const param = useParams();
  const [detail, setDetail] = useState([]);
  const voucherDetails = useSelector((s) => s.voucher.voucherDetails);
  const { data: voucherList } = useVoucherList('all');
  useEffect(() => {
    if (param.voucherId) {
      const detail = voucherList.find(
        (e) => e.id === parseInt(param.voucherId)
      );
      setDetail(detail);
    } else if (voucherDetails) {
      setDetail(voucherDetails);
    }
  }, [param, voucherDetails, voucherList]);

  if (!detail?.id) {
    return <LoadingPage />;
  }

  return (
    <>
      <WEBOnly>
        <FullPageContent className='absolute !bg-[#0e0f11]'>
          <div className='p-4'>
            <RightMenuSubpageHeader
              label={t('voucherTncs')}
              onBack={() => setIsViewVoucherDetail(false)}
            />

            <DetailsContent description={detail?.description} detail={detail} />
          </div>
        </FullPageContent>
      </WEBOnly>

      <H5Only>
        <DetailsContent description={detail?.description} detail={detail} />
      </H5Only>
    </>
  );
};

const DetailsContent = ({ description, detail }) => {
  const { t } = useTranslation();

  return (
    <ScrollContentVertical>
      <Voucher voucherInfo={detail} />

      <div className='mt-4'>
        {t('validPeriod')}
        <p className='text-[#AEAEAE] text-15'>
          {formatDate(detail?.start_at * 1000)} -{' '}
          {formatDate(detail?.end_at * 1000)}
        </p>
        <div>
          {description?.web && isWeb() && (
            <img
              alt='promo'
              className={`object-cover h-auto w-full`}
              onError={(e) => (e.target.style.display = 'none')}
              src={description?.web}
            />
          )}
          {description?.h5 && !isWeb() && (
            <img
              alt='promo'
              className={`object-cover h-auto w-full`}
              onError={(e) => (e.target.style.display = 'none')}
              src={description?.h5}
            />
          )}
        </div>
      </div>
    </ScrollContentVertical>
  );
};
