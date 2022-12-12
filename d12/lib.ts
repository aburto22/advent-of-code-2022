type Point = {
  pos: { x: number; y: number };
  elevation: string;
  shortestPath: number;
  visited: boolean;
  type: "S" | "E" | undefined;
  explored: boolean;
};

type Board = Point[][];

const createPoints = (arr: string[][]): Board => {
  const points: Board = Array(arr[0].length)
    .fill(null)
    .map(() => Array(arr.length).fill(null));

  arr.forEach((row, y) => {
    row.forEach((point, x) => {
      const newPoint: Point = {
        pos: { x, y },
        elevation: point === "S" ? "a" : point === "E" ? "z" : point,
        shortestPath: point === "S" ? 0 : Infinity,
        visited: point === "S",
        type: point === "S" || point === "E" ? point : undefined,
        explored: false,
      };
      points[x][y] = newPoint;
    });
  });

  return points;
};

const printShortest = (points: Board) => {
  let toPrint = "";
  for (let y = 0; y < points[0].length; y++) {
    const line = points
      .map((col) =>
        col[y].shortestPath !== Infinity ? col[y].shortestPath : "."
      )
      .join("");
    toPrint += line + "\n";
  }
  console.log(toPrint);
};

const getNeighbours = (point: Point, points: Board) => {
  const neighbours: Point[] = [];
  const { x, y } = point.pos;

  if (y - 1 >= 0) {
    neighbours.push(points[x][y - 1]);
  }
  if (y + 1 < points[0].length) {
    neighbours.push(points[x][y + 1]);
  }
  if (x - 1 >= 0) {
    neighbours.push(points[x - 1][y]);
  }
  if (x + 1 < points.length) {
    neighbours.push(points[x + 1][y]);
  }
  return neighbours;
};

const explorePoint = (target: Point, ref: Point | null, points: Board) => {
  if (ref && target.elevation.charCodeAt(0) - ref.elevation.charCodeAt(0) > 1) {
    return;
  }

  if (ref && ref.shortestPath + 1 >= target.shortestPath) {
    return;
  }

  target.shortestPath = ref ? ref.shortestPath + 1 : 0;

  if (target.type === "E") {
    return;
  }

  const neighbours = getNeighbours(target, points);

  neighbours.forEach((nb) => {
    explorePoint(nb, target, points);
  });
};

const getSpecialPoint = (points: Board, type: "S" | "E") => {
  const startPoint = points
    .map((col) => col.filter((point) => point.type === type))
    .flat()[0];

  return startPoint;
};

const getShortestPath = (start: Point, points: Board) => {
  explorePoint(start, null, points);
  const endPoint = getSpecialPoint(points, "E");
  return endPoint.shortestPath;
};

export const getShortestPathLength = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim().split(""));
  const points = createPoints(arr);
  const startPoint = getSpecialPoint(points, "S");
  return getShortestPath(startPoint, points);
};

const getLowestPoint = (points: Board) => {
  return points
    .map((col) => col.filter((point) => point.elevation === "a"))
    .flat();
};

export const getShortestPathLengthWithAnyStartPoint = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim().split(""));
  const points = createPoints(arr);
  const startPoints = getLowestPoint(points);
  const shortestPaths = startPoints.map((start) =>
    getShortestPath(start, points)
  );
  return Math.min(...shortestPaths);
};
