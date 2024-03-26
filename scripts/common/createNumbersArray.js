// export const createNumbersArray = (from, to) => {
//   // ф-ция должна генерировать массив чисел от from до to
// };

export const createNumbersArray = (from, to) => {
  let numbersArray = [];
  for(let i = from; i <= to; i++) {
      numbersArray.push(i);
  }
  return numbersArray;
};
