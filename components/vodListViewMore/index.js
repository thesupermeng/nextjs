'use client';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const VodListViewMore = ({ type, data }) => {
  let href;

  switch (type) {
    case 'category': {
      // localStorage.setItem('videoTypeId', data.type_id);
      // localStorage.setItem('videoClass', data.type_name);
      href = `/vod/show/by/time/class/${data.type_name}/id/${data.id}`;
      break;
    }
    case 'topic': {
      href = `/topic/detail/id/${data.id}`;
      break;
    }
    case 'xcategory': {
      href = `/xvod/${data.vod_source_name}/${data.type_name}`;
      break;
    }
    default:
      href = '#'; // Default href if type does not match any case
  }

  return (
    <Link href={href} className='flex items-center'>
      <span
        className='mr-1'
        style={{
          fontSize: '12px',
          fontWeight: '400',
          fontStyle: 'normal',
          fontFamily: 'PingFang SC',
        }}
      >
        更多
      </span>
      <FontAwesomeIcon
        style={{
          fontSize: '14px',
          fontWeight: '400',
          fontStyle: 'normal',
          fontFamily: 'PingFang SC',
        }}
        icon={faAngleRight}
      />
    </Link>
  );
};

export default VodListViewMore;
