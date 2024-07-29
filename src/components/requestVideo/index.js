import { Dialog, DialogBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { RequestVideoDialog } from './requestVideoDialog';
import { isMobile } from 'react-device-detect';
import { RequestVideoBottomSheet } from './requestVideoBottomSheet';

export const RequestVideo = ({ open, handler }) => {
  return isMobile ? (
    <RequestVideoBottomSheet open={open} handler={handler} />
  ) : (
    <RequestVideoDialog open={open} handler={handler} />
  );
};
