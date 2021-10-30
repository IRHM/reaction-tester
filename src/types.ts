export interface Game {
  gameStatus: GameStatus;
  backgroundColor: BackgroundColor;
  reactionResult: string;
}

export enum GameStatus {
  Instructions,
  Reacting
}

export enum BackgroundColor {
  White = "#fff",
  Green = "#49FF00"
}
