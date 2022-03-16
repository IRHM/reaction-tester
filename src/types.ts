export interface Game {
  gameStatus: GameStatus;
  backgroundColor: BackgroundColor;
  reactionResult: string;
  scores: number[];
  previousTests: ReactionTest[];
}

export interface ReactionTest {
  avgTime: number;

  // Holds epoch time in milliseconds
  dateTime: number;
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
