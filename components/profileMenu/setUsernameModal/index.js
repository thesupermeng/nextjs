import FullScreenModal from '@/components/FullScreenModal';
import { checkUsername } from '@/services/user';
import { setValidUsername } from '@/store/profile';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { ProfileMenuConstantType } from '..';

const SetUsernameModal = ({ modalNum, setModalNum }) => {
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [username, setUsername] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const { t } = useTranslation();
  const { validUsername } = useSelector((s) => s.profile);

  const dispatch = useDispatch();

  const onContClick = (event) => {
    checkUsername(validUsername).then((data) => {
      if (data.code === 0) {
        setModalNum(ProfileMenuConstantType.PasswordModal);
      }

      if (data.code === 40002) {
        setIsInvalid(true);
        setErrorMsg(data.msg);
      } else {
        setIsInvalid(false);
        setErrorMsg('');
      }
    });

    event.preventDefault();
  };

  //todo limit username length
  const usernameDebounce = (event) => {
    setUsername(event.target.value);
    setTimeout(() => {
      if (event.target.value.length > 2 && event.target.value.length < 11) {
        setUsernameAvailable(true);
        dispatch(setValidUsername(event.target.value));
      } else {
        setUsernameAvailable(false);
        dispatch(setValidUsername(''));
      }
    }, 1000);
  };

  useEffect(() => {
    const regex = /^(?!.*-test)[a-z0-9]{6,12}$/;
    setIsInvalid(!regex.test(username));
    if (!regex.test(username) && username != '')
      setErrorMsg(t('useLowercaseAndNumbersIn612'));
    else {
      setErrorMsg('');
    }
  }, [username]);

  return (
    <FullScreenModal>
      <div className='rounded-3xl bg-[#121212] flex-initial flex flex-col p-7'>
        <div className='text-xl  font-bold text-center'>{t('personalInfo')}</div>
        <div className='text-base  font-medium text-center'>{t('username')}</div>
        <div className='text-base  mt-5 mb-3'>
          {t('enterYourPreferUsername')}
        </div>
        <form>
          <input
            value={username}
            onChange={usernameDebounce}
            type='text'
            className={`w-full h-11 rounded-lg px-3 ${
              isInvalid ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
            } outline-none`}
            placeholder={t('egNick612Characters')}
          />
          {errorMsg && (
            <p className='text-[0.8125rem] mt-2 text-tayaRed flex'>
              {errorMsg}
            </p>
          )}
          {usernameAvailable && !isInvalid ? (
            <button
              onClick={onContClick}
              className='block mx-auto w-full mt-3 rounded-md h-11 tayagradient'
            >
              {t('continue_')}
            </button>
          ) : (
            <button
              className='block mx-auto w-full mt-3 rounded-md h-11 tayagradient opacity-50'
              disabled
            >
              {t('continue_')}
            </button>
          )}
        </form>
      </div>
    </FullScreenModal>
  );
};

export default SetUsernameModal;
