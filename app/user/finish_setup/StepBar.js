export const StepBar = ({ current = 1, total = 2 }) => {
  return (
    <div className='relative flex flex-row w-full justify-between items-center'>
      <div className='absolute h-1 bg-[#2e2e2e] left-3.5 right-3.5'>
        <div
          className='absolute h-1 bg-tayaRed left-0'
          style={{
            width: `${Math.min(100, ((current - 0.5) / (total - 1)) * 100)}%`,
          }}
        />
      </div>
      {new Array(total).fill(1).map((_, idx) => {
        return (
          <div
            key={idx}
            style={{ transform: 'translateZ(1px)' }}
            className={`opacity-100 rounded-full text-center w-7 h-7 flex items-center justify-center ${
              idx >= current ? 'bg-[#2e2e2e]' : 'bg-tayaRed'
            }`}
          >
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};
