// original translation file url:
// https://docs.google.com/spreadsheets/d/1ik9EC5kUQDG8FUd-wjXP99ugyVv3MUdJhrUZfcXPgDU/edit?pli=1#gid=1609021063

const Folders = ['..', 'public', 'locales'];
var fs = require('fs');
const path = require('path');
const ExcelFileUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8i3g_Ovq1BV8aQaUicSA_zM9YRDeObI7jCJGyPU3MG4yQmfPJKnNHoRBxzJ1LKpqhyev776ALhAtI/pub?gid=1609021063&single=true&output=tsv`;
const ExcelFileUrlWeb = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8i3g_Ovq1BV8aQaUicSA_zM9YRDeObI7jCJGyPU3MG4yQmfPJKnNHoRBxzJ1LKpqhyev776ALhAtI/pub?gid=1254587384&single=true&output=tsv`;
const Seperator = String.fromCharCode(9);

const duplicateKeys = [];
const output = {};
const processData = async (data) => {
  const rows = data
    .replace(/\u{2028}/gu, '\n')
    .replace(/\u{2029}/gu, '\n')
    .split('\r\n');
  const keys = rows[0].split(Seperator).map((k) => {
    output[k] = output[k] || {};
    return k;
  });

  rows.shift();
  rows.forEach((row) => {
    const items = row.split(Seperator);
    if (output[keys[0]][items[0]]) {
      duplicateKeys.push(items[0]);
    }
    items.forEach((tem, idx) => {
      output[keys[idx]][items[0]] = tem;
    });
  });
};

const loadExcel = async (url) => {
  try {
    //read .csv file on a server

    const res = await import('node-fetch').then((nodeFetch) => {
      const fetch = nodeFetch.default;
      return fetch(url, {
        method: 'get',
        headers: {
          'content-type': 'text/csv;charset=UTF-8',
        },
      });
    });

    if (res.status === 200) {
      // console.log("res", res);
      const data = await res.text();
      // console.log('excel', data);
      return processData(data);
    } else {
      console.log(`Error code ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
};
const fetchAndSave = async () => {
  await loadExcel(ExcelFileUrl);
  await loadExcel(ExcelFileUrlWeb);

  Object.keys(output).forEach((lang) => {
    if (lang === 'key') {
      return;
    }
    const dir = path.join(__dirname, ...Folders, lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(
      path.join(dir, 'translation.json'),
      JSON.stringify(output[lang], null, 2),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
  });
  if (duplicateKeys.length > 0) {
    console.error('Error, duplicateKeys found: ', duplicateKeys);
  }
};

fetchAndSave();
exports.processData = processData;
