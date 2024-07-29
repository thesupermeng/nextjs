import React from 'react';

export const ScrollContentVertical = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col flex-[1_0_0] overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};
