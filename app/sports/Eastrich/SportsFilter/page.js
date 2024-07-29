'use client';
import { AnchorContent } from '@/componentsH5/anchorList/AnchorContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterLeagues } from '@/store/sportsTaya';
import { useFBOnSaleLeagues } from '@/hook/FB/useFBOnSaleLeagues';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { LeagueAnchor } from './LeagueAnchor';
import { LeagueSection } from './LeagueSection';
import { FullPageContent } from '@/componentsH5/FullPageContent';

export default function Page() {
  const dispatch = useDispatch();
  const filterLeagues = useSelector((s) => s.sportsTaya.filterLeagues);
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [tickedLeagues, setTickedLeagues] = useState([]);
  const { leagues } = useFBOnSaleLeagues();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTickedLeagues(filterLeagues);
  }, [filterLeagues]);

  const onApply = () => {
    dispatch(setFilterLeagues(tickedLeagues));
    router.push('/sports/Eastrich');
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

  const toggleLeague = useCallback((id, flag) => {
    setTickedLeagues((arr) => {
      return flag ? [id, ...arr] : arr.filter((i) => i !== id);
    });
  }, []);

  return (
    <FullPageContent>
      <div className='flex flex-col flex-1 '>
        <div className='bg-[#000]'>
          <NavHeader label='Filter' />
        </div>
        <div className='flex flex-row justify-between px-2 py-4'>
          <p className='text-[17px]'>{t('typeOfLeagues')}</p>
          <p
            className='text-tayaRed text-[13px] font-semibold'
            onClick={toggleAll}
          >
            {isSelectAll ? t('chooseAll') : t('unselectAll')}
          </p>
        </div>
        <div className='flex flex-col pl-1 flex-[1_0_0] overflow-y-auto '>
          <AnchorContent
            list={leagues}
            anchorExtractor={(obj) => obj.na[0]}
            anchor={(anchor) => <LeagueAnchor anchor={anchor} />}
            section={(data) => (
              <LeagueSection
                data={data}
                tickedLeagues={tickedLeagues}
                onToggle={toggleLeague}
              />
            )}
          />
        </div>
        <div className='bg-[#000] flex flex-row items-center justify-center flex-initial gap-4 py-2 px-5'>
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
    </FullPageContent>
  );
}
const FooterBtn = ({ text, tw = '', onClick, disable = false }) => {
  return (
    <button
      disabled={disable}
      className={`disabled:opacity-50 flex-1 text-center py-4 px-8 rounded-lg text-white font-sm text-sm ${tw}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
