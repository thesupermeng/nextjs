import { CrossWhite } from '@/asset/icons';
import { hideRightBarContent } from '@/store/common';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';

const headers = [
  { id: 1, text: i18n.t('bets') },
  { id: 2, text: i18n.t('games') },
];

const OrderHistoryHeader = ({ selectedHeader, setSelectedHeader }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(hideRightBarContent('All'));
  };

  const handleHeaderClick = (id) => {
    setSelectedHeader(id);
  };

  return (
    <div className='flex justify-between bg-opacity-10 shadow-md'>
      <div className='flex gap-5'>
        {headers.map((header) => (
          <button key={header.id} onClick={() => handleHeaderClick(header.id)}>
            <div
              className={` text-base ${
                selectedHeader === header.id
                  ? 'text-tayaRed'
                  : 'text-opacity-50 text-white'
              } font-medium`}
            >
              {header.text}
            </div>
            {selectedHeader === header.id ? (
              <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
            ) : (
              <div className='h-[0.1875rem] mt-1'></div>
            )}
          </button>
        ))}
      </div>

      <button onClick={onCloseClick}>
        <Image
          className='w-9 h-9 opacity-20 hover:opacity-100'
          src={CrossWhite}
          alt='close'
        />
      </button>
    </div>
  );
};

export default OrderHistoryHeader;
