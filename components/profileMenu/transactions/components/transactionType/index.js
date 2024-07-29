import React from 'react';
import { CalendarComp } from '@/components/calender';

function Option({ text, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-1 p-[10px] text-[14px] font-semibold justify-center text-center ${
        isSelected
          ? 'text-[#0E0F11] bg-white rounded-[6px]'
          : 'text-white opacity-50'
      }`}
    >
      {text}
    </div>
  );
}

function TransactionType({
  setSelectedDateRange,
  setSelectedType,
  selectedType,
}) {
  return (
    <>
      <div className='flex flex-initial flex-row rounded-[6px] bg-tayaGrey'>
        <Option
          text='All'
          isSelected={selectedType === 1}
          onClick={() => setSelectedType(1)}
        />
        <Option
          text='Deposit'
          isSelected={selectedType === 2}
          onClick={() => setSelectedType(2)}
        />
        <Option
          text='Withdrawal'
          isSelected={selectedType === 3}
          onClick={() => setSelectedType(3)}
        />
      </div>
      <CalendarComp setSelectedDateRange={setSelectedDateRange} />
    </>
  );
}

export default TransactionType;
