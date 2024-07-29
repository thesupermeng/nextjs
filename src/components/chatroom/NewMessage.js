import { useTranslation } from 'next-i18next';

export const NewMessage = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className='mb-3 z-30 bg-transparent flex flex-initial items-center justify-center h-8'
    >
      <div className='animate-pulse flex flex-initial py-1.5 px-3 rounded-[22px] bg-[#B9213E] text-white text-sm font-medium'>
        {t('newMessages')}
      </div>
    </div>
  );
};
