import React, { useContext } from 'react';
import MatchDetailsData from '../../../contexts/MatchDetailsContext';
import { Line } from 'rc-progress';
import { calculatePercent } from '@/components/namiMatchDetails/util/util';
import i18n from 'i18next';

export default function SoccerStat() {
  const { matchUpdateData } = useContext(MatchDetailsData);
  const matchStats = matchUpdateData?.football_match_stats?.stats;

  let footballMatchStats = {
    team_id: i18n.t('team_id'),
    goals: i18n.t('goals'),
    penalty: i18n.t('penalty'),
    assists: i18n.t('assist'),
    red_cards: i18n.t('redCard'),
    yellow_cards: i18n.t('yellowCard'),
    shots: i18n.t('shots'),
    shots_on_target: i18n.t('shots_on_target'),
    dribble: i18n.t('dribble'),
    dribble_succ: i18n.t('dribble_succ'),
    clearances: i18n.t('clearances'),
    blocked_shots: i18n.t('blocked_shots'),
    interceptions: i18n.t('interceptions'),
    tackles: i18n.t('tackles'),
    passes: i18n.t('passes'),
    passes_accuracy: i18n.t('passes_accuracy'),
    key_passes: i18n.t('key_passes'),
    crosses: i18n.t('crosses'),
    crosses_accuracy: i18n.t('crosses_accuracy'),
    long_balls: i18n.t('long_balls'),
    long_balls_accuracy: i18n.t('long_balls_accuracy'),
    duels: i18n.t('duels'),
    duels_won: i18n.t('duels_won'),
    fouls: i18n.t('fouls'),
    was_fouled: i18n.t('was_fouled'),
    goals_against: i18n.t('goals_against'),
    offsides: i18n.t('offsides'),
    yellow2red_cards: i18n.t('secondYellowCards'),
    corner_kicks: i18n.t('cornerKick'),
    ball_possession: i18n.t('possession'),
    freekicks: i18n.t('freekicks'),
    freekick_goals: i18n.t('freekick_goals'),
    hit_woodwork: i18n.t('hit_woodwork'),
    fastbreaks: i18n.t('fastbreaks'),
    fastbreak_shots: i18n.t('fastbreak_shots'),
    fastbreak_goals: i18n.t('fastbreak_goals'),
    poss_losts: i18n.t('poss_losts'),
  };

  return (
    <div className='flex flex-col gap-3 p-4'>
      {matchStats &&
        matchStats.map((item, index) => {
          if (item.type !== 'team_id') {
            return (
              <div className='flex flex-col gap-2 text-sm' key={index}>
                <div className='flex justify-between'>
                  <p>{item.home}</p>
                  <p className='text-center capitalize text-[#D1D1D1]'>
                    {footballMatchStats[item.type]}
                  </p>
                  <p>{item.away}</p>
                </div>

                <div className='flex items-center gap-3'>
                  <Line
                    strokeWidth={3}
                    trailWidth={3}
                    percent={calculatePercent(item.away, item.home)}
                    strokeColor={`${
                      item.home === 0 ? '#27282D' : '#DE173E'
                    }`}
                    trailColor='#27282D'
                    className='transform -scale-x-100 h-2'
                  />

                  <Line
                    strokeWidth={3}
                    trailWidth={3}
                    percent={calculatePercent(item.home, item.away)}
                    strokeColor={`${
                      item.away === 0 ? '#27282D' : '#227CFF'
                    }`}
                    trailColor='#27282D'
                    className='h-2'
                  />
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
