import { getTotalSandUnits, getTotalSandUnitsWithFloor } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9`;

  it("Task 1 - should return correct total number of sand units", () => {
    const actual = getTotalSandUnits(input);
    const expected = 24;

    expect(actual).toEqual(expected);
  });
  it.only("Task 2 - should return correct total number of sand units with infinite floor", () => {
    const actual = getTotalSandUnitsWithFloor(input);
    const expected = 93;

    expect(actual).toEqual(expected);
  });
});
