'use client';
import { AnchorContent } from '@/componentsH5/anchorList/AnchorContent';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { setGamesProviders } from '@/store/games';
import { useGameProviders } from '@/hook/games/useGameProviders';
import { ProviderAnchor } from './ProviderAnchor';
import { ProviderSection } from './ProviderSection';

export default function Page() {
  const dispatch = useDispatch();
  const { providers } = useGameProviders();
  const selectedProviders = useSelector((s) => s.games.selectedProviders);
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [tickedProviders, setTickedProviders] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTickedProviders(selectedProviders);
  }, [selectedProviders]);

  const onApply = () => {
    dispatch(setGamesProviders(tickedProviders));
    router.push('/games');
  };

  const toggleAll = () => {
    if (isSelectAll) {
      setTickedProviders(providers.map(({ id }) => id));
      setIsSelectAll(false);
    } else {
      setTickedProviders([]);
      setIsSelectAll(true);
    }
  };

  const toggleProvider = useCallback((id, flag) => {
    setTickedProviders((arr) => {
      return flag ? [id, ...arr] : arr.filter((i) => i !== id);
    });
  }, []);

  return (
    <FullPageContent>
      <div className='flex flex-col flex-1 z-10'>
        <div className='bg-[#000]'>
          <NavHeader label={t('filter')} />
        </div>
        <div className='flex flex-row justify-between px-2 py-4'>
          <p className='text-[17px]'>{t('typeOfGamesProviders')}</p>
          <p
            className='text-tayaRed text-[13px] font-semibold'
            onClick={toggleAll}
          >
            {isSelectAll ? t('chooseAll') : t('unselectAll')}
          </p>
        </div>
        <div className='flex flex-col pl-1 flex-[1_0_0] overflow-y-auto'>
          <AnchorContent
            list={providers}
            anchorExtractor={(obj) => obj.name[0]}
            anchor={(anchor) => <ProviderAnchor anchor={anchor} />}
            section={(data) => (
              <ProviderSection
                data={data}
                tickedProviders={tickedProviders}
                onToggle={toggleProvider}
              />
            )}
          />
        </div>
        <div className='bg-[#000] flex flex-row items-center justify-center flex-initial gap-4 py-2 px-5'>
          <FooterBtn
            text={t('reset')}
            tw='bg-[#222]'
            onClick={() => setTickedProviders(selectedProviders)}
          />
          <FooterBtn
            text={`${t('apply')}${
              tickedProviders.length > 0 ? `(${tickedProviders.length})` : ''
            }`}
            tw='tayagradient'
            onClick={onApply}
            disabled={tickedProviders.length === 0}
          />
        </div>
      </div>
    </FullPageContent>
  );
}
const FooterBtn = ({ text, tw = '', onClick, disabled }) => {
  return (
    <button
      className={`flex-1 text-center py-4 px-8 rounded-lg text-white font-sm text-sm ${tw} disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
