import { EastRichBetTicket } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const AddBetFlyingEffectDuration = 1000;

export const FlytoBetSlip = ({ onEnd, from }) => {
  const [fromRect, setFromRect] = useState({});
  const [toRect, setToRect] = useState({});
  const cart = document
    .getElementById('header-bet-slip')
    .querySelector('.cart');

  useEffect(() => {
    if (from) {
      setFromRect(from.getBoundingClientRect());
      setTimeout(() => {
        const toRect = document
          .getElementById('header-bet-slip')
          .getElementsByTagName('img')[0]
          .getBoundingClientRect();
        setToRect(toRect);
        setTimeout(() => {
          cart.classList.add('shake');
          setTimeout(() => {
            cart.classList.remove('shake');
          }, 500);
          onEnd();
        }, AddBetFlyingEffectDuration);
      }, 30);
    } else {
      setFromRect({});
    }
  }, [from]);
  return createPortal(
    <>
      {fromRect.x && (
        <Image
          src={EastRichBetTicket}
          alt='ticket'
          className={`fixed z-40`}
          style={{
            transition: `left ${AddBetFlyingEffectDuration}ms linear, top ${AddBetFlyingEffectDuration}ms cubic-bezier(0.2,1.05, 1, 1.1), width ${AddBetFlyingEffectDuration}ms linear, height ${AddBetFlyingEffectDuration}ms linear, transform ${AddBetFlyingEffectDuration}ms linear`,
            ...(toRect.x
              ? {
                  left: toRect.x + 'px',
                  top: toRect.y + 'px',
                  width: `10px`,
                  height: `10px`,
                  transform: `rotate(1080deg)`,
                }
              : {
                  left: fromRect.x + fromRect.width / 2 - 15 + 'px',
                  top: fromRect.y + fromRect.height / 2 - 10 + 'px',
                  width: '30px',
                  height: '20px',
                }),
          }}
        />
      )}
    </>,
    document.body
  );
};
