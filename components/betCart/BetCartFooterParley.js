import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStakes } from '@/store/betCart';
import BetCartInput from './BetCartInput';

export default function BetCartFooterParley() {
  const dispatch = useDispatch();
  const { options, jumpLine } = useSelector((s) => s.betCart);
  const activeParlay = useSelector((s) => s.common.activeParlay);
  const sosLength = jumpLine?.sos?.length || 0;

  useEffect(() => {
    jumpLine?.sos?.forEach((sos) => {
      dispatch(
        updateStakes({
          key: sos.sn,
          unitStake: '',
          sos: sos,
          total: '',
        })
      );
    });
  }, [options]);

  return (
    <div className='flex flex-initial flex-col bg-tayaGrey max-h-[130px] overflow-y-auto'>
      <div
        className={`flex-1 grid grid-flow-row gap-x-5 gap-y-3 text-white
        ${activeParlay || sosLength < 1 ? '' : 'mb-3'}
        ${activeParlay || sosLength < 2 ? 'grid-cols-1' : 'grid-cols-2'}`}
      >
        {jumpLine?.sos?.map((sos, idx) => {
          const id = `sos-${idx}`;
          const shouldHide = !!activeParlay && activeParlay !== id;

          return (
            <div
              className={`flex flex-row justify-between flex-1 overflow-hidden text-sm ${
                shouldHide ? 'hidden' : ''
              }`}
              key={id}
            >
              <div className='flex-initial items-center'>
                <div className='text-white text-xs'>
                  {sos?.sn}&times;1*{sos?.in}
                </div>
                <div className='text-white text-xs'>
                  @{sos?.sodd?.toFixed(2)}
                </div>
              </div>
              <BetCartInput sos={sos} id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
