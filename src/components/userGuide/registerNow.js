import { useEffect, useState } from 'react';

export const UserGuideRegisterNow = ({ reward, minAmount }) => {
  const [footerRect, setFooterRect] = useState({});
  useEffect(() => {
    let check = null;
    const getFooterRect = () => {
      try {
        const footerRect = document
          ?.getElementById('login-footer')
          ?.getClientRects()[0];

        setFooterRect(footerRect);
      } catch (e) {
        setFooterRect({});
      }
    };
    getFooterRect();
    check = setInterval(getFooterRect, 1000);
    window.addEventListener('resize', getFooterRect);

    return () => {
      window.removeEventListener('resize', getFooterRect);
      clearInterval(check);
    };
  }, []);
  // todo get proper value 5

  if (!footerRect?.top) return <></>;
  return (
    <div className='w-full flex flex-col items-center justify-center mt-2'>
      <div className='inline-flex flex-row gap-1.5 text-center'>
        <div>
          <div className='text-[#FCC511] text-17 font-bold'>Register now!</div>
          {'\n'}
          <div className='text-white text-15 font-semibold'>
            Deposit 5 USDT for an extra 5 USDT reward!
          </div>
        </div>
      </div>
    </div>
  );
};
