import Image from 'next/image';
import React from 'react';
import vars from './vars';
import {
  AssistGoal,
  InjuryV2,
  PenaltyGoal,
  RedCard,
  SubInV2,
  SubOutV2,
  YellowCard,
  YellowToRedCard,
  Goal,
  OwnGoal,
} from '../assets/assets';
import { BlueShirt, RedShirt } from '@/asset/icons';
import { isWeb } from '@/util/common';

export default function SubPlayerComponent({
  isInjury = false,
  data,
  isHome = true,
}) {
  let subInTime = 0;
  let subOutTime = 0;
  let goalCount = 0;
  let penaltyGoalCount = 0;
  let ownGoalCount = 0;
  let assistCount = 0;

  const checkSubIn = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.findIndex(
        (x) =>
          x.type == 9 && x.in_player != undefined && x.in_player?.id == data.id
      );

      if (item != undefined && item != -1) {
        subInTime = data.incidents[item].time;

        return true;
      } else {
        subInTime = 0;
        return false;
      }
    }
  };

  const checkSubOut = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.findIndex(
        (x) =>
          x.type == 9 &&
          x.out_player != undefined &&
          x.out_player?.id == data.id
      );
      if (item != undefined && item != -1) {
        subOutTime = data.incidents[item].time;

        return true;
      } else {
        subOutTime = 0;
        return false;
      }
    }
  };

  const checkYellowCard = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.findIndex(
        (x) => x.type == 3 && x.player != undefined && x.player?.id == data.id
      );
      if (item != undefined && item != -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkRedCard = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.findIndex(
        (x) => x.type == 4 && x.player != undefined && x.player?.id == data.id
      );
      if (item != undefined && item != -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkYellowToRedCard = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.findIndex(
        (x) => x.type == 15 && x.player != undefined && x.player?.id == data.id
      );
      if (item != undefined && item != -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkGoal = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.filter(
        (x) => x.type == 1 && x.player != undefined && x.player?.id == data.id
      );
      if (item.length > 0) {
        goalCount = item.length;
        return true;
      } else {
        goalCount = 0;
        return false;
      }
    }
  };

  const checkAssist = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.filter(
        (x) => x.type == 1 && x.assist1 != undefined && x.assist1?.id == data.id
      );
      if (item.length > 0) {
        assistCount = item.length;
        return true;
      } else {
        assistCount = 0;
        return false;
      }
    }
  };

  const checkPenaltyGoal = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.filter(
        (x) => x.type == 8 && x.player != undefined && x.player?.id == data.id
      );
      if (item.length > 0) {
        penaltyGoalCount = item.length;
        return true;
      } else {
        penaltyGoalCount = 0;
        return false;
      }
    }
  };

  const checkOwnGoal = () => {
    if (data.incidents != undefined && data.incidents.length > 0) {
      const item = data.incidents.filter(
        (x) => x.type == 17 && x.player != undefined && x.player?.id == data.id
      );
      if (item.length > 0) {
        ownGoalCount = item.length;
        return true;
      } else {
        ownGoalCount = 0;
        return false;
      }
    }
  };

  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        <div className='relative'>
          {data.logo != undefined && data.logo?.length > 0 ? (
            <div
              className={`${
                isHome ? 'bg-[#5C0012]' : 'bg-[#004781]'
              } rounded-full w-[35px] h-[35px] overflow-hidden flex justify-center`}
            >
              <Image
                src={data.logo}
                width={30}
                height={30}
                alt='logo'
                className='object-contain'
              />
            </div>
          ) : isInjury &&
            data.player?.icon != undefined &&
            data.player?.icon.length > 0 ? (
            <>
              <div
                className={`${
                  isHome ? 'bg-[#5C0012]' : 'bg-[#004781]'
                } rounded-full w-[35px] h-[35px] overflow-hidden flex justify-center`}
              >
                <Image
                  src={data.player?.icon}
                  width={30}
                  height={30}
                  alt='player'
                />
              </div>
              {isInjury && data?.player && (
                <Image src={InjuryV2} alt='injury' width={16} height={16} className='absolute top-6 -left-1'/>
              )}
            </>
          ) : isInjury && data?.player ? (
            <Image src={InjuryV2} alt='injury' width={30} height={30} />
          ) : (
            <div className='bg-[#27282D] rounded-[35px] w-[35px] h-[35px] items-center flex justify-center'>
              <Image
                src={isHome ? RedShirt : BlueShirt}
                width={20}
                height={20}
                alt='shirt'
              />
            </div>
          )}

          {checkYellowCard() && (
            <div className='-right-1 -bottom-1 h-[18px] w-[18px] absolute flex items-center justify-center'>
              <Image src={YellowCard} width={17} alt='yellow' />
            </div>
          )}
          {checkYellowToRedCard() && (
            <div className='-right-1 -bottom-1 bg-white rounded-full h-[16px] w-[16px] absolute flex items-center justify-center'>
              <Image
                source={YellowToRedCard}
                width={5.33}
                className='h-[8px]'
                alt='yellowToRed'
              />
            </div>
          )}
          {checkRedCard() && (
            <div className='-right-1 -bottom-1 bg-white rounded-full h-[16px] w-[16px] absolute flex items-center justify-center'>
              <Image src={RedCard} width={5.33} className='h-[8px]' alt='red' />
            </div>
          )}
        </div>
        <div>
          <p className={`${isWeb() ? 'text-sm' : 'text-xs'} line-clamp-1`}>
            {isInjury ? data.player?.name_en : data.name_en}
          </p>
          {!isInjury ? (
            <p className='text-xs font-[400] text-[#6F7076]'>
              {data?.shirt_number != undefined
                ? data?.position
                  ? `${data?.shirt_number} - ${
                      vars.footballPosition[data?.position]
                    }`
                  : `${data?.shirt_number}`
                : data?.position && vars.footballPosition[data?.position]}
            </p>
          ) : (
            data?.player && data?.player?.position && (
              <p className='text-xs font-[400] text-[#6F7076]'>
                {vars.footballPosition[data?.player?.position]}
              </p>
            )
          )}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 my-2'>
        {checkSubIn() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={SubInV2} width={14} alt='subin' />
            </div>
            <p className='text-[10px]'>{`${subInTime}'`}</p>
          </div>
        )}
        {checkSubOut() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={SubOutV2} width={14} alt='subout' />
            </div>
            <p className='text-[10px]'>{`${subOutTime}'`}</p>
          </div>
        )}
        {checkGoal() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={Goal} width={8} alt='goal' />
            </div>
            <p className='text-[10px]'>{` x${goalCount}`}</p>
          </div>
        )}
        {checkAssist() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={AssistGoal} width={8} alt='assistGoal' />
            </div>
            <p className='text-[10px]'>{` x${assistCount}`}</p>
          </div>
        )}
        {checkOwnGoal() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={OwnGoal} width={8} alt='ownGoal' />
            </div>
            <p className='text-[10px]'>{` x${ownGoalCount}`}</p>
          </div>
        )}
        {checkPenaltyGoal() && (
          <div className='flex gap-1'>
            <div className='img-base'>
              <Image src={PenaltyGoal} width={8} alt='penaly' height={8} />
            </div>
            <p className='text-[10px]'>{` x${penaltyGoalCount}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
