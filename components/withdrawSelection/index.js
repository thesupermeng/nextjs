import { CaretDown, GCash } from '@/asset/icons';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Selection = ({
  selectionList,
  placeholder = '',
  selectedVal,
  selected,
}) => {
  const [showSelection, setShowSelection] = useState(false);

  const onSelect = (data) => {
    selectedVal(data);
    setShowSelection(!showSelection);
  };

  return (
    <div className='relative'>
      <div
        className='flex w-full h-[2.625rem] bg-tayaGrey rounded-md px-3.5 py-3 outline-none justify-between'
        onClick={() => setShowSelection(!showSelection)}
      >
        {selected?.icon_url && (
          <Image
            className={`mr-3 rounded-[4px]`}
            src={selected?.icon_url}
            width={20}
            height={20}
            alt='icon'
            onError={(e) => (e.target.src = GCash.src)}
          ></Image>
        )}
        <input
          className={`w-11/12 bg-tayaGrey placeholder:text-errorRed ${
            isWeb() ? 'text-[15px]' : 'text-[13px]'
          }`}
          placeholder={placeholder}
          type='text'
          value={selected ? selected?.name : ''}
          disabled
        ></input>
        <Image
          className={`${showSelection ? 'rotate-180' : ''}`}
          src={CaretDown}
          width={16}
          height={16}
          alt='arrow'
        ></Image>
      </div>
      {showSelection && (
        <div className='absolute bg-tayaGrey w-full overflow-auto no-scrollbar z-10'>
          {selectionList.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => onSelect(data)}
                className='flex gap-2 p-[12px] w-full bg-tayaGrey hover:bg-tayaRed/[.12]'
              >
                {data.icon_url && (
                  <Image
                    src={data.icon_url}
                    width={20}
                    height={20}
                    alt='icon_url'
                    onError={(e) => (e.target.src = GCash.src)}
                  />
                )}
                <label className='float-left'>{data.name}</label>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selection;
