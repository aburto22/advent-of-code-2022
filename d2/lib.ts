const mapPlayerShape = (shape: string): string => {
  if (shape === "X") {
    return "A";
  }
  if (shape === "Y") {
    return "B";
  }
  if (shape === "Z") {
    return "C";
  }
  return shape;
};

const getShapePoints = (shape: string): number => {
  switch (shape) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    default:
      return 0;
  }
};

const getVictoryPoints = (shape1: string, shape2: string) => {
  if (shape1 === shape2) {
    return 3;
  }
  if (
    (shape1 === "A" && shape2 === "B") ||
    (shape1 === "B" && shape2 === "C") ||
    (shape1 === "C" && shape2 === "A")
  ) {
    return 6;
  }
  return 0;
};

export const getPointsRockPaperScisors = (list: string): number => {
  const arrPlays = list.split("\n").map((ls) => {
    const playPoints = ls.split(" ");
    return [playPoints[0], mapPlayerShape(playPoints[1])] as const;
  });

  const arrPoints = arrPlays.map(
    (plays) => getVictoryPoints(...plays) + getShapePoints(plays[1])
  );

  return arrPoints.reduce((sum, points) => sum + points, 0);
};

const getWinningShape = (shape: string) => {
  if (shape === "A") {
    return "B";
  }
  if (shape === "B") {
    return "C";
  }
  if (shape === "C") {
    return "A";
  }
  return shape;
};

const getLoosingShape = (shape: string) => {
  if (shape === "A") {
    return "C";
  }
  if (shape === "B") {
    return "A";
  }
  if (shape === "C") {
    return "B";
  }
  return shape;
};

const getPlayerShape = (shape: string, outcome: string) => {
  if (outcome === "Y") {
    return shape;
  }
  if (outcome === "X") {
    return getLoosingShape(shape);
  }
  if (outcome === "Z") {
    return getWinningShape(shape);
  }
  return shape;
};

export const getPointsDecidedRockPaperScisors = (list: string): number => {
  const arrPlays = list.split("\n").map((ls) => {
    const playPoints = ls.split(" ") as [string, string];
    return [playPoints[0], getPlayerShape(...playPoints)] as const;
  });

  const arrPoints = arrPlays.map(
    (plays) => getVictoryPoints(...plays) + getShapePoints(plays[1])
  );

  return arrPoints.reduce((sum, points) => sum + points, 0);
};
