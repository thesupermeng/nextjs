const headers = [
  { id: 1, text: 'Bets' },
  { id: 2, text: 'Games' },
];

const OrderHistoryHeaderH5 = ({ selectedHeader, setSelectedHeader }) => {
  const handleHeaderClick = (id) => {
    setSelectedHeader(id);
  };

  return (
    <div className='flex justify-between'>
      <div className={`flex gap-2 flex-1 justify-around`}>
        {headers.map((header) => (
          <button
            key={header.id}
            onClick={() => handleHeaderClick(header.id)}
            className={`flex flex-col items-center`}
          >
            <div
              className={`text-base ${
                selectedHeader === header.id
                  ? 'text-white'
                  : 'text-opacity-50 text-white'
              } font-medium`}
            >
              {header.text}
            </div>

            <div
              className={`h-1 rounded-lg bg-[#DE173D] mt-1 w-7  group-hover:visible ${
                selectedHeader === header.id ? 'visible' : 'invisible'
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryHeaderH5;
