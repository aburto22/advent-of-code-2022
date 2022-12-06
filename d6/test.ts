import { getMarker } from "./lib";

describe("Advent of code - day 4", () => {
  it("Task 1 - t1 - should return correct first start of pocket marker", () => {
    const input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
    const actual = getMarker(input, 4);
    const expected = 5;

    expect(actual).toEqual(expected);
  });
  it("Task 1 - t2 - should return correct first start of pocket marker", () => {
    const input = `nppdvjthqldpwncqszvftbrmjlhg`;
    const actual = getMarker(input, 4);
    const expected = 6;

    expect(actual).toEqual(expected);
  });
  it("Task 1 - t3 - should return correct first start of pocket marker", () => {
    const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
    const actual = getMarker(input, 4);
    const expected = 10;

    expect(actual).toEqual(expected);
  });
  it("Task 1 - t4 - should return correct first start of pocket marker", () => {
    const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
    const actual = getMarker(input, 4);
    const expected = 11;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - t1 - should return correct first start of message marker ", () => {
    const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
    const actual = getMarker(input, 14);
    const expected = 19;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - t2 - should return correct first start of message marker ", () => {
    const input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
    const actual = getMarker(input, 14);
    const expected = 23;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - t3 - should return correct first start of message marker ", () => {
    const input = `nppdvjthqldpwncqszvftbrmjlhg`;
    const actual = getMarker(input, 14);
    const expected = 23;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - t4 - should return correct first start of message marker ", () => {
    const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
    const actual = getMarker(input, 14);
    const expected = 29;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - t5 - should return correct first start of message marker ", () => {
    const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
    const actual = getMarker(input, 14);
    const expected = 26;

    expect(actual).toEqual(expected);
  });
});
