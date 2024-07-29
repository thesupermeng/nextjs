import { RightBetCartWidth } from '@/app/page';
import { CrossWhite } from '@/asset/icons';
import { updateBetSetting } from '@/store/betCart';
import { hideRightBarContent } from '@/store/common';
import Image from 'next/image';
import UnChecked from './unChecked.svg';
import RedChecked from './redChecked.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { isWeb } from '@/util/common';
import { updateLocalstorage } from '@/util/UserApi';
import { LocalStorageKeys } from '@/config/common';
import { useTranslation } from 'next-i18next';

export default function BetSetting() {
  const dispatch = useDispatch();
  const { setting } = useSelector((s) => s.betCart);
  const { rightBarContent } = useSelector((s) => s.common);
  const { showRightSidebar } = useSelector((s) => s.common);
  const { t } = useTranslation();
  const closeSetting = () => {
    dispatch(hideRightBarContent(RightSidebarContantTypes.BetSetting));
  };

  const SectionRow = ({ name, isChecked, text, value }) => {
    const onClick = () => {
      dispatch(updateBetSetting({ name, value }));
      if (name === 'format') {
        updateLocalstorage(LocalStorageKeys.OddsFormat, value);
      }
    };

    return (
      <div
        className='py-2 px-2 items-center justify-start flex flex-row cursor-pointer'
        onClick={onClick}
      >
        <Image alt='i' src={isChecked ? RedChecked : UnChecked} />
        <div className='text-white text-[15px] font-medium ml-1.5'>{text}</div>
      </div>
    );
  };

  return (
    <div
      className={
        isWeb()
          ? `fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
              rightBarContent[RightSidebarContantTypes.BetSetting] &&
              showRightSidebar
                ? RightBetCartWidth + ' p-5'
                : 'w-0 opacity-0 pointer-events-none overflow-hidden'
            } common-transition `
          : 'flex flex-col flex-1 p-4'
      }
    >
      {/* header  */}
      {isWeb() && (
        <div className='flex flex-initial flex-row justify-between p-4'>
          <div className='flex-initial text-tayaRed text-base font-medium'>
            {t('betSetting')}
          </div>
          <Image
            alt='close'
            src={CrossWhite}
            className='w-9 h-9 opacity-20 hover:opacity-100 cursor-pointer'
            onClick={() => closeSetting()}
          />
        </div>
      )}

      {/* odd rule */}
      <div className='text-white font-semibold text-[17px]'>
        {t('oddsRules')}
      </div>
      <SectionRow
        key='r2'
        isChecked={setting.rule === '2'}
        name='rule'
        value='2'
        text={t('acceptAnyOdds')}
      />
      <SectionRow
        key='r1'
        isChecked={setting.rule === '1'}
        name='rule'
        value='1'
        text={t('acceptHigherOdds')}
      />
      <SectionRow
        key='r0'
        isChecked={setting.rule === '0'}
        name='rule'
        value='0'
        text={t('donAcceptAnyChanges')}
      />

      <div className='h-6' />
      {/* odd format */}
      <div className='text-white font-semibold text-[17px]'>
        {t('oddsFormat')}
      </div>
      <SectionRow
        key='f1'
        isChecked={setting.format === 1}
        name='format'
        value={1}
        text={t('decimal')}
      />
      <SectionRow
        key='f2'
        isChecked={setting.format === 2}
        name='format'
        value={2}
        text={t('hongKong')}
      />
    </div>
  );
}

const Section = ({ title, children }) => {
  return (
    <div>
      <div className='text-white '>{title}</div>
      {children}
    </div>
  );
};
