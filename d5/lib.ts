type Crates = {
  [key: number]: Array<string>;
};

type Movements = Array<{ move: number; from: number; to: number }>;

const splitArray = (arr: string[]) => {
  const crates: string[] = [];
  const movements: string[] = [];
  let isMovements = false;

  for (const line of arr) {
    if (line === "") {
      isMovements = true;
      continue;
    }
    if (isMovements) {
      movements.push(line);
      continue;
    }
    crates.push(line);
  }

  return { crates: crates.slice(0, -1), movements };
};

const parseCrates = (crates: string[]): Crates => {
  let reversedCrates = crates.reverse();
  const parsedCrates: Crates = {};
  let index = 1;

  while (reversedCrates[0].length > 0) {
    const newColumn = reversedCrates.map((cr) => cr.slice(0, 3));
    reversedCrates = reversedCrates.map((cr) => cr.slice(4));
    parsedCrates[index] = newColumn
      .map((cr) => cr.replace(/[[\] ]/gi, ""))
      .filter((cr) => cr !== "");
    index++;
  }
  return parsedCrates;
};

const parseMovements = (movements: string[]): Movements => {
  return movements.map((mv) => {
    const nums = mv
      .replace(/[^0-9 ]/g, "")
      .split(" ")
      .filter((n) => n);
    return {
      move: +nums[0],
      from: +nums[1],
      to: +nums[2],
    };
  });
};

const getSortedCrates = (
  crates: Crates,
  movements: Movements,
  keepOrder = false
): Crates => {
  const sortedCrates: Crates = JSON.parse(JSON.stringify(crates));

  movements.forEach((mv) => {
    const movedContainers = sortedCrates[mv.from].slice(-mv.move);
    sortedCrates[mv.from] = sortedCrates[mv.from].slice(0, -mv.move);
    if (keepOrder) {
      sortedCrates[mv.to] = sortedCrates[mv.to].concat(movedContainers);
      return;
    }
    sortedCrates[mv.to] = sortedCrates[mv.to].concat(movedContainers.reverse());
  });

  return sortedCrates;
};

const getTopContainers = (crates: Crates) => {
  return Object.values(crates).reduce((top, cr) => top + cr.at(-1), "");
};

export const getTopCrates = (input: string) => {
  const arr = input.split("\n");
  const info = splitArray(arr);
  const crates = parseCrates(info.crates);
  const movements = parseMovements(info.movements);
  const sortedCrates = getSortedCrates(crates, movements);
  const topContainers = getTopContainers(sortedCrates);
  return topContainers;
};

export const getTopCratesNoReverse = (input: string) => {
  const arr = input.split("\n");
  const info = splitArray(arr);
  const crates = parseCrates(info.crates);
  const movements = parseMovements(info.movements);
  const sortedCrates = getSortedCrates(crates, movements, true);
  const topContainers = getTopContainers(sortedCrates);
  return topContainers;
};
