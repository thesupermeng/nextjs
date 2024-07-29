import { SportFav } from './SportFav';

export const MatchStatus = ({ match }) => {
  switch (match.ms) {
    case 0:
    case 2:
    case 3:
    case 7:
    case 9:
      return null;
    case 1:
    case 4:
    case 6:
      // should show favourite
      return <SportFav id={match.id} sport_id={match.sid} />;
    case 5:
    case 8:
      return (
        <div className='py-[2px] px-1 bg-tayaRed rounded-sm text-xs font-medium'>
          {Math.floor((match?.mc?.s || 0) / 60)}'
        </div>
      );
    default:
      return null;
  }
};
// match_status

// CODE	DESC_EN	DESC_CN	REMARK
// 0	Ended	已结束
// 1	Postponed	推迟
// 2	Interrupted	中断
// 3	Cancelled	取消
// 4	Not Started	未开赛
// 5	Live	进行中
// 6	Delayed	推迟
// 7	Abandoned	废弃
// 8	Suspended	暂停
// 9	Coverage Lost	滚球不覆盖
