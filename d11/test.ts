import { getMonkeyBusiness } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

  it.only("Task 1 - should return correct total ", () => {
    const actual = getMonkeyBusiness(input, 20, true);
    const expected = 10605;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = getMonkeyBusiness(input, 1000, false);
    const expected = 2713310158;

    expect(actual).toEqual(expected);
  });
});
