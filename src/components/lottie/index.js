'use client';
import React from 'react';
// import Lottie from 'lottie-react';
import dynamic from 'next/dynamic';

export const LottieAnimation = ({ src, tw, isLoop = true, ...props }) => {
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

  if (!src) return;
  return (
    <Lottie {...props} animationData={src} className={`${tw}`} loop={isLoop} />
  );
};
