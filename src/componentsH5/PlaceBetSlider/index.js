import Keyboard from '../keyboard';
import Image from 'next/image';
import { Button } from '../button';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, CreditCardIcon } from '@/asset/icons';
import { formatCredit } from '@/util/numbers';
import useUser from '@/hook/user/useUser';
import { useTranslation } from 'next-i18next';
import { Unit } from '@/config/User/setting';
import { setStreamGameBetAmt } from '@/store/streamGame';

export const PlaceBetSlider = ({
  isBetExpired = false,
  min = 0,
  max = 0,
  onClick = () => {},
  children,
}) => {
  const { user } = useUser();
  const balance = user?.sum?.balance;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const betAmt = useSelector((s) => s.streamGame.betAmt);

  const onClickAllIn = () => {
    //check if user is logged in if not fill input with max bet amt
    //else if bal is < max bet amt fill input with user's bal
    dispatch(setStreamGameBetAmt(balance > max ? max : balance));
  };
  return (
    <>
      <div className='px-2 flex-col flex flex-[1_0_0] overflow-y-auto'>
        {children}
        <Keyboard isQuickBet={true} onClickCustom={onClickAllIn} />
      </div>
      <div className='flex flex-col flex-initial px-4 pt-2 rounded-t-xl bg-tayaGrey text-[13px]'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Image src={CreditCardIcon} alt='wallet' width={17} />
            <p>{t('balance')}</p>
          </div>
          <div className='flex gap-2'>
            <p>({formatCredit(user?.sum?.balance)})</p>
            <Image src={ArrowRight} width={17} alt='arrow' />
          </div>
        </div>
      </div>

      <Button
        disabled={isBetExpired || betAmt < min || betAmt > max || !betAmt}
        onClick={onClick}
      >
        {isBetExpired
          ? `${t('selectionExpired')}`
          : `${t('placeBet')} - ${betAmt} ${Unit}`}
      </Button>
    </>
  );
};
