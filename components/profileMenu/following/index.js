import { RightBetCartWidth } from '@/app/page';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import useFollowings from '@/hook/user/useFollowings';
import { useSelector } from 'react-redux';
import FollowingHeader from './components/followingHeader';
import FollowingList from './components/followingList';
import { NodataV2 } from '@/components/noDataV2';
import { isWeb } from '@/util/common';
import { WEBOnly } from '@/components/Fragments/EnvComponent';
import { useEffect, useRef, useState } from 'react';

const Following = () => {
  const { rightBarContent } = useSelector((s) => s.common);

  const { data } = useFollowings();
  const [followingList, setFollowingList] = useState(null);

  useEffect(() => {
    if (data && data.length > 0 && !followingList?.length > 0)
      setFollowingList(data);
  }, [data]);

  return (
    <div
      className={`${
        isWeb()
          ? ` fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
              rightBarContent[RightSidebarContantTypes.Following]
                ? RightBetCartWidth + ' p-5'
                : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
            }  common-transition`
          : ''
      } flex flex-col flex-1 gap-6 overflow-y-auto`}
    >
      <WEBOnly>
        <FollowingHeader />
      </WEBOnly>

      {followingList?.length > 0 ? (
        <FollowingList list={followingList} />
      ) : (
        <NodataV2 />
      )}
    </div>
  );
};

export default Following;
