export const getNumberCalories = (list: string, num: number): number => {
  const arr = list.split("\n\n");
  const newArr = arr.map((ls) =>
    ls.split("\n").reduce((sum, num) => sum + +num, 0)
  );

  const sortedArr = newArr.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

  return sortedArr.slice(0, num).reduce((sum, cal) => cal + sum, 0);
};
