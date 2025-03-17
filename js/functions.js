// выбор файла с изображением для загрузки;

//1

const checkStringLenght = (str = '', maxLenght = 1) => str.length <= maxLenght;
checkStringLenght();

//2

const checkPalindrome = (str = '') => {
  const updStr = str.replaceAll(' ', '').toLowerCase();
  let result = '';

  for (let i = updStr.length - 1; i >= 0; i--) {
    result += updStr[i];
  }
  return result === updStr;
};

checkPalindrome();

//второй вариант
// const isPalindrome = (str) => {
//   const updStr = str.replaceAll(' ', '').toLowerCase();
//   const reverseStr = updStr.split('').reverse().join('');
//   return reverseStr === updStr;
// };
//3

function getInteger(strValue) {
  const integerValue = strValue.toString();
  let result = '';

  for (let i = 0; i < integerValue.length; i++) {
    if (!Number.isNaN(parseInt(integerValue[i], 10))) {
      result += integerValue[i];
    }
  }
  return result;
}

getInteger(678567);

// Еще одно решение.\
// function getInteger(strValue) {
//   return parseInt(strValue.replaceAll(/\D/g, ''), 10);
// }
