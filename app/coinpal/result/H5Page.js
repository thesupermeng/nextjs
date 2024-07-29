import { RechargeResult } from '@/components/rechargeResult';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import React from 'react';

export const H5Page = ({ receivedParams }) => {

  return (
    <FullPageContent>
      <RechargeResult receivedParams={receivedParams} />
    </FullPageContent>
  );
};
