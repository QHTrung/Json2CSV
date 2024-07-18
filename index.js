const formatBtn = document.querySelector('.format-btn');
const clearBtn = document.querySelector('.clear-btn');
const convertJsonBtn = document.querySelector('.convertjson-btn');
const convertCsvBtn = document.querySelector('.convertcsv-btn');
const downloadCsvBtn = document.querySelector('.download-btn');
const jsonFrame = document.getElementById('jsonFr');
const csvFrame = document.getElementById('csvFr');
const csvTable = document.getElementById('csv-table');

formatBtn.addEventListener('click', () => {
  const obj = JSON.parse(jsonFrame.value);
  jsonFrame.value = JSON.stringify(obj, null, 2);
});
clearBtn.addEventListener('click', () => {
  jsonFrame.value = '';
  csvFrame.value = '';
});
convertJsonBtn.addEventListener('click', () => {
  csvFrame.value = convertJson2Csv(jsonFrame.value);
  getHeader_Value_CSV(csvFrame.value);
});
downloadCsvBtn.addEventListener('click', (e) => {
  const csvData = csvFrame.value;
  if (csvData === '') {
    alert('CSV is empty!');
  } else {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv;charser=utf-8,${csvData}`);
    element.setAttribute('download', 'data.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
});
convertCsvBtn.addEventListener('click', () => {
  const jsonObj = convertCsv2Json(csvFrame.value);
  jsonFrame.value = JSON.stringify(jsonObj);
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
const convertCsv2Json = (csv) => {
  let jsonData = [];
  const csvSplitArr = csv.split('\n');
  for (let i = 0; i < csvSplitArr.length - 1; i++) {
    csvSplitArr[i] = csvSplitArr[i].split(',');
  }
  const headerKeys = csvSplitArr[0];
  for (let i = 1; i < csvSplitArr.length - 1; i++) {
    let obj = {};
    for (let j = 0; j < csvSplitArr[i].length; j++) {
      obj[headerKeys[j]] = csvSplitArr[i][j];
    }
    jsonData.push(obj);
  }
  return jsonData;
};
const getHeader_Value_CSV = (csv) => {
  csvTable.innerHTML = '';
  const csvSplitArr = csv.split('\n');
  for (let i = 0; i < csvSplitArr.length - 1; i++) {
    csvSplitArr[i] = csvSplitArr[i].split(',');
  }
  const headerKeys = csvSplitArr[0];
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const th_row = document.createElement('tr');
  headerKeys.forEach((key) => {
    const th_data = document.createElement('th');
    th_data.textContent = key;
    th_row.appendChild(th_data);
  });
  for (let i = 1; i < csvSplitArr.length - 1; i++) {
    const tb_row = document.createElement('tr');
    for (let j = 0; j < csvSplitArr[i].length; j++) {
      const tb_data = document.createElement('td');
      tb_data.textContent = csvSplitArr[i][j];
      tb_row.appendChild(tb_data);
    }
    tbody.appendChild(tb_row);
  }
  thead.appendChild(th_row);
  csvTable.appendChild(thead);
  csvTable.appendChild(tbody);
  return headerKeys;
};
