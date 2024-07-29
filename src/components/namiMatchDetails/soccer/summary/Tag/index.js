import React, { useContext } from 'react';
import MatchDetailsData from '../../../contexts/MatchDetailsContext';
import {
  AssistGoal,
  CornerKickIcon,
  PenaltyGoal,
  PenaltyMissed,
  RedCard,
  ShotOffTarget,
  ShotOnTarget,
  SubInV2,
  SubOutV2,
  VideoVAR,
  YellowCard,
  YellowToRedCard,
  Goal,
  OwnGoal,
} from '../../assets/assets';
import Image from 'next/image';
import i18n from 'i18next';

export default function Tag() {
  const { matchUpdateData } = useContext(MatchDetailsData);

  const tags = [
    { name: i18n.t('goals'), icon: Goal },
    { name: i18n.t('shotsOnTarget'), icon: ShotOnTarget },
    { name: i18n.t('shotOffTarget'), icon: ShotOffTarget },
    { name: i18n.t('penalty'), icon: PenaltyGoal },
    { name: i18n.t('penaltyMissed'), icon: PenaltyMissed },
    { name: i18n.t('ownGoal'), icon: OwnGoal },
    { name: i18n.t('assist'), icon: AssistGoal },
    { name: i18n.t('yellowCard'), icon: YellowCard },
    { name: i18n.t('redCard'), icon: RedCard },
    { name: i18n.t('secondYellowCards'), icon: YellowToRedCard },
    { name: i18n.t('cornerKick'), icon: CornerKickIcon },
    { name: i18n.t('in'), icon: SubInV2 },
    { name: i18n.t('out'), icon: SubOutV2 },
    { name: i18n.t('var'), icon: VideoVAR },
  ];

  if (matchUpdateData?.football_match_live?.incidents)
    return (
      <div className='grid grid-cols-5 mt-10 mb-5'>
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className='flex flex-col items-center justify-center mt-5 text-xs text-center'
            >
              <span className='h-8'>
                <Image src={tag.icon} alt={tag.name} width={20} />
              </span>
              <p className='flex-grow'>{tag.name}</p>
            </div>
          );
        })}
      </div>
    );
}
