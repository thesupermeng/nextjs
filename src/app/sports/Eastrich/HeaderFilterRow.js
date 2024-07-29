import { Filter, IconArrowWhite } from '@/asset/icons';
import { FBMatchListOrderBy, setTayaSportsOrderBy } from '@/store/sportsTaya';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ModalFilterLeagues } from './ModalFilter';
import AllExpand from '@/components/Fragments/AllExpand';
import { isWeb } from '@/util/common';
import Link from 'next/link';
import { FAV_SPORTTYPE_CODE } from '@/config/FB/FBConfig';

export default function HeaderFilterRow({ allExpand, setAllExpand }) {
  const dispatch = useDispatch();
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);
  const { t } = useTranslation();
  const { orderBy, filterLeagues, matchPlayType } = useSelector(
    (s) => s.sportsTaya
  );

  if (!isWeb() && (matchPlayType == 7 || matchPlayType == FAV_SPORTTYPE_CODE)) {
    return null;
  }

  return (
    <>
      <div className='flex items-center justify-between flex-initial my-1 text-white rounded'>
        <div className='rounded flex flex-initial flex-row gap-1 w-40 items-center bg-tayaGrey p-[2px]'>
          <LeaguesDate
            text={t('leagues')}
            selected={orderBy === FBMatchListOrderBy.League}
            onClick={() =>
              dispatch(setTayaSportsOrderBy(FBMatchListOrderBy.League))
            }
          />
          <LeaguesDate
            text={t('dates')}
            selected={orderBy === FBMatchListOrderBy.Date}
            onClick={() =>
              dispatch(setTayaSportsOrderBy(FBMatchListOrderBy.Date))
            }
          />
        </div>

        <div
          className={`flex flex-row items-center flex-initial justify-stretch ${
            isWeb() ? 'gap-5' : 'gap-2'
          }`}
        >
          {isWeb() ? (
            <div
              onClick={() => {
                setIsShowFilterModal(true);
              }}
              className={`cursor-pointer relative rounded-md bg-tayaGrey px-3 py-2 flex flex-1 flex-col justify-between items-center`}
            >
              <Image alt='filter' src={Filter} />
              {filterLeagues.length ? (
                <div className='absolute flex items-center justify-center w-6 h-6 rounded-full -top-3 -right-3 bg-tayaRed'>
                  <div className='text-xs font-bold'>
                    {filterLeagues.length}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href={'/sports/Eastrich/SportsFilter'}>
              <div
                className={`w-[30px] h-[28px] relative rounded-md bg-tayaGrey flex flex-1 flex-col justify-center items-center`}
              >
                <Image alt='filter' src={Filter} width={16} />
                {filterLeagues.length ? (
                  <div className='absolute flex items-center justify-center w-6 h-6 rounded-full -top-3 -right-3 bg-tayaRed'>
                    <div className='text-xs font-bold'>
                      {filterLeagues.length}
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          )}

          <AllExpand
            tw={`${isWeb() ? '' : 'w-[30px] h-[28px]'}`}
            isExpand={allExpand}
            onClick={() => {
              setAllExpand((a) => !a);
            }}
          />
          {/* <div
            onClick={() => {
              setAllExpand((a) => !a);
            }}
            className={`rounded-md bg-tayaGrey px-3 py-2 flex gap-2 flex-1 flex-col justify-between items-center`}
          >
            <div className='rounded'>
              <Image src={IconArrowWhite} className='flex rotate-180' alt='a' />
            </div>
            <div className='rounded'>
              <Image src={IconArrowWhite} className='flex' alt='a' />
            </div>
          </div> */}
        </div>
      </div>
      {isShowFilterModal && (
        <ModalFilterLeagues setShowModal={setIsShowFilterModal} />
      )}
    </>
  );
}

const LeaguesDate = ({ selected, text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-1 text-center items-center justify-center ${
        selected
          ? 'bg-white text-black rounded font-semibold'
          : 'bg-transparent opacity-50 font-normal '
      } ${isWeb() ? 'cursor-pointer text-xs p-2' : 'text-[11px] h-[24px]'}`}
    >
      {text}
    </div>
  );
};
