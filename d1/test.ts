import { getNumberCalories } from "./lib";

describe("Advent of code - day 1 - task 1", () => {
  it("Should return total calories for elf with max num calories", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    const actual = getNumberCalories(input, 1);
    const expected = 24000;

    expect(actual).toEqual(expected);
  });
  it("Should return total calories for three elves with max num calories", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

    const actual = getNumberCalories(input, 3);
    const expected = 45000;

    expect(actual).toEqual(expected);
  });
});
