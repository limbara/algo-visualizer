export const generateRandomArray = (
  length: number,
  min: number,
  max: number
) => {
  const array = new Array(length);
  let i = 0;

  while (i < array.length) {
    array[i++] = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return array;
};
