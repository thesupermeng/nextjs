import { useEffect, useState } from 'react';
import { TeamLabel } from '../MarketContainer';
import { getTeamNames } from '../util/parseMatchData';

export const RowTeams = ({ matchData, left = '', middle = '', right = '' }) => {
  const [teams, setTeams] = useState(['', '']);
  useEffect(() => {
    setTeams(getTeamNames(matchData));
  }, [matchData]);
  return (
    <div className='flex flex-initial flex-row gap-2 items-center'>
      {left && <TeamLabel text={left} />}
      <TeamLabel text={teams[0]} />
      {middle && <TeamLabel text={middle} />}
      <TeamLabel text={teams[1]} />
      {right && <TeamLabel text={right} />}
    </div>
  );
};
