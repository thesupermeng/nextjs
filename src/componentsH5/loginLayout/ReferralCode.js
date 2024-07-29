import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BtnContinue } from '@/componentsH5/loginLayout/BtnContinue';
import { Button } from '../button';

export const ReferralCode = ({ isError, onSubmit, setIsReferralErr }) => {
  const [referral, setReferral] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <div className='flex-1 flex flex-col rounded-3xl mt-10 '>
        <div className='text-[30px] font-bold'>{t('referralCode')}</div>
        <div className='text-[13px] font-normal mt-5 mb-5'>
          {t('pleaseEnterYourInvitersReferralCode')}
        </div>

        <input
          className={`block rounded-lg ${
            isError ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
          } mb-3.5 w-full h-11 p-3 outline-none`}
          type='text'
          name='referral'
          placeholder={`( ${t('optional')} )`}
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />

        {isError && (
          <p className='text-[0.8125rem] mb-2 text-tayaRed'>
            {t('yourReferralCodeIsInvalid')}
          </p>
        )}

        <BtnContinue
          onClick={() => {
            if (referral) onSubmit(referral);
            else setIsReferralErr(true);
          }}
        />
        <Button
          className='!p-0 bg-transparent'
          onClick={() => {
            onSubmit(referral);
          }}
          buttonColor='bg-transparent font-normal'
        >
          Skip
        </Button>
      </div>
    </>
  );
};
