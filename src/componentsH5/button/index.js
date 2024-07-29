import { isWeb } from '@/util/common';
import React from 'react';

export const Button = ({
  className = '',
  children,
  buttonColor = '',
  ...props
}) => {
  return (
    <div className={`${className} bg-tayaGrey flex px-5 cursor-pointer`}>
      <button
        {...props}
        className={`flex-1 ${
          isWeb() ? 'my-5' : 'my-2'
        } h-[2.875rem] bg-[#DE173E] font-bold rounded-[0.3125rem] disabled:opacity-50 ${buttonColor} transition-opacity duration-300 hover:opacity-80`}
      >
        {children}
      </button>
    </div>
  );
};
