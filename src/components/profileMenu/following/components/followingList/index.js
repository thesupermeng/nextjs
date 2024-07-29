import FollowingListItem from '../followingListItem';
import { isWeb } from '@/util/common';

const FollowingList = ({ list=[] }) => {

  return (
    <div
      className={`overflow-auto no-scrollbar h-full ${
        isWeb() ? 'flex flex-col gap-3' : 'my-2'
      }`}
    >
      {list?.map((item, index) => {
        return <FollowingListItem key={`following-${index}`} item={item} />;
      })}
    </div>
  );

};

export default FollowingList;
