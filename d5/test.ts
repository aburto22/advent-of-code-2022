import { getTopCrates, getTopCratesNoReverse } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

  it("Task 1 - should return correct top crates ", () => {
    const actual = getTopCrates(input);
    const expected = "CMZ";

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = getTopCratesNoReverse(input);
    const expected = "MCD";

    expect(actual).toEqual(expected);
  });
});
