type Pos = { x: number; y: number };

type Bridge = {
  rope: Pos[][];
  origin: Pos;
  board: string[][];
};

type Dir = "U" | "D" | "L" | "R";

const createBridge = (size: Pos, origin: Pos, length: number): Bridge => {
  const board = Array(size.x)
    .fill(0)
    .map(() =>
      Array(size.y)
        .fill(0)
        .map(() => ".")
    );

  board[origin.x][origin.y] = "H";

  const rope = Array(length)
    .fill(0)
    .map(() => [{ x: 0, y: 0 }]);

  return {
    rope,
    origin,
    board,
  };
};

const moveHead = (bridge: Bridge, dir: Dir) => {
  const head = { ...bridge.rope[0].at(-1) } as Pos;

  if (dir === "U") {
    bridge.rope[0].push({
      ...head,
      y: head.y + 1,
    });
    return;
  }
  if (dir === "D") {
    bridge.rope[0].push({
      ...head,
      y: head.y - 1,
    });
    return;
  }
  if (dir === "L") {
    bridge.rope[0].push({
      ...head,
      x: head.x - 1,
    });
    return;
  }
  bridge.rope[0].push({
    ...head,
    x: head.x + 1,
  });
};

const moveTail = (bridge: Bridge, ref: number, target: number) => {
  const head = { ...bridge.rope[ref].at(-1) } as Pos;
  const tail = { ...bridge.rope[target].at(-1) } as Pos;

  if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1) {
    return;
  }

  if (head.x > tail.x && head.y === tail.y) {
    bridge.rope[target].push({
      ...tail,
      x: tail.x + 1,
    });
    return;
  }

  if (head.x < tail.x && head.y === tail.y) {
    bridge.rope[target].push({
      ...tail,
      x: tail.x - 1,
    });
    return;
  }

  if (head.y > tail.y && head.x === tail.x) {
    bridge.rope[target].push({
      ...tail,
      y: tail.y + 1,
    });
    return;
  }

  if (head.y < tail.y && head.x === tail.x) {
    bridge.rope[target].push({
      ...tail,
      y: tail.y - 1,
    });
    return;
  }

  if (head.y > tail.y && head.x > tail.x) {
    bridge.rope[target].push({
      x: tail.x + 1,
      y: tail.y + 1,
    });
    return;
  }

  if (head.y > tail.y && head.x < tail.x) {
    bridge.rope[target].push({
      x: tail.x - 1,
      y: tail.y + 1,
    });
    return;
  }

  if (head.y < tail.y && head.x < tail.x) {
    bridge.rope[target].push({
      x: tail.x - 1,
      y: tail.y - 1,
    });
    return;
  }

  if (head.y < tail.y && head.x > tail.x) {
    bridge.rope[target].push({
      x: tail.x + 1,
      y: tail.y - 1,
    });
    return;
  }
};

let maxX = 0;
let maxY = 0;
let minX = 0;
let minY = 0;

const updateMaxSize = (bridge: Bridge) => {
  const head = { ...bridge.rope[0].at(-1) } as Pos;
  if (head.x > maxX) {
    maxX = head.x;
  }
  if (head.x < minX) {
    minX = head.x;
  }
  if (head.y > maxY) {
    maxY = head.y;
  }
  if (head.y < minY) {
    minY = head.y;
  }
};

const updateBoard = (bridge: Bridge) => {
  bridge.board = bridge.board.map((col) => col.map(() => "."));
  bridge.board[bridge.origin.x][bridge.origin.y] = "s";

  const reversedRope = [...bridge.rope].reverse();

  reversedRope.forEach((sec, i) => {
    const pos = sec.at(-1) as Pos;
    bridge.board[pos.x + bridge.origin.x][pos.y + bridge.origin.y] =
      i === bridge.rope.length - 1 ? "H" : `${i}`;
  });
};

const printBoard = (board: string[][]) => {
  const printBoard = [];
  for (let i = board[0].length - 1; i >= 0; i--) {
    const col = board.map((col) => col[i]).join("");
    printBoard.push(col);
  }
  console.log(printBoard.join("\n"));
};

const getVisited = (tail: Pos[]): Pos[] => {
  return tail.filter(
    (pos, i) => tail.findIndex((p) => p.x === pos.x && p.y === pos.y) === i
  );
};

const printVisited = ({ board, origin, rope }: Bridge) => {
  const visitedBoard = board.map((col) => col.map(() => "."));
  const visited = getVisited(rope[rope.length - 1]);

  visited.forEach((pos) => {
    visitedBoard[pos.x + origin.x][pos.y + origin.y] = "#";
  });

  visitedBoard[origin.x][origin.y] = "s";

  printBoard(visitedBoard);
};

export const visitedPositionsByT = (input: string, size: Pos, origin: Pos) => {
  const arr = input.split("\n").map((line) => line.trim());
  const instructions = arr.map((line) => {
    const raw = line.split(" ");
    return [raw[0] as Dir, Number(raw[1])] as const;
  });

  const bridge = createBridge(size, origin, 2);

  instructions.forEach(([dir, n]) => {
    for (let i = 0; i < n; i++) {
      moveHead(bridge, dir);
      moveTail(bridge, 0, 1);
      // updateMaxSize(bridge);
      updateBoard(bridge);
      // printBoard(bridge.board);
    }
  });

  // printVisited(bridge);

  const visited = getVisited(bridge.rope[1]);

  return visited.length;
};

export const longRopeVisitedT = (input: string, size: Pos, origin: Pos) => {
  const arr = input.split("\n").map((line) => line.trim());
  const instructions = arr.map((line) => {
    const raw = line.split(" ");
    return [raw[0] as Dir, Number(raw[1])] as const;
  });

  const ropeLength = 10;

  const bridge = createBridge(size, origin, ropeLength);

  instructions.forEach(([dir, n]) => {
    for (let i = 0; i < n; i++) {
      moveHead(bridge, dir);

      for (let j = 1; j < ropeLength; j++) {
        moveTail(bridge, j - 1, j);
      }
      updateMaxSize(bridge);
      updateBoard(bridge);
    }
    printBoard(bridge.board);
  });

  const visited = getVisited(bridge.rope[bridge.rope.length - 1]);

  // printVisited(bridge);

  return visited.length;
};
