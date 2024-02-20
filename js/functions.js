/* eslint-disable no-console */

// Функция для проверки длины строки
const getStringLength = (string, length) => string.length <= length;

console.log(`Строка короче 20 символов: ${getStringLength('проверяемая строка', 20)}`);
console.log(`Длина строки ровно 18 символов: ${getStringLength('проверяемая строка', 18)}`);
console.log(`Строка длиннее 10 символов: ${getStringLength('проверяемая строка', 10)}`);


// Функция для проверки, является ли строка палиндромом
const getPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return string === reverseString;
};

console.log(`топот: ${getPalindrome('топот')}`);
console.log(`ДовОд: ${getPalindrome('ДовОд')}`);
console.log(`Кекс: ${getPalindrome('Кекс')}`);
console.log(`Лёша на полке клопа нашёл: ${getPalindrome('Лёша на полке клопа нашёл ')}`);
console.log(`А роза упала на лапу Азора: ${getPalindrome('А роза упала на лапу Азора')}`);


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

const getNumber = (data) => {
  data = data.toString();
  let result = '';
  for (let i = 0; i < data.length; i++) {
    // eslint-disable-next-line radix
    const iData = parseInt(data[i]);
    if (!Number.isNaN(iData)) {
      result += iData;
    }
  }
  if (result === '') {
    return NaN;
  }
  return Number(result);
};

console.log(`2023 год: ${getNumber('2023 год')}`);
console.log(`ECMAScript 2022: ${getNumber('ECMAScript 2022')}`);
console.log(`1 кефир, 0.5 батона: ${getNumber('1 кефир, 0.5 батона')}`);
console.log(`агент 007: ${getNumber('агент 007')}`);
console.log(`а я томат: ${getNumber('а я томат')}`);
console.log(`2023: ${getNumber(2023)}`);
console.log(`-1: ${getNumber(-1)}`);
console.log(`1.5: ${getNumber(1.5)}`);

