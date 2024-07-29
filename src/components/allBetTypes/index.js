'use client';
import { RightBetCartWidth } from '@/app/page';
import { useCurrentMatchDetail } from '@/hook/useCurrentMatchDetail';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Market12 } from '../marketType/Market12';
import { Market1x2 } from '../marketType/Market1x2';
import { MarketCol3 } from '../marketType/MarketCol3';
import { MarketCorrectScore } from '../marketType/MarketCorrectScore';
import { MarketExactGoals } from '../marketType/MarketExactGoals';
import { MarketOverUnder } from '../marketType/MarketOverUnder';
import { MarketWinMargin } from '../marketType/MarketWinMargin';
import Category from '../marketTypeCategory';
import { NodataV2 } from '../noDataV2';
import { LoadingPage } from '../loading';

const AllBetTypes = ({ full = false, isLiveRoom = false, isMini = false }) => {
  const { data } = useCurrentMatchDetail();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMartketTypes, setShowMarketTypes] = useState([]);
  const videoPlayerProp = useSelector((s) => s.videoPlayer);
  const [wrapperCss, setWrapperCss] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (data) {
      setIsLoading(false);
      const showMks = selectedCategory
        ? data?.mg?.filter((mg1) => {
            return mg1.tps.includes(selectedCategory);
          })
        : data?.mg;
      setShowMarketTypes(showMks);
    }
  }, [data, selectedCategory]);
  useEffect(() => {
    if (videoPlayerProp.isFull) {
      setWrapperCss(`absolute right-0 top-0 bottom-0 ${RightBetCartWidth}`);
    } else {
      setWrapperCss(`flex flex-initial ${RightBetCartWidth}`);
    }
  }, [videoPlayerProp.isFull]);

  return (
    <div className={`flex flex-1 flex-col`}>
      {isLoading ? (
        <LoadingPage />
      ) : showMartketTypes?.length <= 0 || !showMartketTypes ? (
        <div className='py-10 flex justify-center h-[calc(100%_-_4rem)]'>
          <NodataV2 />
        </div>
      ) : (
        <>
          <div className={`${isMini && 'fixed top-16 bg-black  w-full z-10'}`}>
            <Category data={data} setCategory={setSelectedCategory} />
          </div>
          <div
            className={
              full
                ? ''
                : `${
                    isLiveRoom ? '' : 'flex-[1_0_0]'
                  } detect-scroll flex overflow-y-auto flex-col`
            }
          >
            {showMartketTypes?.map((marketData) => {
              const { mty, nm } = marketData;
              switch (mty) {
                case 1005:
                case 1009:
                case 1012:
                case 1089:
                case 1061:
                case 1043:
                case 1044:
                case 1107:
                case 1108:
                case 1169:
                case 3029:
                  return (
                    <Market1x2 key={nm} data={marketData} matchData={data} />
                  );
                case 1018:
                  return (
                    <MarketWinMargin
                      key={nm}
                      data={marketData}
                      matchData={data}
                    />
                  );
                case 1002: //让球胜平负
                case 1019:
                case 1031:
                case 1033: //半场/全场
                case 1042:
                case 1051:
                case 1055:
                case 1101:
                case 1102:
                case 1103:
                case 1104:
                case 1105:
                case 1106:
                case 1114:
                case 1115: //2 row 2 col 大/小2.5
                case 1170:
                case 1173:
                case 1186:
                case 3027:
                case 3030:
                case 3031:
                case 3034:
                case 3035:
                case 3037:
                case 3038:
                case 3039:
                case 3040:
                case 3041:
                case 3042:
                case 1125:
                case 3026:
                case 1054:
                case 1090:
                  return (
                    <MarketExactGoals
                      key={nm}
                      data={marketData}
                      matchData={data}
                    />
                  );
                case 1030:
                case 1032:
                case 1078:
                case 1079:
                case 3016:
                case 3028:
                  return (
                    <MarketCol3
                      key={nm}
                      data={marketData}
                      matchData={data}
                      rows={2}
                    />
                  );
                case 1099:
                case 1100:
                  return (
                    <MarketCorrectScore
                      key={nm}
                      data={marketData}
                      matchData={data}
                    />
                  );
                case 1000:
                case 1001:
                case 1006:
                case 1008:
                case 1011:
                case 1016:
                case 1017:
                case 1021:
                case 1022:
                case 1046:
                case 1082: //Soccer Odd/Even Home	足球主队单双
                case 1083: //Soccer Odd/Even Away	足球客队单双
                case 1116:
                case 1150:
                case 1151:
                case 1152:
                case 1153:
                case 1154:
                case 1155:
                case 1156:
                case 1157:
                case 1158:
                case 1159:
                case 3001:
                case 3002:
                case 3004:
                case 3005:
                case 3008:
                case 3014:
                case 3015:
                case 3020:
                case 3022:
                case 3023:
                case 3021:
                case 3032:
                case 7001:
                case 7003:
                  return (
                    <Market12 key={nm} data={marketData} matchData={data} />
                  );
                case 3003:
                case 3012:
                case 3013:
                case 7004:
                case 7005:
                case 1007:
                  return (
                    <MarketOverUnder
                      key={nm}
                      data={marketData}
                      matchData={data}
                    />
                  );
                case 1010:
                case 1015:
                case 1025:
                case 1026:
                case 1028:
                case 1034:
                case 1035:
                case 1036:
                case 1037:
                case 1038:
                case 1039:
                case 1040:
                case 1041:
                case 1048:
                case 1049:
                case 1050:
                case 1063:
                case 1072:
                case 1073:
                case 1074:
                case 1075: // need test
                case 1076: // need test
                case 1077: // need test
                case 1094:
                case 1097:
                case 1109:
                case 1110:
                case 1130:
                case 1131:
                case 1132:
                case 1133:
                case 1134:
                case 1135:
                case 1136:
                case 1137:
                case 1138:
                case 1139:
                case 1146:
                case 1147:
                case 1167:
                case 1168:
                case 1171:
                case 1172:
                case 1174:
                case 1175:
                case 3036:
                case 3017:
                case 3007:
                case 7002:
                case 1057:
                case 1058:
                case 1118:
                case 1091:
                case 1092:
                case 1093:
                case 1027:
                case 1060:
                case 1998:
                  return (
                    <MarketExactGoals
                      key={nm}
                      data={marketData}
                      matchData={data}
                      col={2}
                    />
                  );
                default:
                  //todo to remove before release
                  return <div key={nm}>unknown mty - {mty}</div>;
                //basketball remaining  3033 07 06 01
                //football remaining  47 54 57 58 60 65 66 70 80 86 87 88 90 98 1112 1113 1118 1119 1120  1121 ->1129 1140->1149 1151->1159 1160->1169 1170->1179 1180->1189
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default AllBetTypes;

/*
const M1076 = {
  mty: 1076,
  pe: 1001,
  mks: [
    {
      op: [
        {
          na: '',
          nm: 'Teixeira, Bruna Emilia',
          ty: 8,
          od: 3.66,
        },
      ],
      id: 4337150,
      ss: 1,
      au: 1,
    },
    {
      op: [
        {
          na: '',
          nm: 'Ruzicka',
          ty: 8,
          od: 5.5,
        },
      ],
      id: 4337151,
      ss: 1,
      au: 1,
    },
  ],
  tps: ['p', 'i', 'o'],
  nm: 'Player to score',
};
*/
