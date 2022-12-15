type Data = [number, number];

type Info = {
  sensor: Data;
  beacon: Data;
  manhattan: number;
  limits: { minX: number; maxX: number; minY: number; maxY: number };
};

type Board = Array<string | null>;
type Scanned = Set<number>;

type Game = {
  board: Board;
  scanned: Scanned;
  equipment: Scanned;
  offset: { x: number; y: number };
};

const printBoard = (board: Board) => {
  console.log(board.join(""));
};

const getManhattanDistance = (sensor: Data, beacon: Data): number =>
  Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);

const getSeonsorsAndBeacons = (arr: string[]): Info[] =>
  arr.map((line) => {
    const match = line.match(/[-0-9]+/g);

    if (!match) {
      throw new Error("invalid line");
    }

    const sensor = [+match[0], +match[1]] as Data;
    const beacon = [+match[2], +match[3]] as Data;
    const manhattan = getManhattanDistance(sensor, beacon);
    const limits = {
      minX: sensor[0] - manhattan,
      maxX: sensor[0] + manhattan,
      minY: sensor[1] - manhattan,
      maxY: sensor[1] + manhattan,
    };

    return {
      sensor,
      beacon,
      manhattan,
      limits,
    };
  });

const createGame = (arr: Info[], row: number): Game => {
  const minX = Math.min(...arr.map((info) => info.limits.minX));
  const maxX = Math.max(...arr.map((info) => info.limits.maxX));
  const minY = Math.min(...arr.map((info) => info.limits.minY));

  const lengthX = maxX - minX + 1;

  const offset = { x: minX, y: minY };

  const board: Board = Array(lengthX).fill(null);

  const equipment = new Set<number>();
  const scanned = new Set<number>();

  arr.forEach((info) => {
    for (let x = -info.manhattan; x <= info.manhattan; x++) {
      for (
        let y = -info.manhattan + Math.abs(x) + info.sensor[1];
        y <= info.manhattan - Math.abs(x) + info.sensor[1];
        y++
      ) {
        if (y === row) {
          const xval = x + info.sensor[0];
          if (!equipment.has(xval)) {
            scanned.add(xval);
          }
        }
      }
    }

    if (info.sensor[1] === row) {
      scanned.delete(info.sensor[0]);
      equipment.add(info.sensor[0]);
    }

    if (info.beacon[1] === row) {
      scanned.delete(info.beacon[0]);
      equipment.add(info.beacon[0]);
    }
  });

  return {
    board,
    offset,
    scanned,
    equipment,
  };
};

const getRowCount = (game: Game) => {
  return game.board.filter((equip) => equip === "#").length;
};

export const getBeaconPositionFree = (input: string, row: number) => {
  const arr = input.split("\n").map((line) => line.trim());
  const equipment = getSeonsorsAndBeacons(arr);
  const game = createGame(equipment, row);
  return game.scanned.size;
};

export const myFunctionTask2 = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  return input;
};
