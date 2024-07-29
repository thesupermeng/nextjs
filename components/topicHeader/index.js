'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';
import { usePathname, useRouter } from 'next/navigation';
const TopicHeader = ({ topicName }) => {
  // const history = useHistory();
  const router = useRouter();

  return (
    <div
    className='flex items-center justify-center cursor-pointer py-3.5'
    style={{
      backgroundColor: 'rgb(16, 18, 21)',
      position: 'sticky',
      top: 0,
      right: 0,
      width: '100%',
      zIndex: 999, // Ensure it's above other content
    }}
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <span
        className='flex'
        style={{
          position: 'absolute',
          left: '12px',
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </span>
      <span className='flex'>{topicName}</span>
    </div>
  );
};

export default TopicHeader;
