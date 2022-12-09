import { visitedPositionsByT, longRopeVisitedT } from "./lib";

describe("Advent of code - day 4", () => {
  it("Task 1 - should return correct total positions visited by T for short rope", () => {
    const input = `R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2`;
    const actual = visitedPositionsByT(input, { x: 6, y: 5 }, { x: 0, y: 0 });
    const expected = 13;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total positions visited by T for long rope", () => {
    const input = `R 5
    U 8
    L 8
    D 3
    R 17
    D 10
    L 25
    U 20`;
    const actual = longRopeVisitedT(input, { x: 26, y: 21 }, { x: 11, y: 5 });
    const expected = 36;

    expect(actual).toEqual(expected);
  });
});
