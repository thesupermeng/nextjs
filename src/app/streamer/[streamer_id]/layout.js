import Footer from '@/components/Footer';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col'>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
