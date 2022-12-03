import { getPrioritySum, getPriorityBadge } from "./lib";

describe("Advent of code - day 3", () => {
  const input = `vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw`;

  it("Task 1 - should return correct total priority for repeated items", () => {
    const actual = getPrioritySum(input);
    const expected = 157;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total priority for badges", () => {
    const actual = getPriorityBadge(input);
    const expected = 70;

    expect(actual).toEqual(expected);
  });
});
