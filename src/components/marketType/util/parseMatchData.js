export const getTeamNames = (matchData = {}) => {
  try {
    return [matchData.ts[0].na, matchData.ts[1].na];
  } catch (e) {
    return ['', ''];
  }
};
export const getOptionName = (matchData = { mg: [] }, betId) => {
  let betName = '';
  try {
    matchData.mg.forEach(({ nm, mks }) => {
      const op = mks.find((mk) => mk.id === betId);
      if (op) {
        betName = nm || op?.[0].nm;
        throw 'done';
      }
    });
  } catch (e) {}
  return betName;
};

/*
const sampleMatchData = {
  nsg: [
    {
      pe: 1000,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1000,
      tyg: 7,
      sc: [0, 0],
    },
    {
      pe: 1000,
      tyg: 8,
      sc: [0, 0],
    },
    {
      pe: 1000,
      tyg: 6,
      sc: [8, 2],
    },
    {
      pe: 1001,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1001,
      tyg: 6,
      sc: [8, 2],
    },
    {
      pe: 1002,
      tyg: 5,
      sc: [0, 0],
    },
    {
      pe: 1002,
      tyg: 6,
      sc: [8, 0],
    },
    {
      pe: 1003,
      tyg: 5,
      sc: [1, 0],
    },
    {
      pe: 1007,
      tyg: 5,
      sc: [0, 0],
    },
    {
      pe: 1008,
      tyg: 5,
      sc: [0, 0],
    },
    {
      pe: 1009,
      tyg: 5,
      sc: [0, 0],
    },
    {
      pe: 1010,
      tyg: 5,
      sc: [1, 0],
    },
  ],
  mg: [
    {
      mty: 1000,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: '-1',
              ty: 1,
              od: 2,
              li: '-1',
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: '+1',
              ty: 2,
              od: 1.84,
              li: '+1',
            },
          ],
          id: 65690471,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '-1',
        },
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: '-0.5/1',
              ty: 1,
              od: 1.64,
              li: '-0.5/1',
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: '+0.5/1',
              ty: 2,
              od: 2.25,
              li: '+0.5/1',
            },
          ],
          id: 65690940,
          ss: 1,
          au: 1,
          mbl: 2,
          li: '-0.75',
        },
      ],
      tps: ['p', 'h'],
      nm: 'Handicap',
    },
    {
      mty: 1007,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 2.5',
              ty: 4,
              od: 1.99,
              li: '2.5',
            },
            {
              na: 'Under',
              nm: 'u 2.5',
              ty: 5,
              od: 1.83,
              li: '2.5',
            },
          ],
          id: 65690638,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '2.5',
        },
        {
          op: [
            {
              na: 'Over',
              nm: 'o 2/2.5',
              ty: 4,
              od: 1.68,
              li: '2/2.5',
            },
            {
              na: 'Under',
              nm: 'u 2/2.5',
              ty: 5,
              od: 2.16,
              li: '2/2.5',
            },
          ],
          id: 65691200,
          ss: 1,
          au: 1,
          mbl: 2,
          li: '2.25',
        },
      ],
      tps: ['p', 'h'],
      nm: 'Over/Under',
    },
    {
      mty: 1005,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: 'Home',
              ty: 1,
              od: 1.05,
            },
            {
              na: 'Draw',
              nm: 'Draw',
              ty: 3,
              od: 9.65,
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: 'Away',
              ty: 2,
              od: 20,
            },
          ],
          id: 64929470,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p'],
      nm: '1x2',
    },
    {
      mty: 1099,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: '1-0',
              nm: '1-0',
              ty: 110,
              od: 3.86,
            },
            {
              na: '2-0',
              nm: '2-0',
              ty: 120,
              od: 2.88,
            },
            {
              na: '2-1',
              nm: '2-1',
              ty: 121,
              od: 10.4,
            },
            {
              na: '3-0',
              nm: '3-0',
              ty: 130,
              od: 4.31,
            },
            {
              na: '3-1',
              nm: '3-1',
              ty: 131,
              od: 15.6,
            },
            {
              na: '3-2',
              nm: '3-2',
              ty: 132,
              od: 111,
            },
            {
              na: '4-0',
              nm: '4-0',
              ty: 140,
              od: 9.65,
            },
            {
              na: '4-1',
              nm: '4-1',
              ty: 141,
              od: 35,
            },
            {
              na: '4-2',
              nm: '4-2',
              ty: 142,
              od: 251,
            },
            {
              na: '4-3',
              nm: '4-3',
              ty: 143,
              od: 351,
            },
            {
              na: '0-0',
              nm: '0-0',
              ty: 100,
              od: -999,
            },
            {
              na: '1-1',
              nm: '1-1',
              ty: 111,
              od: 13.9,
            },
            {
              na: '2-2',
              nm: '2-2',
              ty: 122,
              od: 75,
            },
            {
              na: '3-3',
              nm: '3-3',
              ty: 133,
              od: 351,
            },
            {
              na: '4-4',
              nm: '4-4',
              ty: 144,
              od: 351,
            },
            {
              na: '0-1',
              nm: '0-1',
              ty: 101,
              od: -999,
            },
            {
              na: '0-2',
              nm: '0-2',
              ty: 102,
              od: -999,
            },
            {
              na: '1-2',
              nm: '1-2',
              ty: 112,
              od: 101,
            },
            {
              na: '0-3',
              nm: '0-3',
              ty: 103,
              od: -999,
            },
            {
              na: '1-3',
              nm: '1-3',
              ty: 113,
              od: 351,
            },
            {
              na: '2-3',
              nm: '2-3',
              ty: 123,
              od: 351,
            },
            {
              na: '0-4',
              nm: '0-4',
              ty: 104,
              od: -999,
            },
            {
              na: '1-4',
              nm: '1-4',
              ty: 114,
              od: 351,
            },
            {
              na: '2-4',
              nm: '2-4',
              ty: 124,
              od: 351,
            },
            {
              na: '3-4',
              nm: '3-4',
              ty: 134,
              od: 351,
            },
            {
              na: 'Others',
              nm: 'Others',
              ty: 244,
              od: 16.3,
            },
          ],
          id: 64929519,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p', 'cs'],
      nm: 'Correct Score',
    },
    {
      mty: 1102,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: '0',
              nm: '0',
              ty: 311,
              od: -999,
            },
            {
              na: '1',
              nm: '1',
              ty: 312,
              od: 4.01,
            },
            {
              na: '2',
              nm: '2',
              ty: 313,
              od: 2.48,
            },
            {
              na: '3',
              nm: '3',
              ty: 314,
              od: 3.08,
            },
            {
              na: '4',
              nm: '4',
              ty: 315,
              od: 5.7,
            },
            {
              na: '5',
              nm: '5',
              ty: 316,
              od: 14.2,
            },
            {
              na: '6+',
              nm: '6+',
              ty: 322,
              od: 32,
            },
          ],
          id: 64929524,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p', 's'],
      nm: 'Exact Goals',
    },
    {
      mty: 1006,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: 'Home',
              ty: 1,
              od: 1.01,
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: 'Away',
              ty: 2,
              od: 5.5,
            },
          ],
          id: 64929482,
          ss: 0,
          au: 1,
        },
      ],
      tps: ['p', 's'],
      nm: 'Draw No Bet',
    },
    {
      mty: 1101,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: '0-1',
              nm: '0-1',
              ty: 301,
              od: 4.01,
            },
            {
              na: '2-3',
              nm: '2-3',
              ty: 302,
              od: 1.37,
            },
            {
              na: '4-6',
              nm: '4-6',
              ty: 303,
              od: 3.73,
            },
            {
              na: '7+',
              nm: '7+',
              ty: 305,
              od: 81,
            },
          ],
          id: 64929523,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['s'],
      nm: 'Total Goals',
    },
    {
      mty: 1027,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Yes',
              nm: 'Yes',
              ty: 8,
              od: 3.22,
            },
            {
              na: 'No',
              nm: 'No',
              ty: 9,
              od: 1.21,
            },
          ],
          id: 64929504,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p', 's'],
      nm: 'Both Teams To Score',
    },
    {
      mty: 1021,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 2/2.5',
              ty: 4,
              od: 2,
              li: '2/2.5',
            },
            {
              na: 'Under',
              nm: 'u 2/2.5',
              ty: 5,
              od: 1.76,
              li: '2/2.5',
            },
          ],
          id: 65690622,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '2.25',
        },
      ],
      tps: ['p', 's', 'h'],
      nm: 'CF Tigres UANL (w) Over/Under',
    },
    {
      mty: 1022,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 0.5',
              ty: 4,
              od: 3.08,
              li: '0.5',
            },
            {
              na: 'Under',
              nm: 'u 0.5',
              ty: 5,
              od: 1.24,
              li: '0.5',
            },
          ],
          id: 65564237,
          ss: 1,
          au: 1,
          mbl: 1,
          li: '0.5',
        },
      ],
      tps: ['p', 's', 'h'],
      nm: 'Deportivo Toluca FC (w) Over/Under',
    },
    {
      mty: 1105,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: '0',
              nm: '0',
              ty: 311,
              od: -999,
            },
            {
              na: '1',
              nm: '1',
              ty: 312,
              od: 3.04,
            },
            {
              na: '2',
              nm: '2',
              ty: 313,
              od: 2.27,
            },
            {
              na: '3+',
              nm: '3+',
              ty: 321,
              od: 2.06,
            },
          ],
          id: 64929528,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['s'],
      nm: 'CF Tigres UANL (w)  Exact Goals',
    },
    {
      mty: 1106,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: '0',
              nm: '0',
              ty: 311,
              od: 1.05,
            },
            {
              na: '1',
              nm: '1',
              ty: 312,
              od: 3.81,
            },
            {
              na: '2',
              nm: '2',
              ty: 313,
              od: 27,
            },
            {
              na: '3+',
              nm: '3+',
              ty: 321,
              od: 51,
            },
          ],
          id: 64929531,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['s'],
      nm: 'Deportivo Toluca FC (w) Exact Goals',
    },
    {
      mty: 1008,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'Odd',
              nm: 'Odd',
              ty: 7,
              od: 1.83,
            },
            {
              na: 'Even',
              nm: 'Even',
              ty: 6,
              od: 1.99,
            },
          ],
          id: 64929486,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['p', 's'],
      nm: 'Total Goals Odd/Even',
    },
    {
      mty: 1089,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: 'Home',
              ty: 1,
              od: 1.2,
              li: '2',
            },
            {
              na: 'None',
              nm: 'None',
              ty: 16,
              od: 4.01,
              li: '2',
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: 'Away',
              ty: 2,
              od: 5.8,
              li: '2',
            },
          ],
          id: 65693539,
          ss: 1,
          au: 1,
          mbl: 0,
        },
      ],
      tps: ['s'],
      nm: '2th Goal',
    },
    {
      mty: 1018,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w) - Win By 1 Goal',
              nm: ' Home Win By 1 Goal',
              ty: 63,
              od: 2.86,
            },
            {
              na: 'CF Tigres UANL (w) - Win By 2 Goals',
              nm: ' Home Win By 2 Goals',
              ty: 64,
              od: 2.51,
            },
            {
              na: 'CF Tigres UANL (w) - Win By 3+ Goals',
              nm: ' Home Win By 3+ Goals',
              ty: 65,
              od: 2.45,
            },
            {
              na: 'Draw',
              nm: 'Draw',
              ty: 3,
              od: 12.1,
            },
            {
              na: 'Deportivo Toluca FC (w) - Win By 1 Goal',
              nm: ' Away Win By 1 Goal',
              ty: 66,
              od: 93,
            },
            {
              na: 'Deportivo Toluca FC (w) - Win By 2 Goals',
              nm: ' Away Win By 2 Goals',
              ty: 67,
              od: 101,
            },
            {
              na: 'Deportivo Toluca FC (w) - Win By 3+ Goals',
              nm: ' Away Win By 3+ Goals',
              ty: 68,
              od: 101,
            },
          ],
          id: 64929496,
          ss: 1,
          au: 1,
        },
      ],
      tps: ['s', 'i'],
      nm: 'Winning Margin',
    },
    {
      mty: 1012,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)/Draw',
              nm: 'Home/Draw',
              ty: 50,
              od: 1.01,
            },
            {
              na: 'Deportivo Toluca FC (w)/Draw',
              nm: 'Away/Draw',
              ty: 52,
              od: 3.17,
            },
            {
              na: 'CF Tigres UANL (w)/Deportivo Toluca FC (w)',
              nm: 'Home/Away',
              ty: 51,
              od: 1.22,
            },
          ],
          id: 64929491,
          ss: 0,
          au: 1,
        },
      ],
      tps: ['p'],
      nm: 'Double Chance',
    },
    {
      mty: 1030,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)&Over',
              nm: 'Home&Over 1.5',
              ty: 17,
              od: 1.1,
              li: '1.5',
            },
            {
              na: 'CF Tigres UANL (w)&Under',
              nm: 'Home&Under 1.5',
              ty: 18,
              od: 4.01,
              li: '1.5',
            },
            {
              na: 'Draw&Over',
              nm: 'Draw&Over 1.5',
              ty: 21,
              od: 12.1,
              li: '1.5',
            },
            {
              na: 'Draw&Under',
              nm: 'Draw&Under 1.5',
              ty: 22,
              od: -999,
              li: '1.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Over',
              nm: 'Away&Over 1.5',
              ty: 19,
              od: 81,
              li: '1.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Under',
              nm: 'Away&Under 1.5',
              ty: 20,
              od: -999,
              li: '1.5',
            },
          ],
          id: 65564239,
          ss: 1,
          au: 0,
          mbl: 0,
          li: '1.5',
        },
      ],
      tps: ['p', 'h'],
      nm: '1x2 & Over/Under1.5',
    },
    {
      mty: 1030,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)&Over',
              nm: 'Home&Over 2.5',
              ty: 17,
              od: 1.74,
              li: '2.5',
            },
            {
              na: 'CF Tigres UANL (w)&Under',
              nm: 'Home&Under 2.5',
              ty: 18,
              od: 1.71,
              li: '2.5',
            },
            {
              na: 'Draw&Over',
              nm: 'Draw&Over 2.5',
              ty: 21,
              od: 74,
              li: '2.5',
            },
            {
              na: 'Draw&Under',
              nm: 'Draw&Under 2.5',
              ty: 22,
              od: 14.5,
              li: '2.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Over',
              nm: 'Away&Over 2.5',
              ty: 19,
              od: 81,
              li: '2.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Under',
              nm: 'Away&Under 2.5',
              ty: 20,
              od: -999,
              li: '2.5',
            },
          ],
          id: 65564240,
          ss: 1,
          au: 0,
          mbl: 0,
          li: '2.5',
        },
      ],
      tps: ['p', 'h'],
      nm: '1x2 & Over/Under2.5',
    },
    {
      mty: 1030,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)&Over',
              nm: 'Home&Over 3.5',
              ty: 17,
              od: 3.85,
              li: '3.5',
            },
            {
              na: 'CF Tigres UANL (w)&Under',
              nm: 'Home&Under 3.5',
              ty: 18,
              od: 1.11,
              li: '3.5',
            },
            {
              na: 'Draw&Over',
              nm: 'Draw&Over 3.5',
              ty: 21,
              od: 74,
              li: '3.5',
            },
            {
              na: 'Draw&Under',
              nm: 'Draw&Under 3.5',
              ty: 22,
              od: 14.5,
              li: '3.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Over',
              nm: 'Away&Over 3.5',
              ty: 19,
              od: 81,
              li: '3.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Under',
              nm: 'Away&Under 3.5',
              ty: 20,
              od: 81,
              li: '3.5',
            },
          ],
          id: 65564241,
          ss: 1,
          au: 0,
          mbl: 0,
          li: '3.5',
        },
      ],
      tps: ['p', 'h'],
      nm: '1x2 & Over/Under3.5',
    },
    {
      mty: 1030,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)&Over',
              nm: 'Home&Over 4.5',
              ty: 17,
              od: 10.1,
              li: '4.5',
            },
            {
              na: 'CF Tigres UANL (w)&Under',
              nm: 'Home&Under 4.5',
              ty: 18,
              od: -999,
              li: '4.5',
            },
            {
              na: 'Draw&Over',
              nm: 'Draw&Over 4.5',
              ty: 21,
              od: 81,
              li: '4.5',
            },
            {
              na: 'Draw&Under',
              nm: 'Draw&Under 4.5',
              ty: 22,
              od: 12.2,
              li: '4.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Over',
              nm: 'Away&Over 4.5',
              ty: 19,
              od: 81,
              li: '4.5',
            },
            {
              na: 'Deportivo Toluca FC (w)&Under',
              nm: 'Away&Under 4.5',
              ty: 20,
              od: 81,
              li: '4.5',
            },
          ],
          id: 65564242,
          ss: 1,
          au: 0,
          mbl: 0,
          li: '4.5',
        },
      ],
      tps: ['p', 'h'],
      nm: '1x2 & Over/Under4.5',
    },
    {
      mty: 1032,
      pe: 1001,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)&Yes',
              nm: 'Home&Yes',
              ty: 23,
              od: 4.81,
            },
            {
              na: 'CF Tigres UANL (w)&No',
              nm: 'Home&No',
              ty: 24,
              od: 1.05,
            },
            {
              na: 'Draw&Yes',
              nm: 'Draw&Yes',
              ty: 27,
              od: 12.1,
            },
            {
              na: 'Draw&No',
              nm: 'Draw&No',
              ty: 28,
              od: -999,
            },
            {
              na: 'Deportivo Toluca FC (w)&Yes',
              nm: 'Away&Yes',
              ty: 25,
              od: 81,
            },
            {
              na: 'Deportivo Toluca FC (w)&No',
              nm: 'Away&No',
              ty: 26,
              od: -999,
            },
          ],
          id: 64929509,
          ss: 1,
          au: 0,
        },
      ],
      tps: ['p', 's'],
      nm: '1x2 & Both Team To Score',
    },
    {
      mty: 1000,
      pe: 1010,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: '0',
              ty: 1,
              od: 1.05,
              li: '0',
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: '0',
              ty: 2,
              od: 3.85,
              li: '0',
            },
          ],
          id: 65693817,
          ss: 0,
          au: 1,
          mbl: 1,
          li: '0',
        },
      ],
      tps: ['p', 't', 'h'],
      nm: 'Handicap-Start of 2nd Half-59:59Min',
    },
    {
      mty: 1007,
      pe: 1010,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 1.5',
              ty: 4,
              od: 5.3,
              li: '1.5',
            },
            {
              na: 'Under',
              nm: 'u 1.5',
              ty: 5,
              od: -999,
              li: '1.5',
            },
          ],
          id: 65693541,
          ss: 0,
          au: 1,
          mbl: 1,
          li: '1.5',
        },
      ],
      tps: ['p', 't', 'h'],
      nm: 'Over/Under-Start of 2nd Half-59:59Min',
    },
    {
      mty: 1005,
      pe: 1010,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: 'Home',
              ty: 1,
              od: 3.2,
            },
            {
              na: 'Draw',
              nm: 'Draw',
              ty: 3,
              od: 1.27,
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: 'Away',
              ty: 2,
              od: 18.6,
            },
          ],
          id: 64929477,
          ss: 0,
          au: 1,
        },
      ],
      tps: ['p', 't'],
      nm: '1x2-Start of 2nd Half-59:59Min',
    },
    {
      mty: 1000,
      pe: 1011,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: '-0.5',
              ty: 1,
              od: 2.26,
              li: '-0.5',
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: '+0.5',
              ty: 2,
              od: 1.49,
              li: '+0.5',
            },
          ],
          id: 65692265,
          ss: 0,
          au: 1,
          mbl: 1,
          li: '-0.5',
        },
      ],
      tps: ['p', 't', 'h'],
      nm: 'Handicap-60:00-74:59Min',
    },
    {
      mty: 1007,
      pe: 1011,
      mks: [
        {
          op: [
            {
              na: 'Over',
              nm: 'o 0.5',
              ty: 4,
              od: 1.81,
              li: '0.5',
            },
            {
              na: 'Under',
              nm: 'u 0.5',
              ty: 5,
              od: 1.89,
              li: '0.5',
            },
          ],
          id: 65692264,
          ss: 0,
          au: 1,
          mbl: 1,
          li: '0.5',
        },
      ],
      tps: ['p', 't', 'h'],
      nm: 'Over/Under-60:00-74:59Min',
    },
    {
      mty: 1005,
      pe: 1011,
      mks: [
        {
          op: [
            {
              na: 'CF Tigres UANL (w)',
              nm: 'Home',
              ty: 1,
              od: 2.21,
            },
            {
              na: 'Draw',
              nm: 'Draw',
              ty: 3,
              od: 1.59,
            },
            {
              na: 'Deportivo Toluca FC (w)',
              nm: 'Away',
              ty: 2,
              od: 14.1,
            },
          ],
          id: 64929478,
          ss: 0,
          au: 1,
        },
      ],
      tps: ['p', 't'],
      nm: '1x2-60:00-74:59Min',
    },
  ],
  tms: 29,
  tps: [],
  lg: {
    na: 'Mexico Liga MX Women',
    id: 11152,
    or: 5710,
    lurl: 'https://static.fastbs55.com/data/5ff93790baaf1dddd934681971a69a75.png',
    sid: 1,
    rid: 43,
    rnm: 'Mexico',
    hot: false,
    slid: 111520000,
  },
  ts: [
    {
      na: 'CF Tigres UANL (w)',
      id: 62698,
      lurl: 'https://static.fastbs55.com/data/fcc82379eba3fe32df2b8dea3b54d4e5.png',
    },
    {
      na: 'Deportivo Toluca FC (w)',
      id: 71549,
      lurl: 'https://static.fastbs55.com/data/958fa8487e1e16e3fbca885c3f9c3137.png',
    },
  ],
  mc: {
    s: 3589,
    pe: 1004,
    r: true,
    tp: 1,
  },
  id: 1568318,
  bt: 1692320400000,
  ms: 5,
  fid: 2,
  fmt: 100001,
  ne: 0,
  vs: {
    have: true,
  },
  as: ['https://animation.fb6pro.com/animation/index.html?matchId=41952841'],
  sid: 1,
  smt: 0,
  ty: 2,
  nm: 'CF Tigres UANL (w) vs. Deportivo Toluca FC (w)',
  sb: {},
};
*/
