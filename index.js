const formatBtn = document.querySelector('.format-btn');
const clearBtn = document.querySelector('.clear-btn');
const convertBtn = document.querySelector('.convert-btn');
const jsonFrame = document.getElementById('jsonFr');
const csvFrame = document.getElementById('csvFr');

formatBtn.addEventListener('click', () => {
  const obj = JSON.parse(jsonFrame.value);
  jsonFrame.value = JSON.stringify(obj, null, 2);
});
clearBtn.addEventListener('click', () => {
  jsonFrame.value = '';
  csvFrame.value = '';
});
convertBtn.addEventListener('click', () => {
  csvFrame.value = convertJson2Csv(jsonFrame.value);
});

const convertJson2Csv = (data) => {
  const jsonData = JSON.parse(data);
  let result = '';
  let headers = {};
  let value = [];
  // header
  for (let index = 0; index < jsonData.length; index++) {
    const arrObj = Object.keys(jsonData[index]);
    for (let j = 0; j < arrObj.length; j++) {
      headers[arrObj[j]] = arrObj[j];
    }
  }
  const header = Object.keys(headers);
  result += header + '\n';
  // value of json data
  for (let i = 0; i < jsonData.length; i++) {
    for (let j = 0; j < header.length; j++) {
      if (jsonData[i].hasOwnProperty(header[j])) {
        value.push(jsonData[i][header[j]]);
      } else {
        value.push('');
      }
    }
    result += value.join(',') + '\n';
    value = [];
  }
  return result;
};
