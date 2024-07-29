'use client';
import ChangePasswword from './components/changePassword';
import PersonalInfo from './components/personalInfo';
import { useState } from 'react';
import TayaPinModal from '@/components/TayaPinModal';
import useUser from '@/hook/user/useUser';
import { RightMenuLayout } from '@/components/rightMenuLayout';
import { RightMenuHeader } from '@/components/rightMenuLayout/rightMenuHeader';
import { useTranslation } from 'next-i18next';

const Account = () => {
  const [selected, setSelected] = useState(0);
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <RightMenuLayout>
      <RightMenuHeader
        setSelected={setSelected}
        selected={selected}
        className='p-4'
        tabs={[
          {
            label: t('personalInfo'),
          },
          {
            label: t('changePassword'),
          },
          {
            label: user?.has_set_secondary_pwd
              ? t('resetPin')
              : t('setUpPin'),
          },
        ]}
      ></RightMenuHeader>

      {selected === 0 && <PersonalInfo />}
      {selected === 1 && <ChangePasswword />}
      {selected === 2 && <TayaPinModal />}
    </RightMenuLayout>
  );
};

export default Account;
