import { CrossWhite } from '@/asset/icons';
import { hideRightBarContent } from '@/store/common';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';

const Button = ({ text, selected, onClick }) => (
  <button onClick={onClick}>
    <div
      className={`mr-2 text-base font-medium ${
        selected ? 'text-tayaRed' : 'text-white/[.5]'
      }`}
    >
      {text}
    </div>
    {selected ? (
      <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
    ) : (
      <div className='h-[0.1875rem] mt-1'></div>
    )}
  </button>
);

const AccountHeader = ({ selected, setSelected, user }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideRightBarContent('All'));
  };

  return (
    <div className='flex justify-between'>
      <div className='flex gap-3'>
        <Button
          text={t('personalInfo')}
          selected={selected === 0}
          onClick={() => setSelected(0)}
        />
        <Button
          text={t('changePassword')}
          selected={selected === 1}
          onClick={() => setSelected(1)}
        />
        <Button
          text={
            user?.has_set_secondary_pwd ? t('resetTayaPin') : t('setUpTayaPin')
          }
          selected={selected === 2}
          onClick={() => setSelected(2)}
        />
      </div>
      <button onClick={onClose}>
        <Image
          alt='close'
          className='w-9 h-9 opacity-20 hover:opacity-100'
          src={CrossWhite}
        />
      </button>
    </div>
  );
};

export default AccountHeader;
