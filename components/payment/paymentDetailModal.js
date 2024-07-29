import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Button, Dialog, DialogBody, IconButton} from '@material-tailwind/react';
import useYingshiUser from '@/hook/yingshiUser/useYingshiUser';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {searchEmptyIcon} from '@/asset/icons';

export default function PaymentDetailModal({open, handler}) {
  const {userInfo} = useYingshiUser()
  const accumulatedDays = userInfo?.paid_vip_response.total_purchased_days ?? 0
  const history = userInfo?.paid_vip_response.history ?? []
  const amountPaid = userInfo?.paid_vip_response.total_purchased_amount ?? 0
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(history.length / itemsPerPage)

  useEffect(() => {
    setCurrentPage(0)
  }, [open])

  return (
    <Dialog open={open} handler={handler} className={'relative bg-[#121212] rounded-[28px] p-0 outline-none'}
            size={'sm'}
            dismiss={{
              outsidePress: false
            }}
    >
      <DialogBody className={'p-[38px] w-full h-full flex flex-col text-white items-center'}>
        <FontAwesomeIcon icon={faTimesCircle}
                         className={'absolute top-4 right-4 cursor-pointer w-[35px] h-[35px] text-[#FFFFFF33] hover-effect'}
                         onClick={handler}
        />
        <span className={'text-[28px] font-semibold'}>购买明细</span>
        <div className={'flex bg-[#1D2023] rounded-[20px] w-full px-[34px] py-[30px] mt-[28px]'}>
          <div className={'flex-1 flex flex-col'}>
            <span className={'text-[24px] font-semibold'}>{accumulatedDays}天</span>
            <span className={'text-[13px] text-[#9C9C9C]'}>累计VIP天数</span>
          </div>
          <div className={'flex-1 flex flex-col'}>
            <span className={'text-[24px] font-semibold'}>{amountPaid.toFixed(2)}</span>
            <span className={'text-[13px] text-[#9C9C9C]'}>购买总额（￥)</span>
          </div>
        </div>
        <div className={'flex flex-col bg-[#1D2023] rounded-[20px] w-full px-[18px] py-[6px] mt-[20px] h-[320px]'}>
          {history.length > 0 &&
            history
              .toSorted((a, b) => a.created_date + b.created_date)
              .slice(itemsPerPage * currentPage, (currentPage + 1) * itemsPerPage)
              .map((entry, idx) => {
                const status = entry.transaction_status === 1 ? `+${entry.num_days}天` : entry.transaction_status_string
              return <TransactionDetail key={idx} statusCode={entry.transaction_status} statusString={status} title={entry.product_name_2} date={formatDate(entry.created_date)} transactionNo={entry.transaction_no}/>
            })
          }

          {history.length === 0 &&
            <div className="flex-col items-center flex my-5">
              <Image
                className="mx-2"
                src={searchEmptyIcon}
                alt="empty"
                width={120}
              />
              <span className="text-sm font-semibold text-white">
                  暂无购买记录
                </span>
            </div>
          }

        </div>
        <Pagination totalPages={totalPages} onChange={(e) => {
          setCurrentPage(e - 1)
        }} className={'self-end'}/>
      </DialogBody>
    </Dialog>
  )
}


function TransactionDetail({title, date, transactionNo, statusString, statusCode}) {
  const statusColor = statusCode === 1 ? 'text-shayuBlue' : 'text-[#9C9C9C]'

  return (
    <div className={'flex justify-between py-[8px]'}>
      <div className={'flex flex-col'}>
        <span className={'text-[14px]'}>{title}</span>
        <span className={'text-[12px] text-[#9C9C9C]'}>{transactionNo}</span>
        <span className={'text-[12px] text-[#9C9C9C]'}>{date}</span>
      </div>
      <span className={`text-[16px] font-medium self-center ${statusColor}`}>{statusString}</span>
    </div>
  )
}


export function Pagination({ totalPages, onChange, className }) {
  const [active, setActive] = useState(1);

  const handlePageChange = (page) => {
    setActive(page);
    if (onChange) {
      onChange(page);
    }
  };

  const getItemProps = (index) => ({
    onClick: () => handlePageChange(index),
    className: `rounded p-0 font-bold ${
      active === index ? 'bg-yellow-500 text-white' : 'bg-transparent text-gray-500'
    }`,
    size: 'sm',
  });

  const next = () => {
    if (active === totalPages) return;
    handlePageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    handlePageChange(active - 1);
  };

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <IconButton key={i} {...getItemProps(i)}>
            {i}
          </IconButton>
        );
      }
    } else {
      if (active <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(
            <IconButton key={i} {...getItemProps(i)}>
              {i}
            </IconButton>
          );
        }
        pages.push(<span key="end-ellipsis" className="text-gray-500">...</span>);
        pages.push(
          <IconButton key={totalPages} {...getItemProps(totalPages)}>
            {totalPages}
          </IconButton>
        );
      } else if (active > totalPages - 4) {
        pages.push(
          <IconButton key={1} {...getItemProps(1)}>
            1
          </IconButton>
        );
        pages.push(<span key="start-ellipsis" className="text-gray-500">...</span>);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(
            <IconButton key={i} {...getItemProps(i)}>
              {i}
            </IconButton>
          );
        }
      } else {
        pages.push(
          <IconButton key={1} {...getItemProps(1)}>
            1
          </IconButton>
        );
        pages.push(<span key="start-ellipsis" className="text-gray-500">...</span>);
        for (let i = active - 1; i <= active + 1; i++) {
          pages.push(
            <IconButton key={i} {...getItemProps(i)}>
              {i}
            </IconButton>
          );
        }
        pages.push(<span key="end-ellipsis" className="text-gray-500">...</span>);
        pages.push(
          <IconButton key={totalPages} {...getItemProps(totalPages)}>
            {totalPages}
          </IconButton>
        );
      }
    }

    return pages;
  };

  // Do not render the pagination if there is only 1 page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={'flex items-center gap-2 p-1 ' + className}>
      <IconButton
        className="flex items-center gap-2 rounded text-gray-500 disabled:text-gray-700 bg-transparent"
        onClick={prev}
        disabled={active === 1}
        size={'sm'}
      >
        <FontAwesomeIcon icon={faChevronLeft} className={'h-4 w-4'}/>
      </IconButton>
      <div className="flex items-center gap-2">
        {renderPages()}
      </div>
      <IconButton
        className="flex items-center gap-2 rounded text-gray-500 disabled:text-gray-700 bg-transparent"
        onClick={next}
        disabled={active === totalPages}
        size={'sm'}
      >
        <FontAwesomeIcon icon={faChevronRight} className={'h-4 w-4'}/>
      </IconButton>
    </div>
  );
}

function formatDate(epochSeconds) {
  // Convert epoch seconds to milliseconds
  var date = new Date(epochSeconds * 1000);

  // Get the year, month, and day
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  // Return the formatted date
  return year + '-' + month + '-' + day;
}
