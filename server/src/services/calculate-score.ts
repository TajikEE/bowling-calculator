import { ScoreCard, Frame, Rolls } from "../types";

export enum BonusName {
  Spare = "spare",
  Strike = "strike",
  Double = "double",
  Turkey = "turkey",
  Fourbagger = "fourbagger",
  None = "none",
}

function firstRollOfNextFrame(rolls: Rolls, index: number): number {
  return rolls[index + 1];
}

function secondRollOfNextFrame(rolls: Rolls, index: number): number {
  return rolls[index + 2];
}

export function getHowManyStrikesInARow(
  rolls: Array<number>,
  currentRollIndex: number
): number {
  const slicedRolls = rolls.slice(currentRollIndex, rolls.length);

  return rolls[currentRollIndex] === 10
    ? slicedRolls.reduce((accumulator, roll, index) => {
        if (slicedRolls[index + 1] === 10) return ++accumulator;

        return accumulator;
      }, 1)
    : 0;
}

export function getBonusName(rolls: Rolls, index: number): string {
  const strikesInARow = getHowManyStrikesInARow(rolls, index);

  if (strikesInARow >= 4) return BonusName.Fourbagger;

  if (strikesInARow === 3) return BonusName.Turkey;

  if (strikesInARow === 2) return BonusName.Double;

  if (strikesInARow === 1) return BonusName.Strike;

  return BonusName.None;
}

export function mapBonusScore(rolls: Rolls, index: number): object {
  return {
    [BonusName.Strike]:
      10 +
      firstRollOfNextFrame(rolls, index) +
      secondRollOfNextFrame(rolls, index),
    [BonusName.Double]: 20 + secondRollOfNextFrame(rolls, index),
    [BonusName.Turkey]: 30,
    [BonusName.Fourbagger]: 30,
  };
}

function getBonusScore({
  rolls,
  index,
  currentFrameIndex,
}: {
  rolls: Rolls;
  index: number;
  currentFrameIndex: number;
}) {
  const bonusName = getBonusName(rolls, index);

  if (bonusName !== BonusName.None && currentFrameIndex === 9) return 10;

  const bonusScore = mapBonusScore(rolls, index)[bonusName];

  return bonusScore;
}

function isGameOver(currentFrameIndex: number, frames: Frame[]) {
  return (
    currentFrameIndex === 9 &&
    (frames[currentFrameIndex].rolls.length === 3 ||
      frames[currentFrameIndex].rolls[0] + frames[currentFrameIndex].rolls[1] <
        10)
  );
}

export function calculateFrameScore(rolls: Rolls): ScoreCard {
  const output = rolls.reduce(
    (output, roll, index) => {
      let { frames, currentFrameIndex, sum } = output;

      // set the first roll of the frame
      if (!frames[currentFrameIndex]) {
        frames[currentFrameIndex] = { rolls: [roll] };
      }

      // set the second/third roll of the frame
      else {
        frames[currentFrameIndex].rolls.push(roll);
      }

      if (roll === 10) {
        const bonusScore = getBonusScore({ rolls, index, currentFrameIndex });

        frames[currentFrameIndex].sum = sum + bonusScore;

        return {
          frames,
          gameover: isGameOver(currentFrameIndex, frames),
          currentFrameIndex:
            currentFrameIndex === 9 ? currentFrameIndex : ++currentFrameIndex,
          sum: sum + bonusScore,
        };
      }

      // spare
      const sumOfRollsInTheFrame = frames[currentFrameIndex].rolls.reduce(
        (sum, roll) => sum + roll,
        0
      );

      if (sumOfRollsInTheFrame === 10) {
        let spareSum = sum + roll;

        if (firstRollOfNextFrame(rolls, index) && currentFrameIndex !== 9) {
          spareSum += firstRollOfNextFrame(rolls, index);
        }

        frames[currentFrameIndex].sum = spareSum;

        return {
          frames,
          gameover: isGameOver(currentFrameIndex, frames),
          currentFrameIndex:
            currentFrameIndex === 9 ? currentFrameIndex : ++currentFrameIndex,
          sum: spareSum,
        };
      }

      // two or three rolls completed, no spare
      if (frames[currentFrameIndex].rolls.length >= 2) {
        frames[currentFrameIndex].sum = sum + roll;

        return {
          frames,
          gameover: isGameOver(currentFrameIndex, frames),
          currentFrameIndex:
            currentFrameIndex === 9 ? currentFrameIndex : ++currentFrameIndex,
          sum: sum + roll,
        };
      }

      // first role in the frame completed
      return {
        frames,
        currentFrameIndex,
        sum: sum + roll,
        gameover: isGameOver(currentFrameIndex, frames),
      };
    },
    { frames: [], currentFrameIndex: 0, sum: 0 } as ScoreCard
  );

  return output;
}
