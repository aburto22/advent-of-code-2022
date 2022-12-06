const isMarker = (subStr: string, num: number): boolean => {
  const set = new Set(subStr.split(""));

  return set.size === num;
};

export const getMarker = (input: string, num: number): number => {
  for (let i = num; i < input.length; i++) {
    const subStr = input.slice(i - num, i);

    if (isMarker(subStr, num)) {
      return i;
    }
  }
  return 0;
};
