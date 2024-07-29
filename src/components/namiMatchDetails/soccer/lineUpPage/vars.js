const vars = {};

vars.footballMatchStatus = {
  0: 'footballAbnormalMatch',
  1: 'footballNotStarted',
  2: 'footballFirstHalf',
  3: 'footballHalftTime',
  4: 'footballSecondHalf',
  5: 'footballOverTime',
  6: 'footballOverTimeOld',
  7: 'footballPanaltyShootout',
  8: 'footballFullTime',
  9: 'footballPostponed',
  10: 'footballInterrupted',
  11: 'footballMatchAbandonment',
  12: 'footballCancel',
  13: 'footballTobeDetermined',
};

vars.basketballMatchStatus = {
  0: 'basketballAbnormalMatch',
  1: 'basketballNoStarted',
  2: 'basketballQ1',
  3: 'basketballQ1E',
  4: 'basketballQ2',
  5: 'basketballQ2E',
  6: 'basketballQ3',
  7: 'basketballQ3E',
  8: 'basketballQ4',
  9: 'basketballOvertime',
  10: 'basketballFullTime',
  11: 'basketballPostponed',
  12: 'basketballInterrupted',
  13: 'basketballMatchAbandonment',
  14: 'basketballCancel',
  15: 'basketballTobeDetermined',
};

vars.VolleyballMatchState = {
  ABNORMAL: 0,
  NS: 1,
  Q1: 432,
  Q2: 434,
  Q3: 436,
  Q4: 438,
  Q5: 440,
  END: 100,
  DLY: 14,
  PPD: 15,
  CAN: 16,
  INT: 17,
  ABN: 19,
  TBD: 99,
};
// volleyball
// 0:  比赛异常，建议隐藏处理
// 1:  未开赛
// 432:  第一局
// 434:  第二局
// 436:  第三局
// 438:  第四局
// 440:  第五局
// 100:  完场
// 14:  延期
// 15:  推迟
// 16:  取消
// 17:  中断
// 19:  腰斩
// 99:  待定
vars.volleyballMatchStatus = {
  0: 'volleyballState0',
  1: 'volleyballState1',
  432: 'volleyballState432',
  434: 'volleyballState434',
  436: 'volleyballState436',
  438: 'volleyballState438',
  440: 'volleyballState440',
  100: 'volleyballState100',
  14: 'volleyballState14',
  15: 'volleyballState15',
  16: 'volleyballState16',
  17: 'volleyballState17',
  19: 'volleyballState19',
  99: 'volleyballState99',
};
vars.footballMatchStats = {
  team_id: 'matchStatsTeamID',
  goals: 'matchStatsGoal',
  penalty: 'matchStatsPenalty',
  assists: 'matchStatsAssist',
  red_cards: 'matchStatsRedCard',
  yellow_cards: 'matchStatsYellowCard',
  shots: 'matchStatsShot',
  shots_on_target: 'matchStatsShotonTarget',
  dribble: 'matchStatsDribble',
  dribble_succ: 'matchStatsDibbleSucc',
  clearances: 'matchStatsClearances',
  blocked_shots: 'matchStatsBlockedShot',
  interceptions: 'matchStatsInterception',
  tackles: 'matchStatsTrackles',
  passes: 'matchStatsPasses',
  passes_accuracy: 'matchStatsPassesSucc',
  key_passes: 'matchStatsKeyPasses',
  crosses: 'matchStatsCrosses',
  crosses_accuracy: 'matchStatsCrossesSucc',
  long_balls: 'matchStatsLongPasses',
  long_balls_accuracy: 'matchStatsLongPassesSucc',
  duels: 'matchStatsDuels',
  duels_won: 'matchStatsDuelsSucc',
  fouls: 'matchStatsFoul',
  was_fouled: 'matchStatsBeViolated',
  goals_against: 'matchStatsLossBall',
  offsides: 'matchStatsOffside',
  yellow2red_cards: 'matchStatsYellowRed',
  corner_kicks: 'matchStatsCorner',
  ball_possession: 'matchStatsPossession',
  freekicks: 'matchStatsFreeKick',
  freekick_goals: 'matchStatsFreeKickGoal',
  hit_woodwork: 'matchStatsFrameBall',
  fastbreaks: 'matchStatsFastBreak',
  fastbreak_shots: 'matchStatsFastBreakShot',
  fastbreak_goals: 'matchStatsFastBreakGoal',
  poss_losts: 'matchStatsPossessionLost',
};

vars.footballPosition = {
  G: 'Goalkeeper',
  M: 'Midfielder',
  D: 'Defender',
  F: 'Forward',
};

vars.basketballPosition = {
  C: 'center',
  SF: 'smallForward',
  PF: 'powerForward',
  SG: 'shootingGuard',
  PG: 'pointGuard',
  F: 'forward',
  G: 'guard',
};

vars.matchStatus = {
  0: '未开赛',
  1: '进行中',
  '-1': '完赛',
  '-2': '取消/其他',
};

vars.eventReason = {
  1: 'eventRefereeGoalPassed',
  2: 'eventRefereeGoalNotPassed',
  3: 'eventRefereePenaltyPassed',
  4: 'eventRefereePenaltyNotPassed',
  5: 'eventRefereeRedCard',
  6: 'eventRefereePunishment',
  7: 'eventRefereeMisunderstanding',
  0: 'eventResultOther',
};

vars.eventResultType = {
  1: 'eventResultEffectiveGoal',
  2: 'eventResultInvalidGoal',
  3: 'eventResultEffectivePenalty',
  4: 'eventResultCancelPenalty',
  5: 'eventResultEffectiveRedCard',
  6: 'eventResultCancelRedCard',
  7: 'eventResultVarificationofCard',
  8: 'eventResultPunishmentChange',
  9: 'eventResultMaintainJudgment',
  10: 'eventResultPenaltyChange',
  0: 'eventResultOther',
};

vars.eventReasonType = {
  1: 'eventReasonFoul',
  2: 'eventReasonPersonalFoul',
  3: 'eventReasonInvading',
  4: 'eventReasonTacticalFoul',
  5: 'eventReasonOffensiveFoul',
  6: 'eventReasonNoBallFoul',
  7: 'eventReasonContinueFoul',
  8: 'eventReasonContinueInvading',
  9: 'eventReasonViolence',
  10: 'eventReasonDangerousPlay',
  11: 'eventReasonHandball',
  12: 'eventReasonSeriousFoul',
  13: 'eventReasonDeliberateFoul',
  14: 'eventReasonBlockFoul',
  15: 'eventReasonDelay',
  16: 'eventReasonWatchVar',
  17: 'eventReasonPanaltyCancel',
  18: 'eventReasonDebateFoul',
  19: 'eventReasonArgueJudgment',
  20: 'eventReasonArgueAttacking',
  21: 'eventReasonExcessivelyCelebrate',
  22: 'eventReasonNotInPlace',
  23: 'eventReasonFight',
  24: 'eventReasonAssistPenalty',
  25: 'eventReasonSubstitute',
  26: 'eventReasonBehaviorAfterMatch',
  27: 'eventReasonOtherEReason',
  28: 'eventReasonNotAllowedEnter',
  29: 'eventReasonEnter',
  30: 'eventReasonLeave',
  31: 'eventReasonNotSportMoralBehavior',
  32: 'eventReasonNotSubjectiveFoul',
  33: 'eventReasonImpersonate',
  34: 'eventReasonInterventionVAR',
  35: 'eventReasonEnterRefereeReviewArea',
  36: 'eventReasonSpit',
  37: 'eventReasonVirus',
  0: 'eventReasonOther',
};

vars.sportType = [
  // {key: -2, value: '已关注', name: 'sportType-(-2)'},
  { key: -1, value: '直播', name: 'sportType-(-1)' },
  { key: 0, value: '全部', name: 'sportType-(0)' },
  // {key: 1, value: '足球'},
  // {key: 2, value: '篮球'},
  // {key: 6, value: '其他'},
];

vars.feedbackSubject = {
  1: '产品建议',
  2: '数据错误',
  3: '其他',
};

vars.shareLocation = {
  newsDetail: 1,
  matchDetail: 2,
  // program: 3,
  program: 4,
};

export default vars;
