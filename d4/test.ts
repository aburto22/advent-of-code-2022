import { getContainedSections, getOverlappingSections } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `2-4,6-8
  2-3,4-5
  5-7,7-9
  2-8,3-7
  6-6,4-6
  2-6,4-8`;

  it("Task 1 - should return correct total contained sections", () => {
    const actual = getContainedSections(input);
    const expected = 2;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total overlapping sections", () => {
    const actual = getOverlappingSections(input);
    const expected = 4;

    expect(actual).toEqual(expected);
  });
});
