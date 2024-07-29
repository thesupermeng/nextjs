import React from 'react';

export const VerticalLine = ({ className = '' }) => {
  return (
    <div
      className={` h-[0.80px] border-t border-[#FFFFFF0F] mx-2 ${className}`}
    ></div>
  );
};
