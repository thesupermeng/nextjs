import { BtnContinue } from '@/componentsH5/loginLayout/BtnContinue';
import { checkUsername } from '@/services/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const SetUserName = ({ onUsername }) => {
  const [username, setUsername] = useState('');
  const [isFormatValid, setIsFormatValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const regex = /^(?!.*-test)[a-z0-9]{6,12}$/;
    setIsFormatValid(regex.test(username));
    if (!regex.test(username) && username != '')
      setErrorMsg(t('useLowercaseAndNumbersIn612'));
    else {
      setErrorMsg('');
    }
  }, [username]);

  const onContClick = (event) => {
    checkUsername(username).then((data) => {
      if (data.code === 0) {
        onUsername(username);
      } else {
        setErrorMsg(data.msg);
      }
    });
  };

  //todo limit username length
  return (
    <>
      <div className='flex-1 flex flex-col rounded-3xl mt-10 '>
        <div className='text-[35px] font-bold'>{t('username')}</div>
        <div className='text-[15px] font-normal'>
          {t('pleaseEnterPreferredUsername')}
        </div>
        <input
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          className={`w-full h-11 rounded-lg px-3 my-4 ${
            isFormatValid || username === ''
              ? 'bg-tayaGrey'
              : 'bg-tayaRed/[.12]'
          } outline-none`}
          placeholder={t('egNick612Characters')}
        />
        {errorMsg && (
          <p className='text-[0.8125rem] mb-2 text-tayaRed'>{errorMsg}</p>
        )}
        <BtnContinue isDisabled={!isFormatValid} onClick={onContClick} />
      </div>
    </>
  );
};
