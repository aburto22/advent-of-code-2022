type Trees = number[][];
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const getTreeCol = (
  trees: Trees,
  i: number,
  j: number,
  dir: Direction
): number[] => {
  if (dir === "UP") {
    return trees
      .map((col) => col[j])
      .slice(0, i)
      .reverse();
  }
  if (dir === "DOWN") {
    return trees.map((col) => col[j]).slice(i + 1);
  }
  if (dir === "LEFT") {
    return trees[i].slice(0, j).reverse();
  }
  return trees[i].slice(j + 1);
};

const isTreeVisible = (refTree: number, col: number[]): boolean => {
  return col.length === 0 ? true : col.every((tree) => tree < refTree);
};

const checkVisible = (trees: Trees, i: number, j: number): boolean => {
  const dirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
  const refTree = trees[i][j];

  for (const dir of dirs) {
    const col = getTreeCol(trees, i, j, dir);
    if (isTreeVisible(refTree, col)) {
      return true;
    }
  }

  return false;
};

const getNumVisibleTrees = (trees: Trees) => {
  return trees.reduce(
    (total, col, i) =>
      total + trees.filter((tree, j) => checkVisible(trees, i, j)).length,
    0
  );
};

export const getVisibleTrees = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const trees: Trees = arr.map((col) => col.split("").map(Number));

  return getNumVisibleTrees(trees);
};

const getNonBlockedTrees = (refTree: number, col: number[]) => {
  if (col.length === 0) {
    return 0;
  }
  const higherTreeIndex = col.findIndex((tree) => tree >= refTree);

  return higherTreeIndex >= 0 ? higherTreeIndex + 1 : col.length;
};

const getCompound = (trees: Trees, i: number, j: number): number => {
  const dirs: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"];
  const refTree = trees[i][j];

  return dirs.reduce((total, dir) => {
    const col = getTreeCol(trees, i, j, dir);
    const numNonBlockedTrees = getNonBlockedTrees(refTree, col);
    return total * numNonBlockedTrees;
  }, 1);
};

const getMaxTreeCompound = (trees: Trees) =>
  Math.max(...trees.map((col) => Math.max(...col)));

export const getMostScenicTree = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const trees: Trees = arr.map((col) => col.split("").map(Number));

  const treesCompounds = trees.map((col, i) =>
    col.map((tree, j) => getCompound(trees, i, j))
  );

  return getMaxTreeCompound(treesCompounds);
};
