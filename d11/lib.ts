type Monkey = {
  id: number;
  items: bigint[];
  inspected: number;
  operation: (item: bigint) => bigint;
  test: (item: bigint) => boolean;
  ifTrue: number;
  ifFalse: number;
};

const getId = (line: string): number => {
  const match = line.match(/[0-9]+/);
  return match ? +match[0] : 0;
};

const getItems = (line: string): bigint[] => {
  const match = line.match(/[0-9]+/g);
  return match ? match.map((m) => BigInt(m)) : [];
};

const getOperation = (line: string): ((item: bigint) => bigint) => {
  const match = line.match(/([+*]) (old|[0-9]+)/);

  if (!match) {
    return (item: bigint) => item;
  }

  const templateFn = (sym: string, num: string) => (item: bigint) => {
    const number = num === "old" ? item : BigInt(+num);
    return sym === "*" ? item * number : item + number;
  };

  return templateFn(match[1] as "*" | "+", match[2]);
};

const getTest = (line: string): ((item: bigint) => boolean) => {
  const match = line.match(/[0-9]+/);

  if (!match) {
    return (item: bigint) => Boolean(item);
  }

  return (item: bigint) => item % BigInt(+match[0]) === BigInt(0);
};

const getNextMonkey = (line: string): number => {
  const match = line.match(/[0-9]+/);
  return match ? +match[0] : 0;
};

const parseMonkeys = (arr: string[][]) => {
  const monkeys: Monkey[] = [];

  arr.forEach((mk) => {
    const monkey: Monkey = {
      id: getId(mk[0]),
      items: getItems(mk[1]),
      inspected: 0,
      operation: getOperation(mk[2]),
      test: getTest(mk[3]),
      ifTrue: getNextMonkey(mk[4]),
      ifFalse: getNextMonkey(mk[5]),
    };

    monkeys.push(monkey);
  });

  return monkeys;
};

const playMonkey = (monkey: Monkey, monkeys: Monkey[], calmDown: boolean) => {
  monkey.items.forEach((item) => {
    monkey.inspected++;
    const newItem = monkey.operation(item);
    const worryLessItem = calmDown ? newItem / 3n : newItem;

    if (monkey.test(worryLessItem)) {
      monkeys[monkey.ifTrue].items.push(worryLessItem);
      return;
    }
    monkeys[monkey.ifFalse].items.push(worryLessItem);
    return;
  });
  monkey.items = [];
};

const playRound = (monkeys: Monkey[], calmDown: boolean) => {
  monkeys.forEach((monkey) => {
    playMonkey(monkey, monkeys, calmDown);
  });
};

const playAllRounds = (
  monkeys: Monkey[],
  rounds: number,
  calmDown: boolean
) => {
  for (let i = 0; i < rounds; i++) {
    playRound(monkeys, calmDown);
  }
};

export const getMonkeyBusiness = (
  input: string,
  rounds: number,
  calmDown: boolean
) => {
  const arr = input
    .split("\n\n")
    .map((mk) => mk.split("\n").map((ln) => ln.trim()));

  const monkeys = parseMonkeys(arr);
  playAllRounds(monkeys, rounds, calmDown);
  const inspected = monkeys.map((mk) => mk.inspected);
  console.log(inspected);
  return inspected
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((mult, num) => mult * num, 1);
};
