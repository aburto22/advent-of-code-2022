const splitItems = (items: string) =>
  [items.slice(0, items.length / 2), items.slice(items.length / 2)] as const;

const getRepeatedItem = (items: string, ...rest: string[]): string => {
  for (const item of items) {
    if (rest.every((itms) => itms.includes(item))) {
      return item;
    }
  }

  return "";
};

const getPoints = (char: string): number => {
  const capitalRgx = /[A-Z]/;

  if (capitalRgx.test(char)) {
    return char.charCodeAt(0) - 38;
  }

  return char.charCodeAt(0) - 96;
};

export const getPrioritySum = (input: string) => {
  const arr = input.split("\n");
  const rucksack = arr.map((items) => splitItems(items));
  const repeatedItems = rucksack.map((items) => getRepeatedItem(...items));
  const pointArr = repeatedItems.map((item) => getPoints(item));
  return pointArr.reduce((sum, num) => sum + num, 0);
};

const splitRucksack = (
  rucksacks: string[]
): Array<[string, string, string]> => {
  const groupedRucksacks: Array<[string, string, string]> = [];
  let rucksacksCopy = [...rucksacks];

  while (rucksacksCopy.length > 0) {
    groupedRucksacks.push(
      rucksacksCopy.slice(0, 3) as [string, string, string]
    );
    rucksacksCopy = rucksacksCopy.slice(3);
  }

  return groupedRucksacks;
};

export const getPriorityBadge = (input: string) => {
  const arr = input.split("\n");
  const groupedRucksacks = splitRucksack(arr);

  const badges = groupedRucksacks.map((arrItems) =>
    getRepeatedItem(...arrItems)
  );
  const points = badges.map((badge) => getPoints(badge));
  return points.reduce((sum, num) => sum + num, 0);
};
