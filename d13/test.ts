import { getSumIndexesInCorrectOrder, getReceiverSignal } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

  it("Task 1 - should return correct total sum of indexes of pair in correct order", () => {
    const actual = getSumIndexesInCorrectOrder(input);
    const expected = 13;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = getReceiverSignal(input);
    const expected = 140;

    expect(actual).toEqual(expected);
  });
});
