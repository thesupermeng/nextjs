export const calculatePercent = (away, home) => {
  const newAway = parseInt(away);
  const newHome = parseInt(home);
  const total = newHome + newAway;
  const percent = (newHome / total) * 100;
  return percent;
};

export const SportsTypeFB = {
  Soccer: 1,
  Basketball: 3,
};
