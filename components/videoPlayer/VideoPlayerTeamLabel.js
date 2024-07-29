import Image from 'next/image';
import { useEffect, useState } from 'react';

const TeamIcon = ({ url }) => {
  if (url)
    return (
      <Image
        className='bg-white rounded-full'
        alt='team'
        src={url}
        width={26}
        height={26}
      />
    );
};
export default function VideoPlayerTeamLabel({ data }) {
  const [teams, setTeams] = useState({});
  useEffect(() => {
    setTeams({
      homtIcon: '',
      awayIcon: '',
      homeScore: 3,
      awayScore: 2,
    });
  }, [data]);
  // todo: get teaminfo
  return (
    <div className='absolute top-7 left-7 py-3 px-4 flex-initial bg-black/30 rounded-xl flex flex-row gap-2 backdrop-blur-[6px]'>
      <TeamIcon url={teams.homeIcon} />
      <div className='text-lg font-bold leading-6 text-white'>
        {teams.homeScore} - {teams.awayScore}
      </div>
      <TeamIcon url={teams.awayIcon} />
    </div>
  );
}
