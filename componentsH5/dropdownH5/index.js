import React, { useState } from 'react';
import BottomSheet from '../bottomSheet';
import Image from 'next/image';
import { RedSelect, RedUnselect } from '@/asset/icons';

export const DropdownH5 = ({ placeholder, selectionList, selectedVal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selected, setSelected] = useState(null);

  let entries = Object.entries(selectionList);
  let list = entries.map(([key, val]) => {
    return { key: key, value: val };
  });

  const onSelect = (data) => {
    setSelected(data);
    selectedVal(data.key);
    setShowSelection(!showSelection);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <p
        onClick={() => setIsOpen(!isOpen)}
        className={`mb-5 flex w-full h-[2.625rem] bg-tayaGrey rounded-md px-3.5 py-3 outline-none justify-between ${
          selected ? 'text-white' : 'text-[#969696]'
        }`}
      >
        {selected ? selected?.value : placeholder}
      </p>
      <BottomSheet
        title={placeholder}
        isOpen={isOpen}
        toggleSheet={() => setIsOpen(!isOpen)}
      >
        <div className='flex flex-col mx-5 flex-1 gap-2'>
          {list?.map((data, index) => {
            return (
              <button
                className='flex justify-between'
                onClick={() => onSelect(data)}
                id={data.value}
                key={data.value + '' + data.key}
                value={data.value}
              >
                <label className='float-left'>{data.value}</label>
                <Image
                  src={selected?.value === data.value ? RedUnselect : RedSelect}
                  alt='red'
                  width={18}
                  height={18}
                />
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </div>
  );
};
