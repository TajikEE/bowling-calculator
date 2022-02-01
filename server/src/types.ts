export type Rolls = number[]

export type ScoreCard = {
  frames: Frame[],
  currentFrameIndex: number,
  sum: number
  gameover?: boolean
};

export type Frame = {
  rolls: Rolls,
  sum?: number
}
