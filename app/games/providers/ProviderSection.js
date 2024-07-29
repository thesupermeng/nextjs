import { CheckBox0, CheckBoxRed, EastRichRedBlackLogo } from '@/asset/icons';
import { ImageWithFallback } from '@/components/fallbackImage';
import Image from 'next/image';

export const ProviderSection = ({ data, tickedProviders, onToggle }) => {
  return (
    <div className='flex flex-col flex-initial gap-2 py-2.5 bg-black/50'>
      {data.map((provider) => {
        const isTick = tickedProviders.includes(provider.id);
        return (
          <div
            key={provider.id}
            className={`flex flex-row items-center text-sm mr-8 ${
              isTick ? 'text-white/100' : 'text-sm text-white/50'
            }`}
            data-letter={provider.name[0]}
            onClick={() => onToggle(provider.id, !isTick)}
          >
            <ImageWithFallback
              alt='flag'
              src={provider.app_icon}
              width={20}
              height={20}
              className='object-cover w-5 h-5 mr-2 rounded-full'
              fallbackSrc={EastRichRedBlackLogo}
            />
            {provider.name}
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
  );
};
