export interface Game {
  gameStatus: GameStatus;
  backgroundColor: BackgroundColor;
  reactionResult: string;
}

export enum GameStatus {
  Instructions,
  Reacting,
  ReactionResult
}

export enum BackgroundColor {
  White = "#fff",
  Green = "#49FF00"
}
