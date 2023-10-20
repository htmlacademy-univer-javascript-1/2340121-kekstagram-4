/* eslint-disable no-unused-vars */
function isValidLength(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str.at(i) !== str.at(len - 1 - i)) {
      return false;
    }
  }
  return true;
}

function getNumberFromString(str) {
  let num = '';
  const digits = '0123456789';
  for (let i = 0; i < str.length; i++) {
    if (digits.includes(str.at(i))) {
      num += str.at(i);
    }
  }
  return +num;
}


