import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export const Pageheader = ({ navItem = {}, children }) => {
  const { t, i18n } = useTranslation();

  const displayText = i18n.exists(navItem.translationKey)
    ? t(navItem.translationKey)
    : navItem.text;

  return (
    <div className='flex flex-1 flex-row items-start mb-6'>
      <div className='flex flex-initial flex-row self-center items-center'>
        <Image
          alt='sports'
          className='w-[1.875rem] h-[1.875rem] flex flex-initial'
          src={navItem.iconActive}
        />
        <div
          className={`font-bold leading-4 text-lg flex flex-initial ml-2 mr-10 text-white`}
        >
          {displayText}
        </div>
      </div>
      {children}
    </div>
  );
};
