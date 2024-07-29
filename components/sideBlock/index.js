import React from 'react';

export const SideBlock = ({ children, className = '', onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} text-sm rounded-xl flex px-5 py-3.5 bg-tayaGrey my-2 gap-2`}
    >
      {children}
    </div>
  );
};
