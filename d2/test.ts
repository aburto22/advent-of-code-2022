import {
  getPointsRockPaperScisors,
  getPointsDecidedRockPaperScisors,
} from "./lib";

describe("Advent of code - day 2", () => {
  const input = `A Y
  B X
  C Z`;

  it("Task 1 - should return correct total amount of points with playing shape decided", () => {
    const actual = getPointsRockPaperScisors(input);
    const expected = 15;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total amount of points with outcome decided", () => {
    const actual = getPointsDecidedRockPaperScisors(input);
    const expected = 12;

    expect(actual).toEqual(expected);
  });
});
