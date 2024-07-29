import {redirect} from 'next/navigation';
import H5Page from '@/app/myprofile/h5Page';
import React from 'react';

export default function Page() {
  return (
    <div className="mobile w-screen p-4">
      <H5Page/>
    </div>
  )
}
