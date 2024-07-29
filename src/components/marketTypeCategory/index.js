'use client';
import { IconArrowWhite } from '@/asset/icons';
import { FBMarketTags } from '@/config/FB/FB_Market_Tag';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBetSlipExpand } from '@/store/common';
import AllExpand from '@/components/Fragments/AllExpand';
import { isWeb } from '@/util/common';

const BgUnselected = 'bg-tayaGrey';
const BgSelected = 'bg-[#DE173E52]';
const IgnoreType = ['ps'];
const PaddingOffset = 20;
const CateBlock = ({ text, isSelected, onClick }) => {
  const className =
    `flex flex-initial ${
      isWeb() ? 'py-[0.625rem] px-[1.375rem]' : 'text-[13px] py-1 px-[0.6rem]'
    }  text-white rounded-md cursor-pointer w-fit place-content-center  whitespace-nowrap ` +
    (isSelected ? BgSelected : BgUnselected);
  return (
    <div
      onClick={() => {
        onClick(text);
      }}
      className={className}
    >
      {text}
    </div>
  );
};
const Move = ({ direction, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ width: `${PaddingOffset * 3}px` }}
      className={`select-none absolute top-0 bottom-0 opacity-1 flex flex-initial items-center self-stretch cursor-pointer ${
        direction === 'left'
          ? 'bg-gradient-to-r left-0 justify-start'
          : 'bg-gradient-to-l right-0 justify-end'
      } from-[#121212] to-[#09090900]`}
    >
      <Image
        alt='arrow'
        src={IconArrowWhite}
        style={{ width: `${PaddingOffset}px` }}
        className={`${
          direction === 'left' ? 'rotate-90' : '-rotate-90'
        } w-2 h-2`}
      />
    </div>
  );
};
const Category = ({ data = {}, setCategory }) => {
  const [focus, setFocus] = useState();
  const [offsetX, setOffsetX] = useState({ val: 0, left: false, right: true });
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const cateRef = useRef(null);
  const { betSlipExpand } = useSelector((s) => s.common);
  const { tms = 0, mTypes = {}, pe = [] } = data;
  useEffect(() => {
    setArr(countCategory(data));
  }, [data]);

  useEffect(() => {
    updateOffset(null, true);
  }, [
    containerRef.current?.getBoundingClientRect().width,
    cateRef.current?.getBoundingClientRect().width,
  ]);
  const onToggleAll = () => {
    dispatch(toggleBetSlipExpand());
  };
  const onClick = (data) => {
    setCategory?.(data);
    setFocus(data);
  };
  const updateOffset = (e, toLeft) => {
    e?.preventDefault();
    setOffsetX((offset) => {
      const newOffset =
        offset.val +
        (containerRef.current?.getBoundingClientRect().width / 2) *
          (toLeft ? 1 : -1);
      return {
        val: Math.min(
          // newOffset,
          Math.max(
            containerRef.current?.getBoundingClientRect().width -
              cateRef.current?.getBoundingClientRect().width,
            newOffset
          ),
          0
        ),
        left: newOffset < 0,
        right:
          offset.val >
          containerRef.current?.getBoundingClientRect().width -
            cateRef.current?.getBoundingClientRect().width,
      };
    });
  };
  const countCategory = (data = { mg: [] }) => {
    const categoryObj = {};
    data?.mg?.forEach(({ tps }) => {
      tps?.forEach((type) => {
        if (!IgnoreType.includes(type)) {
          categoryObj[type] = categoryObj[type] || 0;
          categoryObj[type] += 1;
        }
      });
    });
    const arr = Object.entries(categoryObj).sort((a, b) => b[1] - a[1]);
    return arr;
  };

  return (
    <div
      className={`flex flex-initial flex-row items-center ${
        isWeb() ? 'py-4' : 'py-1'
      }`}
    >
      <div
        className={`relative flex-1 overflow-hidden mr-3 ${
          isWeb() ? '' : 'mx-2'
        }`}
        ref={containerRef}
      >
        {/* below is test div to set height, not visible */}
        <div className='opacity-0'>
          <CateBlock text={`All`} isSelected={!focus} onClick={() => {}} />
        </div>
        {/* above is test div to set height, not visible */}

        <div
          ref={cateRef}
          style={{ left: offsetX.val }}
          className='transition-[left] absolute top-0 flex flex-row flex-initial flex-nowrap gap-3'
        >
          <CateBlock
            text={`All (${data?.mg?.length})`}
            isSelected={!focus}
            onClick={() => onClick('')}
          />
          {arr.map(([name, count]) => {
            return (
              <CateBlock
                key={name}
                text={`${FBMarketTags[name]} (${count})`}
                isSelected={focus === name}
                onClick={() => onClick(name)}
              />
            );
          })}
        </div>
        {offsetX.left && (
          <Move direction='left' onClick={(e) => updateOffset(e, true)} />
        )}
        {offsetX.right && (
          <Move direction='right' onClick={(e) => updateOffset(e, false)} />
        )}
      </div>
      <AllExpand isExpand={betSlipExpand} onClick={onToggleAll} />
    </div>
  );
  /*
  return (
    <div className='flex flex-row flex-1 w-full gap-2 my-4 border'>
      <div className='w-[90%] flex-1 flex'>
        <Swiper slidesPerView={'auto'} spaceBetween={4}>
          <SwiperSlide>
            <CateBlock
              text={`All (${tms})`}
              isSelected={!focus}
              onClick={() => onClick('')}
            />
          </SwiperSlide>

          {arr.map(([name, count]) => {
            return (
              <SwiperSlide key={name}>
                <CateBlock
                  key={name}
                  text={`${FBMarketTags[name]} (${count})`}
                  isSelected={focus === name}
                  onClick={() => onClick(name)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <AllExpand isExpand={betSlipExpand} onClick={onToggleAll} />
    </div>
  );
  */
};

export default Category;
