import { useTranslation } from 'next-i18next';
import { getCardContent } from '../utils/getCardContent';
import { RedeemButton } from './RedeemButton';

export const RedeemBtnStyle = {
  PENDING: 'Pending',
  ACTION: 'Action',
  USENOW: 'Use Now',
  DONE: 'Done',
};

export const BtnStyle = {
  [RedeemBtnStyle.PENDING]: {
    btnTw: 'bg-[#FCC51133] text-white text-base font-medium',
  },
  [RedeemBtnStyle.ACTION]: {
    btnTw: 'bg-[#fcc511] text-[#1A1B1E] text-base font-medium',
  },
  [RedeemBtnStyle.USENOW]: {
    btnTw: 'bg-[#fcc511] text-[#1A1B1E] text-base font-medium',
  },
  [RedeemBtnStyle.DONE]: {
    btnTw: 'bg-[#555555] text-white text-base font-medium',
  },
};

export const Card = ({
  promotion,
  status,
  currentTier,
  amountNeeded,
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const { preText, postText, btnText, btnType } = getCardContent(
    t,
    promotion,
    status,
    currentTier
  );
  return (
    <div className='flex-none flex flex-col gap-2 text-sm'>
      {preText ? <div className='text-sm'>{preText}</div> : null}
      {btnText ? <RedeemButton type={btnType} text={btnText} /> : null}
      {postText ? <div className='text-sm'>{postText}</div> : null}
    </div>
  );
};
