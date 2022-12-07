import { getTotalSizeSmallDirectories, getSizeDirToDelete } from "./lib";

describe("Advent of code - day 4", () => {
  const input = `$ cd /
  $ ls
  dir a
  14848514 b.txt
  8504156 c.dat
  dir d
  $ cd a
  $ ls
  dir d
  29116 f
  2557 g
  62596 h.lst
  $ cd d
  $ ls
  584 i
  $ cd ..
  $ cd ..
  $ cd d
  $ ls
  4060174 j
  8033020 d.log
  5626152 d.ext
  7214296 k`;

  it("Task 1 - should return correct total size of files weighting less than 100 000", () => {
    const actual = getTotalSizeSmallDirectories(input);
    const expected = 95437;

    expect(actual).toEqual(expected);
  });
  it("Task 2 - should return correct total ", () => {
    const actual = getSizeDirToDelete(input);
    const expected = 24933642;

    expect(actual).toEqual(expected);
  });
});
