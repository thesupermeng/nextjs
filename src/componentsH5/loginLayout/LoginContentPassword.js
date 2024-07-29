import { PasswordEye, PasswordEye1 } from '@/asset/icons';
import Image from 'next/image';
import { useState } from 'react';
import i18n from 'i18next';

const PasswordType = ['password', 'text'];

export const LoginContentPassword = ({
  isError,
  placeholder = i18n.t('password'),
  val,
  update,
}) => {
  const [passwordTypeIdx, setPasswordTypeIdx] = useState(0);

  return (
    <div
      className={`relative flex flex-1 rounded-lg items-center ${
        isError ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
      } mb-3.5 w-full h-11`}
    >
      <input
        className={`w-full bg-transparent h-11 p-3 outline-none rounded-lg`}
        type={PasswordType[passwordTypeIdx]}
        name={`${val}`}
        placeholder={placeholder}
        value={val}
        onChange={(e) => update(e.target.value)}
      />
      <div
        className='absolute mt-auto mb-auto right-2.5  flex items-center  '
        onClick={() => {
          setPasswordTypeIdx((passwordTypeIdx + 1) % PasswordType.length);
        }}
      >
        <Image
          alt='eye'
          src={
            PasswordType[passwordTypeIdx] === 'password'
              ? PasswordEye
              : PasswordEye1
          }
        />
      </div>
    </div>
  );
};
