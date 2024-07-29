import React from 'react';

export const Spinner = () => {
  return (
    <div className='d-flex container py-6 justify-center justify-items-center '>
      <div className='row  '>
        <img
          alt='加载中'
          src='/img/loading-spinner.gif'
          style={{ width: 130, height: 'auto' }}
        />
      </div>
    </div>
  );
};
