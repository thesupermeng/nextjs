import { CheckBox0, CheckBoxRed, CrossWhite } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import { useFBOnSaleLeagues } from '@/hook/FB/useFBOnSaleLeagues';
import { setFilterLeagues } from '@/store/sportsTaya';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ImageWithFallback } from '@/components/fallbackImage';

export const ModalFilterLeagues = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const { filterLeagues } = useSelector((s) => s.sportsTaya);
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [tickedLeagues, setTickedLeagues] = useState([]);
  const { leagues } = useFBOnSaleLeagues();
  const { t } = useTranslation();

  useEffect(() => {
    setTickedLeagues(filterLeagues);
  }, [filterLeagues]);

  const onApply = () => {
    dispatch(setFilterLeagues(tickedLeagues));
    setShowModal(false);
  };

  const toggleAll = () => {
    if (isSelectAll) {
      setTickedLeagues(leagues.map(({ id }) => id));
      setIsSelectAll(false);
    } else {
      setTickedLeagues([]);
      setIsSelectAll(true);
    }
  };

  const toggleLeague = (id, flag) => {
    setTickedLeagues((arr) => {
      return flag ? [id, ...arr] : arr.filter((i) => i !== id);
    });
  };

  // todo clear leagues when switching param
  return (
    <FullScreenModal>
      <div className='flex self-stretch flex-1 my-20 mx-40 bg-[#121212E5] p-8 rounded-xl py-20 px-40 flex-col overflow-hidden'>
        <Image
          alt='close'
          src={CrossWhite}
          className='w-10 h-10 opacity-20 absolute top-[100px] right-[180px] hover:opacity-100 cursor-pointer'
          onClick={() => setShowModal(false)}
        />

        <div className='flex-initial flex flex-row items-center justify-between mt-3 mb-1 '>
          <div>{t('typeOfLeagues')}</div>
          <div className='flex-initial flex flex-row items-center justify-between gap-3'>
            <div
              onClick={toggleAll}
              className='text-tayaRed font-semibold text-sm cursor-pointer'
            >
              {isSelectAll ? t('chooseAll') : t('unselectAll')}
            </div>
          </div>
        </div>

        <div className='flex-1 pr-3 mt-3 mb-6 overflow-y-auto'>
          <div className='grid grid-cols-3 grid-flow-row gap-x-5 gap-y-3'>
            {leagues.map((lg) => {
              const isTick = tickedLeagues.includes(lg.id);
              return (
                <div
                  key={lg.id}
                  className={`flex flex-row items-center cursor-pointer ${
                    isTick ? 'text-white/100' : 'text-sm text-white/50'
                  }`}
                  onClick={() => toggleLeague(lg.id, !isTick)}
                >
                  <ImageWithFallback
                    alt='flag'
                    src={lg.lurl}
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  {lg.na} ({lg.mt})
                  <div className='flex-1' />
                  <Image
                    alt='check'
                    src={isTick ? CheckBoxRed : CheckBox0}
                    className=''
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-initial flex-row items-center justify-center gap-4'>
          <FooterBtn
            text={t('reset')}
            tw='bg-[#222]'
            onClick={() => setTickedLeagues(filterLeagues)}
          />
          <FooterBtn
            disable={tickedLeagues.length <= 0}
            text={`${t('apply')} ${
              tickedLeagues.length > 0 ? `(${tickedLeagues.length})` : ''
            }`}
            tw='tayagradient'
            onClick={onApply}
          />
        </div>
      </div>
    </FullScreenModal>
  );
};

const FooterBtn = ({ text, tw = '', onClick, disable = false }) => {
  return (
    <button
      disabled={disable}
      className={`flex py-4 px-8 rounded-lg text-white font-sm text-sm disabled:opacity-50 ${tw}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const sampleLeagues = [
  {
    mt: 15,
    na: 'NBA',
    id: 11274,
    or: 2,
    lurl: 'https://static.fastbs55.com/data/a6978a33316b3b1db95ab584ff1b7e4d.png',
    sid: 3,
    rid: 84,
    rnm: 'USA',
    hot: true
  },
  {
    mt: 1,
    na: 'Vietnam VBA',
    id: 12489,
    or: 1000,
    lurl: 'https://static.fastbs55.com/data/99b292c4637d856c282aca82e4b24f98.png',
    sid: 3,
    rid: 96,
    rnm: 'Vietnam',
    hot: false
  },
  {
    mt: 16,
    na: 'FIBA World Cup',
    id: 12501,
    or: 3,
    lurl: 'https://static.fastbs55.com/data/5bfded14f4aa9b4e7c9b37f0957d70c1.png',
    sid: 3,
    rid: 106,
    rnm: 'International',
    hot: false
  },
  {
    mt: 1,
    na: 'New Zealand Tauihi Aotearoa Women',
    id: 16102,
    or: 2000,
    lurl: 'https://static.fastbs55.com/data/96963987abd39cddc742f5d4e2dba900.png',
    sid: 3,
    rid: 120,
    rnm: 'New Zealand',
    hot: false
  }
];
