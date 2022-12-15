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
  searchArea: { x: number; y: number };
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

const createGame = (arr: Info[], row: number, withSearch: boolean): Game => {
  const minX = Math.min(...arr.map((info) => info.limits.minX));
  const maxX = Math.max(...arr.map((info) => info.limits.maxX));
  const minY = Math.min(...arr.map((info) => info.limits.minY));

  const lengthX = maxX - minX + 1;

  const offset = { x: minX, y: minY };
  const searchArea = {
    x: Math.min(Math.max(...arr.map((info) => info.sensor[0])), 4000000),
    y: Math.min(Math.max(...arr.map((info) => info.sensor[1])), 4000000),
  };

  const board: Board = Array(lengthX).fill(null);

  const equipment = new Set<number>();
  const scanned = new Set<number>();

  arr.forEach((info) => {
    for (
      let x = withSearch
        ? Math.max(info.sensor[0] - info.manhattan, 0)
        : info.sensor[0] - info.manhattan;
      x <=
      (withSearch
        ? Math.min(info.sensor[0] + info.manhattan, searchArea.x)
        : info.sensor[0] + info.manhattan);
      x++
    ) {
      if (
        -info.manhattan + Math.abs(x - info.sensor[0]) + info.sensor[1] <=
          row &&
        info.manhattan - Math.abs(x - info.sensor[0]) + info.sensor[1] >= row
      ) {
        if (!equipment.has(x)) {
          scanned.add(x);
        }
      }
    }

    if (
      info.sensor[1] === row &&
      info.sensor[0] <= searchArea.x &&
      info.sensor[0] >= 0
    ) {
      scanned.delete(info.sensor[0]);
      equipment.add(info.sensor[0]);
    }

    if (
      info.beacon[1] === row &&
      info.beacon[0] <= searchArea.x &&
      info.beacon[0] >= 0
    ) {
      scanned.delete(info.beacon[0]);
      equipment.add(info.beacon[0]);
    }
  });

  return {
    board,
    offset,
    scanned,
    equipment,
    searchArea,
  };
};

export const getBeaconPositionFree = (input: string, row: number) => {
  const arr = input.split("\n").map((line) => line.trim());
  const equipment = getSeonsorsAndBeacons(arr);
  const game = createGame(equipment, row, false);
  return game.scanned.size;
};

const getPossibility = (game: Game) => {
  const usedLength = game.scanned.size + game.equipment.size;
  const searchLength = game.searchArea.x + 1;
  return searchLength - usedLength;
};

const getDistressSignalValue = (equipment: Info[]) => {
  for (
    let row = 0;
    row <=
    Math.min(Math.max(...equipment.map((info) => info.sensor[1])), 4000000);
    row++
  ) {
    const game = createGame(equipment, row, true);

    if (getPossibility(game) > 0) {
      const y = row;
      const rowValues = new Set([...game.scanned, ...game.equipment]);

      for (let x = 0; x <= game.searchArea.x; x++) {
        if (!rowValues.has(x)) {
          return x * 4000000 + y;
        }
      }
    }
  }
  return 0;
};

export const getDistressSignal = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const equipment = getSeonsorsAndBeacons(arr);
  return getDistressSignalValue(equipment);
};
