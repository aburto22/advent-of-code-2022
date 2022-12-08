import { getVisibleTrees, getMostScenicTree } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `30373
  25512
  65332
  33549
  35390`;

  it("Task 1 - should return correct total number of visible trees", () => {
    const actual = getVisibleTrees(input);
    const expected = 21;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = getMostScenicTree(input);
    const expected = 8;

    expect(actual).toEqual(expected);
  });
});
