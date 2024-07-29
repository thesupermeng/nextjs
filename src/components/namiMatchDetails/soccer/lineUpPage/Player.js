import Image from 'next/image';
import React from 'react';
import {
  AssistGoal,
  PenaltyGoal,
  RedCard,
  SubInV2,
  SubOutV2,
  YellowCard,
  YellowToRedCard,
  Goal,
  OwnGoal,
} from '../assets/assets';
import { isWeb } from '@/util/common';
import { BlueShirt, RedShirt } from '@/asset/icons';

const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export default function Player(props) {
  const { player, team } = props;
  const { incidents } = player;

  const assistComponent = (incidents, playerId) => {
    let totalAssist = incidents.filter((incident) => {
      if (
        incident?.type === 1 &&
        (incident?.assist1?.id === playerId ||
          incident?.assist2?.id === playerId)
      )
        return true;
    }).length;
    if (totalAssist > 0) {
      return (
        <div className='relative'>
          <Image src={AssistGoal} width={12} height={12} alt='assist'></Image>
          {totalAssist > 1 && (
            <div className='absolute -top-2 -left-2 w-[12px] h-[12px] bg-white rounded-full !text-[#141414] text-[10px]'>
              <p>{totalAssist}</p>
            </div>
          )}
        </div>
      );
    }
  };
  // 换人事件
  const subComponent = (incidents, playerId) => {
    return incidents.map((incident) => {
      if (incident.type === 9) {
        return (
          <div key={'subsitution' + playerId}>
            <Image
              width={12}
              height={12}
              alt='sub'
              src={incident.in_player.id === playerId ? SubInV2 : SubOutV2}
            ></Image>
          </div>
        );
      }
    });
  };

  // 进球事件
  const goalComponent = (incidents, type, playerId) => {
    let totalOwnGoal = incidents.filter((incident) => {
      if (incident.type === 17) return true;
    }).length;
    let totalPenatlyGoal = incidents.filter((incident) => {
      if (incident.type === 8) return true;
    }).length;
    let totalGoal = incidents.filter((incident) => {
      if (incident.type === 1 && incident.player.id === playerId) return true;
    }).length;
    // 17 - 乌龙球
    if (totalOwnGoal > 0 && type === 17) {
      return (
        <div className='relative'>
          <Image width={14} height={14} alt='ownGoal' src={OwnGoal}></Image>
          {totalOwnGoal > 1 && (
            <div className='absolute -right-2 -top-1 w-[12px] h-[12px] bg-white rounded-full !text-[#141414] text-[10px]'>
              <p>{totalOwnGoal}</p>
            </div>
          )}
        </div>
      );
    }
    // 8 - 点球
    if (totalPenatlyGoal > 0 && type === 8) {
      return (
        <div className='relative'>
          <Image
            src={PenaltyGoal}
            width={14}
            height={14}
            alt='penaltyGoal'
          ></Image>
          {totalPenatlyGoal > 1 && (
            <div className='absolute -right-2 -top-1 w-[12px] h-[12px] bg-white rounded-full !text-[#141414] text-[10px]'>
              <p>{totalPenatlyGoal}</p>
            </div>
          )}
        </div>
      );
    }
    // 1 - 进球
    if (totalGoal > 0 && type === 1) {
      return (
        <div className='relative'>
          <Image width={14} height={14} alt='goal' src={Goal}></Image>
          {totalGoal > 1 && (
            <div className='absolute -right-2 -top-1 w-[12px] h-[12px] bg-white rounded-full !text-[#141414] text-[10px] text-center'>
              <p>{totalGoal}</p>
            </div>
          )}
        </div>
      );
    }
  };

  // 卡片事件
  const cardComponent = (incidents) => {
    let cardType;

    incidents.map((incident) => {
      if (incident.type === 3 || incident.type === 4 || incident.type === 15) {
        cardType =
          incident.type === 3
            ? YellowCard
            : incident.type === 4
            ? RedCard
            : YellowToRedCard;
      }
    });
    if (cardType) {
      return (
        <div>
          <Image 
            width={`${isWeb() ? 17 : cardType === YellowToRedCard ? 12 : 15 }`} 
            height={`${isWeb() ? 17 : cardType === YellowToRedCard ? 12 : 15 }`} 
            alt='card' 
            src={cardType}
          />
        </div>
      );
    }
  };

  const topLeft = () => {
    return (
      <div className='absolute -top-1 -left-1'>
        {incidents && assistComponent(incidents, player?.id)}
      </div>
    );
  };

  const topRight = () => {
    return (
      <div className='absolute -top-1 -right-1'>
        {incidents && subComponent(incidents, player?.id)}
      </div>
    );
  };
  const bottomLeft = () => {
    return (
      <div className='absolute -left-1 -bottom-1'>
        <div>
          {incidents && goalComponent(incidents, 17)}
          {incidents && cardComponent(incidents)}
        </div>
      </div>
    );
  };
  const bottomRight = () => {
    return (
      <div className='absolute -bottom-1 -right-1'>
        <div>
          {incidents && goalComponent(incidents, 1, player.id)}
          {incidents && goalComponent(incidents, 8)}
        </div>
      </div>
    );
  };
  return (
    <div className='flex flex-col items-center text-[8px] leading-3'>
      {/* {player?.logo && ( */}
      <div className={`relative`}>
        <div
          className={`rounded-full flex justify-center overflow-hidden ${
            team === 'home' ? 'bg-[#5C0012]' : 'bg-[#013C6B]'
          } ${isWeb() ? 'h-[35px] w-[35px]' : 'h-[25px] w-[25px]'}`}
        >
          {player?.logo ? (
            <Image
              src={player?.logo}
              width={isWeb() ? 35 : 25}
              height={isWeb() ? 35 : 25}
              alt='player'
              className={`rounded-ful ${
                isWeb() ? 'h-[35px]' : 'h-[25px]'
              } object-contain`}
            />
          ) : (
            <Image
              src={team === 'home' ? RedShirt : BlueShirt}
              width={isWeb() ? 30 : 15}
              height={isWeb() ? 30 : 15}
              alt='player'
              className={`rounded-ful ${
                isWeb() ? 'h-[35px]' : 'h-[25px]'
              } object-contain`}
            />
          )}
        </div>
        {topLeft()}
        {topRight()}
        {bottomLeft()}
        {bottomRight()}
      </div>
      {/* )} */}
      <p>{player?.shirt_number}</p>
      <p className='w-[70px] truncate text-center'>
        {player?.name_en_short?.length > 0
          ? player?.name_en_short
          : player?.short_name_en?.length > 0
          ? player?.short_name_en
          : player?.name_en}
      </p>
      <div className='bg-tayaGrey rounded-[20px] px-3'>
        <p>{round(player?.rating, 1)}</p>
      </div>
    </div>
  );
}
