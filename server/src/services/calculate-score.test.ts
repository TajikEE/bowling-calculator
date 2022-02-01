import {
  BonusName,
  getBonusName,
  mapBonusScore,
  getHowManyStrikesInARow,
  calculateFrameScore,
} from "./calculate-score";

describe("getBonusName", () => {
  it("calculates strike", () => {
    expect(getBonusName([10], 0)).toBe(BonusName.Strike);
  });

  it("calculates double", () => {
    expect(getBonusName([10, 10], 0)).toBe(BonusName.Double);
  });

  it("calculates turkey", () => {
    expect(getBonusName([10, 10, 10], 0)).toBe(BonusName.Turkey);
  });

  it("calculates fourbagger", () => {
    expect(getBonusName([10, 10, 10, 10], 0)).toBe(BonusName.Fourbagger);
  });

  it("calculates no bonus value", () => {
    expect(getBonusName([0, 0, 10, 10], 0)).toBe(BonusName.None);
  });
});

describe("getHowManyStrikesInARow", () => {
  it("calculates strike", () => {
    expect(getHowManyStrikesInARow([10], 0)).toBe(1);
  });

  it("calculates double", () => {
    expect(getHowManyStrikesInARow([10, 10], 0)).toBe(2);
  });

  it("calculates turkey", () => {
    expect(getHowManyStrikesInARow([10, 10, 10], 0)).toBe(3);
  });

  it("calculates fourbagger", () => {
    expect(getHowManyStrikesInARow([10, 10, 10, 10], 0)).toBe(4);
  });

  it("calculates no bonus value", () => {
    expect(getHowManyStrikesInARow([0, 0, 10, 10], 0)).toBe(0);
  });
});

describe("mapBonusScore", () => {
  it("takes score input and index to get a bonus score", () => {
    expect(mapBonusScore([10, 10, 10], 3)).toMatchObject({
      [BonusName.Turkey]: 30,
    });
  });
});

describe("calculate frame score", () => {
  it("calculates the final output", () => {
    const result = {
      currentFrameIndex: 0,
      frames: [{ rolls: [6] }],
      gameover: false,
      sum: 6,
    };
    expect(calculateFrameScore([6])).toStrictEqual(result);
  });
});
