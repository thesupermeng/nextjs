import { IconArrowWhite } from '@/asset/icons';
import { setTayaSportsPaging } from '@/store/sportsTaya';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const TayaSportsPagingFooter = ({ customCss }) => {
  const dispatch = useDispatch();
  const [tokens, setTokens] = useState([]);
  const {
    paging: { total, pageTotal, current },
  } = useSelector((s) => s.sportsTaya);

  useEffect(() => {
    const middles = [
      current - 2,
      current - 1,
      current,
      current + 1,
      current + 2,
    ].filter((i) => i > 1 && i < pageTotal);
    middles[0] > 2 ? middles.unshift(1, '...') : middles.unshift(1);
    middles.slice(-1) < pageTotal - 1
      ? middles.push('...', pageTotal)
      : middles.push(pageTotal);

    setTokens(middles);
  }, [total, pageTotal, current]);

  const updatePaging = (pg) => {
    dispatch(setTayaSportsPaging({ total, pageTotal, current: pg }));
  };

  const Token = ({
    children,
    isCurrent = false,
    val,
    onClick,
    isDisable,
    isArrow = false,
  }) => {
    return (
      <div
        onClick={() => {
          !isDisable && onClick(val);
        }}
        className={`flex py-2 px-3 self-stretch items-center text-sm font-bold transition-colors ${
          isCurrent ? 'bg-[#DE173E52] rounded' : ''
        } ${isDisable ? 'cursor-not-allowed' : 'cursor-pointer'} ${
          isArrow && !isDisable ? 'hover:bg-gray-700/50 rounded-full' : ''
        }
        `}
      >
        {children}
      </div>
    );
  };

  return pageTotal && pageTotal > 1 ? (
    <div
      className={`flex justify-end flex-initial mt-6 py-1 px-2 bg-tayaGrey rounded-lg flex-row items-center text-white self-end gap-1 ${customCss}`}
    >
      <Token
        onClick={(p) => updatePaging(current - 1)}
        isDisable={current === 1}
        isArrow={true}
        val={1}
      >
        <Image
          alt='L'
          src={IconArrowWhite}
          className={`rotate-90 ${current === 1 ? 'opacity-30' : 'opacity-70'}`}
        />
      </Token>

      {tokens.map((tk, idx) => {
        return (
          <Token
            isCurrent={tk === current}
            onClick={(p) => updatePaging(p)}
            key={idx}
            isDisable={isNaN(tk)}
            val={tk}
          >
            {tk}
          </Token>
        );
      })}

      <Token
        onClick={(p) => updatePaging(current + 1)}
        isDisable={current === pageTotal}
        isArrow={true}
        val={pageTotal}
      >
        <Image
          alt='R'
          src={IconArrowWhite}
          className={`-rotate-90 ${
            current === pageTotal ? 'opacity-30' : 'opacity-70'
          }`}
        />
      </Token>
    </div>
  ) : null;
};
