import { useTranslation } from 'next-i18next';

export const BtnContinue = ({ text, isDisabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={`rounded-md h-11 w-full tayagradient ${
        isDisabled ? 'opacity-50' : ''
      }`}
      disabled={isDisabled}
    >
      {text || t('continue_')}
    </button>
  );
};
