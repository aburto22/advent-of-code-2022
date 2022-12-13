import { myFunctionTask1, myFunctionTask2 } from "./lib";

describe("Advent of code - day 4", () => {
  const input = ``;

  it.only("Task 1 - should return correct total ", () => {
    const actual = myFunctionTask1(input);
    const expected = input;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = myFunctionTask2(input);
    const expected = input;

    expect(actual).toEqual(expected);
  });
});
