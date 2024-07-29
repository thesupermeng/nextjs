'use client';
import { backtoTopIcon, requestVideo as requestVideoIcon } from '@/asset/icons';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsScroll,
  setIsTop,
  setCurrentScrollPosition,
} from '@/store/scrollView';
import { RequestVideo } from '@/components/requestVideo';
import { usePathname } from 'next/navigation';

const getIsTop = (state) => state.isTop;
const getIsScroll = (state) => state.isScroll;

export const ScrollView = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const scrollableDivRef = useRef(null);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isRequestVideoOpen, setIsRequestVideoOpen] = useState(false); // State to handle request video dialog

  const isAtTop = useSelector(getIsTop);
  const isScrolling = useSelector(getIsScroll);

  const handleScroll = () => {
    // Clear the previous timer
    if (timerId != null) {
      clearTimeout(timerId);
      setTimerId(null);
    }

    // Set isScrolling to true
    if (!isScrolling.res) {
      dispatch(setIsScroll(true));
    }

    // Store the current scroll position
    const currentScrollPosition = scrollableDivRef.current.scrollTop;

    dispatch(setCurrentScrollPosition(currentScrollPosition));

    // Check if the scroll position has changed since the last event
    if (currentScrollPosition !== lastScrollPosition) {
      setLastScrollPosition(currentScrollPosition);
      // Start a new timer to check if scrolling has stopped after 200ms
      const id = setTimeout(() => {
        if (isScrolling.res) {
          dispatch(setIsScroll(false));
        }
      }, 200);
      setTimerId(id);
    }

    if (scrollableDivRef.current.scrollTop > 200) {
      if (!showScrollUpButton) {
        // prevent keep updating the state
        setShowScrollUpButton(true);
      }
    } else {
      if (showScrollUpButton) {
        setShowScrollUpButton(false);
      }
    }
  };

  useEffect(() => {
    if (isScrolling.res) {
      if (scrollableDivRef.current.scrollTop > 0) {
        if (isAtTop.res) {
          dispatch(setIsTop(false));
        }
      }
    } else {
      if (scrollableDivRef.current.scrollTop == 0) {
        if (!isAtTop.res) {
          dispatch(setIsTop(true));
        }
      }
    }
  }, [isScrolling]);

  const scrollToTop = () => {
    const scrollableDiv = scrollableDivRef.current;
    const scrollStep = -scrollableDiv.scrollTop / 20;
    const scrollInterval = setInterval(() => {
      if (scrollableDiv.scrollTop !== 0) {
        scrollableDiv.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const handleRequestVideoDialog = () => {
    setIsRequestVideoOpen(!isRequestVideoOpen);
  };

  return (
    <div
      className='relative w-full h-full flex flex-col overflow-y-auto overflow-x-hidden overscroll-none no-scrollbar scroll-pt-[6px]'
      style={{ alignItems: 'center' }}
      ref={scrollableDivRef}
      onScroll={handleScroll}
    >
      {/* Render the passed container */}
      {children}

      {/* {!pathname.startsWith('/vod/play/') && (
        <button
          className={`pointer-cursor fixed ${
            showScrollUpButton ? 'bottom-32' : 'bottom-16'
          } right-16 rounded-md z-30 bg-[#2c313ae6] desktop transition-all duration-300`}
          onClick={handleRequestVideoDialog}
        >
          <Image src={requestVideoIcon} alt='requestVideo' width={50} />
        </button>
      )} */}

      <button
        disabled={!showScrollUpButton}
        className={`pointer-cursor fixed bottom-16 right-16 rounded-md z-20 bg-[#2c313ae6] desktop transition-opacity duration-500 ${
          showScrollUpButton ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToTop}
      >
        <Image src={backtoTopIcon} alt='arrowUp' width={50} />
      </button>

      {/* <RequestVideo
          open={isRequestVideoOpen}
          handler={handleRequestVideoDialog}
        /> */}
    </div>
  );
};
