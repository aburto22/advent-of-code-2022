const getCycles = (arr: string[]) => {
  const cycles: number[] = [1];
  arr.forEach((line) => {
    const lastCycle = cycles.at(-1) as number;
    if (line === "noop") {
      cycles.push(lastCycle);
      return;
    }
    const num = Number(line.split(" ")[1]);
    cycles.push(lastCycle);
    cycles.push(lastCycle + num);
  });
  return cycles;
};

const getCycleStrenght = (cycles: number[]) => {
  const target = [20, 60, 100, 140, 180, 220];
  return target.map((index) => [index, cycles[index - 1]]);
};

export const getSignalStrenghts = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const cycles = getCycles(arr);
  const strengths = getCycleStrenght(cycles);
  const signalStrenghts = strengths.map(([inters, cycle]) => inters * cycle);

  return signalStrenghts.reduce((sum, num) => sum + num, 0);
};

const getSplitCycles = (cycles: number[]): number[][] => {
  const splitCycles: number[][] = [];

  let counter = 40;

  while (counter <= cycles.length) {
    splitCycles.push(cycles.slice(counter - 40, counter));
    counter += 40;
  }

  return splitCycles;
};

const getSprite = (cycles: number[]) => {
  const CRT: string[] = [];
  const splitCycles = getSplitCycles(cycles);

  splitCycles.map((cycles) => {
    let lineCRT = "";
    cycles.forEach((cycle, i) => {
      if (cycle - 1 === i || cycle === i || cycle + 1 === i) {
        lineCRT += "#";
        return;
      }
      lineCRT += ".";
    });
    CRT.push(lineCRT);
  });
  return CRT;
};

export const getLetters = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const cycles = getCycles(arr);
  const sprite = getSprite(cycles);
  return sprite.join("\n");
};
