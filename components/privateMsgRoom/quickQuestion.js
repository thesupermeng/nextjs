import React from 'react';

export const QuickQuestion = ({ setInput }) => {
  return (
    <div className='flex flex-row overflow-x-auto gap-2 w-full px-3'>
      {ques?.map((info, index) => {
        return <Question key={info.id} setInput={setInput} info={info} />;
      })}
    </div>
  );
};

const Question = ({ setInput, info }) => {
  return (
    <button
      onClick={() => {
        setInput(info.text);
      }}
      className='px-5 py-1 inline-flex bg-[#FFFFFF14] rounded-full text-xs whitespace-nowrap'
    >
      {info.text}
    </button>
  );
};

const ques = [
  {
    id: 1,
    text: 'How to depost?',
  },
  {
    id: 2,
    text: 'How to bet?',
  },
  {
    id: 3,
    text: 'Any promotion?',
  },
];
