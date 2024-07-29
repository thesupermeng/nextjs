import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Game21 from './media/game21.png';
import { isWeb } from '@/util/common';
import { EastRichWhiteLogoWithText } from '@/asset/icons';

export const Statements = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-1 flex-col gap-3 justify-start'>
      <Image alt='Taya' src={EastRichWhiteLogoWithText} />
      <div className='text-[13px] font-normal'>
        {t('engageInSportsWageringOnEvents')}
      </div>
      {isWeb() ? null : children}
    </div>
  );
};
