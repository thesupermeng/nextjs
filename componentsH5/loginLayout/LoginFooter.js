import { ModalTerms } from '@/app/user/login/ModalTerms.js';
import { RadioBox0, RadioBoxRed } from '@/asset/icons';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BottomSlideSheet } from '../bottomSlideSheet.js';
import { TermsAndCondition } from '../bottomSlideSheet.js/TermsAndCondition.js';
import useGetConfig from '@/hook/user/useGetConfig.js';

export const LoginFooter = ({
  type,
  onClickType = null,
  onTermsCheck = null,
}) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showTermsModal, setIsShowTermsModal] = useState(false);
  const router = useRouter();
  const [termsTicked, setTermsTicked] = useState(false);
  const { config } = useGetConfig();
  const { t } = useTranslation();

  const Text1 = ({ text }) => {
    return <span className='text-[#96979B] text-sm font-normal'>{text}</span>;
  };

  const Link1 = ({ text, onClick = () => {} }) => {
    return (
      <span
        className='text-white text-sm font-normal cursor-pointer'
        onClick={onClick}
      >
        {text}
      </span>
    );
  };

  const onAgreeTerm = (e) => {
    setTermsTicked(e);
    setShowTerms(false);
    onTermsCheck?.(e);
  };

  return (
    <>
      <div id='login-footer' className='flex flex-initial flex-col gap-2.5 items-center justify-center mb-5'>
        {type === 'login' ? (
          <>
            <div>
              <Link1
                text={t('registerOrLogin')}
                onClick={() => {
                  onClickType ? onClickType() : router.replace('/user/signup');
                }}
              />
              <Text1 text={` ${t('withVerificationCode')}`} />
            </div>
            {/* <div>
              <Text1 text={`Don\`t have an account yet? `} />
              <Link1
                text='Register'
                onClick={() => {
                  onClickType ? onClickType() : router.replace('/user/signup');
                }}
              />
            </div> */}
          </>
        ) : (
          <div>
            <Text1 text={`${t('alreadyHaveAnAccount')} `} />
            <Link1
              text={t('login')}
              onClick={() => {
                onClickType ? onClickType() : router.replace('/user/login');
              }}
            />
          </div>
        )}
        <div
          className='whitespace-normal text-center mx-5 cursor-pointer'
          onClick={() => {
            isWeb() ? setIsShowTermsModal(true) : setShowTerms(true);
          }}
        >
          {config?.toggle?.['t&c'] === 'false' ? (
            <Image
              alt='tick'
              src={RadioBoxRed}
              className='inline w-[15px] h-[15px] mr-1.5'
            />
          ) : (
            <Image
              alt='tick'
              src={termsTicked ? RadioBoxRed : RadioBox0}
              className='inline w-[15px] h-[15px] mr-1.5'
            />
          )}
          <Text1 text={`${t('byLoggingInYouAgreeTo')} `} />
          <Link1 text={t('termsAndConditionsAndPrivacyPolicy')} />
        </div>
      </div>

      {showTerms && (
        <BottomSlideSheet setShowPopup={setShowTerms} withClose>
          <TermsAndCondition onAgree={onAgreeTerm} />
        </BottomSlideSheet>
      )}

      {showTermsModal && (
        <ModalTerms setShowModal={setIsShowTermsModal} onAgree={onAgreeTerm} />
      )}
    </>
  );
};
