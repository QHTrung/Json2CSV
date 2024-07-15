// Convert json to csv
const data = `[
  {
    "id": 1,
    "fullname": "Nguyen Van A"
  },
  {
    "id": 2,
    "fullname": "Tran Thi B",
    "age": 25
  },
  {
    "id": 3,
    "fullname": "Le Van C",
    "age":45
  }
]`;

// Output:
// id,fullname,age
// 1,Nguyen Van A,30
// 2, Tran Thi B,25
// 3,Le Van C,28

const convertJson2Csv = (data) => {
  const jsonData = JSON.parse(data);
  let result = '';
  let headers = {};
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
  // for (let index = 0; index < jsonData.length; index++) {
  //   result += Object.values(jsonData[index]) + '\n';
  // }
  return header;
};
console.log(convertJson2Csv(data));
//console.log(['hello', 'world', ''].join(','));
