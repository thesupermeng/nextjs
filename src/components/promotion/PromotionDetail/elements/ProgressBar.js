export const ProgressBar = ({ percent }) => {
  return (
    <div className='mb-2'>
      <div className='bg-[#393939] h-1.5 w-full rounded overflow-hidden'>
        <div
          className={`bg-tayaRed h-1.5 rounded common-transition`}
          style={{ width: `${percent || 0}%` }}
        />
      </div>
    </div>
  );
};
