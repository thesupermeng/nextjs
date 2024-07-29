import { toggleMute } from '@/store/videoPlayer';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Muted from './Muted.svg';
import Volume1 from './Volume1.svg';
import Volume2 from './Volume2.svg';

const RangeWidth = 7 * 16;
const RangeHeight = 8;

export default function Mute({ onClick }) {
  const dispatch = useDispatch();
  const muted = useSelector((s) => s.videoPlayer.muted);
  const tempMuted = useSelector((s) => s.videoPlayer.tempMuted);
  const [volume, setVolume] = useState(1);
  const setMute = (e, flag) => {
    e?.stopPropagation();
    dispatch(toggleMute(flag));
  };
  const updateVolume = (vol) => {
    const ele = document.getElementsByTagName('video');
    [...ele].forEach((e) => {
      e.volume = vol;
      dispatch(toggleMute(vol == 0));
    });
  };
  return (
    <div className='relative flex-initial group/mute'>
      <div
        className={
          'group/mute invisible group-hover/mute:visible absolute -bottom-1 -top-[8.63rem] -left-1 -right-1 ' +
          'bg-[#2B2B2B80] rounded-xl backdrop-blur-[2px] ' +
          'flex flex-initial items-center justify-start flex-col'
        }
      >
        <input
          type='range'
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={(event) => {
            event.stopPropagation();
            const newVol = event.target.valueAsNumber;
            setVolume(newVol);
            updateVolume(newVol);
          }}
          onClick={(event) => event.stopPropagation()}
          className='absolute -rotate-90 -translate-y-3 rounded-full outline-none opacity-0 appearance-none bottom-1/2'
          style={{ width: `${RangeWidth}px`, height: `${RangeHeight}px` }}
        />
        <div
          // this is whole grey scroll
          className='absolute bg-[#FFFFFF4D] pointer-events-none rounded-full outline-none -rotate-90 bottom-1/2 -translate-y-3'
          style={{
            width: `${RangeWidth}px`,
            height: `${RangeHeight}px`,
          }}
        >
          <div
            // this is white scroll
            className='absolute bg-white rounded-full outline-none pointer-events-none'
            style={{
              width: `${(RangeWidth - RangeHeight) * volume + RangeHeight}px`,
              height: `${RangeHeight}px`,
            }}
          />
        </div>
      </div>
      <Image
        src={muted || tempMuted ? Muted : volume > 0.5 ? Volume2 : Volume1}
        alt='volume'
        onClick={(e) => {
          setMute(e, !muted);
        }}
        className='cursor-pointer backdrop-blur-0'
      />
    </div>
  );
}
