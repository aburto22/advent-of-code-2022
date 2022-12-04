type Section = {
  min: number;
  max: number;
};

const getSectionNums = (str: string): Section => {
  const limits = str.split("-").map((nums) => +nums);
  return {
    min: limits[0],
    max: limits[1],
  };
};

const isContained = (section1: Section, section2: Section): boolean => {
  if (section1.min <= section2.min && section1.max >= section2.max) {
    return true;
  }
  if (section2.min <= section1.min && section2.max >= section1.max) {
    return true;
  }
  return false;
};

export const getContainedSections = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const sections = arr.map(
    (str) =>
      str.split(",").map((nums) => getSectionNums(nums)) as [Section, Section]
  );
  const getContainedSections = sections.filter((sections) =>
    isContained(...sections)
  );
  return getContainedSections.length;
};

const isOverlapping = (section1: Section, section2: Section): boolean => {
  if (section1.min <= section2.min && section1.max >= section2.min) {
    return true;
  }
  if (section1.min <= section2.max && section1.max >= section2.max) {
    return true;
  }

  if (section2.min <= section1.min && section2.max >= section1.min) {
    return true;
  }
  if (section2.min <= section1.max && section2.max >= section1.max) {
    return true;
  }

  return false;
};

export const getOverlappingSections = (input: string) => {
  const arr = input.split("\n").map((line) => line.trim());
  const sections = arr.map(
    (str) =>
      str.split(",").map((nums) => getSectionNums(nums)) as [Section, Section]
  );
  const getContainedSections = sections.filter((sections) =>
    isOverlapping(...sections)
  );
  return getContainedSections.length;
};
