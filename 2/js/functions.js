//1

const checkStringLenght = (str = '', maxLenght = 1) => str.length <= maxLenght;

//2

const checkPalindrome = (str = '') => {
  const updStr = str.replaceAll(' ', '').toLowerCase();
  let result = '';

  for (let i = updStr.length - 1; i >= 0; i--) {
    result += updStr[i];
  }
  return result === updStr;
};

//второй вариант
// const isPalindrome = (str) => {
//   const updStr = str.replaceAll(' ', '').toLowerCase();
//   const reverseStr = updStr.split('').join('');
//   return reverseStr === updStr;
// };
//3

function getInteger(strValue) {
  const integerValue = strValue.toString();
  let result = '';

  for (let i = 0; i < integerValue.length; i++) {
    if (!Number.isNaN(parseInt
    (integerValue[i], 10)
    )) {
      result += integerValue;
    }
  }
  return result;
}


//Быстрое решение от наставника :O
// function getInteger(strValue) {
//   return parseInt(strValue.replaceAll(/\D/g, ''), 10);
// }
