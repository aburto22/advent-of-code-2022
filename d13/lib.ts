type Packet = number | Array<Packet>;
type Pair = [Packet, Packet];

const parsePacket = (line: string): Packet => {
  if (Number.isInteger(Number(line))) {
    return Number(line);
  }
  return JSON.parse(line);
};

const parsePairs = (arr: string[][]) =>
  arr.map((pair) => pair.map(parsePacket) as Pair);

const comparePairs = ([p1, p2]: Pair): boolean | undefined => {
  if (Number.isInteger(p1) && Number.isInteger(p2)) {
    return p1 === p2 ? undefined : p1 < p2;
  }

  if (Array.isArray(p1) && Number.isInteger(p2)) {
    return comparePairs([p1, [p2] as Packet[]]);
  }

  if (Number.isInteger(p1) && Array.isArray(p2)) {
    return comparePairs([[p1] as Packet[], p2]);
  }

  if (Array.isArray(p1) && Array.isArray(p2)) {
    for (let i = 0; i < p2.length; i++) {
      if (p1[i] === undefined) {
        return true;
      }
      const isCorrectOrder = comparePairs([p1[i], p2[i]]);
      if (typeof isCorrectOrder === "boolean") {
        return isCorrectOrder;
      }
    }
    if (p1.length > p2.length) {
      return false;
    }
    return undefined;
  }

  return false;
};

export const getSumIndexesInCorrectOrder = (input: string) => {
  const arr = input
    .split("\n\n")
    .map((pair) => pair.split("\n").map((line) => line.trim()));
  const pairs = parsePairs(arr);
  const correctPairs = pairs.map((pair) => comparePairs(pair));
  return correctPairs.reduce(
    (sum, correct, i) => (correct ? sum + i + 1 : sum),
    0
  );
};

const findReceiverIndexes = (packets: Packet[]): number[] =>
  packets
    .map((packet) => JSON.stringify(packet))
    .map((line, i) => (line === "[[2]]" || line === "[[6]]" ? i + 1 : 0))
    .filter(Boolean);

export const getReceiverSignal = (input: string) => {
  const arr = input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const packets = arr.map(parsePacket).concat([[[2]], [[6]]]);
  const sortedPackets = packets
    .slice(0)
    .sort((a, b) => (comparePairs([a, b]) ? -1 : 1));
  const receivedIndexes = findReceiverIndexes(sortedPackets);
  return receivedIndexes.reduce((total, num) => total * num, 1);
};
