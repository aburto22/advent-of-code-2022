import { getPrioritySum, getPriorityBadge } from "./lib";

describe("Advent of code - day 3", () => {
  it("Task 1 - should return correct total priority for repeated items", () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

    const actual = getPrioritySum(input);
    const expected = 157;

    expect(actual).toEqual(expected);
  });
  it("Task 1 - should return correct total priority for badges", () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

    const actual = getPriorityBadge(input);
    const expected = 70;

    expect(actual).toEqual(expected);
  });
});
