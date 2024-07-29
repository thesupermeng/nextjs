import { CaretDown } from '@/asset/icons';
import { DropdownH5 } from '@/componentsH5/dropdownH5';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { useState } from 'react';

const Dropdown = ({
  selectionList = {},
  placeholder = '',
  selectedVal,
  icon = null,
}) => {
  const [showSelection, setShowSelection] = useState(false);
  const [selected, setSelected] = useState({});

  let entries = Object.entries(selectionList);
  let list = entries.map(([key, val]) => {
    return { key: key, value: val };
  });

  const onSelect = (data) => {
    setSelected(data);
    selectedVal(data.key);
    setShowSelection(!showSelection);
  };

  if (!isWeb()) {
    return (
      <DropdownH5
        placeholder={placeholder}
        selectionList={selectionList}
        selectedVal={selectedVal}
      />
    );
  }

  return (
    <div className='relative'>
      <div
        className='mb-5 flex w-full h-[2.625rem] bg-tayaGrey rounded-md px-3.5 py-3 outline-none justify-between cursor-pointer'
        onClick={() => setShowSelection(!showSelection)}
      >
        {icon && (
          <Image
            className={`mr-3`}
            src={icon}
            width={20}
            height={20}
            alt='icon'
          ></Image>
        )}
        <input
          className={`w-11/12 bg-tayaGrey placeholder:text-errorRed pointer-events-none ${
            isWeb() ? 'text-[15px]' : 'text-[13px]'
          }`}
          placeholder={placeholder}
          type='text'
          value={selected?.value}
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
        <div className='top-10 absolute bg-tayaGrey w-full overflow-auto no-scrollbar z-10 max-h-[200px]'>
          {list.map((data, index) => {
            return (
              <button
                onClick={() => onSelect(data)}
                className='p-[12px] w-full bg-tayaGrey hover:bg-tayaRed/[.12]'
                id={data.value}
                key={data.value + '' + data.key}
                value={data.value}
              >
                <label className='float-left'>{data.value}</label>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
