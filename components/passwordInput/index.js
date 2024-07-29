import { PasswordEye, PasswordEye1 } from '@/asset/icons';
import Image from 'next/image';
import { useState } from 'react';

const PasswordInput = ({placeholder='Password', passValue, isValid=true}) => {

  const [showPass, setShowPass] = useState(false);
  const [keyedPass, setKeyedPass] = useState('');

  const passwordClick = () => {
    setShowPass(!showPass)
  }


  return <div className={`flex rounded-lg ${ isValid ? 'bg-tayaGrey' : 'bg-tayaRed/[.12] text-tayaRed' } bg-tayaGrey text-errorRed mt-3 h-11`}>
  <input
    type={showPass ? 'text' : 'password'}
    placeholder={placeholder}
    className={`bg-transparent w-11/12 h-full p-3 outline-none`}
    onChange={(e) => {passValue(e.target.value); setKeyedPass(e.target.value)}}
    value={keyedPass}
  />
  <div className='mt-auto mb-auto' onClick={passwordClick}>
    <Image src={showPass ? PasswordEye1 : PasswordEye} alt='img' />
  </div>
</div>
}

export default PasswordInput;