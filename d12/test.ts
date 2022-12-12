import {
  getShortestPathLength,
  getShortestPathLengthWithAnyStartPoint,
} from "./lib";

describe("Advent of code - day 4", () => {
  const input = `Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi`;

  it("Task 1 - should return correct total ", () => {
    const actual = getShortestPathLength(input);
    const expected = 31;

    expect(actual).toEqual(expected);
  });
  it.only("Task 2 - should return correct total ", () => {
    const actual = getShortestPathLengthWithAnyStartPoint(input);
    const expected = 29;

    expect(actual).toEqual(expected);
  });
});
