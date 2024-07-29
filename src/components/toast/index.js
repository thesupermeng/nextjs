import { setShowToast } from '@/store/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Toast() {
  const dispatch = useDispatch();
  const { toastMsg: message } = useSelector((s) => s.common);
  const [renderableMessage, setRenderableMessage] = useState('');

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => dispatch(setShowToast('')), 1000);
    setRenderableMessage(message);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`fixed top-0 z-[9999] flex items-center justify-center w-full h-full pointer-events-none text-white transition-opacity duration-300 ${
        message ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='text-white px-5 py-2 bg-black rounded-[35px] text-sm flex gap-3'>
        {renderableMessage}
      </div>
    </div>
  );
}
