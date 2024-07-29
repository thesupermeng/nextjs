import { useTranslation } from 'next-i18next';

export const LoginContentUsername = ({ val, update, isError }) => {
  const { t } = useTranslation();

  return (
    <input
      className={`block rounded-lg mb-3.5 w-full h-11 p-3 outline-none ${
        isError ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
      }`}
      type='text'
      name='username'
      placeholder={t('username')}
      value={val}
      onChange={(e) => update(e.target.value)}
    />
  );
};
