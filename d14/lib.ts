type Pos = [number, number];

type Board = Array<Array<null | string>>;

type Game = {
  offsetX: number;
  board: Board;
  origin: [number, number];
  sandQty: number;
};

const fillBoard = (game: Game, arr: Pos[][]) => {
  arr.forEach((line) => {
    for (let i = 1; i < line.length; i++) {
      const minX = line[i][0] <= line[i - 1][0] ? line[i][0] : line[i - 1][0];
      const maxX = line[i][0] >= line[i - 1][0] ? line[i][0] : line[i - 1][0];

      const minY = line[i][1] <= line[i - 1][1] ? line[i][1] : line[i - 1][1];
      const maxY = line[i][1] >= line[i - 1][1] ? line[i][1] : line[i - 1][1];

      if (minY === maxY) {
        for (let x = minX; x <= maxX; x++) {
          game.board[x - game.offsetX][minY] = "#";
        }
        continue;
      }

      for (let y = minY; y <= maxY; y++) {
        game.board[minX - game.offsetX][y] = "#";
      }
    }
  });

  game.board[game.origin[0]][game.origin[1]] = "+";
};

const getEmptyBoard = (arr: Pos[][]): Game => {
  const minY = 0;
  const maxY = Math.max(
    ...arr.map((rock) => rock.map((pos) => pos[1]).flat()).flat()
  );
  const minX = Math.min(
    ...arr.map((rock) => rock.map((pos) => pos[0]).flat()).flat()
  );
  const maxX = Math.max(
    ...arr.map((rock) => rock.map((pos) => pos[0]).flat()).flat()
  );

  const offsetX = minX;
  const lengthX = maxX - minX + 1;
  const lengthY = maxY - minY + 1;

  const board = Array(lengthX)
    .fill(null)
    .map(() => Array(lengthY).fill(null));

  return {
    offsetX,
    board,
    origin: [500 - offsetX, 0],
    sandQty: 0,
  };
};

const printBoard = (board: Board) => {
  let printString = "";

  for (let i = 0; i < board[0].length; i++) {
    printString +=
      board
        .map((line) => line[i] || ".")
        .flat()
        .join("") + "\n";
  }

  console.log(printString);
};

const canDropLeft = (game: Game, x: number, y: number): "T" | "F" | "E" => {
  if (y + 1 >= game.board[0].length) {
    return "E";
  }
  if (x - 1 < 0) {
    return "E";
  }
  if (y + 1 === game.board[0].length - 1 && !game.board[x - 1][y + 1]) {
    return "E";
  }
  if (game.board[x - 1][y + 1]) {
    return "F";
  }
  return "T";
};

const canDropRight = (game: Game, x: number, y: number): "T" | "F" | "E" => {
  if (y + 1 >= game.board[0].length) {
    return "E";
  }
  if (x + 1 >= game.board.length) {
    return "E";
  }
  if (y + 1 === game.board[0].length - 1 && !game.board[x + 1][y + 1]) {
    return "E";
  }
  if (game.board[x + 1][y + 1]) {
    return "F";
  }
  return "T";
};

const dropSandUnit = (
  game: Game,
  startCol: number,
  startRow: number
): boolean => {
  const row =
    game.board[startCol].slice(startRow).findIndex((pos) => pos) - 1 + startRow;

  const dropLeft = canDropLeft(game, startCol, row);

  if (dropLeft === "E") {
    return false;
  }

  if (dropLeft === "T") {
    return dropSandUnit(game, startCol - 1, row + 1);
  }

  const dropRight = canDropRight(game, startCol, row);

  if (dropRight === "E") {
    return false;
  }

  if (dropRight === "T") {
    return dropSandUnit(game, startCol + 1, row + 1);
  }

  game.sandQty++;
  game.board[startCol][row] = "o";

  return true;
};

const checkBlockedOrigin = (game: Game) => {
  const [x, y] = game.origin;
  if (
    game.board[x - 1][y + 1] &&
    game.board[x][y + 1] &&
    game.board[x + 1][y + 1]
  ) {
    game.sandQty++;
    game.board[x][y] === "o";
    return true;
  }
  return false;
};

const dropSand = (game: Game) => {
  let canDrop = dropSandUnit(game, game.origin[0], game.origin[1] + 1);
  while (canDrop) {
    canDrop = dropSandUnit(game, game.origin[0], game.origin[1] + 1);
    if (checkBlockedOrigin(game)) {
      break;
    }
  }
};

export const getTotalSandUnits = (input: string) => {
  const arr = input.split("\n").map((line) =>
    line
      .trim()
      .split(" -> ")
      .map((pos) => pos.split(",").map(Number) as Pos)
  );

  const game = getEmptyBoard(arr);
  fillBoard(game, arr);
  dropSand(game);
  printBoard(game.board);

  return game.sandQty;
};

const getEmptyBoardWithFloor = (arr: Pos[][]): Game => {
  const minY = 0;
  const maxY =
    Math.max(...arr.map((rock) => rock.map((pos) => pos[1]).flat()).flat()) + 2;

  const lengthY = maxY - minY + 1;

  let minX = Math.min(
    ...arr.map((rock) => rock.map((pos) => pos[0]).flat()).flat()
  );
  let maxX = Math.max(
    ...arr.map((rock) => rock.map((pos) => pos[0]).flat()).flat()
  );

  minX = 500 - lengthY < minX ? 500 - lengthY : minX;
  maxX = 500 + lengthY > maxX ? 500 + lengthY : maxX;

  const offsetX = minX;
  const lengthX = maxX - minX + 1;

  const board = Array(lengthX)
    .fill(null)
    .map(() => Array(lengthY).fill(null));

  return {
    offsetX,
    board,
    origin: [500 - offsetX, 0],
    sandQty: 0,
  };
};

const fillBoardWithFloor = (game: Game, arr: Pos[][]) => {
  arr.forEach((line) => {
    for (let i = 1; i < line.length; i++) {
      const minX = line[i][0] <= line[i - 1][0] ? line[i][0] : line[i - 1][0];
      const maxX = line[i][0] >= line[i - 1][0] ? line[i][0] : line[i - 1][0];

      const minY = line[i][1] <= line[i - 1][1] ? line[i][1] : line[i - 1][1];
      const maxY = line[i][1] >= line[i - 1][1] ? line[i][1] : line[i - 1][1];

      if (minY === maxY) {
        for (let x = minX; x <= maxX; x++) {
          game.board[x - game.offsetX][minY] = "#";
        }
        continue;
      }

      for (let y = minY; y <= maxY; y++) {
        game.board[minX - game.offsetX][y] = "#";
      }
    }
  });

  for (let i = 0; i < game.board.length; i++) {
    game.board[i][game.board[0].length - 1] = "#";
  }

  game.board[game.origin[0]][game.origin[1]] = "+";
};

export const getTotalSandUnitsWithFloor = (input: string) => {
  const arr = input.split("\n").map((line) =>
    line
      .trim()
      .split(" -> ")
      .map((pos) => pos.split(",").map(Number) as Pos)
  );

  const game = getEmptyBoardWithFloor(arr);
  fillBoardWithFloor(game, arr);
  dropSand(game);
  printBoard(game.board);

  return game.sandQty;
};
