'use client'
import React, {Suspense, useEffect, useState} from 'react';
import H5Page from '@/app/payment/h5Page';
import WebPage from '@/app/payment/webPage';

export default function Page () {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  return (
    <>
      <div className='desktop w-screen' style={{paddingTop: '100px', minHeight: '80vh'}}>
        {!isMobile &&
          <Suspense fallback={<div/>}>
            <WebPage/>
          </Suspense>
        }
      </div>
      <div className="mobile w-screen h-full">
        {isMobile &&
          <Suspense fallback={<div/>}>
            <H5Page/>
          </Suspense>
        }
      </div>
    </>
  )
}
