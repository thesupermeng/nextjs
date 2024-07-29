import { IconArrowWhite } from '@/asset/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const OutrightRow = ({ data }) => {
  const router = useRouter();
  const onClickMatch = (id) => {
    router.push(`Eastrich/${id}`);
  };
  return (
    <div className='flex flex-col flex-initial gap-2 py-2.5'>
      {data.map((row) => {
        return (
          <div
            key={row.id}
            onClick={() => {
              onClickMatch(row.id);
            }}
            className='flex flex-row items-center justify-between gap-1 rounded-xl bg-tayaGrey px-2.5 py-3.5'
          >
            {row.lg?.lurl ? (
              <Image
                alt='league icon'
                src={row.lg.lurl}
                width={24}
                height={24}
                className='w-6 h-6 object-contain'
              />
            ) : null}
            <div className='flex-1 font-semibold text-[15px]'>{row.lg.na}</div>
            <Image
              alt='arrow'
              src={IconArrowWhite}
              className='-rotate-90 mr-4'
            />
          </div>
        );
      })}
    </div>
  );
};

const sampleRow = {
  nsg: [],
  mg: [
    {
      mty: 1998,
      mks: [
        {
          op: [
            {
              nm: 'France',
              ty: 8,
              od: 5,
            },
          ],
          id: 21552228,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'England',
              ty: 8,
              od: 5.5,
            },
          ],
          id: 21552240,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Germany',
              ty: 8,
              od: 8,
            },
          ],
          id: 21552210,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Spain',
              ty: 8,
              od: 9,
            },
          ],
          id: 21552195,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Portugal',
              ty: 8,
              od: 10,
            },
          ],
          id: 21552227,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Netherlands',
              ty: 8,
              od: 15,
            },
          ],
          id: 21552196,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Italy',
              ty: 8,
              od: 16,
            },
          ],
          id: 21552226,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Belgium',
              ty: 8,
              od: 17,
            },
          ],
          id: 21552214,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Denmark',
              ty: 8,
              od: 26,
            },
          ],
          id: 21552199,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Croatia',
              ty: 8,
              od: 26,
            },
          ],
          id: 21552231,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Switzerland',
              ty: 8,
              od: 51,
            },
          ],
          id: 21552245,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Czech Republic',
              ty: 8,
              od: 71,
            },
          ],
          id: 21552246,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Austria',
              ty: 8,
              od: 71,
            },
          ],
          id: 21552217,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Turkey',
              ty: 8,
              od: 71,
            },
          ],
          id: 21552221,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Serbia',
              ty: 8,
              od: 71,
            },
          ],
          id: 21552208,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Ukraine',
              ty: 8,
              od: 81,
            },
          ],
          id: 21552238,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Poland',
              ty: 8,
              od: 81,
            },
          ],
          id: 21552224,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Sweden',
              ty: 8,
              od: 81,
            },
          ],
          id: 21552247,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Scotland',
              ty: 8,
              od: 101,
            },
          ],
          id: 21552202,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Norway',
              ty: 8,
              od: 101,
            },
          ],
          id: 21552220,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Hungary',
              ty: 8,
              od: 101,
            },
          ],
          id: 21552205,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Romania',
              ty: 8,
              od: 151,
            },
          ],
          id: 21552206,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Wales',
              ty: 8,
              od: 151,
            },
          ],
          id: 21552198,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Greece',
              ty: 8,
              od: 201,
            },
          ],
          id: 21552207,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Finland',
              ty: 8,
              od: 201,
            },
          ],
          id: 21552215,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Slovenia',
              ty: 8,
              od: 201,
            },
          ],
          id: 21552211,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Slovakia',
              ty: 8,
              od: 201,
            },
          ],
          id: 21552197,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Bosnia and Herzegovina',
              ty: 8,
              od: 201,
            },
          ],
          id: 21552222,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Iceland',
              ty: 8,
              od: 301,
            },
          ],
          id: 21552194,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Israel',
              ty: 8,
              od: 301,
            },
          ],
          id: 21552219,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Montenegro',
              ty: 8,
              od: 301,
            },
          ],
          id: 21552218,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'North Macedonia',
              ty: 8,
              od: 501,
            },
          ],
          id: 21552201,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Bulgaria',
              ty: 8,
              od: 1001,
            },
          ],
          id: 21552209,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Cyprus',
              ty: 8,
              od: 1001,
            },
          ],
          id: 21552229,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Northern Ireland',
              ty: 8,
              od: 1001,
            },
          ],
          id: 21552242,
          ss: 1,
          au: 0,
        },
        {
          op: [
            {
              nm: 'Ireland',
              ty: 8,
              od: 1001,
            },
          ],
          id: 21552244,
          ss: 1,
          au: 0,
        },
      ],
      nm: 'Winner',
    },
  ],
  tms: 36,
  tps: [],
  lg: {
    na: 'UEFA Euro',
    id: 11582,
    or: 1,
    lurl: 'https://static.fastbs55.com/data/62835a5cf36962cb6bf7edb43279be1e.png',
    sid: 1,
    rid: 309,
    rnm: 'Europe',
    hot: false,
    slid: 115820000,
  },
  ts: [],
  mc: {
    pe: 1001,
    r: false,
  },
  id: 623559,
  bt: 1720983600000,
  ms: 4,
  ne: 0,
  vs: {
    have: false,
  },
  sid: 1,
  smt: 0,
  ty: 1,
  ye: '2024',
  nm: 'UEFA Euro 2024',
  sb: {},
};
