import { isWeb } from '@/util/common';
import TransactionListItem from '../transactionListItem';
import { LoadingPage } from '@/components/loading';

const TransactionList = ({ list, loading }) => {
  if (loading) return <LoadingPage />;
  return (
    <div
      className={`${
        isWeb()
          ? 'overflow-auto no-scrollbar'
          : 'flex flex-col overflow-y-auto flex-[1_0_0]'
      }`}
    >
      {list.map((data, idx) => {
        return (
          <div key={idx + ' translist'}>
            <p>{data.date}</p>
            {/* {data.datalist?.map((data, idx) => { */}
            <TransactionListItem key={idx} data={data} />
            {/* })} */}
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
