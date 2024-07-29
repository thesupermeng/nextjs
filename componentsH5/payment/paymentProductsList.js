import React, { useEffect, useRef, useState } from 'react';
import style from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDraggable } from 'react-use-draggable-scroll';
import { isMobile } from 'react-device-detect';

export default function PaymentProductsList({
  className,
  productList,
  onProductSelect,
}) {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const listRef = useRef();
  const { events } = useDraggable(listRef, {
    applyRubberBandEffect: true,
    activeMouseButton: 'Left',
  });

  useEffect(() => {
    if (productList && productList.length > 0) {
      onProductSelect(productList[0]);
      setSelectedProduct(productList[0].product_id);
    }
  }, [productList]);

  const handleWheel = (e) => {
    const container = listRef.current;
    if (container) {
      // e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      className={`h-[164px] w-full ${isMobile? 'overflow-x-scroll': 'overflow-x-hidden'} no-scrollbar flex flex-nowrap flex-row gap-[16px] items-center ${className}`}
      ref={listRef}
      {...events}
    >
      {productList.map((product, index) => {
        return (
          <Product
            key={product.product_id}
            isSelected={selectedProduct === product.product_id}
            onProductSelect={() => {
              setSelectedProduct(product.product_id);
              onProductSelect(product);
            }}
            productInfo={product}
            isBest={index === 0}
          />
        );
      })}
    </div>
  );
}

function Product({ isBest, isSelected, productInfo, onProductSelect }) {
  return (
    <div
      className={`${
        isSelected ? 'h-[160px] border-2 border-[#D4AE7F]' : 'h-[150px]'
      } 
        ${style.product_card_animation}
         ${isMobile? 'w-[117px] rounded-[8px] overflow-hidden flex flex-col flex-none relative hover-effect': 'rounded-[8px] overflow-hidden flex flex-col flex-1 relative hover-effect'}
        `}
      onClick={onProductSelect}
    >
      <div className={'flex-1 w-full absolute'}>
        {/* overlay */}
        {isBest && (
          <div
            className={
              'flex w-fit items-center justify-center rounded-tl-[8px] rounded-br-[8px] bg-[#FA3E3E] px-[9px] py-[2px] top-0 left-0'
            }
          >
            <span className={'text-white text-[11px] font-semibold'}>
              最多人选择
            </span>
          </div>
        )}
        <div
          className={`absolute flex items-center justify-center top-[5px] right-[5px] z-10 ${
            isSelected ? 'block' : 'hidden'
          }`}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: '#D4AE7F', width: '20px', height: '20px' }}
          />
        </div>
      </div>
      <div
        className={`flex-1 w-full flex flex-col items-center justify-center gap-0.25 ${
          style.product_card_background_color
        } ${isSelected ? style.selected : ''}`}
      >
        <span className={'text-[16px] text-white font-semibold'}>
          {productInfo.product_name}
        </span>
        <span className={'text-[16px] text-[#F4DBBA] font-bold'}>
          {productInfo.currency.currency_symbol}
          {productInfo.product_price}
        </span>
        {productInfo.product_fake_price && //has fake price
          productInfo.product_fake_price > productInfo.product_price && ( // fake price more than real price
            <span className={'text-[14px] text-[#9C9C9C] font-medium'}>
              <s>
                {productInfo.currency.currency_symbol}
                {productInfo.product_fake_price}
              </s>
            </span>
          )}
      </div>
      {isSelected && (
        <div
          className={'h-[35px] bg-[#F9EBDB] flex items-center justify-center'}
        >
          <span className={'text-[14px] text-black font-semibold'}>
            {productInfo.product_desc}
          </span>
        </div>
      )}
      {!isSelected && (
        <div
          className={'h-[37px] bg-[#393939] flex items-center justify-center'}
        >
          <span className={'text-[14px] text-white font-semibold'}>
            {productInfo.product_desc}
          </span>
        </div>
      )}
    </div>
  );
}
