export interface Game {
  gameStatus: GameStatus;
  backgroundColor: BackgroundColor;
  reactionResult: string;
  scores: number[];
}

export enum GameStatus {
  Instructions,
  Reacting,
  ReactionResult,
  FinalResult
}

export enum BackgroundColor {
  White = "#fff",
  Green = "#49FF00"
}
