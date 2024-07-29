import { IconSendChat, IconSendChatActive } from '@/asset/icons';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT } from '@/config/User/setting';
import { useSendChat } from '@/hook/user/useSendChat';
import useUser from '@/hook/user/useUser';
import { setProfileModal } from '@/store/common';
import { isWeb } from '@/util/common';
import { BlockUser } from './BlockUser';
import { ProfileModalType } from '../profileModal';
import { useTranslation } from 'next-i18next';
// import { useChat } from '@/hook/user/useChat';

export default function SendChat({ onFocus, onBlur }) {
  const [input, setInput] = useState('');
  const { isLogin } = useUser();
  const { sendChat } = useSendChat();
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const [showBlockAlert, setShowBlockAlert] = useState(false);
  const { t } = useTranslation();

  const sendMessage = useCallback(() => {
    if (!isLogin || input.length === 0) return;
    const trimedInput = input.trim();
    if (trimedInput.length > 0) {
      const res = sendChat(input.trim());
      if (res === 'block') {
        setShowBlockAlert(true);
        setTimeout(() => {
          setShowBlockAlert(false);
        }, 5000);
      }
      setInput('');
      // onBlur?.();
    }
  }, [sendChat, input]);

  return (
    <>
      <div
        className={`relative flex flex-row self-stretch items-center justify-between flex-initial gap-5 group ${
          isWeb() ? 'mb-3' : ''
        }`}
      >
        <input
          type='text'
          className='flex bg-tayaGrey rounded-[8px] py-3 px-2 flex-1 min-w-0 w-full'
          placeholder='Say something'
          maxLength={CHAT.MAX_CHAR}
          value={input}
          onFocus={() => {
            onFocus?.();
            setIsFocus(true);
          }}
          onBlur={() => {
            if (!input) {
              setIsFocus(false);
              onBlur?.();
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        {isWeb() || isFocus ? (
          <>
            <p className='text-opacity-50 text-white text-[15px] leading-normal'>
              {input.length}/{CHAT.MAX_CHAR}
            </p>
            <Image
              src={input.length > 0 ? IconSendChatActive : IconSendChat}
              alt='iconSendChat'
              width={37.5}
              height={37.5}
              className={input.length > 0 ? 'cursor-pointer' : ''}
              onClick={() => {
                setIsFocus(false);
                onBlur?.();
                input.length > 0 && sendMessage();
              }}
            />
          </>
        ) : null}

        {!isLogin && isWeb() && (
          <div className='absolute left-0 flex-1 group-hover:flex hidden w-full py-5 bg-[#020202] bottom-0 flex-col text-center justify-center text-[15px] items-center '>
            <div className='w-fit'>
              <p
                onClick={() => {
                  dispatch(setProfileModal(ProfileModalType.LoginModal));
                }}
                className='my-2 hover:bg-[#FFFFFF0D] cursor-pointer py-2 rounded-full'
              >
                {t('loginToChat')}
              </p>
              <p>{t('allMessagesThatYouSend')}</p>
            </div>
          </div>
        )}
        {showBlockAlert && <BlockUser />}
      </div>
    </>
  );
}
