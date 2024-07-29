import { setFlvSupport } from '@/store/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useFlvSupport = () => {
  const dispatch = useDispatch();
  const isFlvSupported = useSelector((s) => s.common.isFlvSupported);
  useEffect(() => {
    if (isFlvSupported !== 0) {
      return;
    }
    const assignFlv = async (obj) => {
      const flvjs = await import('flv.js');
      window.flvjs = flvjs;
      console.log('flv', flvjs);
      if (dispatch) {
        const isSupported = flvjs.isSupported();
        dispatch(setFlvSupport(isSupported ? 1 : -1));
      }
    };
    assignFlv();
  }, [dispatch, isFlvSupported]);
};
