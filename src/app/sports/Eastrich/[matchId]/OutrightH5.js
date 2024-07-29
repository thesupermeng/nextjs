import Footer from '@/components/Footer';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';
import { useTranslation } from 'next-i18next';
import { convertTimeStampToDate } from '@/util/date';
import { TayaOutright } from '../TayaOutright';

export const OutrightH5 = () => {
  const { data } = useCurrentMatchDetail();
  const outrightEndDate = data.bt;
  const { t } = useTranslation();

  return (
    <>
      <NavHeader label={data?.nm} betslip fixedPosition />

      {outrightEndDate && (
        <div className='text-[#96979B] text-sm px-4 py-1.5 bg-tayaGrey'>
          {t('endDate')} {convertTimeStampToDate(outrightEndDate)}
        </div>
      )}

      <div
        className={`mt-10 flex flex-col items-stretch gap-5 overflow-y-auto px-4 pt-3 bg-tayaGrey`}
      >
        {data?.mg?.map((match, idx) => {
          return (
            <TayaOutright
              key={`${data?.id}${match?.mty}`}
              match={data}
              data={match}
            />
          );
        })}

        <Footer />
      </div>
    </>
  );
};
