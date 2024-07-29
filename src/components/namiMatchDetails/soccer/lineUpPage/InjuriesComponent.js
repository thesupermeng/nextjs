import SubPlayerComponent from './SubPlayerComponent';
import { isWeb } from '@/util/common';
import { useTranslation } from 'next-i18next';

export default function InjuriesComponent({
  homeInjuryList = [],
  awayInjuryList = [],
}) {
  const { t } = useTranslation();
  return (
    <div className={`${isWeb() ? 'px-2' : 'px-5'}`}>
      <p className='text-[16px] my-3'>{t('injuriesSuspensions')}</p>
      <div className='flex flex-1 mt-3'>
        <div className='flex-1'>
          {homeInjuryList?.map((item, index) => (
            <SubPlayerComponent
              key={`homeInjuredPlayer${index}`}
              isInjury={true}
              data={item}
              isHome={true}
            />
          ))}
        </div>
        <div className='flex-1'>
          {awayInjuryList?.map((item, index) => (
            <SubPlayerComponent
              key={`awayInjuredPlayer${index}`}
              isInjury={true}
              data={item}
              isHome={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
