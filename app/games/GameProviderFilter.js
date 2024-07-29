import { CheckBox0, CheckBoxRed, CrossWhite } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import { useGameProviders } from '@/hook/games/useGameProviders';
import { setGamesProviders } from '@/store/games';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const GameProviderFilter = ({ setShowFilterModal }) => {
  const dispatch = useDispatch();
  const { providers } = useGameProviders();
  const selectedProviders = useSelector((s) => s.games.selectedProviders);
  const [tickedProviders, setTickedProviders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setTickedProviders(selectedProviders);
  }, [selectedProviders]);

  const toggleProvider = (id) => {
    if (id === true) {
      setTickedProviders(selectedProviders);
    } else if (id === false) {
      setTickedProviders([]);
    } else {
      const idx = tickedProviders.indexOf(id);
      if (idx === -1) {
        setTickedProviders([...tickedProviders, id]);
      } else {
        setTickedProviders((arr) => arr.filter((i) => i != id));
      }
    }
  };

  const applyProviders = () => {
    if (tickedProviders.length < 1) {
      return;
    }
    dispatch(setGamesProviders(tickedProviders));
    setShowFilterModal(false);
  };

  return (
    <FullScreenModal>
      <div className='flex self-center w-[946px] flex-initial bg-[#121212E5] p-9 rounded-xl flex-col overflow-hidden'>
        <Image
          alt='close'
          src={CrossWhite}
          className='w-9 h-9 opacity-20 hover:opacity-100 self-end cursor-pointer'
          onClick={() => setShowFilterModal(false)}
        />
        <div className='inline-flex justify-between items-center my-3'>
          <div className='text-[17px] font-semibold text-white/50'>
            {t('typeOfGamesProviders')}
          </div>
          <div
            onClick={() =>
              toggleProvider(tickedProviders.length !== providers.length)
            }
            className='text-tayaRed font-semibold text-sm cursor-pointer'
          >
            {tickedProviders.length === providers.length
              ? t('unselectAll')
              : t('chooseAll')}
          </div>
        </div>

        <div className='grid grid-cols-3 grid-flow-row gap-x-5 gap-y-3'>
          {providers.map((provider) => {
            const icon = isWeb() ? provider.web_icon : provider.app_icon;
            return (
              <div
                key={provider.id}
                className='flex flex-row items-center gap-1 my-1.5 cursor-pointer'
                onClick={() => toggleProvider(provider.id)}
              >
                {icon ? (
                  <Image alt='icon' src={icon} width={20} height={20} />
                ) : null}

                <div
                  className={`flex-1 ${
                    tickedProviders.includes(provider.id)
                      ? 'text-white/100'
                      : 'text-white/50 hover:text-white/100'
                  }`}
                >
                  {provider.name}
                </div>

                <Image
                  alt='check'
                  className='hover:opacity-100'
                  src={
                    tickedProviders.includes(provider.id)
                      ? CheckBoxRed
                      : CheckBox0
                  }
                />
              </div>
            );
          })}
        </div>

        <div className='flex flex-row gap-4 items-center text-center mt-14'>
          <div
            className='flex-1 py-4 rounded-lg bg-[#222] cursor-pointer'
            onClick={() => setTickedProviders(selectedProviders)}
          >
            {t('reset')}
          </div>
          <button
            className='flex-1 py-4 rounded-lg tayagradient disabled:opacity-50 !disabled:cursor-pointer'
            disabled={tickedProviders.length <= 0}
            onClick={applyProviders}
          >
            {t('apply')} ({tickedProviders.length})
          </button>
        </div>
      </div>
    </FullScreenModal>
  );
};
