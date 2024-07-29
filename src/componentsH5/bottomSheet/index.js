import { CloseWithBorder } from '@/asset/icons';
import Image from 'next/image';

function BottomSheet({
  isOpen,
  toggleSheet,
  children,
  title = '',
  className = '',
  extra,
  showCloseButton = true,
}) {
  return (
    <div className='relative'>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 transition-opacity bg-[#16161653]'
          onClick={toggleSheet}
        />
      )}
      <div
        className={`flex flex-1 flex-col h-[300px] rounded-tl-[16px] rounded-tr-[16px] fixed inset-x-0 bottom-0 z-50 bg-[#000] p-4 transition-transform transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
      >
        <div className='w-10 h-1 rounded-[20px] bg-[#333] m-auto'></div>
        {showCloseButton && (
          <Image
            src={CloseWithBorder}
            alt='close'
            width={24}
            height={24}
            className='absolute right-5 top-3'
            onClick={toggleSheet}
          />
        )}
        <div className=' text-white flex flex-col flex-1'>
          <div className='w-[40px] h-[4px] rounded-[20px] mr-auto ml-auto'></div>
          <h2 className='my-2 text-lg font-bold text-center'>{title}</h2>
          <div className='flex flex-[1_0_0] overflow-y-auto flex-col'>
            {children}
          </div>
          {extra}
          <button onClick={toggleSheet}></button>
        </div>
      </div>
    </div>
  );
}
export default BottomSheet;
