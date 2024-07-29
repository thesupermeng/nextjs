export const AuthorType = {
  Agent: 'agent',
  User: 'customer',
};

export const PrivateMsgType = {
  BetRecommendation: 1,
  Promotion: 2,
  Deposit: 3,
  Register: 4,
  Text: 5,
  Image: 6,
  Video: 7,
};

export const PrivateMsgButton = {
  [PrivateMsgType.Promotion]: 'learnMore',
  [PrivateMsgType.Deposit]: 'depositNow',
  [PrivateMsgType.Register]: 'registerNow',
  [PrivateMsgType.Video]: 'watchNow',
};
