import { getBeaconPositionFree, myFunctionTask2 } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
  Sensor at x=9, y=16: closest beacon is at x=10, y=16
  Sensor at x=13, y=2: closest beacon is at x=15, y=3
  Sensor at x=12, y=14: closest beacon is at x=10, y=16
  Sensor at x=10, y=20: closest beacon is at x=10, y=16
  Sensor at x=14, y=17: closest beacon is at x=10, y=16
  Sensor at x=8, y=7: closest beacon is at x=2, y=10
  Sensor at x=2, y=0: closest beacon is at x=2, y=10
  Sensor at x=0, y=11: closest beacon is at x=2, y=10
  Sensor at x=20, y=14: closest beacon is at x=25, y=17
  Sensor at x=17, y=20: closest beacon is at x=21, y=22
  Sensor at x=16, y=7: closest beacon is at x=15, y=3
  Sensor at x=14, y=3: closest beacon is at x=15, y=3
  Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

  it.only("Task 1 - should return correct total number of places where a beacon canntot be located on row y=10", () => {
    const actual = getBeaconPositionFree(input, 10);
    const expected = 26;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = myFunctionTask2(input);
    const expected = input;

    expect(actual).toEqual(expected);
  });
});
